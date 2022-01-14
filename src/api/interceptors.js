import log from '@/utils/log';

export default function addIntercepts(http, store, router, Notify) {
  http.interceptors.request.use((config) => {
    const c = config;
    const { token } = store.state.user;
    if (token) {
      c.headers.Authorization = `Bearer ${token}`;
    }
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
        log.d(`[interceptors] - ${err.response}`);
        const status = err?.status;
        const msg = err?.response?.data?.errorMsg;
        if (status === 401 || status === 403) {
          Notify.create(msg ?? '请先登录');
          router.push({ path: '/login' });
          return;
        }
      } else if (err.request) {
        log.d(err);
      } else {
        log.d(err);
      }
      Notify.create('请求失败');
    }
  );
}
