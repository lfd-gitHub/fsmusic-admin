<template>
  <div class="container">
    <q-table
      class="q-ma-md"
      :rows="list.rows"
      :columns="list.columns"
      row-key="name"
      v-model:pagination="pagination"
      @request="onLoadData"
      :loading="loading"
      hide-pagination
    >
      <template v-slot:top>
        <q-btn color="primary" :disable="loading" icon="add" @click="addRow" />
        <q-space />
        <q-input dense debounce="300" color="primary" v-model="list.filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <div class="q-pa-lg flex flex-center">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="pagination.page"
          :max="pagesNumber"
          direction-links
          boundary-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
          @click="onLoadData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import userApi from '@/api/user';
import log from '@/utils/log';
import { onMounted, reactive, ref } from 'vue';

const loading = ref(false);
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 2,
  rowsNumber: 0,
});
const pagesNumber = ref(3);
const list = reactive({
  filter: '',
  rows: [],
  columns: [],
});
list.columns = [
  {
    field: 'id',
    label: 'ID',
    style: 'width:50px',
  },
  {
    field: 'username',
    label: '用户名',
  },
  {
    field: 'nickname',
    label: '昵称',
  },
  {
    field: 'locked',
    label: '锁定',
  },
  {
    field: 'enabled',
    label: '可用',
  },
];
function addRow() {}
async function onLoadData() {
  const { page } = pagination.value;
  log.d('page = ', page);
  loading.value = true;
  const resp = await userApi.list({
    page: page - 1,
    size: 5,
  });
  loading.value = false;
  list.rows = resp?.data?.content ?? [];
  const p = resp?.data?.number ?? 0;
  pagination.value.page = p + 1;
  pagination.value.rowsPerPage = resp?.data?.content?.length ?? 0;
  pagination.value.rowsNumber = resp?.data?.numberOfElements ?? 0;
  const pn = resp?.data?.totalPages ?? 0;
  pagesNumber.value = pn <= 1 ? 0 : pn;
}
onMounted(() => {
  onLoadData();
});
</script>
<style lang="scss" scoped></style>
