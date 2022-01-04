<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
store.state.user.username = 'lfd';
</script>

<style></style>
