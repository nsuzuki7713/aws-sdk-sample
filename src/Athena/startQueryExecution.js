const AWS = require('aws-sdk');
const athena = new AWS.Athena({apiVersion: '2017-05-18', region: 'ap-northeast-1'});

const params = {
  QueryString: 'select * from sampledb.pokemon_go where name is not null limit 2;',
  ResultConfiguration: {
    OutputLocation: 's3://query-results-bucket-test-suzuki/api/'
  }
};

// クエリを実行する。返り値として、クエリの実行IDが戻ってくる
// { QueryExecutionId: 'c60cddbd-14a0-4b7f-a235-9ca994ad6f02' }
athena.startQueryExecution(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});