import OfferList from './OfferList/OfferList.vue';
import OfferListInfo from './OfferList/OfferList.json';

export const install = (Vue) => {
  Vue.component('OfferList', OfferList);
};

export const CustomerComponents = {
  OfferList
};

export const CustomerComponentsInfo = {
  OfferListInfo
};
