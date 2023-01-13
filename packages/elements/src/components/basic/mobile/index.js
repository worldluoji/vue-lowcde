import SimpleImage from './SimpleImage/SimpleImage.vue';
import NavBar from './NavBar/NavBar.vue';
import Offer from './Offer/Offer.vue';

export default (Vue) => {
  Vue.component('SimpleImage', SimpleImage);
  Vue.component('NavBar', NavBar);
  Vue.component('Offer', Offer);
};

import SimpleImageInfo from './SimpleImage/SimpleImage.json';
import NavBarInfo from './NavBar/NavBar.json';
import OfferInfo from './Offer/Offer.json';

export const BasicMobileComponentsInfo = {
  SimpleImageInfo,
  NavBarInfo,
  OfferInfo
};

export const BasicMobileComponents = {
  SimpleImage,
  NavBar,
  Offer
};
