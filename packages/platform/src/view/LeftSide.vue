<template>
  <el-affix :offset="120">
    <el-tabs :tab-position="tabPosition" class="left-tabs" type="border-card">
      <el-tab-pane label="PC基础组件">
        <Material :components-info="basicWebComponentsInfo" />
      </el-tab-pane>
      <el-tab-pane label="移动基础组件">
        <Material :components-info="basicMobileComponentsInfo" />
      </el-tab-pane>
      <el-tab-pane label="容器组件">
        <Material :components-info="containerComponentsInfo" />
      </el-tab-pane>
    </el-tabs>
  </el-affix>
</template>

<script setup>
import { ref } from 'vue';
import Material from '../components/Material.vue';
import {
  basicWebComponentsInfo,
  basicMobileComponentsInfo,
  containerComponentsInfo
} from '@lowcode/elements';

const tabPosition = ref('left');
</script>

<style>
.left-tabs {
  background-color: #fff;
}

.left-tabs > .el-tabs__content {
  padding: 3px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.el-tabs__item.is-active,
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: rgb(16, 15, 15);
}

.el-tabs__active-bar {
  background-color: rgb(16, 15, 15);
}
</style>
