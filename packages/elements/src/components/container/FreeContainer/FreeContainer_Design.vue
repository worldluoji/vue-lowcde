<template>
  <div
    ref="parentDom"
    v-atomicattr="props.atomicAttrs"
    class="container-parent"
    @mouseover.stop="showBorder"
    @mouseout.stop="hideBorder"
  >
    <div
      v-for="it in props.children"
      :key="it.id"
      v-free
      :style="{
        top: it.props.top,
        left: it.props.left
      }"
      :class="['child', { inRow: it.props.inRow === '1' }]"
      :data-child="it.id"
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
import { addDragCapability } from '../../../utils/DragEventHandler';

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
  currentPanelStore().set(element);
};

const parentDom = ref('');
const showBorder = () => {
  parentDom.value.style.border = '1px dashed blue';
  // parentDom.value.classList.add('ignore-elements');
};

const hideBorder = () => {
  parentDom.value.style.border = '';
  // parentDom.value.classList.remove('ignore-elements');
};

const callBack = (top, left, id) => {
  const width = Number(parentDom.value.clientWidth);
  const height = Number(parentDom.value.clientHeight);
  console.log(123, width, height);
  meta.updateProps(id, {
    top: `${(top / height) * 100}%`,
    left: `${(left / width) * 100}%`
  });
};

const vFree = {
  mounted: (el) => {
    // console.log(321, el.dataset.child);
    addDragCapability(el, callBack);
  }
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
  }
  box-sizing: border-box;
}

.inRow {
  width: 100%;
}
</style>
