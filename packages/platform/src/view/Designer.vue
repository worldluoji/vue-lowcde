<template>
  <div>
    <el-container>
      <el-header>
        <Operation :content="content" @changeWidth="changeWidth" @save="save" />
      </el-header>
      <el-container>
        <el-aside>
          <LeftSide />
        </el-aside>
        <el-container>
          <el-main>
            <div v-dragcontent="content" v-deps="depMap" class="drag-content">
              <div class="top-white"></div>
              <draggable
                v-dragcontent="content"
                class="list-group"
                :list="content"
                :disabled="!enabled"
                item-key="id"
                ghost-class="ghost"
                @start="dragging = true"
                @end="dragging = false"
              >
                <template #item="{ element, index }">
                  <div :class="[{ 'list-item': element.type !== 'Container' }]">
                    <component
                      :is="element.name"
                      :key="index"
                      :props="element.props"
                      :eid="element.id"
                      :data-index="index"
                      @click="showPanel(element)"
                    ></component>
                  </div>
                </template>
              </draggable>
              <div class="top-white"></div>
            </div>
            <Panel @cancel="cancelPanel" @deleteComponent="deleteComponent" />
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Operation from './Operation.vue';
import Panel from './Panel.vue';
import LeftSide from './LeftSide.vue';
import { metaStore, canvasStore, currentPanelStore } from '@lowcode/elements';
import { inject } from 'vue';
// import { CustomerComponents as CustomerComponentsLocal } from '@lowcode/customer'; // 本地脚手架定制时，设计器直接本地加载自定义组件

export default {
  name: 'Designer',
  components: {
    draggable,
    Operation,
    Panel,
    LeftSide
    // ...CustomerComponentsLocal
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      content: [],
      depMap: new Map(),
      meta: metaStore(),
      currentPanel: currentPanelStore(),
      canvasStore: canvasStore(),
      canvasWidth: '987px',
      pageId: '',
      appId: '',
      metaId: 0,
      request: inject('$request')
    };
  },
  async beforeMount() {
    this.pageId = this.$route.query.pageId;
    this.appId = this.$route.query.appId;
    let appPageIdCache = this.meta.getAppPageId;
    const realAppPageId = `${this.pageId}&${this.appId}`;
    // console.log(1, appPageIdCache, realAppPageId);
    // 没有缓存，或者缓存的页面与当前页面不一致，就重新请求
    if (this.pageId && (!appPageIdCache || appPageIdCache !== realAppPageId)) {
      // console.log(222, this.pageId);
      const res = await this.request.get(`/v1/meta/get?pageId=${this.pageId}`);
      console.log(res);
      if (res && res.id) {
        this.meta.setId(res.id);
        this.meta.setAppPageId(realAppPageId);
        if (res.content) {
          this.meta.set(JSON.parse(res.content), true);
        }
      }
    }
    // 这里还是不一致，说明没有请求到东东，应该将缓存清空
    appPageIdCache = this.meta.getAppPageId;
    if (appPageIdCache !== realAppPageId) {
      this.meta.set([]);
      this.meta.setDepMap(new Map());
      this.meta.setId(0);
      this.meta.setAppPageId(realAppPageId);
    }

    this.content = this.meta.get;
    this.depMap = this.meta.getDepMap;
    this.metaId = this.meta.getId;
    this.canvasStore.setDesign(true);
  },
  // mounted() {
  //   const s = document.createElement('script');
  //   const url =
  //     'http://localhost:8099/cutomerElements/1.0.0/cutomerElements.umd.cjs';
  //   s.type = 'text/javascript';
  //   s.src = url;
  //   s.onload = () => {
  //     console.log(window, window.location, window.cutomerElements);
  //     Object.assign(
  //       this.$.components,
  //       window.cutomerElements.CustomerComponents
  //     );
  //     console.log(this.$.components);
  //     this.$forceUpdate();
  //   };
  //   document.body.appendChild(s);
  // },
  methods: {
    cancelPanel() {
      this.currentPanel.set({});
    },
    showPanel(element) {
      this.currentPanel.set(element);
    },
    changeWidth(val) {
      this.canvasWidth = `${val}px`;
    },
    deleteComponent(eid) {
      // console.log(222, eid);
      this.meta.delete(eid);
      this.content = this.meta.get;
      this.depMap = this.meta.getDepMap;
      this.cancelPanel();
    },
    async save() {
      const res = await this.request.post('/v1/meta/save', {
        content: JSON.stringify(this.meta.get),
        pageId: Number(this.pageId),
        id: this.metaId
      });
      if (res.id) {
        ElementPlus.ElMessage({
          message: '保存成功',
          type: 'success'
        });
      } else {
        ElementPlus.ElMessage({
          message: '保存失败，请稍后再试',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-aside {
  width: 300px;
}

.drag-content {
  width: v-bind(canvasWidth);
  min-height: 100vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f0f2f5;
  margin-top: 10px;
}

.top-white {
  height: 30px;
}

.list-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}

.list-item {
  padding: 5px 0px;
  &:hover {
    border: 1px dashed blue;
  }
}
</style>
