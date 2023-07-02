---
slug: powershell-templating-system
title: PowerShellでテンプレートから日報を半自動生成したい
publishedDate: 2023-07-02
featuredImage: "./marc-rentschler-F1rES0sVuIw-unsplash.jpg"
featuredImageAlt: "夜のシェルガソリンスタンドのローアングル写真"
featuredImageCreditText: "Marc Rentschler"
featuredImageCreditLink: "https://unsplash.com/ja/%E5%86%99%E7%9C%9F/F1rES0sVuIw"
tags:
  - PowerShell
---

日報のような類のものを書くのが苦手です。どうしても雑になります。これまで何度も書き損じてきました。しかしながら、私は善良なサラリーマンなので日報をやめることはできません。困りました。なので日報のテンプレートを作成して半自動生成したいと思います。

## 何でつくる

ここでは、OS は Windows で Outlook を使用して日報（メール）を送信することを想定します。

どうせ作るならなるべく他の人も簡単に使ってもらえるものが良いです。別途環境構築が必要なものは避けることにします。考えられる選択肢としては、Outlook のテンプレートや VBA などいろいろあるのですが、ここでは 個人の趣味で Windows 標準搭載の PowerShell を使おうと思います。

PowerShell ってあまり使う機会がなかったのですがなかなか便利です。特に今回のような用途では COM やら簡単に呼び出せるのが良いです。コマンドレットが長いのでシェルとしてはちょっと扱いづらい気もするのですが、.NET のスクリプト言語と考えると良いです。また、最近の PowerShell（正確には PowerShell Core） はクロスプラットフォームに対応しているので Mac や Linux でも動きます。もしかしたら、シェルスクリプト書くなら bash や zsh を使うより PowerShell の方が便利なのかもしれないですね。

## EPS

テンプレートからメールを作成したいのでいい感じにテンプレート処理できるものを探します。

ぜんぜん知らなかったのですが、PowerShell には[PowerShell Gallery](https://www.powershellgallery.com/)という公式のパッケージリポジトリがあって、そこでいろいろなパッケージを探すことができます。見たところ[EPS (Embedded PowerShell)](https://www.powershellgallery.com/packages/EPS)というのが良さそうだったのでこれを使うことにします。この EPS ですが[eRuby](https://ja.wikipedia.org/wiki/ERuby)と同様な書き方ができるようで、たとえば `<%= ... %>{:txt}` のような形で変数を埋め込むことができます。

インストールは以下を実行するだけです。

```powershell
Install-Module -Name EPS
```

管理者権限がない場合は `-Scope CurrentUser{:powershell}` を指定すればインストール可能です。

## テンプレートを作る

テンプレートを作ります。今回はてきとうに以下のようなテンプレートを作成しました。

- 件名のテンプレート

```txt
<%# Subject.txt -%>
日報（<%= (Get-Date -f yyyy/MM/dd) %>） <%= $Name %>
```

- 本文のテンプレート

```txt
<%# Body.txt -%>
<%= $Name %> です。<%= (Get-Date -f yyyy/MM/dd) %>の日報を提出いたします。

業務内容：
-

明日の予定：
-

```

ちなみに `<%# ... -%>{:txt}` はコメントになります。EPS の README には、テンプレートファイルとして `.eps` という拡張子が使われるているのですが、混乱するのでここでは `.txt` にしています。

## テンプレートからメールを作成する

最後にテンプレートからメールを作成します。テンプレートを `Invoke-EpsTemplate{:powershell}` で処理して、`Outlook.Application{:powershell}` でメールを作成します。

```powershell
Import-Module EPS

$Name = "zzzkan"
$To = "hoge@example.com"
$CC = "fuga@example.com"
$Subject = Invoke-EpsTemplate -Path .\Subject.txt
$Body = Invoke-EpsTemplate -Path .\Body.txt

$Outlook = New-Object -ComObject Outlook.Application
$Mail = $Outlook.CreateItem(0)
$Mail.To = $To
$Mail.CC = $CC
$Mail.Subject = $Subject
$Mail.Body = $Body
$Inspector = $Mail.GetInspector
$Inspector.Display()
```

もっと作りこむなら、カレンダーから休みを取得したりして内容を変えたりできると面白そうです。

## 参考

- [認証プロキシ・管理者権限無しで Powershell モジュールをインストールする | Finance & Journey](https://f-journey.com/it/install-module-from-psgallery-behind-authentication-proxy-without-administrator-privileges/)
