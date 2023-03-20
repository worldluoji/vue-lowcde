<template>
  <div v-atomicattr="props.atomicAttrs">
    <draggable
      :list="props.children"
      :disabled="false"
      item-key="id"
      :class="'list-group'"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
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
import { v4 as uuid } from 'uuid';
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
  setup() {
    const templateColumns = ref('repeat(auto-fit, minmax(10px, 1fr))');
    return {
      templateColumns
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
        let { children, column, gap, templateColumns } = newVal;
        // console.log('props', this.eid, children)
        column = column ? column : 1;
        children = children ? children : [];

        const l = children.length;
        if (l > column) {
          let removedChildren = new Set();
          for (let i = l - 1; i >= column; i--) {
            removedChildren.add(children[i].id);
          }
          this.meta.removeChildren(this.eid, removedChildren);
        } else if (l < column) {
          let newChildren = [];
          for (let i = l; i < column; i++) {
            newChildren.push({
              id: uuid(),
              name: 'Blank',
              type: 'container',
              props: { id: uuid(), element: '', props: {} }
            });
          }
          this.meta.addChildren(this.eid, newChildren);
        }

        if (gap) {
          this.gap = gap + 'px';
        }

        if (templateColumns) {
          this.templateColumns = templateColumns;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    showPanel(element) {
      console.log(123, element);
      this.currentPanel.set(element);
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
  padding: 10px 0px;
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
