<script setup>
const props = defineProps({
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

const defaultUrl =
  'https://img.tt98.com/d/file/96kaifa/20181009233732/5bbc9c7b22f00.jpg';
</script>

<template>
  <div v-atomicattr="props.props.atomicAttrs" class="image-wrapper">
    <img
      v-if="props.props"
      :src="props.props.url ? props.props.url : defaultUrl"
      :height="props.props.height"
      draggable="false"
    />
    <img v-else :src="defaultUrl" />
  </div>
</template>

<style scoped>
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100%;
}
</style>
