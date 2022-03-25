import http from './http';

export default {
  list(pagination) {
    return http.get('/api/artist', { params: pagination });
  },
  create(data) {
    return http.post('/api/artist', data);
  },
  update(id, data) {
    return http.put(`/api/artist/${id}`, data);
  },
  publish(id) {
    return http.post(`/api/artist/publish/${id}`);
  },
  block(id) {
    return http.post(`/api/artist/block/${id}`);
  },
};
