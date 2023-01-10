import SimpleTable from './SimpleTable/SimpleTable.vue';

export default (Vue) => {
  Vue.component('SimpleTable', SimpleTable);
};

import SimpleTableInfo from './SimpleTable/SimpleTable.json';

export const BasicWebComponentsInfo = {
  SimpleTableInfo
};

export const BasicWebComponents = {
  SimpleTable
};
