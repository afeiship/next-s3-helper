(function () {
  var nx = require('@feizheng/next-js-core2');
  var NxS3Helper = require('../src/next-s3-helper');

  var options = {
    signatureVersion: 'v4',
    region: 'cn-north-1',
    endpoint: 'https://s3.cn-north-1.amazonaws.com.cn',
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
  };

  var s3helper = new NxS3Helper(options);

  describe('NxS3Helper.methods', function () {
    test('api-puts', function (done) {
      s3helper
        .puts(['./dist/**'], {
          ACL: 'public-read',
          Bucket: 'course-assets.saybot.net',
          context: {
            local: 'dist',
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
