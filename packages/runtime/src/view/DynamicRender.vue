<template>
  <div>
    <Render :content="content" />
    <p>{{ p.pageId }}</p>
    <el-button @click="test">跳转测试</el-button>
  </div>
</template>

<script setup>
import { onBeforeMount, inject, ref, watch } from 'vue';
import { Render } from '@lowcode/helper';
import { useRouter } from 'vue-router';
const $request = inject('$request');
const p = defineProps({
  pageId: {
    type: String,
    default: ''
  },
  appId: {
    type: String,
    default: ''
  }
});

const content = ref([]);
const updateData = async (pageId) => {
  if (pageId) {
    let res = await $request.get(`/v1/meta/get?pageId=${pageId}`);
    if (res && res.code == 0 && res.data) {
      content.value = JSON.parse(res.data.content || '');
    }
  }
};
onBeforeMount(async () => {
  updateData(p.pageId);
});

watch(p, (newVal) => {
  updateData(newVal.pageId);
});

const router = useRouter();
const test = () => {
  // console.log(p.pageId);
  if (p.pageId == 2) {
    router.push({ name: 'test1', query: { pageId: 3, appId: p.appId } });
  } else {
    router.push({ name: 'home', query: { pageId: 2, appId: p.appId } });
  }
};
</script>
