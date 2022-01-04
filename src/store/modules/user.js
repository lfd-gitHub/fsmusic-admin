import userApi from '@/api/user';
import cache from '@/store/cache';

const state = {
  nickname: '',
  token: cache.getToken(),
  username: '',
  roles: [],
};

const getters = {};
const actions = {
  async login({ commit }, { username, password }) {
    const resp = await userApi.login(username, password);
    if (resp?.data != null) {
      const token = resp.data;
      cache.keepToken(token);
      commit('SET_TOKEN', resp.data);
    }
    return resp?.data;
  },
};
const mutations = {
  SET_TOKEN: (st, payload) => {
    st.token = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
