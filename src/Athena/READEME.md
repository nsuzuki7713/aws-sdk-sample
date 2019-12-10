- Athena apiのドキュメント
  https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Athena.html
- AWS LambdaでAthenaを呼び出す
  https://qiita.com/naoto_koyama/items/6bfc6e67260e761fd1b4
- code sample
  https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-athena-index.js.html


テーブルの作成
```
CREATE EXTERNAL TABLE IF NOT EXISTS pokemon_go (
         name string,
         cp int,
         hp int,
         favorite boolean,
         weight float,
         height float,
         attributes array< string >,
         skill1 struct < name:string,
         attribute:string >,
         skill2 struct < name:string,
         attribute:string > 
) 
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe' LOCATION 's3://athena-test-7010/'
```

- Amazon Athenaを使ってJSONファイルを検索してみる
  https://dev.classmethod.jp/cloud/aws/athena-json/