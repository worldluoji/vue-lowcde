<template>
  <div v-atomicattr="props.atomicAttrs">
    <div class="list-groupr">
      <div v-for="element in props.children" :key="element.id">
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
  __name: 'RowContainer',
  props: {
    props: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props) {
    const templateRows = ref(
      props.props.templateRows || 'repeat(auto-fit, minmax(10px, 1fr))'
    );
    const gap = ref(`${props.props.gap || '0'}px`);
    return {
      templateRows,
      gap
    };
  }
};
</script>
<style scoped lang="scss">
.list-groupr {
  width: 100%;
  display: grid;
  grid-template-rows: v-bind(templateRows);
  grid-template-columns: minmax(10px, 1fr);
  row-gap: v-bind(gap);
}
</style>
