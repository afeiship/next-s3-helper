# next-s3-helper
> Aws s3 helper for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @feizheng/next-s3-helper
```

## apis
| api  | params | description        |
| ---- | ------ | ------------------ |
| puts | -      | s3 put objects.    |
| dels | -      | s3 delete objects. |
| list | -      | s3 list objects.   |

## usage
```js
import NxS3Helper from '@feizheng/next-s3-helper';

const options = {
  signatureVersion: 'v4',
  region: 'cn-north-1',
  endpoint: 'https://s3.cn-north-1.amazonaws.com.cn',
  accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
  secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY']
};

const s3helper = new NxS3Helper(options);


// puts
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
  });

// dels
s3helper
  .dels({
    Bucket: 'course-assets.saybot.net',
    Prefix: 'courseware-preview'
  }).then(res=>{
    console.log(res);
  })
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-s3-helper/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/next-s3-helper
[version-url]: https://npmjs.org/package/@feizheng/next-s3-helper

[license-image]: https://img.shields.io/npm/l/@feizheng/next-s3-helper
[license-url]: https://github.com/afeiship/next-s3-helper/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/next-s3-helper
[size-url]: https://github.com/afeiship/next-s3-helper/blob/master/dist/next-s3-helper.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/next-s3-helper
[download-url]: https://www.npmjs.com/package/@feizheng/next-s3-helper
