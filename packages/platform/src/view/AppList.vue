<template>
  <div>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <div class="app-list">
          <div v-for="app in appList" :key="app.id">
            <el-card shadow="hover" @click="toPageList(app.id, app.name)">
              <div class="app-info">
                <svg
                  t="1674961107803"
                  class="app-icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="8568"
                  width="200"
                  height="200"
                >
                  <path
                    d="M0 0m349.206261 0l325.587478 0q349.206261 0 349.206261 349.206261l0 325.587478q0 349.206261-349.206261 349.206261l-325.587478 0q-349.206261 0-349.206261-349.206261l0-325.587478q0-349.206261 349.206261-349.206261Z"
                    fill="#3271FD"
                    p-id="8569"
                  ></path>
                  <path
                    d="M442.189913 298.284522c9.728 0 18.053565 3.372522 24.976696 10.128695 6.912 6.745043 10.373565 14.981565 10.373565 24.731826v140.566261c0 9.750261-3.450435 18.086957-10.373565 25.021218a34.003478 34.003478 0 0 1-24.976696 10.395826H301.924174a33.090783 33.090783 0 0 1-24.698435-10.395826A34.626783 34.626783 0 0 1 267.130435 473.711304V333.145043c0-9.750261 3.361391-17.986783 10.095304-24.742956 6.733913-6.745043 14.970435-10.117565 24.698435-10.117565h140.265739zM442.189913 579.417043c9.728 0 18.053565 3.372522 24.976696 10.128696 6.912 6.733913 10.373565 14.981565 10.373565 24.731826v141.133913c0 9.73913-3.450435 17.986783-10.373565 24.731826-6.92313 6.745043-15.248696 10.128696-24.976696 10.128696H301.924174c-9.728 0-17.964522-3.383652-24.698435-10.128696C270.491826 773.398261 267.130435 765.150609 267.130435 755.400348V614.266435c0-9.73913 3.361391-17.986783 10.095304-24.731826 6.733913-6.745043 14.970435-10.128696 24.698435-10.128696h140.265739zM723.311304 579.417043c9.71687 0 17.953391 3.372522 24.687305 10.128696 6.733913 6.733913 10.095304 14.981565 10.095304 24.731826v141.133913c0 9.73913-3.361391 17.986783-10.095304 24.731826-6.733913 6.745043-14.970435 10.128696-24.687305 10.128696H583.034435a34.482087 34.482087 0 0 1-24.976696-10.128696 33.224348 33.224348 0 0 1-10.373565-24.742956V614.266435c0-9.73913 3.450435-17.986783 10.373565-24.731826a34.482087 34.482087 0 0 1 24.976696-10.128696h140.276869z"
                    fill="#FFFFFF"
                    p-id="8570"
                  ></path>
                  <path
                    d="M667.826087 243.287534m23.611218 23.611218l110.185682 110.185682q23.611218 23.611218 0 47.222436l-110.185682 110.185683q-23.611218 23.611218-47.222436 0l-110.185683-110.185683q-23.611218-23.611218 0-47.222436l110.185683-110.185682q23.611218-23.611218 47.222436 0Z"
                    fill="#FFFFFF"
                    fill-opacity=".7"
                    p-id="8571"
                  ></path>
                </svg>
                <span>{{ app.name }}</span>
              </div>
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
  // console.log(res);
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
  if (res.id) {
    ElementPlus.ElMessage({
      message: '添加成功',
      type: 'success'
    });
    appList.value.push(res);
  } else {
    ElementPlus.ElMessage({
      message: '添加失败，请稍后再试',
      type: 'warning'
    });
  }
  dialogNewAppVisible.value = false;
};

const router = useRouter();
const toPageList = (appId, appName) => {
  router.push({ path: '/pagelist', query: { appId: appId, appName: appName } });
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

.app-icon {
  width: 50px;
  height: 50px;
}

.app-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}
</style>
