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

    <!-- <div class="q-pa-lg flex flex-center">
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
    </div> -->
  </div>
</template>

<script setup>
import userApi from '@/api/user';
import CreateDialog from '@/pages/user/CreateDialog.vue';
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
async function loadData(page, rowsPerPage) {
  const tempRowsPerPage = rowsPerPage ?? pagination.value.rowsPerPage;
  const tempPage = page ?? pagination.value.page;

  log.d(`temp page = ${tempPage} , perRow = ${tempRowsPerPage}`);
  loading.value = true;
  const resp = await userApi.list({
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

function onLoadData(ops) {
  const { rowsPerPage, page } = ops.pagination;
  log.d(`ops = `, ops);
  loadData(page, rowsPerPage);
}

onMounted(() => {
  loadData();
});
</script>
<style lang="scss" scoped></style>
