const getToken = () => window.localStorage.getItem('token');
const keepToken = (token) => window.localStorage.setItem('token', token);

export default {
  getToken,
  keepToken,
};
