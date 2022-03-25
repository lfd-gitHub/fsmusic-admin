<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <div class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">添加用户</div>
          </q-card-section>

          <q-input filled v-model="info.name" label="用户名" />
          <q-input
            filled
            label="密码"
            v-model="info.password"
            type="password"
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
import userApi from '@/api/user';
import utils from '@/utils/utils';
import { useDialogPluginComponent } from 'quasar';
import { reactive, ref } from 'vue';

export default {
  name: 'CreateDialog',
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],

  setup() {
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
    const info = reactive({
      name: '',
      password: '',
    });

    async function addUser() {
      loading.value = true;
      const resp = await userApi.create(info.name, info.password);
      if (resp) {
        utils.showOk('添加成功');
        onDialogOK(true);
      } else {
        loading.value = false;
      }
    }

    return {
      loading,
      info,
      dialogRef,
      onDialogHide,
      onDialogOK,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        addUser();
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
};
</script>
