const AWS = require('aws-sdk');
const athena = new AWS.Athena({apiVersion: '2017-05-18', region: 'ap-northeast-1'});

const params = {
  QueryExecutionId: 'c60cddbd-14a0-4b7f-a235-9ca994ad6f02'
};

// クエリの実行状況が返ってくる
// {
//   QueryExecution: {
//     QueryExecutionId: 'c60cddbd-14a0-4b7f-a235-9ca994ad6f02',
//     Query: 'select * from sampledb.pokemon_go where name is not null limit 2',
//     StatementType: 'DML',
//     ResultConfiguration: {
//       OutputLocation: 's3://query-results-bucket-test-suzuki/api/c60cddbd-14a0-4b7f-a235-9ca994ad6f02.csv'
//     },
//     QueryExecutionContext: {},
//     Status: {
//       State: 'SUCCEEDED',
//       SubmissionDateTime: 2019-12-11T02:21:28.701Z,
//       CompletionDateTime: 2019-12-11T02:21:40.651Z
//     },
//     Statistics: {
//       EngineExecutionTimeInMillis: 1994,
//       DataScannedInBytes: 880,
//       TotalExecutionTimeInMillis: 11950,
//       QueryQueueTimeInMillis: 9930,
//       QueryPlanningTimeInMillis: 908,
//       ServiceProcessingTimeInMillis: 26
//     },
//     WorkGroup: 'primary'
//   }
// }
athena.getQueryExecution(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});