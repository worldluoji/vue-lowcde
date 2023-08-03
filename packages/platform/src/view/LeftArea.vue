<template>
  <div class="left-bar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-menu-item index="1" @click="showMateriaMarket = !showMateriaMarket">
        <el-icon><IconPresent /></el-icon>
        <template #title>组件库</template>
      </el-menu-item>
      <el-menu-item index="2" disabled>
        <el-icon><IconList /></el-icon>
        <template #title>大纲树</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><IconDataBoard /></el-icon>
        <template #title>数据源</template>
      </el-menu-item>
    </el-menu>
    <MateriaMarket v-if="showMateriaMarket" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  List as IconList,
  Present as IconPresent,
  DataBoard as IconDataBoard
} from '@element-plus/icons-vue';
import MateriaMarket from './MateriaMarket.vue';

const isCollapse = ref(true);
const showMateriaMarket = ref(false);
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 60px;
  min-height: 100vh;
}

.left-bar {
  display: flex;
  flex-direction: row;
}
</style>
