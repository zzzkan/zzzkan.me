---
slug: create-gatsby-theme-and-starter
title: Gatsby ThemeとStarterを作った
publishedDate: 2023-01-27
featuredImage: ./thumbnail.png
tags:
  - Gatsby
---

このブログを作った際どうせならと思って Gatsby Theme と Gatsby Starter を作りました。Gatsby Theme と Gatsby Starter は簡単に言うと Gatsby サイトを再利用するための仕組みです。このあたりをどのように作ったか書いてみることにします。

ちなみに作成した Theme と Starter は以下です。

- [@zzzkan/gatsby-theme-blog](https://github.com/zzzkan/gatsby-theme-blog/tree/main/package#readme)
- [@zzzkan/gatsby-starter-blog](https://github.com/zzzkan/gatsby-starter-blog#readme)

使い方は Readme に書いているつもりなのでよければ使ってみてください。

## そもそもなんで Gatsby

ブログを作る上でまず SSG フレームワークを探しました。SSR などはブログ程度では複雑すぎるし運用も面倒なためです。また React へ触れる環境が欲しかったので React ベースのものを選びたかったです。こうなると現時点で主要な SSG フレームワークは以下などになりました。

- [Next](https://nextjs.org/)
- [Gatsby](https://www.gatsbyjs.com/)
- [Astro](https://astro.build/)（React も使える）
- etc.

今回のブログ作成ではなるべく面倒な作業はしたくなかったので（技量がないともいう）、画像の最適化が標準サポートされておりまたその他さまざまな Plugin の利用もできる Gatsby を選択しました。結局 Theme や Starter 作成など多少面倒なことしてるんですけどね。

Next や Astro はまた別の機会に使ってみようと思ってます。

## Gatsby Theme と Gatsby Starter

Gatsby でサイトの構築をはじめる際はよく以下のようにします。

```shell
npx gatsby new gatsby-starter-hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

ここで指定しているのが [Gatsby Starter](https://www.gatsbyjs.com/docs/starters/) です。Gatsby Starter はようするに**ボイラープレート**です。`gatsby new{:txt}`コマンドを用いて簡単にテンプレとなる Gatsby サイトを展開できます。ただし、あくまでその時点での Gatsby プロジェクトのコピーが得られるだけで以降の開発はすべて自身で行う必要があります。たとえばわかりやすいのが依存関係のバージョンで、Starter 側がバージョンを上げたとしても作成したプロジェクトのバージョンは上がらないため自身でメンテする必要があります。

このような問題を解決する手段として [Gatsby Theme](https://www.gatsbyjs.com/docs/themes/) があります。Gatsby Theme はようするに **Plugin** です。gatsby-config で以下のようにして利用します。

```ts
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  plugins: ["@zzzkan/gatsby-theme-blog"],
};

export default config;
```

（UI 含め）Gatsby の各種機能を npm パッケージ化しているため簡単に再利用できるようになります。ただし、サイトの構成が Theme へ依存するようになるので Starter に比べると自由度は下がります。一応 [Shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) という方法で Theme の実装を差し替えることは可能ですがやりすぎはよくなさそうです。

## Gatsby Theme を作る上で参考にした情報

Gatsby Theme を作るうえでおもに以下を参考にさせてもらいました。

1. [Building a Theme | Gatsby](https://www.gatsbyjs.com/tutorial/building-a-theme/)
2. [gatsbyjs/themes: This is a repo for Gatsby's official themes.](https://github.com/gatsbyjs/themes)
3. [LekoArts/gatsby-themes: Get high-quality and customizable Gatsby themes to quickly bootstrap your website! Choose from many professionally created and impressive designs with a wide variety of features and customization options.](https://github.com/LekoArts/gatsby-themes)

ちなみに Gatsby Starter は単なる Gatsby サイトなので普通にサイトを作るだけです。GitHub などのリポジトリに公開しておけば`gatsby new{:txt}`コマンドから利用可能になります。

## どうやって作ったか

普通の Gatsby サイトの開発とは少し異なるのかなと思った点について書いてみます。

### モノレポ

Theme を開発するプロジェクトだけでは実サイトとしての動作確認ができません。そのため、Theme 用のプロジェクトと動作確認用のプロジェクトのモノレポ環境にするといいです。Gatsby のチュートリアルでは [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) が使われていたため今回はあわせました。

### TypeScript

Gatsby v4.9 から gatsby-config.ts のように Gatsby の設定ファイルの TypeScript 化が可能になっています。ただ、残念なことに yarn workspaces を使っているとうまく動作しませんでした（詳細まではおってない）。で [TypeScript and Gatsby | Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/) を確認すると以下のように書かれてました。

> Workspaces (e.g. Yarn) are not supported.

ということで今回は素直に設定ファイルの TypeScript 化は諦めました。

一方で Gatsby v4.15 で正式に機能追加された [GraphQL Typegen](https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/) は普通に動いたので使いました。GraphQL Typegen は GraphQL の型情報を自動生成してくれます。使うには gatsby-config で以下のようにします。

```js
module.exports = {
  graphqlTypegen: true,
};
```

すると`gatsby develop{:txt}`のたびに GraphQL の型情報が含まれる gatsby-types.d.ts を生成するようになります。

### コンポーネントの分割

Gatsby Theme には [Shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) という概念があります。これは Theme のもともとの実装をユーザーが独自の実装に差し替えることができるというものです。たとえば、ユーザーが Theme のタイトルだけを独自の実装へ変更したい場合 Theme 側に Title.tsx のようなコンポーネントがあればこのコンポーネントを Shadowing するだけで済みます。

ということで Gatsby Theme ではコンポーネントが（正確には src 内のファイルすべてですが） Shadowing の 1 つの単位になります。自分のサイトを作るだけであればコンポーネントの分割はある程度てきとうでいい気もしますが、Gatsby Theme を作る場合は少なくとも Shadowing されることを意識して分割するとよさそうです。

### スタイル

これは別になんでもいいんですが Gatsby のチュートリアルでは [Theme UI](https://www.gatsbyjs.com/docs/how-to/styling/theme-ui/) の使用例がよく出てきます。Theme UI は Theming に力を入れたライブラリです。Gatsby Theme 側で theme.js などにスタイルを定義しておいてユーザーが独自の実装をしたい場合は Shadowing してもらうというパターンをよく見かけました。

今回は興味があったため Theme UI と同様な Theming ができる [Chakra UI](https://chakra-ui.com/) を使ってみました。ただ、 Chakra UI はバンドルサイズが結構大きくてブログ程度には過剰だった気がかなりしています。v2.4.2 から追加された [ChakraBaseProvider](https://chakra-ui.com/changelog/2.4.2#react-242) で不要なテーマを剥がせるようになっているみたいなので気が向いたら検討します（たぶんしない）。

### テスト

今回は Vitest と Playwright で簡単なテストを実行するようにしました。動作確認用のプロジェクトを用意したおかげで e2e テストも書けますね。

### リリース

Gatsby Theme は npm パッケージとして公開するためリリース作業が必要です。

今回は GitHub の[自動生成リリース ノート](https://docs.github.com/ja/repositories/releasing-projects-on-github/automatically-generated-release-notes)でリリースノートを自動生成しつつ、以下のような Github Action で npm の公開まで行えるようにしてみました。

```yaml
name: Publish
on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version-file: ".nvmrc"
          registry-url: "https://registry.npmjs.org"
          scope: "@zzzkan"
      - name: Install dependencies
        run: yarn install --immutable
      - name: Publish package to npmjs
        run: npm publish --access public
        working-directory: ./package
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Starter

Theme を公開した後に Theme を使用した Starter も合わせて作成しました。Theme のみでプロジェクトをはじめるのは結構難易度が高いので Starter も合わせてあると便利な気がします。

## まとめ

結構大変でしたが作ってみてよかったです。

よければ使ってみていただけると、そして FB いただけるととっっても嬉しいです。
