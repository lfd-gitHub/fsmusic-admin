<template>
  <div class="container">
    <cloud-uploader
      v-if="!file"
      :label="label"
      @file-uploaded="onSuccess"
      :accept="accept"
      style="width: 100%"
    />
    <q-chip
      removable
      v-if="file"
      @remove="onRemove"
      color="primary"
      text-color="white"
      icon="cloud_done"
    >
      <q-icon v-if="'IMAGE' === file.type" :name="'img:' + file.uri" />
      {{ `${file?.name}.${file?.ext}` }}
    </q-chip>
  </div>
</template>

<script setup>
import CloudUploader from './CloudUploader';

// eslint-disable-next-line no-undef
defineProps({
  accept: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  file: {
    type: Object,
    default: () => null,
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:file']);

function onSuccess(file) {
  emit('update:file', file);
}

function onRemove() {
  emit('update:file', null);
}
</script>
<style lang="scss" scoped></style>
