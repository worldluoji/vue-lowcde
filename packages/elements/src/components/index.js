import Image from './Image//Image.vue';
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
