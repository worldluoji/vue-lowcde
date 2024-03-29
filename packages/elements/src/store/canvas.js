const canvasStore = Pinia.defineStore('canvas', {
  state: () => {
    return {
      canvasWidth: '',
      design: false
    };
  },
  getters: {
    getWidth(state) {
      return state.canvasWidth;
    },
    isDesign(state) {
      return state.design;
    }
  },
  actions: {
    setWidth(c) {
      this.canvasWidth = c;
    },
    setDesign(d) {
      this.design = d;
    }
  }
});

export default canvasStore;
