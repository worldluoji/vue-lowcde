const modules = import.meta.glob('./**/*.vue');

export default (Vue) => {
  for (const path in modules) {
    modules[path]().then((mod) => {
      // console.log(path, mod.default, mod.default.__name);
      Vue.component(mod.default.__name, mod.default);
    });
  }
};
