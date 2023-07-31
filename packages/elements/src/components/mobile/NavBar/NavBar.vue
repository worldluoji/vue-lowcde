<template>
  <div v-atomicattr="p.props.atomicAttrs">
    <van-nav-bar
      :title="(p.props && p.props.title) || '标题'"
      :style="{ 'background-color': '#ee0a24' }"
    />
  </div>
</template>

<script setup>
const p = defineProps({
  props: {
    type: Object,
    default: () => {
      return {};
    }
  },
  className: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
:deep(.van-nav-bar__title) {
  color: whitesmoke;
}
</style>
