const AWS = require('aws-sdk');
const athena = new AWS.Athena({apiVersion: '2017-05-18', region: 'ap-northeast-1'});

const params = {
  QueryExecutionId: 'c60cddbd-14a0-4b7f-a235-9ca994ad6f02',
  // MaxResults: 1,
  // NextToken: 'AUUjk3GaZPCZPzoCjavag80vKZOjFwOc0CzXH48Kby+x1RcCro/PfUNtiHCPL1MIdL+fYEWT/56R0lMh28rDEHBICarUjfr/ng=='
};

// クエリの実行結果が返ってくる
athena.getQueryResults(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log(data);
    for (let i = 0; i < data.ResultSet.Rows.length; i++) {
      console.log(data.ResultSet.Rows[i]);
    }
  }
});