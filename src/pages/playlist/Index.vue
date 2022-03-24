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
      separator="cell"
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
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :label="statusParse[props.value].title"
            :color="statusParse[props.value].color"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <q-btn-dropdown
            size="sm"
            color="primary"
            split
            label="编辑"
            @click="edit(props.row)"
          >
            <q-list dense>
              <q-item
                v-if="props.row.status !== 'PUBLISH'"
                clickable
                v-close-popup
                @click="publish(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>上架</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.status === 'PUBLISH'"
                clickable
                v-close-popup
                @click="close(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>下架</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import playlistApi from '@/api/playlist';
import SaveDialog from '@/pages/playlist/SaveDialog.vue';
import log from '@/utils/log';
import { useQuasar } from 'quasar';
import { onMounted, reactive, ref } from 'vue';

const $q = useQuasar();
const loading = ref(false);
const statusParse = ref({
  DRAFT: { title: '草稿', color: 'orange' },
  PUBLISH: { title: '已发布', color: 'primary' },
  CLOSE: { title: '已下架', color: 'grey-4' },
});
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
    { field: 'name', label: '名称' },
    { field: 'description', label: '描述' },
    { name: 'status', field: 'status', label: '状态' },
    {
      name: 'operation',
      field: 'operation',
      label: '操作',
    },
  ],
});
async function loadData(page, rowsPerPage) {
  const tempRowsPerPage = rowsPerPage ?? pagination.value.rowsPerPage;
  const tempPage = page ?? pagination.value.page;
  log.d(`temp page = ${tempPage} , perRow = ${tempRowsPerPage}`);
  loading.value = true;
  const resp = await playlistApi.list({
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
      component: SaveDialog,
    })
    .onOk((r) => {
      if (r) loadData();
    });
  log.d(dialog);
}

function edit(row) {
  log.d('edit ->', row);
  const dialog = $q
    .dialog({
      component: SaveDialog,
      componentProps: { data: { ...row } },
    })
    .onOk((r) => {
      if (r) loadData();
    });
  log.d(dialog);
}

async function publish(id) {
  log.d(`publish -> id = ${id}`);
  const resp = await playlistApi.publish(id);
  if (resp) {
    loadData();
  }
}

async function close(id) {
  log.d(`close -> id = ${id}`);
  const resp = await playlistApi.close(id);
  if (resp) {
    loadData();
  }
}

onMounted(() => {
  loadData();
});
</script>
<style lang="scss" scoped></style>
