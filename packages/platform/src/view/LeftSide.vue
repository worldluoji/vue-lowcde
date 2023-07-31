<template>
  <el-tabs :tab-position="tabPosition" class="left-tabs" type="border-card">
    <el-tab-pane label="PC组件">
      <Material :components-info="basicWebComponentsInfo" />
    </el-tab-pane>
    <el-tab-pane label="移动组件">
      <Material :components-info="basicMobileComponentsInfo" />
    </el-tab-pane>
    <el-tab-pane label="容器组件">
      <Material :components-info="containerComponentsInfo" />
    </el-tab-pane>
    <!-- <el-tab-pane label="自定义组件">
      <Material :components-info="CustomerComponentsInfoLocal" />
    </el-tab-pane> -->
  </el-tabs>
</template>

<script setup>
import { ref, inject } from 'vue';
import Material from '../components/Material.vue';

const basicWebComponentsInfo = inject('$basicWebComponentsInfo');
const basicMobileComponentsInfo = inject('$basicMobileComponentsInfo');
const containerComponentsInfo = inject('$containerComponentsInfo');

// import { CustomerComponentsInfo as CustomerComponentsInfoLocal } from '@lowcode/customer';

const tabPosition = ref('top');
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
