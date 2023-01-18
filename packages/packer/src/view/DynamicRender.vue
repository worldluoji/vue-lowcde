<template>
  <Render :content="content" />
</template>

<script setup>
import { onBeforeMount, inject, ref } from 'vue';
import { Render } from '@lowcode/helper';
const $request = inject('$request');
let content = ref([]);
onBeforeMount(async () => {
  let res = await $request.get('/v1/meta/get?pageId=3');
  if (res && res.content) {
    content.value = JSON.parse(res.content);
  }
});
</script>
