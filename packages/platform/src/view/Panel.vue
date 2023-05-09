<template>
  <div v-if="current && current.id" class="panel">
    <el-tabs v-model="activeName" type="card" class="panel-tabs">
      <el-tab-pane label="属性" name="first">
        <el-scrollbar height="70vh">
          <component
            :is="`${current.name}Panel`"
            :key="current.id"
            :props="panelProps"
            @change="change"
          ></component>
          <div class="btn-group">
            <el-button @click="save">保存</el-button>
            <el-button @click="cancel">取消</el-button>
            <el-button
              v-show="current.name !== 'Blank'"
              type="danger"
              @click="deleteComponent"
              >删除</el-button
            >
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="样式" name="second">
        <el-scrollbar height="70vh">
          <AtomicAttributeBox
            :props="panelProps.atomicAttrs"
            @change="change"
          />
          <div class="btn-group">
            <el-button @click="cancel">取消</el-button>
            <el-button
              v-show="current.name !== 'Blank'"
              type="danger"
              @click="deleteComponent"
              >删除</el-button
            >
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="高级" name="高级">
        <el-scrollbar height="70vh">
          <div>
            <el-button text @click="drawVisible = true"> onMounted </el-button>
            <el-drawer
              v-model="drawVisible"
              title="onMounted声明周期高代码编辑"
              direction="ttb"
              :append-to-body="true"
            >
              <JSEditor
                :model-value="modelValue"
                @update:modelValue="changeEditorContent"
              />
            </el-drawer>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<!-- <script>
import { CustomerComponentPanels as CustomerComponentPanelsLocal } from '@lowcode/customer';
export default {
  components: {
    ...CustomerComponentPanelsLocal
  }
};
</script> -->

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { metaStore, currentPanelStore } from '@lowcode/elements';
import { JSEditor } from '@lowcode/helper';

const meta = metaStore();
const currentPanel = storeToRefs(currentPanelStore());
const current = currentPanel.get;
const panelProps = ref({});
const drawVisible = ref(false);
const modelValue = ref('');

watch(current, (newVal) => {
  let element = meta.getElementById(newVal.id);
  if (element && element.value) {
    panelProps.value = element.value.props;
  }
  modelValue.value = panelProps.value.onMountedCode || '';
});

const change = (p) => {
  if (p.atomicAttrs) {
    delete panelProps.value.atomicAttrs;
    panelProps.value.atomicAttrs = p.atomicAttrs;
  } else {
    Object.assign(panelProps.value, p);
  }
};

const save = () => {
  meta.updateProps(current.value.id, panelProps.value);
};

const changeEditorContent = (content) => {
  // console.log(content);
  panelProps.value.onMountedCode = content;
  save();
};

const emits = defineEmits(['cancel', 'deleteComponent']);
const cancel = () => {
  emits('cancel');
};

const deleteComponent = () => {
  const eid = current.value.id;
  if (eid) {
    ElementPlus.ElMessageBox.confirm('确认删除吗？', '删除组件（不可逆）', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        emits('deleteComponent', current.value.id);
        ElementPlus.ElMessage({
          type: 'success',
          message: '删除成功'
        });
      })
      .catch(() => {
        ElementPlus.ElMessage({
          type: 'info',
          message: '删除失败，请稍后再试'
        });
      });
  }
};

const activeName = ref('first');
</script>

<style scoped>
.panel {
  background-color: #fff;
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 100px;
  right: 0;
  color: #000;
  border: 1px solid #eee;
  border-top: 0;
  border-bottom: 0;
  padding: 12px;
  z-index: 10;
}

.panel-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.btn-group {
  margin-top: 20px;
}
</style>
