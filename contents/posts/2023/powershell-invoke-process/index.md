---
slug: powershell-invoke-process
title: PowerShellでStart-Processと呼び出し演算子（&）の使い分けが分からなかった
publishedDate: 2023-07-12
featuredImage: "./matthew-hernandez-sidgiBrOK1E-unsplash.jpg"
featuredImageAlt: "ビーチの砂の上の貝殻の写真"
featuredImageCreditText: "Matthew Hernandez"
featuredImageCreditLink: "https://unsplash.com/ja/%E5%86%99%E7%9C%9F/sidgiBrOK1E"
tags:
  - PowerShell
---

PowerShell をわりと使うようになってきました。ただ、ドキュメントを探すのになかなか苦労しています。欲しい情報に一発でたどり着かない…。最近、 PowerShell で .exe のような外部プログラム（特にコンソールアプリ）を呼び出したかったのですが混乱したのでメモしておきます。

## 外部プログラムを実行する方法

PowerShell で外部プログラムを実行する方法としては以下のようなものがあります。

- [Start-Process](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.powershell.management/start-process)
- [呼び出し演算子](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.powershell.core/about/about_operators#call-operator-)（`&{:powershell}`）
- [Invoke-Expression](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.powershell.utility/invoke-expression)
- [System.Diagnostics.Process](https://learn.microsoft.com/ja-jp/dotnet/api/system.diagnostics.process)

Invoke-Expression は、 bash でいうところの eval に相当するもので文字列をコマンドとして評価、実行するものです。これは [Invoke-Expression の使用を避ける - PowerShell | Microsoft Learn](https://learn.microsoft.com/ja-jp/powershell/scripting/learn/deep-dives/avoid-using-invoke-expression)という記事もあるくらいで、特に理由がない限りは使わないほうがよさそうです。まあ遅いだろうしコードインジェクションのリスクもあると思うのでなるべくは避けたいですね。

System.Diagnostics.Process は、ざっくりいうと C#で書いてしまえということですね。今回は考えないでおきます。

ということで、 Start-Process を使うべきか呼び出し演算子を使うべきかという話になります。というところまで来て改めていろいろ調べてたんですが以下の Issue によくまとまっていました…。

- [Provide guidance as to when Start-Process is appropriate vs. direct / &-based invocation · Issue #6239 · MicrosoftDocs/PowerShell-Docs](https://github.com/MicrosoftDocs/PowerShell-Docs/issues/6239)

詳細は Issue を見てもらうとして以下ではざっくりとした概要をまとめておきます。

## CLI は呼び出し演算子（&）がよさそう

Start-Process と呼び出し演算子の大きな違いは実行プロセスで、Start-Process は新しいプロセスを（デフォルトでは）非同期に起動します。こうすると、たとえば標準出力や終了コードの取得が面倒になります。とくにコンソールアプリを呼び出す場合、非同期よりむしろ同期的に逐次処理したいことがほとんどだと思います。また、標準出力や終了コードが容易に取得できるほうが便利です。こういった場合は呼び出し演算子の方がむいてます。

たとえば、以下を実行すると `$version{:powershell}` には標準出力が入り、また終了コードは `$LASTEXITCODE{:powershell}` に入ります。

```powershell
$git = "git.exe"
$email = & $git config user.email
```

一応 Start-Process でも `-Wait`オプションで同期実行にしたり`-PassThru{:powershell}`で[System.Diagnostics.Process](https://learn.microsoft.com/ja-jp/dotnet/api/system.diagnostics.process)を取ったりはできます。

```powershell
$git = "git.exe"
$process = Start-Process -FilePath $git -ArgumentList @("config", "user.email") -Wait -PassThru
```

この場合終了コードは`$process.ExitCode{:powershell}`で取れます。とはいえ呼び出し演算子の方が簡単に書けるので、とくに理由がなければ Start-Process 使う必要はなさそうです。

## 呼び出し演算子の引数

少し話がそれるんですが、呼び出し演算子を使用する場合に混乱したのが引数の渡し方です。たとえば、以下はエラーになります。

```powershell
$email = & "git.exe" "config user.email"
# git: 'config user.email' is not a git command. See 'git --help'.

$email = & "git.exe config user.email"
# &: The term 'git.exe config user.email' is not recognized as a name of a cmdlet, function, script file, or executable program.
#Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
```

引数を可変にしたいときなんかは不便だなあと思ったりしていました。Invoke-Expression であれば後者の文字列は実行できるので使うのも 1 つの手かなとも思っていたのですが、どうやら呼び出し演算子でも Start-Process の `-ArgumentList{:powershell}` と同様に、引数を文字列の配列で渡せるみたいです。

```powershell
$email = & "git.exe" @("config", "user.email")
```

これってどこかのドキュメントに書いてあるんですかね…ちょっと見つけられませんでした。

## GUI の場合は Start-Process でもよさそう

GUI の場合呼び出し演算子を使用すると（Windows の場合は）非同期呼び出しになります。なので同期呼び出ししたい場合は Start-Process で `-Wait{:powershell}` を指定するのがよさそうです。

```powershell
Start-Process -FilePath "notepad.exe" -Wait
```

ちなみにこの辺の動作は Unix（-like）と Windows で異なることがあるようなので注意です…ややこしい。

## 参考

- [Powershell executable isn't outputting to STDOUT - Stack Overflow](https://stackoverflow.com/questions/51333183/powershell-executable-isnt-outputting-to-stdout/51334633#51334633)
