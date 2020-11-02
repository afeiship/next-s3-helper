/*!
 * name: @feizheng/next-s3-helper
 * description: Aws s3 helper for next.
 * url: https://github.com/afeiship/next-s3-helper
 * version: 1.0.0
 * date: 2020-03-28 12:58:30
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');

  var NxS3Helper = nx.declare('nx.S3Helper', {});

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxS3Helper;
  }
})();

//# sourceMappingURL=next-s3-helper.js.map
