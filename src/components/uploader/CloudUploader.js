// custom quasar object storage uploader
import uploadApi from '@/api/upload';
import log from '@/utils/log';
import { createUploaderComponent } from 'quasar';
import { reactive, ref } from 'vue';

const sName = 'CloudUploader';
// export a Vue component
export default createUploaderComponent({
  // defining the QUploader plugin here

  name: sName, // your component's name

  props: {
    // ...your custom props
  },

  // ?? runtime-core.esm-bundler.js:6620 [Vue warn]:
  // ?? Component emitted event "file-uploaded" but it is neither declared in the emits option nor as an "onFile-uploaded" prop
  emits: ['file-uploaded'],

  injectPlugin({ props, emit, helpers }) {
    // can call any other composables here
    // as this function will run in the component's setup()
    log.d(`[${sName}]`, 'props =>', props);
    // [ REQUIRED! ]
    // We're working on uploading files
    const isUploading = ref(false);

    // [ optional ]
    // Shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    const isBusy = ref(false);
    const taskInfo = reactive({ os: null, id: '' });
    let file;
    // [ REQUIRED! ]
    // Abort and clean up any process
    // that is in progress
    function abort() {
      // ...
      log.d(`[${sName}] ② abort => `, taskInfo?.id);
      if (taskInfo?.id) {
        uploadApi.abortUpload(taskInfo);
        isUploading.value = false;
        helpers.updateFileStatus(file, 'idle');
      }
    }

    function onProgress(progressData) {
      log.d(`[${sName}] ② onProgress => `, progressData);
      isBusy.value = false;
      isUploading.value = true;
      helpers.updateFileStatus(file, 'uploading', progressData.loaded);
    }

    function onFinished(data) {
      helpers.updateFileStatus(file, 'uploaded', file.size);
      helpers.uploadedFiles.value = [file];
      helpers.uploadedSize.value = file.size;
      helpers.queuedFiles.value = [];
      isUploading.value = false;
      helpers.updateFileStatus(file, 'uploaded');
      log.d(`[${sName}] ④ onFinished => `, data);
      emit('file-uploaded', data);
    }

    function onStart(info) {
      const { os, id } = info;
      taskInfo.os = os;
      taskInfo.id = id;
    }

    // [ REQUIRED! ]
    // Start the uploading process
    async function upload() {
      const sfile = helpers.queuedFiles.value[0];
      log.d(`[${sName}] ① upload => `, sfile);
      file = sfile;
      await uploadApi.upload(file, onStart, onProgress, onFinished);
    }

    return {
      isUploading,
      isBusy,

      abort,
      upload,
    };
  },
});
