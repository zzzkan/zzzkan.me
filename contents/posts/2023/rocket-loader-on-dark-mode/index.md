---
slug: rocket-loader-on-dark-mode
title: Rocket Loaderを使うとダークモードがちらつく
publishedDate: 2023-04-12
tags:
  - Cloudflare
---

このブログはダークモードに対応していますが読み込み時に画面がちらついていました。自分のローカル環境では問題が再現できなくてちょっと困ってたのですが、最近 Cloudflare の設定でとりあえず有効にしていた [Rocket Loader](https://developers.cloudflare.com/fundamentals/speed/rocket-loader/) が原因であることに気が付きました。

## ダークモードの仕組み

ダークモード対応でよく使われるのが `data-theme="dark"{:html}` のような[カスタムデータ属性](https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/data-*)をトリガーにして background などのプロパティを切り替えるという方法です。

```css
:root {
  background: #fff;
}

[data-theme="dark"] {
  background: #000;
}
```

あとは `data-theme{:html}` 属性を切り替えるトグルボタンを作ればカラーモードが切り替わりますね。このブログで利用している Chakra UI も同様な方法でダークモードが実装されてます。

このときページがレンダリングされる時点で data-theme が定まっていないと画面のフラッシュ（ちらつき）の原因になります。たとえば、上記のような css で `data-theme{:html}` 属性がレンダリング後に "dark" へ設定された場合、背景色は一瞬白が表示されてから黒が表示されることになります。こういう問題は、カラーモードをローカルストレージに保存していたり [prefers-color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme) を参照したりしてページ読み込み時のカラーモードを切り替えている場合に考慮する必要があります。

この問題へ対応するため以下のような JavaScript を body 直後に配置してなるべく**レンダリング前に実行する**とよいです。

```js
(function () {
  const colorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  document.documentElement.dataset.theme = colorTheme;
})();
```

ようはレンダリングされる前に data-theme を先に設定しておこうということです。Chakra UI の場合こういうスクリプトは `<ColorModeScript/>{:jsx}` として実装されているのでこれを呼び出すだけです。便利。

## Rocket Loader とは

Rocket Loader は Cloudflare が提供しているウェブサイトの高速化技術の 1 つです。

> Rocket Loader prioritizes your website’s content (text, images, fonts, and more) by deferring the loading of all of your JavaScript until after rendering.

とあるように実際にやっていることは JavaScript のロードを**レンダリング後まで遅延させる**（たぶん `window.onload{:js}`まで？）というものです。すごい。

## フラッシュの原因と対策

はい、ということで Rocket Loader が有効にするとフラッシュ防止のため用意した JavaScript の実行がレンダリング後まで遅延されてしまいお役目を果たせなくなりますね。 Rocket Loader の仕組みを理解しないままとりあえず有効にしたのが悪かったごめん。

対策としては 1 番簡単なのは Rocket Loader を無効にすることです。まあ当然ですね。

もう１つは特定のスクリプトだけ Rocket Loader を無効にする方法があります。やり方は無効にしたいスクリプト要素に対して `data-cfasync="false"{:html}` を追加するだけです。このとき `data-cfasync{:html}` 属性は `src` 属性より前に入れる必要があります。

```html
<script data-cfasync="false" src="/javascript.js"></script>
```

私の場合はよく考えたらこのブログでは Rocket Loader の恩恵はそんなになかったので無効にしてしまいました。

## 参考

- [Color Mode - Chakra UI](https://chakra-ui.com/docs/styled-system/color-mode)
- [Rocket Loader · Cloudflare Fundamentals docs](https://developers.cloudflare.com/fundamentals/speed/rocket-loader/)
- [javascript - How does CloudFlare's Rocket Loader actually work (and how can a developer ensure compatibility)? - Webmasters Stack Exchange](https://webmasters.stackexchange.com/questions/60276/how-does-cloudflares-rocket-loader-actually-work-and-how-can-a-developer-ensur)
