const getToken = () => window.localStorage.getItem('token');
const keepToken = (token) => window.localStorage.setItem('token', token);
const getMe = () => {
  const sUser = window.localStorage.getItem('me');
  if (sUser) {
    return JSON.parse(sUser);
  }
  return null;
};
const keepMe = (me) => window.localStorage.setItem('me', JSON.stringify(me));

export default {
  getToken,
  keepToken,
  getMe,
  keepMe,
};
