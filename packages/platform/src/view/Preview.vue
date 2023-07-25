<template>
  <div class="preview">
    <Render :content="content" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref, inject } from 'vue';
import { Render } from '@lowcode/helper';

const metaStore = inject('$metaStore');

let content = ref();
let meta = metaStore();
onBeforeMount(() => {
  content.value = meta.get;
});
</script>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2vh;
}
</style>
