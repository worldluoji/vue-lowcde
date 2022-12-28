<template>
    <div>
        <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-main>
            <div class="page-list">
                <div v-for="page in pageList" :key="page.id">
                    <el-card shadow="hover" @click="toDesigner(page.id)"> 
                        <p>{{  page.name }} </p>
                        <p>{{  page.path }} </p>
                    </el-card>
                </div>
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
                        <el-button @click="dialogNewPageVisible = false">取消</el-button>
                        <el-button type="primary" @click="addNewPage">
                            确定
                        </el-button>
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
import { useRouter, useRoute } from 'vue-router';
import Header from '../components/Header.vue';
const $request = inject('$request');
const pageList = ref([]);
const route = useRoute();
const appId = route.query.appId;
onBeforeMount(async () => {
    console.log('appId', appId);
    if (appId) {
        const res = await $request.get(`/v1/page/list?appId=${appId}`);
        pageList.value = res;
    }
});
const dialogNewPageVisible = ref(false);

const form = reactive({
  name: '',
  path: '',
  desc: '',
});
const formLabelWidth = '140px';
const addNewPage = async () => {
    const res = await $request.post('/v1/page/create', {name: form.name, path: form.path, desc: form.desc, appId: Number(appId)});
    if (res.id) {
        ElMessage({
            message: '添加成功',
            type: 'success',
        });
        pageList.value.push(res);
    } else {
        ElMessage({
            message: '添加失败，请稍后再试',
            type: 'warning',
        })
    }
    dialogNewPageVisible.value = false;
}

const router = useRouter()
const toDesigner = (pageId) => {
    router.push({path: '/designer', query: {appId: appId, pageId: pageId}});
}
</script>

<style scoped>
    .page-list {
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

</style>