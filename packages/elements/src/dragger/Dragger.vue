<template>
  <div :class="p.dragOuterLayout">
    <draggable
      :class="p.dragInnerLayout"
      :list="list"
      :disabled="!enabled"
      item-key="id"
      ghost-class="ghost"
      group="materia"
      @start="dragging = true"
      @end="dragging = false"
      @change="change"
    >
      <template #item="{ element, index }">
        <div
          :class="[
            { 'list-item': true },
            { 'list-item-effect': element.type !== 'container' },
            { 'element-selected': currentId === element.id }
          ]"
        >
          <slot>
            <FastOperation v-show="currentId === element.id" />
          </slot>
          <component
            :is="
              element.type === 'container'
                ? `${element.name}_Design`
                : element.name
            "
            :key="index"
            :props="element.props"
            :eid="element.id"
            :data-index="index"
            @click.stop="showPanel(element)"
          ></component>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import currentPanelStore from '../store/currentPanel.js';
import metaStore from '../store/meta.js';
import FastOperation from './FastOperation.vue';

const p = defineProps({
  dragInnerLayout: {
    type: String,
    default: () => {
      return 'drag-inner-layout';
    }
  },
  dragOuterLayout: {
    type: String,
    default: () => {
      return 'drag-outer-layout';
    }
  },
  content: {
    type: Array,
    default: () => {
      return [];
    }
  },
  parent: {
    type: String,
    default: () => {
      return null;
    }
  }
});

const list = ref(p.content);

watch(p, (newP) => {
  if (newP) {
    list.value = newP.content;
  }
});

const enabled = true;

const currentPanel = currentPanelStore();
const showPanel = (element) => {
  currentPanel.set(element);
};

const currentId = computed((newVal, oldVal) => {
  if (newVal && oldVal && newVal.id === oldVal.id) {
    return;
  }
  const currentElement = currentPanel.get;
  return currentElement ? currentElement.id : '';
});

const meta = metaStore();
const change = (data) => {
  // console.log(data);
  if (data && data.added && data.added.element && data.added.element.id) {
    meta.getDepMap.set(data.added.element.id, {
      value: data.added.element,
      parent: p.parent
    });
  }
};
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-item {
  position: relative;
}

.list-item-effect {
  padding: 5px 0px;
  &:hover {
    border: 1px dashed blue;
  }
}
</style>
