<template>
  <div class="container">
    <q-btn @click="toLogout">退出登陆</q-btn>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import http from '@/api/http';

const router = useRouter();
const store = useStore();

const list = ref([]);
onMounted(async () => {
  const resp = await http.get('/api/user');
  list.value = resp.data;
});
async function toLogout() {
  const result = await store.dispatch('user/logout');
  if (result) {
    router.push('/login');
  }
}
</script>
<style lang="scss" scoped></style>
