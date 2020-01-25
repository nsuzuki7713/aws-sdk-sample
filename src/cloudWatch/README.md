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