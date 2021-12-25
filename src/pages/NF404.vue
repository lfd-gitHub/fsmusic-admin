<template>
  <div class="nf-container">
    <div>404</div>
    <br />
    <div>您访问的页面不存在</div>
    <br />
    <div>
      <q-btn label="首页" color="primary" @click="$router.push('/home')" />
      <q-btn label="返回" color="white" flat @click="$router.go(-1)" />
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.nf-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #c02425; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #f0cb35,
    #c02425
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #f0cb35,
    #c02425
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  div:nth-of-type(1) {
    font-size: 168px;
    text-align: center;
    font-weight: bold;
  }
  div:nth-of-type(2) {
    color: white;
  }
}
</style>
