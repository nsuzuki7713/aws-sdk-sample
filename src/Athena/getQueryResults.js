const AWS = require('aws-sdk');
const athena = new AWS.Athena({apiVersion: '2017-05-18', region: 'ap-northeast-1'});

const params = {
  QueryExecutionId: '47898a34-ad52-4918-a35a-08e111637fa0',
  // MaxResults: 1,
  // NextToken: 'AUUjk3GaZPCZPzoCjavag80vKZOjFwOc0CzXH48Kby+x1RcCro/PfUNtiHCPL1MIdL+fYEWT/56R0lMh28rDEHBICarUjfr/ng=='
};

athena.getQueryResults(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log(data);
    for (let i = 0; i < data.ResultSet.Rows.length; i++) {
      console.log(data.ResultSet.Rows[i]);
    }
  }
});