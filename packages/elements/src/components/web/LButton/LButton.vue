<template>
  <span>
    <el-button
      :type="p.props.buttonType"
      :circle="p.props.circle"
      @click="onClick"
    >
      {{ p.props.buttonName || '按钮名称' }}
    </el-button>
  </span>
</template>

<script setup>
const p = defineProps({
  props: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const onClick = () => {
  if (p.props.eventType) {
    if (p.props.eventType === 'message') {
      ElementPlus.ElMessage({
        showClose: true,
        message: p.props.mg.value || '',
        type: p.props.mg.type || 'info'
      });
    }
  }
};
</script>

<style scoped>
.simple-table {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
