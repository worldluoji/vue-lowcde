import SimpleTable from './SimpleTable/SimpleTable.vue';
import LButton from './LButton/LButton.vue';

export default (Vue) => {
  Vue.component('SimpleTable', SimpleTable);
  Vue.component('LButton', LButton);
};

import SimpleTableInfo from './SimpleTable/SimpleTable.json';
import LButtonInfo from './LButton/LButton.json';

export const BasicWebComponentsInfo = {
  SimpleTableInfo,
  LButtonInfo
};

export const BasicWebComponents = {
  SimpleTable,
  LButton
};
