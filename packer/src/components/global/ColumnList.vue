<template>
  <div v-atomicattr="props.atomicAttrs">
  <draggable
    :list="props.children"
    :disabled="!enabled"
    item-key="id"
    :class="enabled ? 'list-group':'list-groupr'"
    ghost-class="ghost"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element, index }">
      <div v-if="enabled" 
            :class="[{'list-group-item': enabled}]" 
            @click.stop="showPanel(element)">
        <component :is="element.name" :props="element.props" :eid="element.id" />
      </div>
      <div v-else :class="[{'list-group-item': enabled}]">
        <component :is="element.name" :props="element.props" :eid="element.id" />
      </div>
    </template>
  </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import currentPanelStore from '@store/currentPanel.js';
import metaStore from '@store/meta.js';
import canvasStore from '@store/canvas.js';
import uuid from '@util/uuid';
import BasicComponents from '../index';
export default {
  name: "ColumnList",
  components: {
    draggable,
    ...BasicComponents
  },
  props: {
    props: {
      type: Object,
      required: true
    },
    eid: {
      type: String,
      required: true
    }
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
  created() {
    this.enabled = this.canvas.isDesign
  },
  methods: {
    showPanel(element) {
      this.currentPanel.set(element)
    }
  },
  watch: {
    props: {
      handler(newVal) {
        let {children, column, gap} = newVal
        // console.log('props', this.eid, children)
        column = column ? column: 1
        children = children ? children: []

        const l = children.length
        if (l > column) {
          let removedChildren = new Set()
          for (let i = l - 1; i >= column; i--) {
            removedChildren.add(children[i].id)
          }
          this.meta.removeChildren(this.eid, removedChildren)
        } else if (l < column) {
          let newChildren = []
          for (let i = l; i < column ; i++) {
            newChildren.push({id: uuid(), name: 'Blank', props: {id: uuid(), element: '', props: {}}})
          }
          this.meta.addChildren(this.eid, newChildren)
        }

        if (gap) {
          this.gap = gap + 'px'
        }
      },
      deep: true,
      immediate: true
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 10px 0px;
  column-gap: v-bind("gap");
}

.list-group:hover {
  border: 1px dashed blue;
}

.list-groupr {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  column-gap: v-bind("gap");
}

.list-group-item {
  text-align: center;
}

.list-group-item:hover {
  border: 1px dashed blue;
}

</style>