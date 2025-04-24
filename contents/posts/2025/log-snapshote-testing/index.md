---
slug: log-snapshote-testing
title: VerifyTestsでログに対してスナップショットテストする
publishedDate: 2025-04-25
tags
  - C#
  - .NET
  - Snapshot Testing
  - VerifyTests
---

## ログに対するスナップショットテスト

一般にテストというと、何らかの処理を行いその結果得られる出力が期待通りであるか検証することを指すと思います。ただ、出力がまともに検証できる状態になっていないことがあります。いろいろなものが密結合していてテストもない（テストが書けない）古のコードとか。

こういう時のセーフティーネットととして、出力が得られる過程つまりログに対して、スナップショットテストできたらいいじゃないという話です。ちなみに、こういう類のテストは **Characterization Testing** とか **Golden Master Testing** と呼ばれてるみたいです。

（[レガシーコード改善ガイド](https://www.amazon.co.jp/%E3%83%AC%E3%82%AC%E3%82%B7%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89%E6%94%B9%E5%96%84%E3%82%AC%E3%82%A4%E3%83%89-Object-Oriented-SELECTION-%E3%83%9E%E3%82%A4%E3%82%B1%E3%83%AB%E3%83%BBC%E3%83%BB%E3%83%95%E3%82%A7%E3%82%B6%E3%83%BC%E3%82%BA/dp/4798116831)に出てくるらしい…積んであるから読まないと…）

## VerifyTests

スナップショットテスト行うためのライブラリとして、ここでは [VerifyTests/Verify](https://github.com/VerifyTests/Verify) を使用します。このライブラリ結構よく使われていて、たとえば [dotnet/BenchmarkDotNet](https://github.com/dotnet/BenchmarkDotNet/blob/f4bfcd67b4ed44996c67785bbc5a1340db6f88ca/docs/articles/contributing/running-tests.md#verify-tests) のテストにも採用されていたりします。後いつの間にか Powered by JetBrains になってる。

以前記事を書いたこともあるので興味があれば以下もどうぞ。

[C#でスナップショットテストがしたい（VerifyTests/Verify） - zzzkan.me](/blog/verify-tests/)

## 日付や時刻の処理がポイント

お目当ての処理をした結果以下のようなログがファイルとして得られたとします。

```log
2025-04-24 22:31:00,000 [1] DEBUG MyApp.MyClass - DoSomething method was called. Argument: 5
2025-04-24 22:31:10,000 [1] WARN MyApp.MyClass - The value 5 is less than or equal to 10.
2025-04-24 22:31:20,100 [1] DEBUG MyApp.MyClass - DoSomething method was called. Argument: 15
2025-04-24 22:32:00,300 [1] INFO MyApp.MyClass - The value 15 is greater than 10.
2025-04-24 22:32:40,700 [1] DEBUG MyApp.MyClass - Calculation result: 20
```

当然ではあるんですが、ログには日付や時刻が含まれています。これは実行毎に変化するので、ログファイルに対してそのままスナップショットテストを実行すると、常に失敗します。スレッド ID なども含んでいても同様です。

なので、こういった**実行の度に変化する要素はスナップショットテストの対象から除外したい**です。VerifyTests では、こういった処理を簡単にできるよう [Scrubbers](https://github.com/VerifyTests/Verify/blob/main/docs/scrubbers.md) というものが用意されています。

たとえば、日付や時刻をスナップショットから除外するには以下のようにします。

```cs
var path = GetLogFilePath();
return VerifyFile(path).ScrubInlineDateTimes("yyyy-MM-dd HH:mm:ss,fff");
```

するとスナップショットは以下のようになります。

```log
DateTime_1 [1] DEBUG MyApp.MyClass - DoSomething method was called. Argument: 5
DateTime_2 [1] WARN MyApp.MyClass - The value 5 is less than or equal to 10.
DateTime_3 [1] DEBUG MyApp.MyClass - DoSomething method was called. Argument: 15
DateTime_4 [1] INFO MyApp.MyClass - The value 15 is greater than 10.
DateTime_5 [1] DEBUG MyApp.MyClass - Calculation result: 20
```

日付と時刻が `DateTime_1` などに置き換わっていますね。さらに、スレッド ID も除外したい場合はたとえば以下のようにします。

```cs
var path = Path.Combine(CurrentFile.Directory(), "./test.log");
return VerifyFile(path)
    .ScrubInlineDateTimes("yyyy-MM-dd HH:mm:ss,fff")
    .ScrubLinesWithReplace(line => Regex.Replace(line, @"\[\d+\]", "[ThreadId]"));
```

するとスナップショットは以下のようになります。

```log
DateTime_1 [ThreadId] DEBUG MyApp.MyClass - DoSomething method was called. Argument: 5
DateTime_2 [ThreadId] WARN MyApp.MyClass - The value 5 is less than or equal to 10.
DateTime_3 [ThreadId] DEBUG MyApp.MyClass - DoSomething method was called. Argument: 15
DateTime_4 [ThreadId] INFO MyApp.MyClass - The value 15 is greater than 10.
DateTime_5 [ThreadId] DEBUG MyApp.MyClass - Calculation result: 20
```

これでスナップショットから実行タイミングに依存する要素を排除できました。簡単！このスナップショットを基にすることで、ログファイルの内純粋な操作ログに対してのみスナップショットテストが実行できるようになりました。

VerifyTests めちゃくちゃ便利です。

## 参考

- [スナップショットテストの向き不向きについて考えてみる - mizdra's blog](https://www.mizdra.net/entry/2021/02/04/003728)
