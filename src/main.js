import http from '@/api/http';
import addIntercepts from '@/api/interceptors';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@quasar/extras/material-icons/material-icons.css';
import { Dialog, Notify, Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';

createApp(App)
  .use(Quasar, { plugins: { Notify, Dialog } }) //
  .use(router)
  .use(store)
  .mount('#app');

addIntercepts(http, store, router, Notify);
