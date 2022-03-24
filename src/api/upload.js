import store from '@/store';
import log from '@/utils/log';
import COS from 'cos-js-sdk-v5';
import http from './http';

const sTAG = '[uploadApi]';

function initUpload(info) {
  return http.post('/api/upload/init', info);
}
function finishUpload(id) {
  return http.post(`/api/upload/finish/${id}`);
}

function abortUpload(taskInfo) {
  const { id, os } = taskInfo;
  os.cancelTask(id);
  log.d(sTAG, os, `(0) cancel task => ${id}`);
}

export default {
  initUpload,
  finishUpload,
  abortUpload,
  async upload(file, onStart, onProgress, onFinished) {
    const fileInfo = {
      name: file.name.substring(0, file.name.lastIndexOf('.')),
      size: file.size,
      // eslint-disable-next-line no-underscore-dangle
      key: file.__key,
      ext: file.name.substring(file.name.lastIndexOf('.') + 1),
    };
    const credentials = (await initUpload(fileInfo))?.data;
    log.d(sTAG, '① init => ', credentials);
    if (!credentials) {
      return null;
    }
    return new Promise((resolve) => {
      const cos = new COS({
        getAuthorization: (options, callback) => {
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            SecurityToken: credentials.sessionToken,
            // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            StartTime: credentials.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: credentials.expiredTime, // 时间戳，单位秒，如：1580000000
            ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
          });
        },
      });

      log.d(sTAG, '② bucket/region = ', store);

      const bucket = store.getters['setting/bucket'];
      const region = store.getters['setting/region'];

      log.d(sTAG, '② bucket/region = ', bucket, region);
      cos.uploadFile(
        {
          Bucket: bucket,
          Region: region,
          Key: credentials.key,
          Body: file,
          SliceSize: 1024 * 1024 * 10,
          onTaskReady(id) {
            log.d(sTAG, '③ taskId = ', id);
            onStart({ os: cos, id });
          },
          onProgress,
          onFileFinish: async () => {
            const resp = await finishUpload(credentials.fileId);
            log.d(sTAG, '④ finish = ', resp);
            onFinished(resp?.data);
            resolve(0);
          },
        },
        (err, data) => {
          log.d(sTAG, '⑤ error =>', err, data);
          resolve(-1);
        }
      );
    });
  },
};
