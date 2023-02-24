const modules = import.meta.glob('./**/*.vue', { eager: true });
let components = {};
Object.values(modules).forEach((m) => {
  components[m.default.__name] = m.default;
});
// console.log(components);
export default (Vue) => {
  for (let k in components) {
    Vue.component(k, components[k]);
  }
};

export const BasicWebComponents = {
  ...components
};

// 组件信息
const modulesInfo = import.meta.glob('./**/*.json', { eager: true });
let infos = {};
Object.values(modulesInfo).forEach((m) => {
  infos[m.name] = m.default;
});
// console.log(infos);

export const BasicWebComponentsInfo = {
  ...infos
};
