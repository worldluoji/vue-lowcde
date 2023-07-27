<template>
  <div v-atomicattr="props.atomicAttrs">
    <draggable
      :list="children"
      :disabled="false"
      item-key="id"
      :class="'list-group'"
      ghost-class="ghost"
      group="materia"
      @start="dragging = true"
      @end="dragging = false"
      @change="change"
    >
      <template #item="{ element }">
        <div
          :class="[
            { 'list-group-item': true },
            { 'text-center': !element.props.element }
          ]"
          @click.stop="showPanel(element)"
        >
          <component
            :is="
              element.type === 'container'
                ? `${element.name}_Design`
                : element.name
            "
            :props="element.props"
            :eid="element.id"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { metaStore, currentPanelStore } from '@lowcode/elements';
import { ref } from 'vue';

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  __name: 'ColumnContainer_Design',
  components: {
    draggable
  },
  props: {
    props: {
      type: Object,
      required: true
    },
    eid: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const templateColumns = ref('repeat(auto-fit, minmax(10px, 1fr))');
    const children = ref(props.props.children);
    return {
      templateColumns,
      children
    };
  },
  data() {
    return {
      dragging: false,
      currentPanel: currentPanelStore(),
      meta: metaStore(),
      gap: ''
    };
  },
  watch: {
    props: {
      handler(newVal) {
        let { gap, templateColumns, children } = newVal;

        if (gap) {
          this.gap = gap + 'px';
        }

        if (templateColumns) {
          this.templateColumns = templateColumns;
        }

        this.children.value = children;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    showPanel(element) {
      this.currentPanel.set(element);
    },
    change(data) {
      if (data && data.added && data.added.element && data.added.element.id) {
        this.meta.getDepMap.set(data.added.element.id, {
          value: data.added.element
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.not-draggable {
  cursor: no-drop;
}

/* 实际是list-group来控制内部每一项的布局 */
.list-group {
  width: 100%;
  display: grid;
  grid-template-columns: v-bind(templateColumns);
  column-gap: v-bind('gap');
  padding: 30px 0px;
  &:hover {
    border: 1px dashed blue;
  }
}

.list-group-item {
  &:hover {
    border: 1px dashed blue;
  }
  min-width: 1px;
}

.text-center {
  text-align: center;
}
</style>
