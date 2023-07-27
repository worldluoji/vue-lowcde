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
            { 'text-center': !element.props.element },
            { 'element-selected': currentId === element.id }
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
  __name: 'RowContainer_Design',
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
    const templateRows = ref('repeat(auto-fit, minmax(10px, 1fr))');
    const children = ref(props.props.children);
    return {
      templateRows,
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
  computed: {
    currentId: function (newVal, oldVal) {
      if (newVal && oldVal && newVal.id === oldVal.id) {
        return;
      }
      const currentElement = this.currentPanel.get;
      return currentElement ? currentElement.id : '';
    }
  },
  watch: {
    props: {
      handler(newVal) {
        let { gap, templateRows, children } = newVal;

        if (gap) {
          this.gap = gap + 'px';
        }

        if (templateRows) {
          this.templateRows = templateRows;
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
          value: data.added.element,
          parent: this.eid
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
  grid-template-rows: v-bind(templateRows);
  grid-template-columns: minmax(10px, 1fr);
  padding: 30px 0px;
  row-gap: v-bind('gap');
  &:hover {
    border: 1px dashed blue;
  }
}

.list-group-item {
  &:hover {
    border: 1px dashed blue;
  }
}

.text-center {
  text-align: center;
}
</style>
