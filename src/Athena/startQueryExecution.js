const AWS = require('aws-sdk');
const athena = new AWS.Athena({apiVersion: '2017-05-18', region: 'ap-northeast-1'});

const params = {
  QueryString: 'select * from sampledb.pokemon_go where name is not null limit 1;',
  ResultConfiguration: {
    OutputLocation: 's3://query-results-bucket-test-suzuki/api/'
  }
};

athena.startQueryExecution(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});