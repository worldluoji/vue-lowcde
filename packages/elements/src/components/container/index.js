import Blank from './Blank/Blank.vue';
import ColumnList from './ColumnList/ColumnList.vue';
import RowList from './RowList/RowList.vue';
import RelativeContainer from './RelativeContainer/RelativeContainer.vue';

export default (Vue) => {
  Vue.component('Blank', Blank);
  Vue.component('ColumnList', ColumnList);
  Vue.component('RowList', RowList);
  Vue.component('RelativeContainer', RelativeContainer);
};

import ColumnListInfo from './ColumnList/ColumnList.json';
import RowListInfo from './RowList/RowList.json';
import RelativeContainerInfo from './RelativeContainer/RelativeContainer.json';
export const ContainerComponentsInfo = {
  ColumnListInfo,
  RowListInfo,
  RelativeContainerInfo
};

export const ContainerComponents = {
  ColumnList,
  RowList,
  RelativeContainer
};
