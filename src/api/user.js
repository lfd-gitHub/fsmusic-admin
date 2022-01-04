import http from './http';

export default {
  login(username, password) {
    return http.post('/api/user/login', { username, password });
  },
};
