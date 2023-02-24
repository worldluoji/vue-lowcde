<template>
  <div v-atomicattr="props.atomicAttrs">
    <draggable
      :list="props.children"
      :disabled="!enabled"
      item-key="id"
      :class="enabled ? 'list-group' : 'list-groupr'"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <div
          v-if="enabled"
          :class="[{ 'list-group-item': enabled, 'list-group-itemr': true }]"
          @click.stop="showPanel(element)"
        >
          <component
            :is="element.name"
            :props="element.props"
            :eid="element.id"
          />
        </div>
        <div v-else class="list-group-itemr">
          <component
            :is="element.name"
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
import { metaStore, canvasStore, currentPanelStore } from '@lowcode/elements';
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';

export default {
  name: 'ColumnList',
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
    const templateColumns = ref('repeat(auto-fit, minmax(100px, 1fr))');
    return {
      templateColumns
    };
  },
  data() {
    return {
      enabled: false,
      dragging: false,
      currentPanel: currentPanelStore(),
      meta: metaStore(),
      canvas: canvasStore(),
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
  created() {
    this.enabled = this.canvas.isDesign;
  },
  methods: {
    showPanel(element) {
      this.currentPanel.set(element);
    }
  }
};
</script>
<style scoped>
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
  padding: 10px 0px;
  column-gap: v-bind('gap');
}

.list-group:hover {
  border: 1px dashed blue;
}

.list-groupr {
  width: 100%;
  display: grid;
  grid-template-columns: v-bind(templateColumns);
  column-gap: v-bind('gap');
}

.list-group-item {
  text-align: center;
}

.list-group-item:hover {
  border: 1px dashed blue;
}

.list-group-itemr {
  min-width: 1px;
}
</style>
