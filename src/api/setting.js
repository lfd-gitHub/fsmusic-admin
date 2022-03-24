import http from './http';

export default {
  site() {
    return http.get('/api/setting/site');
  },
};
