<template>
  <div class="container-parent">
    <div
      v-for="it in props.children"
      :key="it.id"
      :style="{
        top: it.top,
        left: it.left,
        right: it.right,
        bottom: it.bottom
      }"
      class="child"
    >
      <component :is="it.name" :props="it.props" :eid="it.id" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const p = defineProps({
  props: {
    type: Object,
    default: () => {
      return {};
    }
  },
  eid: {
    type: String,
    default: ''
  }
});
const props = reactive(p.props);
</script>

<style scoped lang="scss">
.container-parent {
  position: relative;
  width: 100%;
  height: v-bind('props.height || "100px"');
  background-color: v-bind('props.backgroundColor');
  .child {
    position: absolute;
    width: 100%;
  }
}
</style>
