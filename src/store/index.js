import { createLogger, createStore } from 'vuex';
import setting from './modules/setting';
import user from './modules/user';

export default createStore({
  modules: { user, setting },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
});
