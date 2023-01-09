<template>
  <div>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <div class="app-list">
          <div v-for="app in appList" :key="app.id">
            <el-card shadow="hover" @click="toPageList(app.id)">
              {{ app.name }}
            </el-card>
          </div>
        </div>
        <div class="newApp">
          <el-button @click="dialogNewAppVisible = true">+</el-button>
          <el-dialog v-model="dialogNewAppVisible" title="新建应用">
            <el-form :model="form">
              <el-form-item label="应用名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="应用描述" :label-width="formLabelWidth">
                <el-input v-model="form.desc" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogNewAppVisible = false">取消</el-button>
                <el-button type="primary" @click="addNewApp"> 确定 </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
const $request = inject('$request');
const appList = ref([]);
onBeforeMount(async () => {
  const res = await $request.get('/v1/app/list');
  console.log(res);
  appList.value = res;
});
const dialogNewAppVisible = ref(false);

const form = reactive({
  name: '',
  desc: ''
});
const formLabelWidth = '140px';
const addNewApp = async () => {
  const res = await $request.post('/v1/app/create', {
    name: form.name,
    desc: form.desc
  });
  console.log(res);
  if (res.id) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    });
    appList.value.push(res);
  } else {
    ElMessage({
      message: '添加失败，请稍后再试',
      type: 'warning'
    });
  }
  dialogNewAppVisible.value = false;
};

const router = useRouter();
const toPageList = (appId) => {
  router.push({ path: '/pagelist', query: { appId: appId } });
};
</script>

<style scoped>
.app-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.el-card {
  text-align: center;
  height: 130px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newApp {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

img {
  width: 100%;
  height: 300px;
}
</style>
