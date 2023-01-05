import Image from './Image/Image.vue';
import NavBar from './NavBar/NavBar.vue';
import Offer from './Offer/Offer.vue';
import OfferList from './OfferList/OfferList.vue';
import SimpleTable from './SimpleTable/SimpleTable.vue';

export default (Vue)=>{
    Vue.component("Image", Image);
    Vue.component("NavBar", NavBar);
    Vue.component("Offer", Offer);
    Vue.component("OfferList", OfferList);
    Vue.component("SimpleTable", SimpleTable);
}


import ImageInfo from './Image/Image.json';
import NavBarInfo from './NavBar/NavBar.json';
import OfferInfo from './Offer/Offer.json';
import OfferListInfo from './OfferList/OfferList.json';
import SimpleTableInfo from './SimpleTable/SimpleTable.json';

export const BasicComponentsInfo = {
    ImageInfo,
    NavBarInfo,
    OfferInfo,
    OfferListInfo,
    SimpleTableInfo
}