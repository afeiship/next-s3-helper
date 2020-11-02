(function () {
  var nx = require('@feizheng/next-js-core2');
  var NxS3Helper = require('../src/next-s3-helper');

  describe('NxS3Helper.methods', function () {
    test('init', function (done) {
      var options = {
        signatureVersion: 'v4',
        region: 'cn-north-1',
        endpoint: 'https://s3.cn-north-1.amazonaws.com.cn',
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
      };

      var s3helper = new NxS3Helper(options);

      s3helper
        .upload(['./src/**'], {
          acl: 'public-read',
          bucket: 'course-assets.saybot.net',
          context: {
            local: 'src',
            remote: 'courseware-preview'
          }
        })
        .then((res) => {
          console.log(res);
          done();
        });
    });
  });
})();
