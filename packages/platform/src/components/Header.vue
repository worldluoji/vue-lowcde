<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <TopAreaLeft />
    <span class="nav"></span>
    <el-menu-item index="/">应用列表</el-menu-item>
    <el-menu-item index="/help" disabled>帮助</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TopAreaLeft from './TopAreaLeft.vue';
const activeIndex = ref('/');
const router = useRouter();
const handleSelect = (key) => {
  // console.log(key, keyPath);
  activeIndex.value = key;
  router.push({ path: key });
};
</script>

<style scoped>
.el-menu-item {
  margin: 20px;
  font-size: 1.2rem;
}

.nav {
  margin-left: 5vw;
}
</style>
