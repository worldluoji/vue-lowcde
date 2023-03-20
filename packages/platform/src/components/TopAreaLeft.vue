<template>
  <div class="top-area-left">
    <div class="lowcode-plugin-logo" @click="toAppList">
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 16H29V4L44 19L29 34V24H18V13L4 28L18 44V32H23"
          stroke="#333"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p class="font">低代码引擎</p>
    </div>
    <LangSelector />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import LangSelector from './LangSelector.vue';
const router = useRouter();
const toAppList = () => {
  router.push({ path: '/' });
};
</script>

<style lang="scss" scoped>
.top-area-left {
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}

.lowcode-plugin-logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  row-gap: 2px;
}

.font {
  font-size: 1.6rem;
  font-weight: 800;
}
</style>
