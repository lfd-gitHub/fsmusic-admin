<template>
  <div class="login-page">
    <svg class="font-icon" aria-hidden="true">
      <use xlink:href="#icon-007-music"></use>
    </svg>
    <q-card class="card">
      <h1 class="title">FSMUSIC-ADMIN</h1>
      <q-form class="form q-gutter-md" @submit="doLogin">
        <q-input
          outlined
          label="用户名"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入用户名']"
        ></q-input>
        <q-input
          outlined
          label="密码"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || '请输入密码',
            (val) => val.length < 5 || '请输入6位以上密码',
          ]"
        ></q-input>
        <q-checkbox v-model="isKeepLogin" label="保持登陆" />
        <div>
          <q-btn label="登陆" type="submit" color="primary" />
          <q-btn
            label="注册"
            @click="toRegister"
            color="primary"
            flat
            type="button"
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import userApi from '@/api/user';

const router = useRouter();
const isKeepLogin = ref(false);
async function doLogin() {
  const resp = await userApi.login();
  if (resp != null) {
    router.push({ path: '/home' });
  }
}
function toRegister() {
  router.push({ path: '/register' });
}
</script>
<style lang="less" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    45deg,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  h1 {
    font-size: 24px;
    line-height: 1.5em;
    width: 100%;
    text-align: center;
    font-weight: bold;
    display: inline-block;
  }
  .card {
    padding: 20px;
    width: 350px;
  }
}
</style>
