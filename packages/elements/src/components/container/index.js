import Blank from './Blank/Blank.vue';
import ColumnList from './ColumnList/ColumnList.vue';
import RowList from './RowList/RowList.vue';

export default (Vue) => {
  Vue.component('Blank', Blank);
  Vue.component('ColumnList', ColumnList);
  Vue.component('RowList', RowList);
};

import ColumnListInfo from './ColumnList/ColumnList.json';
import RowListInfo from './RowList/RowList.json';
export const ContainerComponentsInfo = {
  ColumnListInfo,
  RowListInfo
};
