<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>弹窗列表</span>
              <el-button text @click="newModalVisible = true">+</el-button>
              <el-button v-show="selected" text @click.stop="">-</el-button>
            </div>
          </template>
          <div
            v-for="m in modalList"
            :key="m.id"
            class="text item"
            @click="clickModal(m)"
          >
            {{ m.name }}
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <div class="modal-config">
          <div v-if="!selected || !selected.type" class="else-area">
            <span>从左侧添加或选择一个弹窗进行配置</span>
          </div>
          <div v-else>
            <div v-if="selected.type === 'notification'">notification</div>
            <div v-else-if="selected.type === 'dialog'">dialog</div>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog v-model="newModalVisible" title="新建弹窗">
      <el-form :model="newModalForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="newModalForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="newModalForm.type" placeholder="请选择类型">
            <el-option label="notification" value="notification" />
            <el-option label="dialog" value="dialog" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="newModalForm.desc" autocomplete="off" />
        </el-form-item>
        <div v-if="newModalForm.type === 'notification'">
          <NotificationConfig
            :form-label-width="formLabelWidth"
            :new-modal-form="newModalForm"
          />
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newModalVisible = false">取消</el-button>
          <el-button type="primary" @click="addModal"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { inject, ref, reactive, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import NotificationConfig from '../components/modalconfig/NotificationConfig.vue';
const modalStore = inject('$modalStore');
const modals = storeToRefs(modalStore());
const modalList = ref((modals.get || {}).value);
const selected = ref();
const $request = inject('$request');

const p = defineProps({
  pageId: {
    type: String,
    required: true
  }
});

const clickModal = (m) => {
  selected.value = m;
};

const newModalVisible = ref(false);
const formLabelWidth = '140px';
let newModalForm = reactive({});

onBeforeMount(async () => {
  let res = await $request.get(`/v1/modal/list?pageId=${p.pageId}`);
  if (res && res.code == 0) {
    modalList.value = res.data;
  }
});

const addModal = async () => {
  // console.log(newModalForm);
  // 调用后端接口存入数据库， 并更新store
  let content = newModalForm;
  const name = newModalForm.name;
  const type = newModalForm.type;
  const desc = newModalForm.desc;
  delete content.name;
  delete content.type;
  delete content.desc;
  let res = await $request.post('/v1/modal/create', {
    name: name,
    type: type,
    desc: desc,
    content: JSON.stringify(content),
    pageId: Number(p.pageId)
  });
  if (res && res.code == 0) {
    modalList.value.push(res.data);
    ElementPlus.ElMessage({
      message: '添加成功',
      type: 'success'
    });
  } else {
    ElementPlus.ElMessage({
      message: res.message || '添加失败，请稍后再试',
      type: 'warning'
    });
  }
  newModalVisible.value = false;
  newModalForm = reactive({});
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 1rem;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  height: 100vh;
}

.aside {
  width: 250px;
}

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

.common-layout {
  height: 100vh;
  width: 987px;
}
.else-area {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
