<template>
  <div class="schema-wrapper">
    <el-button class="schema-btn" @click="show = true"> 查看元数据 </el-button>
    <el-drawer v-model="show" title="元数据" direction="rtl" size="50%">
      <JsonEditor :model-value="p.data" />
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JsonEditor from '../components/JsonEditor.vue';
const p = defineProps({
  data: {
    type: String,
    default: ''
  }
});
const show = ref(false);
</script>

<style scoped>
.schema-btn {
  margin-right: 16px;
}

.schema-wrapper {
  display: flex;
  align-items: center;
}
</style>
