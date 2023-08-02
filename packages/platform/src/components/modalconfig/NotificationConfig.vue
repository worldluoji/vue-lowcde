<template>
  <div>
    <el-form-item label="通知类型" :label-width="p.formLabelWidth">
      <el-select v-model="form.notiType" placeholder="请选择通知类型">
        <el-option label="info" value="info" />
        <el-option label="error" value="error" />
        <el-option label="warning" value="warning" />
        <el-option label="success" value="success" />
      </el-select>
    </el-form-item>
    <el-form-item label="通知标题" :label-width="p.formLabelWidth">
      <el-input v-model="form.notiTitle" autocomplete="off" />
    </el-form-item>
    <el-form-item label="通知内容" :label-width="p.formLabelWidth">
      <el-input v-model="form.notiContent" autocomplete="off" />
    </el-form-item>
    <el-form-item label="通知位置" :label-width="p.formLabelWidth">
      <el-select v-model="form.notiPosition" placeholder="请选择通知位置">
        <el-option label="bottom-right" value="bottom-right" />
        <el-option label="bottom-left" value="bottom-left" />
        <el-option label="top-left" value="top-left" />
        <el-option label="top-right" value="ttop-right" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const p = defineProps({
  formLabelWidth: {
    type: String,
    default: '140px'
  },
  newModalForm: {
    type: Object,
    required: true
  }
});

const form = reactive(p.newModalForm);
</script>
