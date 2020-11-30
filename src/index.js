(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');

  var nxPathParse = require('@jswork/next-path-parse');
  var AWS = require('aws-sdk');
  var globby = require('globby');
  var mime = require('mime');
  var fs = require('fs');
  var path = require('path');

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObjects-property

  var NxS3Helper = nx.declare('nx.S3Helper', {
    methods: {
      init: function (inOptions) {
        this.s3 = new AWS.S3(inOptions);
      },
      list: function (inOptions) {
        return this.s3.listObjects(inOptions).promise();
      },
      dels: function (inOptions) {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.s3
            .listObjects({
              Bucket: inOptions.Bucket,
              Prefix: inOptions.Prefix
            })
            .promise()
            .then(function (res) {
              delete inOptions.Prefix;

              var list = res.Contents.map(function (item) {
                return { Key: item.Key };
              });
              if (!list.length) return resolve(res);
              var params = nx.mix({ Delete: { Objects: list, Quiet: true } }, inOptions);
              return self.s3.deleteObjects(params).promise().then(resolve).catch(reject);
            })
            .catch(reject);
        });
      },
      puts: function (inPatterns, inOptions) {
        var self = this;
        var files = globby.sync(inPatterns, nx.mix({ absolute: true }, inOptions.globby));
        var promises = files.map(function (filename) {
          var parsed = nxPathParse(filename, {
            cwd: process.cwd(),
            context: inOptions.context.local
          });
          return self.s3
            .putObject({
              ACL: inOptions.ACL || 'public-read',
              Bucket: inOptions.Bucket,
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
