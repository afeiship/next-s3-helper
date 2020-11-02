const rxjs = require('rxjs');
const rxop = require('rxjs/operators');

const config = {
  signatureVersion: 'v4',
  region: 'cn-north-1',
  endpoint: 'https://s3.cn-north-1.amazonaws.com.cn',
  accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
  secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
};

const s3 = new AWS.S3(config);

const list$ = rxjs.from(
  s3
    .listObjects({
      Bucket: 'course-assets.saybot.net',
      Prefix: 'courseware-preview'
    })
    .promise()
);

const create_del$ = (v) =>
  rxjs.from(
    s3
      .deleteObjects({
        Bucket: 'course-assets.saybot.net',
        Delete: {
          Objects: v,
          Quiet: false
        }
      })
      .promise()
  );

const op_list$ = (obs) => {
  return obs.pipe(
    rxop.map((v) => v.Contents),
    rxop.map((v) => v.map((item) => ({ Key: item.Key })))
  );
};

list$.pipe(op_list$, rxop.map(create_del$), rxop.mergeAll()).subscribe({
  next: (res) => {
    console.log(res);
  },
  error: (err) => {
    console.log('[err]:', err);
  }
});
