<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
store.state.user.username = 'lfd';

onMounted(() => {
  store.dispatch('setting/fetchSetting');
});
</script>

<style></style>
