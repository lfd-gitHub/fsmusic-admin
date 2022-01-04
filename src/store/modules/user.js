import userApi from '@/api/user';
import cache from '@/store/cache';
import log from '@/utils/log';

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
  async logout({ commit }) {
    log.d('logout - ');
    // const resp = await userApi.logout();
    // if (resp?.data?.code === 0) {
    cache.keepToken('');
    commit('REMOVE_TOKEN');
    // }
    // return resp?.data;
    return true;
  },
};
const mutations = {
  SET_TOKEN: (st, payload) => {
    st.token = payload;
  },
  REMOVE_TOKEN: (st) => {
    st.token = '';
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
