---
slug: visual-regression-testing-with-winmerge
title: WinMergeで画像比較したい
publishedDate: 2023-01-17
featuredImage: "./glenn-carstens-peters-1F4MukO0UNg-unsplash.jpg"
featuredImageAlt: "灰色のタイプライターと macbookの写真"
featuredImageCreditText: "Glenn Carstens-Peters"
featuredImageCreditLink: "https://unsplash.com/ja/%E5%86%99%E7%9C%9F/1F4MukO0UNg"
tags:
  - WinMerge
---

最近 Visual Regression Testing（VRT）というのが流行ってる？みたいです。実はこのブログのために作成した [Gatsby Theme](https://github.com/zzzkan/gatsby-theme-blog) の CI でも簡単にですが Playwright による VRT を実行してみたりしてます。

## VRT を手軽にやりたい

VRT は過去と現在のアプリケーション画面の画像を比較し意図しない変更がないか確認するテスト手法のことです。アプリケーション画面の比較を目視で行うのはどうしても限界があるので、 VRT をサポートするツールは機械的に画像を比較する仕組みを持っています。

とことで、老舗差分ツールに[WinMerge](https://github.com/winmerge/winmerge)というのがあります。自分の PC に既にインストールされてます。そして、これ実は画像比較もいけます。ということで、WinMerge で良い感じに画像比較試できるのかなという話です。

## WinMerge で画像比較

WinMerge での画像比較は単純に画像ファイルを WinMerge で開くだけです。すると以下のような比較結果が得られます。

![WinMergeによる画像ファイルの比較](./image-file-diff.png)

差分がある部分はハイライト表示されておりわかりやすいですね。フォルダーごと比較も可能です。比較前に\[編集\] > \[設定\] > \[比較\] > \[画像\]で「フォルダー比較で画像比較を有効にする」にチェックを入れておく必要があります。

![「フォルダー比較で画像比較を有効にする」設定](./image-dir-diff-setting.png)

比較対象のフォルダーを WinMerge で開き比較すると以下のような比較結果が得られます。

![WinMergeによる画像フォルダーの比較](./image-dir-diff.png)

フォルダー比較であっても各ファイルに対して画像比較が動作していることがわかります。期待結果の画像を保存したフォルダーと現行結果の画像を保存したフォルダーを用意しておけば WinMerge で VRT の肝である機械的な画像比較を実現できそうです。

## 比較結果のレポート

VRT をサポートしているツールはたいていテストレポート結果の出力機能がついています。レポート結果をまとめて残せると何かと便利です。

実は WinMerge はレポートの出力が可能です。ここではフォルダー比較した結果をレポート出力することにします。比較結果が出力された状態で\[ツール\] > \[レポートの生成\]を選択します。すると以下のようダイアログが表示されます。

![フォルダー比較レポートの出力設定](./image-diff-report-setting.png)

レポートスタイルには「シンプルな HTML 形式」を選択し「ファイル比較レポートを含める」にチェックを入れておきます。すると以下のようなレポートが出力されます。

![フォルダー比較レポート](./image-diff-report-dir.png)

またファイル間の比較レポートを見ることもできます。

![ファイル比較レポート](./image-diff-report-file.png)

必要十分な情報がまとまっていますね。

## コマンドライン実行

いままでは WinMerge 画面上でさまざまな操作をしてきました。ただ VRT を実行する場合画面操作は不要でコマンドラインから実行できるほうが便利です。

実は WinMerge はコマンドラインからの実行も可能です。さらに、オプションを指定することでこれまで行ってきたような設定を渡すことができます。「画像が含まれる 2 つのフォルダーを比較し結果をレポートに出力する」には以下のようにします。

```bat
"C:\Users\user\AppData\Local\Programs\WinMerge\WinMergeU.exe" .\expected .\actual /r /u /noprefs /cfg Settings/DirViewExpandSubdirs=1 /cfg Settings/EnableImageCompareInFolderCompare=1 /cfg ReportFiles/ReportType=2 /cfg ReportFiles/IncludeFileCmpReport=1 /minimize /noninteractive /or report.html
```

WinMergeU.exe は WinMerge のパス、 expected と actual は比較対象、以降がオプションで使用しているのは以下です。

| オプション      | 内容                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| /r              | サブフォルダー内のすべてのファイルを比較(再帰比較)                     |
| /u              | パスを最近使用した項目リストに追加しない                               |
| /noprefs        | デフォルト設定を使用する（レジストリに保存している設定を読み込まない） |
| /cfg config     | 設定情報を指定する                                                     |
| /minimize       | 最小化状態で WinMerge を開始                                           |
| /noninteractive | 比較やレポート出力後に WinMerge を終了                                 |
| /or reportpath  | レポート出力パスを指定する                                             |

/cfg で渡している設定情報は以下のような内容です。

| 設定情報                                     | 内容                                                                                                             |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Settings/DirViewExpandSubdirs=1              | 「自動的にサブフォルダーを展開する」を有効化（展開しておかないとレポートでファイル単位の比較結果を確認できない） |
| Settings/EnableImageCompareInFolderCompare=1 | 「フォルダー比較で画像比較を有効にする」を有効化                                                                 |
| ReportFiles/ReportType=2                     | レポートスタイルとして「シンプルな HTML 形式」を選択                                                             |
| ReportFiles/IncludeFileCmpReport=1           | 「ファイル比較レポートを含める」を有効化                                                                         |

コマンド１発で画像比較からレポートの作成までできるようになりました。正直なところここまでできるとは思ってませんでした。バッチファイルなんかをしっかり書けばかなり便利になりそう。

## 参考

- [WinMerge のコマンドラインオプション - Qiita](https://qiita.com/mima_ita/items/ac21c0588080e73fc458)
- [コマンドライン - WinMerge 2.16 ヘルプ](https://manual.winmerge.org/jp/Command_line.html)
