(function () {
  const NxS3Helper = require('../src');
  const options = {
    signatureVersion: 'v4',
    region: 'cn-north-1',
    endpoint: 'https://s3.cn-north-1.amazonaws.com.cn',
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
  };

  const s3helper = new NxS3Helper(options);

  describe('NxS3Helper.methods', function () {
    test('api-puts', function (done) {
      s3helper
        .puts(['./__tests__/build/**'], {
          ACL: 'public-read',
          Bucket: 'course-assets.saybot.net',
          context: {
            local: './__tests__/build',
            remote: 'courseware-preview'
          }
        })
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });

    test('api-dels', (done) => {
      s3helper
        .dels({
          Bucket: 'course-assets.saybot.net',
          Prefix: 'courseware-preview'
        })
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
  });

})();
