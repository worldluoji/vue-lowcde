<template>
  <div v-atomicattr="props.atomicAttrs">
    <div class="list-groupr">
      <div
        v-for="element in props.children"
        :key="element.id"
        class="list-group-itemr"
      >
        <component
          :is="element.name"
          :props="element.props"
          :eid="element.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  __name: 'ColumnContainer',
  props: {
    props: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props) {
    const templateColumns = ref(
      props.props.templateColumns || 'repeat(auto-fit, minmax(100px, 1fr))'
    );
    const gap = ref(`${props.props.gap || '0'}px`);
    return {
      templateColumns,
      gap
    };
  }
};
</script>
<style scoped lang="scss">
.list-groupr {
  width: 100%;
  display: grid;
  grid-template-columns: v-bind(templateColumns);
  column-gap: v-bind(gap);
}

.list-group-itemr {
  min-width: 1px;
}
</style>
