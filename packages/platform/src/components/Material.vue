<template>
  <div class="list-contaienr">
    <draggable
      class="material-icon-list"
      :list="componentsList"
      :group="{ name: 'materia', pull: 'clone', put: false }"
      :clone="cloneComponent"
      item-key="name"
    >
      <template #item="{ element }">
        <div
          class="material-icon"
          :data-material="
            element.type !== 'container'
              ? element.name
              : `${element.name}-Container`
          "
        >
          <img :src="element.icon || defaultIcon" draggable="false" />
          <p>{{ element.title }}</p>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import defaultIcon from '@assets/box.png';
import { v4 as uuid } from 'uuid';
import { computed } from 'vue';

const p = defineProps({
  componentsInfo: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const cloneComponent = ({ name, type }) => {
  let opData = {
    id: uuid(),
    name,
    type,
    props: {}
  };

  if (type === 'container') {
    opData.props.children = [];
  }

  return opData;
};

const componentsList = computed(() => {
  return Object.values(p.componentsInfo);
});
</script>

<style scoped>
.material-icon-list {
  display: grid;
  grid-template-columns: 70px 70px 70px;
  grid-template-rows: repeat(auto-fit, minmax(60px, 70px));
  gap: 18px;
  place-items: center;
  background-color: #fff;
  margin-top: 10px;
  min-height: 100vh;
}

.material-icon-list:after {
  content: '';
  display: block;
  clear: both;
}
.material-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.material-icon p {
  font-size: 16px;
  margin: 0px;
  text-align: center;
  color: #777;
}

.lc-title {
  font-size: 16px;
  font-weight: 700;
}

img {
  width: 36px;
  height: 36px;
}

.list-contaienr {
  display: grid;
  place-items: center;
}
</style>
