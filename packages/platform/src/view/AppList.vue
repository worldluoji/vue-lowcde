<template>
    <div>
        <el-container>
        <el-header>
            <TopAreaLeft />
        </el-header>
        <el-main>
            <p class="title-font">应用列表</p>
            <div class="app-list">
                <el-col :span="6" v-for="app in appList" :key="app.id">
                    <el-card shadow="hover"> {{  app.appName }} </el-card>
                </el-col>
            </div>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
    </el-container>
    </div>
    
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import TopAreaLeft from '../components/TopAreaLeft.vue';
const appList = ref([])
onBeforeMount(() => {
    // TODO 调用接口从后端获取
    appList.value = [{appId: 1, appName: 'Test1'}, {appId: 2, appName: 'Test2'}]
});
</script>

<style scoped>
    .app-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        height: 70vh;
        border: 1px solid;
    }

    .el-card {
        text-align: center;
    }

    .title-font {
        font-size: 1.5rem;
        font-weight: 800;
        text-align: center;
    }
</style>