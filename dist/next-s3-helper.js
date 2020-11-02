/*!
 * name: @feizheng/next-s3-helper
 * description: Aws s3 helper for next.
 * homepage: https://github.com/afeiship/next-s3-helper
 * version: 1.0.0
 * date: 2020-11-02T09:43:36.017Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxPathParse = require('@feizheng/next-path-parse');
  var AWS = require('aws-sdk');
  var globby = require('globby');
  var mime = require('mime');
  var fs = require('fs');
  var path = require('path');

  var NxS3Helper = nx.declare('nx.S3Helper', {
    methods: {
      init: function (inOptions) {
        this.s3 = new AWS.S3(inOptions);
      },
      del: function () {},
      upload: function (inPatterns, inOptions) {
        var self = this;
        var files = globby.sync(inPatterns, nx.mix({ absolute: true }, inOptions.globby));
        var promises = files.map(function (filename) {
          var parsed = nxPathParse(filename, {
            cwd: process.cwd(),
            context: inOptions.context.local
          });
          return self.s3
            .putObject({
              ACL: inOptions.acl || 'public-read',
              Bucket: inOptions.bucket,
              Key: path.join(inOptions.context.remote, parsed.relative),
              Body: fs.readFileSync(parsed.full),
              ContentType: mime.getType(parsed.full)
            })
            .promise();
        });
        return Promise.all(promises);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxS3Helper;
  }
})();
