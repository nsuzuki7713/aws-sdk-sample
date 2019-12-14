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

- Workgroup
  https://blog.santashack.dev/entry/2019/03/01/164405
  https://dev.classmethod.jp/cloud/aws/20190224-amazon-athena-workgroups/

## 用語集
### アドホック
特定の目的のための、その場限りの、取ってつけたような、などの意味を持つラテン語表現

### インタラクティブ
「対話」または「双方向」といった意味で、ユーザーがパソコンの画面を見ながら、対話をするような形式で操作する形態

### OLAP(OnLine Analytical Processing)
データベースに蓄積された大量のデータに対し複雑な集計、分析を行い、素早く結果を提示することができるシステム

### ETL  【 Extract/Transform/Load 】
データベースなどに蓄積されたデータから必要なものを抽出（Extract）し、目的に応じて変換（Transform）し、データを必要とするシステムに格納（Load）すること。

### スキーマ
物事や計画の概略や仕組み、構造、形式などを示したものを意味することが多い