import userApi from '@/api/user';
import cache from '@/store/cache';
import log from '@/utils/log';

const state = {
  token: cache.getToken(),
  me: null,
};

const getters = {
  nicknameFirstWord: (st) => st.me?.nickname?.slice(0, 1) ?? '',
};
const actions = {
  async fetchUser({ commit }) {
    const resp = await userApi.me();
    const user = resp?.data;
    if (user) {
      cache.keepMe(user);
      commit('SET_ME', user);
    }
    return user;
  },
  async login({ commit }, { username, password }) {
    const resp = await userApi.login(username, password);
    if (resp?.data != null) {
      const token = resp.data;
      log.d(token);
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
    cache.keepMe(null);
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
  SET_ME: (st, payload) => {
    st.me = payload;
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
