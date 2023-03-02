<template>
  <div
    ref="parentDom"
    class="container-parent"
    @mouseover.stop="showBorder"
    @mouseout.stop="hideBorder"
  >
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
      <component
        :is="it.type === 'container' ? `${it.name}_Design` : it.name"
        :props="it.props"
        :eid="it.id"
        @click.stop="showPanel(it)"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from 'vue';
import { metaStore, currentPanelStore } from '@lowcode/elements';
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
const meta = metaStore();

watch(props, (newVal) => {
  // console.log(123, newVal, p.eid);
  if (newVal.children && p.eid) {
    meta.setChildren(p.eid, newVal.children);
  }
});

const showPanel = (element) => {
  console.log(11, element);
  currentPanelStore().set(element);
};

const parentDom = ref('');
const showBorder = () => {
  parentDom.value.style.border = '1px dashed blue';
};

const hideBorder = () => {
  parentDom.value.style.border = '';
};
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
