<template>
  <div>
    <el-container>
      <el-header>
        <div class="top">
          <TopAreaLeft />
          <h1 class="title">{{ $t('msg.app') }}-{{ appName }}</h1>
          <el-button text @click="toRutime">运行时预览</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="page-list">
          <el-table :data="pageList" stripe style="width: 100%">
            <el-table-column type="index" width="100" />
            <el-table-column prop="name" label="页面名称" />
            <el-table-column prop="path" label="页面路由" />
            <el-table-column prop="desc" label="页面描述" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="toDesigner(scope.row.id)"
                  >编辑</el-button
                >
                <el-popconfirm
                  :title="`确认删除页面${scope.row.name}吗？`"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  width="220"
                  confirm-button-type="danger"
                  @confirm="handleDelete(scope.row.id)"
                >
                  <template #reference>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="newPage">
          <el-button @click="dialogNewPageVisible = true">+</el-button>
          <el-dialog v-model="dialogNewPageVisible" title="新建页面">
            <el-form :model="form">
              <el-form-item label="页面名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="页面路径" :label-width="formLabelWidth">
                <el-input v-model="form.path" autocomplete="off" />
              </el-form-item>
              <el-form-item label="页面描述" :label-width="formLabelWidth">
                <el-input v-model="form.desc" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogNewPageVisible = false"
                  >取消</el-button
                >
                <el-button type="primary" @click="addNewPage"> 确定 </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
      <Registy :app-id="appId" />
    </el-container>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, inject, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TopAreaLeft from '../components/TopAreaLeft.vue';
import Registy from '../components/Registry.vue';
const RUNTIME_URL = `${import.meta.env.VITE_RUNTIME_URL}`;
const $request = inject('$request');
const pageList = ref([]);
const route = useRoute();
const appId = route.query.appId;
const appName = route.query.appName;
onBeforeMount(async () => {
  if (appId) {
    const res = await $request.get(`/v1/page/list?appId=${appId}`);
    pageList.value = res;
  }
});
const dialogNewPageVisible = ref(false);

const form = reactive({
  name: '',
  path: '',
  desc: ''
});
const formLabelWidth = '140px';
const addNewPage = async () => {
  const res = await $request.post('/v1/page/create', {
    name: form.name,
    path: form.path,
    desc: form.desc,
    appId: Number(appId)
  });
  if (res.id) {
    ElementPlus.ElMessage({
      message: '添加成功',
      type: 'success'
    });
    pageList.value.push(res);
  } else {
    ElementPlus.ElMessage({
      message: '添加失败，请稍后再试',
      type: 'warning'
    });
  }
  dialogNewPageVisible.value = false;
};

const router = useRouter();
const toDesigner = (pageId) => {
  router.push({ path: '/designer', query: { appId: appId, pageId: pageId } });
};
const handleDelete = (pageId) => {
  // TODO
  console.log(pageId);
};

const toRutime = () => {
  window.location.href = `${RUNTIME_URL}/#/?appName=${appName}&appId=${appId}`;
};
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.page-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.newPage {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

img {
  width: 100%;
  height: 300px;
}

.title {
  margin-left: 20vw;
}
</style>
