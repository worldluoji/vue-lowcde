<template>
     <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <TopAreaLeft />
        <el-menu-item index="0" disabled>首页</el-menu-item>  
        <el-menu-item index="1">应用列表</el-menu-item>
        <el-menu-item index="2" disabled>帮助</el-menu-item>              
    </el-menu>
</template>

<script setup>
import { ref } from 'vue';
import TopAreaLeft from './TopAreaLeft.vue';
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
}
</script>

<style scoped>
    .el-menu-item {
        margin: 20px;
        font-size: 1.2rem;
    }
</style>