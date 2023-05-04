---
slug: trailing-slashes-in-gatsby
title: Gatsbyのトレイリングスラッシュにちょこっとご用心
publishedDate: 2023-01-28
featuredImage: "./noora-alhammadi-7O9AyHDFzwY-unsplash.jpg"
featuredImageAlt: "牛乳と氷を入れた使い捨てカップの写真"
featuredImageCreditText: "Noora AlHammadi"
featuredImageCreditLink: "https://unsplash.com/ja/%E5%86%99%E7%9C%9F/7O9AyHDFzwY"
tags:
  - Gatsby
---

トレイリングスラッシュ（trailing slash）とは URL 末尾の`/`のことを指します。[Gatsby v5 から](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/#trailingslash-is-set-to-always)このトレイリングスラッシュがデフォルトでは常に「あり」に変更されています。とくにいままでトレイリングスラッシュ「なし」で運用していた場合は気をつけたほうがよさそうです。

## オプション

[Gatsby v4.7 から](https://www.gatsbyjs.com/docs/reference/release-notes/v4.7/#trailingslash-option)トレイリングスラッシュを設定するオプションが追加されています。利用可能なオプションは次の 3 つです。

1. `always`：すべての URL でトレイリングスラッシュあり（Gatsby v5 からのデフォルト）
2. `never`：すべての URL でトレイリングスラッシュなし
3. `ignore`：URL を修正しない

`gatsby-config` で以下のようにして利用します。

```js
module.exports = {
  trailingSlash: "always",
};
```

この機会に明示的に`trailingSlash`を定義しておくとよさそうです。

ちなみに`always`や`never`と同様な動作をするプラグイン [gatsby-plugin-force-trailing-slashes](https://www.gatsbyjs.com/plugins/gatsby-plugin-force-trailing-slashes/) と [gatsby-plugin-remove-trailing-slashes](https://www.gatsbyjs.com/plugins/gatsby-plugin-remove-trailing-slashes/) は非推奨となっています。

## サイトマップ

[gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/) はサイトマップを生成してくれる便利なプラグインです。このサイトマップに追加する URL は基本的に`trailingSlash`に基づいた URL となります。

ただ、現在のところ`never`を指定している場合でもルートパスにはトレイリングスラッシュがついてしまうようです。これはプラグインが`allSitePage`でサイト内部のパスを取得していて、ルートパスは単に`/`としか得られずトレイリングスラッシュの有無が判断できないため起こるようです。

ちょっと気持ち悪いですが [RFC での議論](https://github.com/gatsbyjs/gatsby/discussions/34205#discussioncomment-1945640)によれば、幸いにもルートパスのトレイリングスラッシュの有無は問題にはならないらしいです。

## RSS

[gatsby-plugin-feed](https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/)は RSS feed を生成してくれる便利なプラグインです。この RSS feed に追加する URL はよく以下のように指定します。

```js {13, 22}
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug;
                return {
                  title: post.title,
                  date: post.publishedDate,
                  description: post.excerpt,
                  url,
                  guid: url,
                };
              }),
            query: `
              {
                allPost(sort: {publishedDate: DESC}) {
                  nodes {
                    slug
                    title
                    publishedDate
                    excerpt
                  }
                }
              }
            `,
          },
        ],
      },
    },
  ],
};
```

ルートパス（`site_url`）には`site.siteMetadata.siteUrl`のクエリ結果を入れてますが、現在のところ`trailingSlash`は考慮されていないようです。（詳細な実装までは追えていませんが）私が試した範囲では`siteUrl`は常にトレイリングスラッシュがなしになっていました。気が向いたらちゃんと調べます。また、その他のページは各ページに紐づく`slug`を用いてますがこれも自分で実装していない限り`trailingSlash`は考慮されないです。

細かい点ですが気をつけないと意図した URL になっていないことがあるので注意が必要です。とくに RSS feed をサイトマップとして送信している場合は Search Console で「ページにリダイレクトがあります」と怒られます。

このサイトでは`always`を指定していますが各ページの URL に手動でトレイリングスラッシュをつけるようにしてます。もっと良い方法がある気はしていますが…。
