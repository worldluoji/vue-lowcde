<template>
  <div class="registry">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="注册表" name="register">
        <el-table
          v-if="registTableData && registTableData.length > 0"
          :data="registTableData"
          style="width: 100%"
        >
          <el-table-column type="index" width="100" />
          <el-table-column prop="registerName" label="注册表名" />
          <el-table-column prop="packageName" label="组件包名" />
          <el-table-column prop="version" label="组件版本" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-popconfirm
                :title="`确认删除注册表${scope.row.registerName}吗？`"
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
        <p v-else class="no-data">暂无数据</p>
        <div class="newItem">
          <el-button @click="dialogNewVisible = true">+</el-button>
          <el-dialog v-model="dialogNewVisible" title="新增自定义卡组件">
            <el-form :model="form">
              <el-form-item label="注册表名" :label-width="formLabelWidth">
                <el-input v-model="form.registerName" autocomplete="off" />
              </el-form-item>
              <el-form-item label="组件包名" :label-width="formLabelWidth">
                <el-input v-model="form.packageName" autocomplete="off" />
              </el-form-item>
              <el-form-item label="组件版本" :label-width="formLabelWidth">
                <el-input v-model="form.version" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogNewVisible = false">取消</el-button>
                <el-button type="primary" @click="addNewItem"> 确定 </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onBeforeMount } from 'vue';

const p = defineProps({
  appId: {
    type: String,
    default: ''
  }
});

const $request = inject('$request');

const activeNames = ref(['register']);
const handleChange = (val) => {
  console.log(val);
};

const registTableData = ref([]);
onBeforeMount(async () => {
  if (p.appId !== '') {
    let res = await $request.get(`/v1/registry/list?appId=${p.appId}`);
    if (res) {
      registTableData.value = res;
      // console.log('1res', registTableData.value, res);
    }
  }
});

const dialogNewVisible = ref(false);
const formLabelWidth = '140px';
const form = reactive({
  registerName: '',
  packageName: '',
  version: ''
});

const addNewItem = async () => {
  let res = await $request.post('/v1/registry/create', {
    ...form,
    appId: Number(p.appId)
  });
  if (res.id) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    });
    registTableData.value.push(res);
  } else {
    ElMessage({
      message: '网络忙，请稍后再试',
      type: 'warning'
    });
  }
};

const handleDelete = async (id) => {
  // console.log('handleDelete', id);
  let res = await $request.post('/v1/registry/delete', {
    id
  });
  if (res === 'success') {
    ElMessage({
      message: '删除成功',
      type: 'success'
    });
    registTableData.value = registTableData.value.filter((v) => v.id !== id);
  } else {
    ElMessage({
      message: '网络忙,请稍后再试',
      type: 'warning'
    });
  }
};
</script>

<style scoped lang="scss">
.registry {
  padding: 1rem 1rem;
}

.newItem {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 1rem;
}

.no-data {
  text-align: center;
}
</style>
