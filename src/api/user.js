import http from './http';

export default {
  list(pagination) {
    return http.get('/api/user', { params: pagination });
  },
  me() {
    return http.get('/api/user/me');
  },
  create(username, password) {
    return http.post('/api/user', { username, password });
  },
  login(username, password) {
    return http.post('/api/token', { username, password });
  },
  logout() {
    return http.post('/api/user/logout');
  },
};
