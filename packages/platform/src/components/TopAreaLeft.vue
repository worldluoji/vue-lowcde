<template>
  <div class="top-area-left" @click="toAppList">
    <div class="lowcode-plugin-logo">
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
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
  font-size: 1.7rem;
  font-weight: 800;
  margin-right: 100px;
}
</style>
