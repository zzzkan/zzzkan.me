---
slug: powershell-import-failed
title: ドキュメントをOneDriveでバックアップしているとPowerShellでImport-Moduleに失敗した
publishedDate: 2023-07-05
featuredImage: "./jossuha-theophile-BKOLt3_oIZU-unsplash.jpg"
featuredImageAlt: "ブラウンシェルの写真"
featuredImageCreditText: "Jossuha Théophile"
featuredImageCreditLink: "https://unsplash.com/ja/%E5%86%99%E7%9C%9F/BKOLt3_oIZU"
tags:
  - PowerShell
---

PowerShell 5.1（Windows 10 等で標準搭載の PowerShell）でインストールしたモジュールをインポートできないことがありました。まさかの OneDrive が絡んできてちょっとびっくりという話です。

## 何をしようとした？

PowerShellGet は通常モジュールをインストールするとき管理者権限が必要となりますが、以下のように `-Scope CurrentUser` を指定することでユーザー権限によるインストールができます。

```powershell
Install-Module -Name EPS -Scope CurrentUser
```

インストールしたモジュールは以下のようにしてインポートして使用します。

```powershell
Import-Module EPS
```

このとき私の環境（PowerShell 5.1）では、FileNotFoundException となってインポートに失敗してしまっていました。

```txt
Import-Module : モジュール ディレクトリに有効なモジュール ファイルが見つからなかったため、指定されたモジュール 'EPS' は
読み込まれませんでした。
発生場所 行:1 文字:1
+ Import-Module EPS
+ ~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ResourceUnavailable: (EPS:String) [Import-Module], FileNotFoundException
    + FullyQualifiedErrorId : Modules_ModuleNotFound,Microsoft.PowerShell.Commands.ImportModuleCommand
```

## インストールされているか確認

モジュールがインストールできているか確認してみます。

```powershell
Get-InstalledModule
```

ここではインストールしたモジュールが表示されていたので、インストール自体はうまくできていそうです。一方で以下ではモジュールが見つかりませんでした。

```powershell
Get-Module -ListAvailable
```

うーん。

## PSModulePath と OneDrive

モジュールのインストール先を確認します。[Install-Module のドキュメント](https://learn.microsoft.com/ja-jp/powershell/module/powershellget/install-module#5) によると、CurrentUser スコープのインストール先は通常 `$HOME\Documents\WindowsPowerShell\Modules{:txt}` になります。

ただ、これはあくまで"通常"のときだけで、実際には `$HOME\Documents\{:txt}` ではなく `[Environment]::GetFolderPath('MyDocuments'){:powershell}` が使われるようです。そして、このときパスが変わる原因の 1 つがドキュメントフォルダーを OneDrive でバックアップすることです。実際、私の環境では OneDrive でドキュメントフォルダーをバックアップしていたため、モジュールのインストール先が`C:\Users\user\OneDrive\ドキュメント\WindowsPowerShell\Modules{:txt}`になっていました。

さて、このとき PowerShell がモジュールを検索するパスを定義している環境変数 `$env:PSModulePath{:powershell}` の中身を確認したところ、見事に OneDrive のパスは含まれていませんでした（原因までは追えてない…）。インストール先と検索先が一致していないので、そりゃあ `Import-Module{:powershell}`も失敗しますね。

## 対策

1 つは、OneDrive のドキュメントフォルダーのバックアップを解除してモジュールを再インストールすればうまく動きそうです。

バックアップを解除したくない場合、`$env:PSModulePath{:powershell}`に OneDrive のパスを追加する必要があります。現在のセッションのみで良い場合は以下のようにするだけです。

```powershell
$Env:PSModulePath = $Env:PSModulePath+";C:\Users\user\OneDrive\ドキュメント\WindowsPowerShell\Modules"
```

ただ、すべてのセッションで変更を反映するにはレジストリを編集する必要があります。

```powershell
$key = (Get-Item 'HKCU:\').OpenSubKey('Environment', $true)
$path = $key.GetValue('PSModulePath','','DoNotExpandEnvironmentNames')
$path += ';C:\Users\user\OneDrive\ドキュメント\WindowsPowerShell\Modules'
$key.SetValue('PSModulePath',$path,[Microsoft.Win32.RegistryValueKind]::ExpandString)
```

ちなみに PowerShell 7 ではこの問題は発生しなかったです。PowerShell 7 起動時は`$env:PSModulePath{:powershell}`に Core モジュール向けの OneDrive パスが含まれていました。なので、PowerShell 7 に移行するのも 1 つの手なのかもしれないです。

## 参考

- [PSModulePath について - PowerShell | Microsoft Learn](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.powershell.core/about/about_psmodulepath)
- [Windows PowerShell 5.1 から PowerShell 7 への移行 - PowerShell | Microsoft Learn](https://learn.microsoft.com/ja-jp/powershell/scripting/whats-new/migrating-from-windows-powershell-51-to-powershell-7)
- [ドキュメント フォルダを OneDrive にバックアップしていると PowerShell Core 6 の Get-InstalledModule が機能しない件 - 鷲ノ巣](https://tech.blog.aerie.jp/entry/2019/07/08/121955)
