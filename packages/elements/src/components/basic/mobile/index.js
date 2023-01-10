import SimpleImage from './SimpleImage/SimpleImage.vue';
import NavBar from './NavBar/NavBar.vue';
import Offer from './Offer/Offer.vue';
import OfferList from './OfferList/OfferList.vue';

export default (Vue) => {
  Vue.component('SimpleImage', SimpleImage);
  Vue.component('NavBar', NavBar);
  Vue.component('Offer', Offer);
  Vue.component('OfferList', OfferList);
};

import SimpleImageInfo from './SimpleImage/SimpleImage.json';
import NavBarInfo from './NavBar/NavBar.json';
import OfferInfo from './Offer/Offer.json';
import OfferListInfo from './OfferList/OfferList.json';

export const BasicMobileComponentsInfo = {
  SimpleImageInfo,
  NavBarInfo,
  OfferInfo,
  OfferListInfo
};

export const BasicMobileComponents = {
  SimpleImage,
  NavBar,
  Offer,
  OfferList
};
