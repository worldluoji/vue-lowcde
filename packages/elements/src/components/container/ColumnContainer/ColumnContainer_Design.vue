<template>
  <DraggerLayout
    :content="content"
    :parent="p.eid"
    :drag-inner-layout="'list-group'"
    :drag-outer-layout="''"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import DraggerLayout from '../../../dragger/Dragger.vue';

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

const templateColumnsVal = ref('repeat(auto-fit, minmax(10px, 1fr))');
const gapVal = ref('');
const content = ref(p.props.children);

watch(p.props, (newVal) => {
  let { gap, templateColumns, children } = newVal;

  if (gap) {
    gapVal.value = gap + 'px';
  }

  if (templateColumns) {
    templateColumnsVal.value = templateColumns;
  }

  content.value = children;
});
</script>

<style scoped lang="scss">
/* 实际是list-group来控制内部每一项的布局 */
:deep(.list-group) {
  width: 100%;
  display: grid;
  grid-template-columns: v-bind(templateColumnsVal);
  column-gap: v-bind('gapVal');
  padding: 30px 0px;
  &:hover {
    border: 1px dashed blue;
  }
}
</style>
