import http from './http';

export default {
  list(pagination) {
    return http.get('/api/music', { params: pagination });
  },
  create(name, description) {
    return http.post('/api/music', { name, description });
  },
  publish(id) {
    return http.post(`/api/music/publish/${id}`);
  },
  close(id) {
    return http.post(`/api/music/close/${id}`);
  },
};
