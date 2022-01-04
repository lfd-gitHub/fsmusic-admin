<template>
  <div class="container">{{ list }}</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import http from '@/api/http';

const list = ref([]);
onMounted(async () => {
  const resp = await http.get('/api/user');
  list.value = resp.data;
});
</script>
<style lang="scss" scoped></style>
