<template>
  <div class="navBarPanel">
    标题:
    <input v-model="data.title" placeholder="请输入标题" @change="change" />
  </div>
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
const data = {
  title: p.props && p.props.title ? p.props.title : ''
};
const emit = defineEmits(['change']);
const change = () => {
  console.log(data);
  emit('change', data);
};
</script>

<style scoped>
.navBarPanel {
  width: 100%;
}
</style>
