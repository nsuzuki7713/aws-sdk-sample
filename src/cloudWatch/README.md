# cloudwatchについていろいろ

## ロググループとログストリームの作成

下記サイトを参考にcloudformationでロググループとログストリームを構築

http://blog.serverworks.co.jp/tech/2019/11/29/post-76523/

## ログストリームにログを送信

こちらのサイトを参考にした

https://michimani.net/post/use-cloudwatch-via-aws-cli/#cloudwatch-logs-%e3%81%ae%e6%a7%8b%e6%88%90%e8%a6%81%e7%b4%a0

ログの送信はロググループとログストリームを指定する必要がある。

方法としてShorthand SyntaxとJSON Syntaxがある。

### Shorthand Syntax

ワンラインでタイムスタンプとメッセージを指定する方法

2回目以降はその一つ前に送信した際に返ってきたsequenceTokenを--sequence-token オプションで指定する必要がある

```
$ aws logs put-log-events \
--log-group-name LearningLogG \
--log-stream-name LearningLogS \
--log-events timestamp=1579096423000,message="Hello CloudWatch Logs" \
--sequence-token 49599905847494815968440472464551125366243568252283310978
```

### JSON Syntax

JSON 形式で指定する方法です。この方法だと、複数のログイベントを一度に送信することができます。

```
$ aws logs put-log-events \
--log-group-name LearningLogG \
--log-stream-name LearningLogS \
--log-events file://events.json \
--sequence-token 49599905847494815968440579934810523281120572972717888386
```

ログイベントの形式をjsonにする場合はmessageをjson文字列する

```
$ aws logs put-log-events \
--log-group-name LearningLogG \
--log-stream-name LearningLogS \
--log-events file://events2.json \
--sequence-token 49599905847494815968440580082567854806059791989564560258
```

### nextSequenceTokenの取得

`aws logs describe-log-streams --log-group-name "LearningLogG"`

## cloudwatch Insights

[公式ドキュメントのクエリ構文を参考](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)

ログの形式は下記

```
{
  method:"POST",
  id:101,
  device:"macos",
  browser:"chrome"
}
```

### クエリーの色々

- 昇順で上位20件のログを取得。表示する項目はfieldsに指定しているもの

```
fields @timestamp, id, device, browser, method
| sort @timestamp asc
| limit 20
```

- displayコマンドの項目に指定したもののみを表示する

```
fields @timestamp, id, device, browser, method
| sort @timestamp asc
| limit 20
| display id
```

- filterコマンドには抽出条件を記載することができる

```
fields @timestamp, id, device, browser, method
| filter id = 101 and method = "GET"
| sort @timestamp asc
| limit 20
```

- statsは統計演算子を記載できる

```
stats count(*) as count
| filter id = 101 and method = "GET"
```

- statusはbyの後にグルーピングできる

```
fields id, device, method
# idが存在している場合にtrueを返す
| filter ispresent(id)
# asはエイリアス名を付ける
| stats count(*) as count1 by id, device, method
| sort id
```

- parseコマンドを使用すると、皇族化されていない値も取得できる

`Hello CloudWatch Logs3` のような形式のログがある場合、parseコマンドを使うことで`Hello CloudWatch` 以降を抜き出すことが可能

```
fields @message
| parse @message "Hello CloudWatch *" as log
| filter log = "Logs3"
| limit 10
```