<template>
  <div class="relativePanel">
    <div>
      <el-form-item label="高度">
        <el-input
          v-model="data.height"
          type="text"
          placeholder="请输入容器高度"
          @change="change"
        />
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-input
          v-model="data.backgroundColor"
          type="text"
          placeholder=""
          @change="change"
        />
      </el-form-item>
    </div>
    <el-divider border-style="dashed" />
    <div>
      <p>新增组件</p>
      <el-form :label-position="labelPosition" :model="newItem">
        <el-form-item label="name">
          <el-input v-model="newItem.name" />
        </el-form-item>
        <el-form-item label="top">
          <el-input v-model="newItem.top" />
        </el-form-item>
        <el-form-item label="left">
          <el-input v-model="newItem.left" />
        </el-form-item>
        <el-form-item label="right">
          <el-input v-model="newItem.right" />
        </el-form-item>
        <el-form-item label="bottom">
          <el-input v-model="newItem.bottom" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addItem(newItem)"> 新增 </el-button>
          <el-button @click="reset"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <p>已添加组件</p>
      <div v-for="it in itemList" :key="it.id">
        <el-form :label-position="labelPosition" :model="it">
          <el-form-item label="name">
            <el-input v-model="it.name" disabled />
          </el-form-item>
          <el-form-item label="top">
            <el-input v-model="it.top" />
          </el-form-item>
          <el-form-item label="left">
            <el-input v-model="it.left" />
          </el-form-item>
          <el-form-item label="right">
            <el-input v-model="it.right" />
          </el-form-item>
          <el-form-item label="bottom">
            <el-input v-model="it.bottom" />
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="deleteItem(it.id)">
              删除
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import uuid from '@lowcode/helper/src/UUID/uuid';
import { ref, reactive } from 'vue';
const p = defineProps({
  props: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
const data = reactive({
  height: p.props.height || '100px',
  backgroundColor: p.props.backgroundColor || ''
});
const emit = defineEmits(['change']);

const labelPosition = ref('right');
let newItem = reactive({
  name: '',
  top: '',
  left: '',
  right: '',
  bottom: ''
});

const itemList = ref(p.props.children || []);
const reset = () => {
  newItem.name = '';
  newItem.top = '';
  newItem.left = '';
};
const change = () => {
  const finalData = {
    ...data,
    children: itemList.value
  };
  emit('change', finalData);
};
const addItem = (item) => {
  let newItem = {
    ...item,
    id: uuid(),
    props: {}
  };
  itemList.value.push(newItem);
  change();
};
const deleteItem = (id) => {
  for (let i = 0; i < itemList.value.length; i++) {
    if (itemList.value[i].id === id) {
      itemList.value.splice(i, 1);
      break;
    }
  }
  change();
};
</script>

<style scoped>
.relativePanel {
  width: 100%;
}
</style>
