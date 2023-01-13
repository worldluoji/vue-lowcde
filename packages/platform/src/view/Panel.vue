<template>
  <div v-if="current && current.id" class="panel">
    <component
      :is="`${current.name}Panel`"
      :key="current.id"
      :props="panelProps"
      @change="change"
    ></component>
    <hr />
    <AtomicAttributeBox :props="panelProps.atomicAttrs" @change="change" />
    <hr />
    <el-button @click="save">保存</el-button>
    <el-button @click="cancel">取消</el-button>
    <el-button
      v-show="current.name !== 'Blank'"
      type="danger"
      @click="deleteComponent"
      >删除</el-button
    >
  </div>
</template>

<script>
import { CustomerComponentPanels as CustomerComponentPanelsLocal } from '@lowcode/customer';
export default {
  components: {
    ...CustomerComponentPanelsLocal
  }
};
</script>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { metaStore, currentPanelStore } from '@lowcode/elements';

const meta = metaStore();
const currentPanel = storeToRefs(currentPanelStore());
const current = currentPanel.get;
const panelProps = ref({});

watch(current, (newVal) => {
  // console.log(111, newVal)
  let element = meta.getElementById(newVal.id);
  // console.log('new', p.currentId)
  if (element && element.value) {
    panelProps.value = element.value.props;
    // console.log(222, panelProps.value)
  }
});

const change = (p) => {
  // console.log('before change', p)
  if (p.atomicAttrs) {
    delete panelProps.value.atomicAttrs;
    panelProps.value.atomicAttrs = p.atomicAttrs;
  } else {
    Object.assign(panelProps.value, p);
  }
  // console.log('after change', panelProps.value)
};

const save = () => {
  // console.log(111, panelProps.value, current)
  meta.updateProps(current.value.id, panelProps.value);
};

const emits = defineEmits(['cancel', 'deleteComponent']);
const cancel = () => {
  emits('cancel');
};

const deleteComponent = () => {
  const eid = current.value.id;
  if (eid) {
    ElMessageBox.confirm('确认删除吗？', '删除组件（不可逆）', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        emits('deleteComponent', current.value.id);
        ElMessage({
          type: 'success',
          message: '删除成功'
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '删除失败，请稍后再试'
        });
      });
  }
};
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
</style>
