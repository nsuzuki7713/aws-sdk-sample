const AWS = require('aws-sdk');
const athena = new AWS.Athena({apiVersion: '2017-05-18', region: 'ap-northeast-1'});

const params = {
  QueryExecutionId: '47898a34-ad52-4918-a35a-08e111637fa0'
};

athena.getQueryExecution(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});