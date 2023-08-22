<template>
  <div class="designer">
    <el-container>
      <el-header>
        <Operation
          @changeWidth="changeWidth"
          @save="save"
          @changeSwitch="changeSwitch"
        />
      </el-header>
      <el-container>
        <el-aside>
          <LeftArea />
        </el-aside>
        <el-container>
          <el-main>
            <DraggerLayout v-show="tab === 'page'" :content="content" />
            <ModalConfig v-show="tab === 'modal'" :page-id="pageId" />
            <Panel @cancel="cancelPanel" @deleteComponent="deleteComponent" />
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Operation from './Operation.vue';
import ModalConfig from './ModalConfig.vue';
import Panel from './Panel.vue';
import LeftArea from './LeftArea.vue';
import { inject, ref, onBeforeMount } from 'vue';

// import { CustomerComponents as CustomerComponentsLocal } from '@lowcode/customer'; // 本地脚手架定制时，设计器直接本地加载自定义组件
const DraggerLayout = inject('$DraggerLayout');

const pageId = ref('');
const appId = ref('');
const metaId = ref(0);
const request = inject('$request');
const content = ref([]);
const tab = ref('page');

const metaStore = inject('$metaStore');
const meta = metaStore();

const $route = useRoute();

onBeforeMount(async () => {
  pageId.value = $route.query.pageId;
  appId.value = $route.query.appId;
  let appPageIdCache = meta.getAppPageId;
  const realAppPageId = `${pageId.value}&${appId.value}`;
  // 没有缓存，或者缓存的页面与当前页面不一致，就重新请求
  if (pageId.value && (!appPageIdCache || appPageIdCache !== realAppPageId)) {
    const res = await request.get(`/v1/meta/get?pageId=${pageId.value}`);
    if (res && res.code == 0 && res.data && res.data.id) {
      meta.setId(res.data.id);
      meta.setAppPageId(realAppPageId);
      if (res.data.content) {
        meta.set(JSON.parse(res.data.content), true);
      }
    }
  }
  // 这里还是不一致，说明没有请求到东东，应该将缓存清空
  appPageIdCache = meta.getAppPageId;
  if (appPageIdCache !== realAppPageId) {
    meta.set([]);
    meta.setDepMap(new Map());
    meta.setId(0);
    meta.setAppPageId(realAppPageId);
  }

  content.value = meta.get;
  metaId.value = meta.getId;
  canvas.setDesign(true);
});

const save = async () => {
  const res = await request.post('/v1/meta/save', {
    content: JSON.stringify(meta.get),
    pageId: Number(pageId.value),
    id: metaId.value
  });
  if (res.code == 0) {
    ElementPlus.ElMessage({
      message: '保存成功',
      type: 'success'
    });
  } else {
    ElementPlus.ElMessage({
      message: '保存失败，请稍后再试',
      type: 'warning'
    });
  }
};

const currentPanelStore = inject('$currentPanelStore');
const currentPanel = currentPanelStore();
const cancelPanel = () => {
  currentPanel.set({});
};

const canvasStore = inject('$canvasStore');
const canvas = canvasStore();
const canvasWidth = ref('987px');
const changeWidth = (val) => {
  canvasWidth.value = `${val}px`;
};

const deleteComponent = (eid) => {
  meta.delete(eid);
  cancelPanel();
};

const changeSwitch = (val) => {
  tab.value = val;
};
</script>

<style scoped lang="scss">
.designer {
  --top-white-length: 30px;
}

.el-main {
  display: flex;
  justify-content: space-evenly;
  overflow: visible;
  margin-top: var(--top-white-length, 30px);
  padding: 0 var(--el-main-padding);
}

.el-aside {
  width: 60px;
  margin-top: var(--top-white-length, 30px);
}

:deep(.drag-outer-layout) {
  width: v-bind(canvasWidth);
  min-height: 100vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f0f2f5;
}

:deep(.drag-inner-layout) {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  min-height: 100vh;
}
</style>
