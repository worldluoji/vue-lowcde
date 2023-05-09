<template>
  <div v-for="(it, index) in lifecycles" :key="it.name">
    <el-button text @click="it.visiable = true"> {{ it.name }} </el-button>
    <el-drawer
      v-model="it.visiable"
      :title="it.title"
      direction="ttb"
      :append-to-body="true"
    >
      <JSEditor
        :model-value="it.modelValue"
        :index="index"
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
    type: Array,
    default: () => {
      return ['', '', '', ''];
    }
  }
});
const lifecycles = reactive([
  {
    name: 'onMounted',
    title: 'onMounted生命周期高代码编辑',
    visiable: false,
    modelValue: p.value[0]
  }
]);

const emit = defineEmits(['change']);
const change = (newVal, index) => {
  console.log(newVal, index);
  lifecycles[index].visiable = false;
  lifecycles[index].modelValue = newVal;
  emit('change', newVal, index);
};
</script>
