import http from './http';

export default {
  list(pagination) {
    return http.get('/api/user', { params: pagination });
  },
  login(username, password) {
    return http.post('/api/user/login', { username, password });
  },
  logout() {
    return http.post('/api/user/logout');
  },
};
