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
    (resp) => resp?.data,
    (err) => {
      log.d(`[interceptors] - ${err.response.status}`);
      const status = err?.status;
      const msg = err?.response?.data?.errorMsg;
      if (status === 401 || status === 403) {
        Notify.create(msg ?? '请先登录');
        router.push({ path: '/login' });
        return;
      }
      Notify.create(`${msg ?? '请求失败'}`);
    }
  );
}
