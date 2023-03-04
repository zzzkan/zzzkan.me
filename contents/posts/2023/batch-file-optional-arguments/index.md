---
slug: batch-file-optional-parameter
title: バッチファイルで複数のオプション引数を順不同に扱う
publishedDate: 2023-01-18
featuredImage: ./thumbnail.png
tags:
  - Batch file
  - Windows
---

バッチファイルで複数のオプション引数を順不同に扱いたいことがありました。バッチファイルでの引数の扱いはくせが強いのですが`shift{:txt}`を用いると比較的いいかんじに書けます。たとえば`command [/a] [/b]{:txt}`のような /a と /b 2 つのオプション引数を扱いたい場合は以下のようにできます。

```bat
:loop
if not "%1"=="" (
    if "%1"=="/a" (
        set a=true
    )
    if "%1"=="/b" (
        set b=true
    )
    shift
    goto :loop
)

rem a==true: /aが渡された
rem b==true: /bが渡された
```

`shift{:txt}`は引数を左方向にずらして格納しなおすコマンドで、バッチファイルで 10 個以上の引数を扱いたい場合によく用いられます。

バッチファイルの引数は %0, %1, ... , %9 という特殊な変数に格納されます。このとき %10 に 10 個目の引数が格納されそうなものですが、実動作としては %1 （１個目の引数）+ 0 （文字列）として扱われるという罠があります。そのため、10 個目以上の引数を扱うには`shift{:txt}`を用いて引数を左方向にずらして格納しなおす必要があります。

個人的にはバッチファイルで引数を扱う場合はつねに`shift{:txt}`を使って %1 だけ確認するようにしたほうが余計なことを考えなくて済みそうな気がしました（そもそもバッチファイルを書く機会がほとんどないけど）。

## 参考

- [コマンドプロンプト | バッチファイルで 10 個以上の引数を使う](https://www.javadrive.jp/command/bat/index7.html)
- [Windows Bat file optional argument parsing - Stack Overflow](https://stackoverflow.com/questions/3973824/windows-bat-file-optional-argument-parsing)
