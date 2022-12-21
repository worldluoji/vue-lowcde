<template>
    <div>
      <el-container>
        <el-header>
          <Operation :content="content"  @changeWidth="changeWidth"/>
        </el-header>
        <el-container>
          <el-aside>
            <LeftSide />
          </el-aside>
          <el-container>
            <el-main>
              <div class="drag-content" v-dragcontent="content" v-deps="depMap">
                <div class="top-white"></div>
                <draggable 
                  class="list-group" 
                  v-dragcontent="content"
                  :list="content"
                  :disabled="!enabled"
                  item-key="id"
                  ghost-class="ghost"
                  @start="dragging = true"
                  @end="dragging = false">
                  <template #item="{ element, index }" class="list-group-item">
                    <component 
                      :is="element.name"
                      :key="index"
                      :props="element.props"
                      :eid="element.id"
                      :data-index="index"
                      @click="showPanel(element)"
                    ></component>
                  </template>
                </draggable>
                <div class="top-white"></div>
              </div>
              <el-aside>
                <Panel @cancel="cancelPanel"/>
              </el-aside>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
          </el-container>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable'
  import Operation from './Operation.vue' 
  import Panel from './Panel.vue'
  import LeftSide from './LeftSide.vue'
  import { metaStore, canvasStore, currentPanelStore } from '@lowcode/elements'

  export default {
    name: 'Designer',
    components: {
      draggable,
      Operation,
      Panel,
      LeftSide,
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
        canvasWidth: '987px'
      }
    },
    beforeMount() {
      this.content = this.meta.get
      this.depMap = this.meta.getDepMap
      this.canvasStore.setDesign(true)
    },
    methods: {
      cancelPanel() {
        this.currentPanel.set({})
      },
      showPanel(element) {
        this.currentPanel.set(element)
      },
      changeWidth(val) {
        this.canvasWidth = `${val}px`
      }
    }
  }
  </script>
  
<style>
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
    min-height: 500px;
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
</style>
  