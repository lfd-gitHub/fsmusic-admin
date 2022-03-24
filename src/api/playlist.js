import http from './http';

export default {
  list(pagination) {
    return http.get('/api/playlist', { params: pagination });
  },
  create(data) {
    return http.post('/api/playlist', data);
  },
  update(id, data) {
    return http.put(`/api/playlist/${id}`, data);
  },
  publish(id) {
    return http.post(`/api/playlist/publish/${id}`);
  },
  close(id) {
    return http.post(`/api/playlist/close/${id}`);
  },
};
