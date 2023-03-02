<template>
  <div class="BlankPanel">
    <el-select
      v-model="value"
      class="m-2"
      placeholder="请选择组件"
      size="large"
      @change="change"
    >
      <el-option
        v-for="item in allComponents"
        :key="item.name"
        :label="item.title"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import componentList from '../../../components/components.js';
// import { CustomerComponentsInfo } from '@lowcode/customer';
const allComponents = { ...componentList };
const p = defineProps({
  props: {
    type: Object,
    required: true
  }
});
const value = ref(p.props.element || '');
const emit = defineEmits(['change']);
const change = () => {
  console.log(value.value);
  emit('change', {
    element: value.value.name,
    type: value.value.type
  });
};
</script>

<style scoped>
.BlankPanel {
  width: 100%;
}
</style>
