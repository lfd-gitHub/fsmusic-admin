<script setup>
import { ref } from 'vue'
import helloApi from '@/api/hello-api'

defineProps({
  msg: String
})

const count = ref(0)
const message = ref("");

const loadData = async () => {
    console.log("baseUrl = " + helloApi.baseUrl);
    const resp = await helloApi.say();
    message.value = resp.data;
}
</script>

<template>
  <h1>{{ message }}</h1>
  <q-btn color="primary" @click="loadData">加载</q-btn>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
