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
      <el-tab-pane label="自定义组件">
        <Material :components-info="CustomerComponentsInfoLocal" />
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

import { CustomerComponentsInfo as CustomerComponentsInfoLocal } from '@lowcode/customer';

// 以下两行代码演示了远程加载打包后的库组件
// import { allComponents } from 'http://localhost/origin-elements.js'; 只能导入静态的，不能是变量
// import { addr } from './test.js';
// onBeforeMount(async () => {
//   // TODO 实际这里应该从后端获取，该页面有哪些外部组件需要动态导入
//   const addr = 'http://localhost/origin-elements.js';
//   const m = await import(addr); // 可以是外部导入的变量，返回promise
//   console.log(222, m.allComponents);
// });

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
