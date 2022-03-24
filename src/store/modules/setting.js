import settingApi from '@/api/setting';

const state = {
  site: {
    osBucket: null,
    osRegion: null,
  },
};

const getters = {
  bucket: (st) => st.site.osBucket,
  region: (st) => st.site.osRegion,
};

const actions = {
  async fetchSetting({ commit }) {
    const resp = await settingApi.site();
    const setting = resp?.data;
    if (setting) {
      commit('SET_SITE_SETTING', setting.data);
    }
  },
};
const mutations = {
  SET_SITE_SETTING: (st, payload) => {
    st.site = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
