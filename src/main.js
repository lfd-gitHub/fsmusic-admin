import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import router from '@/router';
import store from '@/store';
import http from '@/api/http';
import addIntercepts from '@/api/interceptors';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from '@/App.vue';

createApp(App)
  .use(Quasar, { plugins: { Notify } }) //
  .use(router)
  .use(store)
  .mount('#app');

addIntercepts(http, store, router, Notify);
