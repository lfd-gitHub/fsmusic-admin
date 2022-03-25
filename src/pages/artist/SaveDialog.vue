<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <div class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">{{ `${isEdit ? '修改' : '添加'}歌手` }}</div>
          </q-card-section>

          <q-input filled v-model="info.name" label="名字" />
          <q-input filled v-model="info.remark" label="备注" />
          <uploader
            label="封面图片上传"
            v-model:file="info.cover"
            accept="image/*"
          />

          <q-card-actions align="right">
            <q-btn
              color="primary"
              :loading="loading"
              label="确定"
              @click="onOKClick"
            />
            <q-btn color="primary" label="取消" @click="onCancelClick" />
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import artistApi from '@/api/artist';
import Uploader from '@/components/uploader/Uploader.vue';
import utils from '@/utils/utils';
import { useDialogPluginComponent } from 'quasar';
import { reactive, ref } from 'vue';

export default {
  name: 'SaveDialog',
  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup(props) {
    utils.logd('[SaveDialog] props => ', props);
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome
    const loading = ref(false);
    const isEdit = ref(!!props.data?.id);
    const info = reactive(
      props.data || {
        name: '',
        remark: '',
        cover: null,
      }
    );
    async function saveArtist() {
      loading.value = true;
      utils.logd('[Artist-SaveDialog] => saveArtist() => info = ', info);
      const req = {
        name: info.name,
        remark: info.remark,
      };
      if (info.cover?.id) {
        req.coverId = info.cover.id;
      }
      const resp = isEdit.value
        ? await artistApi.update(props.data.id, req)
        : await artistApi.create(req);
      if (resp) {
        utils.showOk(isEdit.value ? '修改成功' : '添加成功');
        onDialogOK(true);
      } else {
        loading.value = false;
      }
    }
    return {
      isEdit,
      loading,
      info,
      dialogRef,
      onDialogHide,
      onDialogOK,
      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        saveArtist();
      },
      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
  components: { Uploader },
};
</script>
