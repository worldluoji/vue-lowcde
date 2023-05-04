<template>
  <div class="list-contaienr">
    <div v-draggable class="material-icon-list">
      <div
        v-for="it in p.componentsInfo"
        :key="it.name"
        class="material-icon"
        :data-material="
          it.type !== 'container' ? it.name : `${it.name}-Container`
        "
      >
        <img :src="it.icon || defaultIcon" draggable="false" />
        <p>{{ it.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import defaultIcon from '@assets/box.png';
const p = defineProps({
  componentsInfo: {
    type: Object,
    default: () => {
      return {};
    }
  }
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
