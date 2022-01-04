import { createRouter, createWebHistory } from 'vue-router';
import { Notify } from 'quasar';
import store from '@/store';

const Home = () => import('../pages/Home.vue');
const Profile = () => import('../pages/user/Profile.vue');
const NF404 = () => import('../pages/NF404.vue');
const Login = () => import('../pages/Login.vue');
const Register = () => import('../pages/Register.vue');

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
  if (to.meta.isAuthWhite === true || store.state.user.token) {
    return next();
  }
  Notify.create({
    message: '请先登陆',
    position: 'top',
  });
  return next(`/login?redirect=${to.path}`);
});

export default router;
