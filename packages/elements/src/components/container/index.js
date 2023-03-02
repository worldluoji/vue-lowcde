const modules = import.meta.glob('./**/*.vue', { eager: true });
let components = {};
Object.values(modules).forEach((m) => {
  components[m.default.__name] = m.default;
});
// console.log(123, components);
export default (Vue) => {
  for (let k in components) {
    Vue.component(k, components[k]);
  }
};

export const ContainerComponents = {
  ...components
};

// 容器组件信息
const modulesInfo = import.meta.glob('./**/*.json', { eager: true });
let infos = {};
Object.values(modulesInfo).forEach((m) => {
  infos[m.name] = m.default;
});
// console.log(infos);

export const ContainerComponentsInfo = {
  ...infos
};
