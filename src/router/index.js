import store from '@/store';
import { Notify } from 'quasar';
import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../pages/Home.vue');
const Dashboard = () => import('../pages/dashboard/Index.vue');
const UserManager = () => import('../pages/user/Index.vue');
const NF404 = () => import('../pages/NF404.vue');
const Login = () => import('../pages/Login.vue');
const Register = () => import('../pages/Register.vue');

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'Home',
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
  if (to.meta.isAuthWhite === true) {
    return next();
  }
  if (store.state.user.token && store.state.user.me) {
    return next();
  }
  Notify.create({
    message: '请先登录',
    position: 'top',
  });
  return next(`/login?redirect=${to.path}`);
});

export default router;
