<template class="container">
  <div v-if="props && props.element">
    <component
      :is="
        props.type === 'container' ? `${props.element}_Design` : props.element
      "
      :props="props.props"
      :eid="props.id"
      @click.stop="showPanel(props.element)"
    />
  </div>
  <div v-else>点击选择卡片</div>
</template>

<script>
import { currentPanelStore } from '@lowcode/elements';
// import { CustomerComponents as CustomerComponentsLocal } from '@lowcode/customer';
export default {
  // components: { ...CustomerComponentsLocal },
  __name: 'Blank_Design',
  props: {
    props: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentPanel: currentPanelStore()
    };
  },
  methods: {
    showPanel(element) {
      const elementObj = {
        id: this.props.id,
        name: element
      };
      // console.log('blank', elementObj)
      this.currentPanel.set(elementObj);
    }
  }
};
</script>

<style scoped>
.container {
  padding: 10px 16px;
}
</style>
