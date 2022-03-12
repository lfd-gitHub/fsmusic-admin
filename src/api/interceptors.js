import log from '@/utils/log';
import utils from '@/utils/utils';

export default function addIntercepts(http, store, router) {
  http.interceptors.request.use((config) => {
    const c = config;
    const { token } = store.state.user;
    if (token) {
      c.headers.Authorization = `Bearer ${token}`;
    }
    log.tag('req');
    log.d(config);
    log.tag('req');
    return c;
  });
  http.interceptors.response.use(
    (resp) => {
      log.tag('resp');
      log.d(resp);
      log.tag('resp');
      return resp?.data;
    },
    (err) => {
      if (err.response) {
        log.d(`[interceptors] -`, err);
        const status = err?.response?.status;
        const msg = err?.response?.data?.errorMsg;
        if (status === 401 || status === 403) {
          store.dispatch('user/logout');
          router.push({ path: '/login' });
        }
        utils.showErr(msg ?? '请先登录');
        return;
      }

      if (err.request) {
        log.d(err);
      } else {
        log.d(err);
      }

      utils.showErr('请求失败');
    }
  );
}
