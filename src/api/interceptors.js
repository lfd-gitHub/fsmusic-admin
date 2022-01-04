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
      log.d(`[interceptors] - ${JSON.stringify(err)}`);
      const status = err?.status;
      if (status === 401 || status === 403) {
        Notify.create('请先登陆');
        router.push({ path: '/login' });
      }
      const msg = err?.response?.data?.data?.errMsg ?? '请求失败';
      Notify.create(`${msg}`);
    }
  );
}
