<template>
  <div class="designer">
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
            <div class="drag-content">
              <draggable
                class="list-group"
                :list="content"
                :disabled="!enabled"
                item-key="id"
                ghost-class="ghost"
                group="materia"
                @start="dragging = true"
                @end="dragging = false"
                @change="change"
              >
                <template #item="{ element, index }">
                  <div
                    :class="[
                      { 'list-item': true },
                      { 'list-item-effect': element.type !== 'container' },
                      { 'element-selected': currentId === element.id }
                    ]"
                  >
                    <FastOperation v-show="currentId === element.id" />
                    <component
                      :is="
                        element.type === 'container'
                          ? `${element.name}_Design`
                          : element.name
                      "
                      :key="index"
                      :props="element.props"
                      :eid="element.id"
                      :data-index="index"
                      @click="showPanel(element)"
                    ></component>
                  </div>
                </template>
              </draggable>
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
import { inject } from 'vue';
import FastOperation from '../components/FastOperation.vue';
// import { CustomerComponents as CustomerComponentsLocal } from '@lowcode/customer'; // 本地脚手架定制时，设计器直接本地加载自定义组件

export default {
  name: 'Designer',
  components: {
    draggable,
    Operation,
    Panel,
    LeftSide,
    FastOperation
    // ...CustomerComponentsLocal
  },
  setup() {
    // inject() can only be used inside setup() or functional components.
    const metaStore = inject('$metaStore');
    const canvasStore = inject('$canvasStore');
    const currentPanelStore = inject('$currentPanelStore');
    const canvas = canvasStore();
    const currentPanel = currentPanelStore();
    const meta = metaStore();
    return {
      meta,
      canvas,
      currentPanel
    };
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      content: [],
      depMap: new Map(),
      canvasWidth: '987px',
      pageId: '',
      appId: '',
      metaId: 0,
      request: inject('$request')
    };
  },
  computed: {
    currentId: function (newVal, oldVal) {
      if (newVal && oldVal && newVal.id === oldVal.id) {
        return;
      }
      const currentElement = this.currentPanel.get;
      return currentElement ? currentElement.id : '';
    }
  },
  async beforeMount() {
    this.pageId = this.$route.query.pageId;
    this.appId = this.$route.query.appId;
    let appPageIdCache = this.meta.getAppPageId;
    const realAppPageId = `${this.pageId}&${this.appId}`;
    // 没有缓存，或者缓存的页面与当前页面不一致，就重新请求
    if (this.pageId && (!appPageIdCache || appPageIdCache !== realAppPageId)) {
      const res = await this.request.get(`/v1/meta/get?pageId=${this.pageId}`);
      if (res && res.code == 0 && res.data && res.data.id) {
        this.meta.setId(res.data.id);
        this.meta.setAppPageId(realAppPageId);
        if (res.data.content) {
          this.meta.set(JSON.parse(res.data.content), true);
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
    this.canvas.setDesign(true);
  },
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
      if (res.code == 0) {
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
    },
    change(data) {
      // console.log(data);
      if (data && data.added && data.added.element && data.added.element.id) {
        this.meta.getDepMap.set(data.added.element.id, {
          value: data.added.element
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.designer {
  --top-white-length: 30px;
}

.el-main {
  display: flex;
  // align-items: center;
  justify-content: center;
  overflow: visible;
  margin-top: var(--top-white-length, 30px);
  padding: 0 var(--el-main-padding);
}

.el-aside {
  width: 300px;
  margin-top: var(--top-white-length, 30px);
}

.drag-content {
  width: v-bind(canvasWidth);
  min-height: 100vh;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f0f2f5;
}

.list-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  min-height: 100vh;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}

.list-item {
  position: relative;
}

.list-item-effect {
  padding: 5px 0px;
  &:hover {
    border: 1px dashed blue;
  }
}
</style>
