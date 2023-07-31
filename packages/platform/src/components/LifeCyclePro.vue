<template>
  <div v-for="it in lifecycles" :key="it.name">
    <el-button text @click="it.visiable = true"> {{ it.name }} </el-button>
    <el-drawer
      v-model="it.visiable"
      :title="it.title"
      direction="ttb"
      :append-to-body="true"
    >
      <JSEditor
        v-if="it.visiable"
        :model-value="it.modelValue"
        :attr-name="it.name"
        @update:modelValue="change"
      />
    </el-drawer>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { JSEditor } from '@lowcode/helper';
const p = defineProps({
  value: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
const lifecycles = reactive([
  {
    name: 'onBeforeMount',
    title: 'onBeforeMount生命周期高代码编辑',
    visiable: false,
    modelValue: p.value['onBeforeMount'] || ''
  },
  {
    name: 'onMounted',
    title: 'onMounted生命周期高代码编辑',
    visiable: false,
    modelValue: p.value['onMounted'] || ''
  }
]);

const emit = defineEmits(['change']);
const change = (newVal, attrName) => {
  console.log(newVal, attrName);
  let lf = lifecycles.find((it) => it.name === attrName);
  if (lf) {
    lf.visiable = false;
    lf.modelValue = newVal;
  }
  emit('change', newVal, attrName);
};
</script>
