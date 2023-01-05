import Image from './Image/Image.vue';
import NavBar from './NavBar/NavBar.vue';
import Offer from './Offer/Offer.vue';
import OfferList from './OfferList/OfferList.vue';

export default (Vue)=>{
    Vue.component("Image", Image);
    Vue.component("NavBar", NavBar);
    Vue.component("Offer", Offer);
    Vue.component("OfferList", OfferList);
}

import ImageInfo from './Image/Image.json';
import NavBarInfo from './NavBar/NavBar.json';
import OfferInfo from './Offer/Offer.json';
import OfferListInfo from './OfferList/OfferList.json';

export const BasicMobileComponentsInfo = {
    ImageInfo,
    NavBarInfo,
    OfferInfo,
    OfferListInfo,
}