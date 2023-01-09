<template>
  <div class="imagePanel">
    图片地址:
    <input
      v-model="data.url"
      placeholder="请输入图片url地址"
      @change="change"
    />
    <br />
    图片高度:
    <input
      v-model="data.height"
      type="number"
      placeholder="图片高度，默认自适应"
      @change="change"
    />
    <br />
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
  url: p.props && p.props.url ? p.props.url : '',
  height: p.props && p.props.height ? p.props.height : ''
};
const emit = defineEmits(['change']);
const change = () => {
  console.log(data);
  emit('change', data);
};
</script>

<style scoped>
.imagePanel {
  width: 100%;
}
</style>
