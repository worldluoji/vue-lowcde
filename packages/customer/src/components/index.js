import SplitLine from './SplitLine/SplitLine.vue';
import SplitLineInfo from './SplitLine/SplitLine.json';

export const install = (Vue) => {
  Vue.component('SplitLine', SplitLine);
};

export const CustomerComponents = {
  SplitLine
};

export const CustomerComponentsInfo = {
  SplitLineInfo
};
