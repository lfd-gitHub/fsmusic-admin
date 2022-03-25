import store from '@/store';
import log from '@/utils/log';
import utils from '@/utils/utils';
import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../pages/Home.vue');
const Dashboard = () => import('../pages/dashboard/Index.vue');
const UserManager = () => import('../pages/user/Index.vue');
const NF404 = () => import('../pages/NF404.vue');
const Login = () => import('../pages/Login.vue');
const Register = () => import('../pages/Register.vue');
const Music = () => import('../pages/music/Index.vue');
const PlayList = () => import('../pages/playlist/Index.vue');
const ArtistList = () => import('../pages/artist/Index.vue');

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: Home,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: '控制台', icon: 'dashboard' },
        component: Dashboard,
      },
      {
        path: 'user',
        name: 'User',
        meta: { title: '用户管理', icon: 'manage_accounts' },
        component: UserManager,
      },
      {
        path: '/music',
        name: 'Music',
        meta: { title: '音乐管理', icon: 'music_note' },
        component: Music,
      },
      {
        path: '/playlist',
        name: 'Playlist',
        meta: { title: '音乐列表管理', icon: 'playlist_play' },
        component: PlayList,
      },
      {
        path: '/artist',
        name: 'Artist',
        meta: { title: '歌手列表管理', icon: 'record_voice_over' },
        component: ArtistList,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isAuthWhite: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { isAuthWhite: true },
  },
  { path: '/404', name: '404', component: NF404, meta: { isAuthWhite: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  log.d(`#Route#beforeEach ${from} => ${to}`);
  if (to.meta.isAuthWhite === true) {
    return next();
  }
  if (store.state.user.token && store.state.user.me) {
    return next();
  }
  utils.showWarn('请先登录');
  return next(`/login?redirect=${to.path}`);
});

export default router;
