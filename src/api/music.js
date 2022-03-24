import http from './http';

export default {
  list(pagination) {
    return http.get('/api/music', { params: pagination });
  },
  create(data) {
    return http.post('/api/music', data);
  },
  update(id, data) {
    return http.put(`/api/music/${id}`, data);
  },
  publish(id) {
    return http.post(`/api/music/publish/${id}`);
  },
  close(id) {
    return http.post(`/api/music/close/${id}`);
  },
};
