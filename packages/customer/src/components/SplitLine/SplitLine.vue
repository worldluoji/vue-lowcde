<template>
  <div v-atomicattr="p.props.atomicAttrs" class="splitLine">
    <el-divider
      :direction="p.props.direction"
      :border-style="p.props.borderStyle"
      :content-position="p.props.contentPosition"
      >{{ p.props.content }}</el-divider
    >
  </div>
</template>

<script setup>
const p = defineProps({
  props: {
    type: Object,
    default: () => {
      return {
        direction: 'horizontal',
        borderStyle: 'solid',
        contentPosition: 'center',
        content: ''
      };
    }
  }
});
</script>

<style scoped lang="scss">
.splitLine {
  width: 100%;
}
</style>
