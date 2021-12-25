import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import Router from '@/router';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';

createApp(App)
  .use(Quasar, { plugins: { Notify } }) //
  .use(Router)
  .mount('#app');
