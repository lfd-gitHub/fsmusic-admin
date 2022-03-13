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
  </div>
</template>

<script setup>
import musicApi from '@/api/music';
import CreateDialog from '@/pages/music/CreateDialog.vue';
import log from '@/utils/log';
import { useQuasar } from 'quasar';
import { onMounted, reactive, ref } from 'vue';

const $q = useQuasar();
const loading = ref(false);
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 3,
  rowsNumber: 0,
});
const list = reactive({
  filter: '',
  rows: [],
  columns: [
    { field: 'id', label: 'ID', style: 'width:50px' },
    { field: 'name', label: 'Name' },
    { field: 'description', label: 'Desc' },
  ],
});
async function loadData(page, rowsPerPage) {
  const tempRowsPerPage = rowsPerPage ?? pagination.value.rowsPerPage;
  const tempPage = page ?? pagination.value.page;
  log.d(`temp page = ${tempPage} , perRow = ${tempRowsPerPage}`);
  loading.value = true;
  const resp = await musicApi.list({
    page: tempPage - 1,
    size: tempRowsPerPage,
    sort: `createTime,${pagination.value.sortBy}`,
  });
  loading.value = false;
  const datas = resp?.data.content ?? [];
  list.rows = datas; //= tempPage <= 1 ? datas : list.rows.concat(datas);
  const p = resp?.data?.number ?? 0;
  pagination.value.page = p + 1;
  pagination.value.rowsPerPage =
    resp?.data?.pageable?.pageSize ?? tempRowsPerPage;
  pagination.value.rowsNumber = resp?.data?.totalElements ?? 0;

  log.d('rows = ', list.rows);
  log.d('pagination = ', pagination.value);
}

function onLoadData(ops) {
  const { rowsPerPage, page } = ops.pagination;
  log.d(`ops = `, ops);
  loadData(page, rowsPerPage);
}
function addRow() {
  log.d('ADDROW ->');
  const dialog = $q
    .dialog({
      component: CreateDialog,
    })
    .onOk((r) => {
      if (r) loadData();
    });
  log.d(dialog);
}
onMounted(() => {
  loadData();
});
</script>
<style lang="scss" scoped></style>
