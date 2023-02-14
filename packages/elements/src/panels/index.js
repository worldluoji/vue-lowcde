import SimpleImagePanel from './SimpleImage/SimpleImagePanel.vue';
import NavBarPanel from './NavBar/NavBarPanel.vue';
import OfferPanel from './Offer/OfferPanel.vue';
import BlankPanel from './Blank/BlankPanel.vue';
import ColumnListPanel from './ColumnList/ColumnListPanel.vue';
import RowListPanel from './RowList/RowListPanel.vue';
import AtomicAttributeBox from './AtomicAttribute/AtomicAttributeBox.vue';
import SimpleTablePanel from './SimpleTable/SimpleTablePanel.vue';
import RelativeContainerPanel from './RelativeContainer/RelativeContainerPanel.vue';
import LButtonPanel from './LButton/LButtonPanel.vue';

export default (Vue) => {
  Vue.component('SimpleImagePanel', SimpleImagePanel);
  Vue.component('NavBarPanel', NavBarPanel);
  Vue.component('OfferPanel', OfferPanel);
  Vue.component('BlankPanel', BlankPanel);
  Vue.component('ColumnListPanel', ColumnListPanel);
  Vue.component('RowListPanel', RowListPanel);
  Vue.component('AtomicAttributeBox', AtomicAttributeBox);
  Vue.component('SimpleTablePanel', SimpleTablePanel);
  Vue.component('RelativeContainerPanel', RelativeContainerPanel);
  Vue.component('LButtonPanel', LButtonPanel);
};
