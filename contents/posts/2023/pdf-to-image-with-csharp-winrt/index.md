---
slug: pdf-to-image-with-csharp-winrt
title: C#/WinRTでPDFを画像に変換する
publishedDate: 2023-02-12
featuredImage: ./thumbnail.png
tags:
  - C Sharp
  - Windows
  - WinRT
---

C#で PDF を画像に変換したいです。

検索すると[Aspose.PDF for .NET API](https://products.aspose.com/pdf/net/)などの有償のパッケージは結構見つかるのですができることならお金をかけたくないです。著名なところでは[Ghostscript](https://www.ghostscript.com/)を使う方法もありますが、無償版のライセンスは AGPL でちょっと手が出しづらいこともあります。

でいろいろ調べていたのです最近の Windows に含まれてる WinRT には PDF を画像へ変換する API があってこれを使うことができるみたいです（当然動作する環境は Windows 限定になりますが）。

## WinRT とは

Windows Runtime（WinRT）は Windows 8 から実装されている比較的新しい API のことです。昔ながらの API と比較して P/Invoke やら COM 相互運用みたいな面倒なことを考えずに済むみたいです。

使用できるようにするには.NET プロジェクトを変更する必要があって.NET 6 以降かどうかで設定方法が異なります。雑に書くとそれぞれ以下の設定をします。

- .NET 6 以降：ターゲットフレームワークモニカー（TFM）にターゲットとする Windows バージョンを明示する。
- .NET 6 より前：Microsoft.Windows.SDK.Contracts をインストールする。

詳細は以下などを参考にしてください。

[デスクトップ アプリで Windows ランタイム API を呼び出す - Windows apps | Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/apps/desktop/modernize/desktop-to-uwp-enhance)

## Windows.Data.Pdf

PDF から画像への変換は[Windows.Data.Pdf](https://learn.microsoft.com/ja-jp/uwp/api/windows.data.pdf)にあります。これを使って PDF を画像に変換するメソッドはたとえば以下のようになります。

```cs
using Windows.Storage;
using Windows.Data.Pdf;

public static async Task ConvertPdfToImage(string pdfFilePath, string imageFolderPath)
{
    var pdfStorageFile = await StorageFile.GetFileFromPathAsync(pdfFilePath);
    var pdfDocument = await PdfDocument.LoadFromFileAsync(pdfStorageFile);
    var imageFolder = await StorageFolder.GetFolderFromPathAsync(imageFolderPath);
    var imageFileNamePrefix = Path.GetFileNameWithoutExtension(pdfFilePath);
    for (var i = 0u; i < pdfDocument.PageCount; i++)
    {
        var imageFileName = $"{imageFileNamePrefix}-page-{i + 1}.png";
        var imageStorageFile = await imageFolder.CreateFileAsync(imageFileName, CreationCollisionOption.ReplaceExisting);
        using var outputStream = await imageStorageFile.OpenAsync(FileAccessMode.ReadWrite);
        using var pdfPage = pdfDocument.GetPage(i);
        await pdfPage.RenderToStreamAsync(outputStream);
    }
}
```

ここでは PDF の各ページ毎に画像を生成しています。結構簡単ですね。

## 参考

- [Windows ランタイム - Wikipedia](https://ja.wikipedia.org/wiki/Windows%E3%83%A9%E3%83%B3%E3%82%BF%E3%82%A4%E3%83%A0)
- [[C#/WinRT] 外部ライブラリを使用せずに PDF ファイルを画像化して WinForms(または WPF)で表示する - Qiita](https://qiita.com/kenichiuda/items/6617c25da6580eef85d1)
