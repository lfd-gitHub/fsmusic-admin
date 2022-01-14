<template>
  <div class="container">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-toolbar-title> 全栈音乐后台 </q-toolbar-title>
          <q-space />
          <q-avatar size="24px" color="orange"> L </q-avatar>
          <div style="width: 10px" />
          <q-btn
            size="12px"
            round
            flat
            icon="logout"
            @click="logout"
            title="退出"
          />
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <!-- drawer content -->
        <q-list padding class="text-primary">
          <q-item
            :to="item.path"
            clickable
            v-for="item in menu"
            :key="item.title"
            active-class="bg-teal-1 text-grey-8"
            :active="route.name === item.name"
          >
            <q-item-section avatar><q-icon :name="item.icon" /></q-item-section>
            <q-item-section>{{ item.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import log from '@/utils/log';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();
const leftDrawerOpen = ref(true);
const cur = route.matched.filter((item) => item.path === '/')[0];
const menu = cur.children.map((item) => ({
  ...item.meta,
  path: item.path,
  name: item.name,
}));
log.tag('home');
log.d(menu, route.path);
log.tag('home');
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
async function logout() {
  await store.dispatch('user/logout');
  router.push({ path: '/login' });
}
</script>
<style lang="scss" scoped></style>
