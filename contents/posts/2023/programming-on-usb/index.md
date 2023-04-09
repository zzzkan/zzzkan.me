---
slug: programming-on-usb
title: USBメモリーを挿すだけで開発環境を整えたい
publishedDate: 2023-04-08
tags:
  - Portable App
---

PC に USB メモリーを挿すだけで開発環境が整ってちょっとしたことをさらっと書いて実行出来たら嬉しいと思うときがたまにありました。ということで調べました。こういった用途ではゴリゴリ実装することはないので、いわゆるスクリプト言語系しか見てません。なお Windows が前提です。

## Python

こういった用途では Python がよく使われるように思います。

多少何か入っていて良いのであれば [WinPython](https://winpython.github.io/) が候補になりそうです。WinPython はデフォルトでポータブルなので適当なバージョンを USB へダウンロード&解凍するだけです。たとえば、解凍した中にある /scripts/cmd.bat を実行すると、環境変数などを良しなに設定してくれた cmd が立ち上がって python や pip などのコマンドが使えます。便利！

```bat
\WPy64-31110\scripts>python --version
Python 3.11.1
```

ちなみに実際に環境変数を設定しているのは env_for_icons.bat という別のバッチファイルです。

何も入っていて欲しくない場合は [embeddable package](https://docs.python.org/ja/3/using/windows.html#the-embeddable-package) を使うという選択肢もあります。インストールは [Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/)から"embeddable package"を USB へダウンロード&解凍するだけです。ただし、embeddable package はそのままの状態では pip が使えないです。そのため、 [get-pip.py](https://bootstrap.pypa.io/get-pip.py) で pip をインストールする必要があります。このとき、あらかじめ python\*.\_pth の以下のコメントアウトを解除しておく必要があります。

```py
# Uncomment to run site.main() automatically
import site # ここのコメントアウトを解除しておく
```

個人的に、ここまでするなら大人しく WinPython を使っておけば良い気もしています。あまり知られていない気がするのですが WinPython には Python only 版（たとえば[WinPython 3.11.1.0dot](https://github.com/winpython/winpython/blob/master/changelogs/WinPythondot-64bit-3.11.1.0.md)）があって、見てもらえば分かりますが Spyder のような余計なものはほぼ入っていないみたいです。かなりシンプルなので使いやすそうです。

## Ruby

Python ときたら Ruby もできるのか気になる気がします。

Ruby の環境を Windows へインストールするツールとして著名なのが[RubyInstaller](https://rubyinstaller.org/)です。この RubyInstaller も基本的にポータブルなので USB へダウンロード&解凍するだけです。解凍した中の /bin に各種コマンドが置いてあって、たとえば /bin/irb.cmd を叩けば Interactive Ruby が動きます。楽ちん。

```bat
irb(main):001:0> 1+1
=> **2**
```

当然ながらパスは通っていないので /bin へパスを通しておくと便利です。

```bat
SET PATH=%CD%/bin;%PATH%
```

また、RubyInstaller では ridk を使って MSYS2 と MinGW も一緒にインストールしてくることができますが、これもポータブル環境で使用できるみたいです。解凍したフォルダー直下に msys64 または msys32 を持ってきて以下を実行すると良しなに環境変数を設定してくれるようです。

```bat
ridk enable
```

## Node.js

npm パッケージはいろいろあるので使えると便利そうです。

Node.js はバイナリーが配布されているのでこれを USB へダウンロード&解凍するだけです。[ダウンロード | Node.js](https://nodejs.org/ja/download) で Windows Binary を選べば OK です。解凍した中身を見ると node や npm 、npx などあるのがわかります。ちゃんと npx も使えるの嬉しい。

```bat
\node-v18.15.0-win-x64>node -v
v18.15.0
```

やっぱりパスが通っていないので適当に通す必要があります。

```bat
SET PATH=%CD%;%PATH%
```

## エディタを入れる

最後に USB へ好きなエディタを入れておきましょう。私は最近 Visual Studio Code しか使えない体になりつつあるので VS Code を入れます。

Visual Studio Code にもポータブルモードがあるのでそれを入れます。[Download Visual Studio Code - Mac, Linux, Windows](https://code.visualstudio.com/download) から zip 版を USB へダウンロード&解凍するだけです。解凍した中の code.exe を実行すれば VS Code が起動します。

このとき合わせて data という名前のフォルダーを作成しておくと良いです。作成するとセッション状態や環境設定、拡張機能等についてこのフォルダー内を参照、保存してくれるようになります。逆にこのフォルダーがないと通常通り %APPDATA% や %USERPROFILE% に保存されている設定を参照、保存します。今回のような用途では data フォルダーをあらかじめ作ってから拡張機能等入れると良いです。

最後に、エディタの起動と同時に環境変数を設定してくれるようなバッチファイルなりを作成しておけば完璧ですね。

## 参考

- [Windows で環境を極力汚さずに Python を動かす方法 (Python embeddable 版) - Qiita](https://qiita.com/rhene/items/68941aced93ccc9c3071)
- [FAQ · oneclick/rubyinstaller2 Wiki](https://github.com/oneclick/rubyinstaller2/wiki/faq)
- [node.js と npm をポータブルで使う（Windows 版） | ウェブゴト](https://blog.webgoto.net/239/)
- [Portable Mode in Visual Studio Code](https://code.visualstudio.com/docs/editor/portable)
