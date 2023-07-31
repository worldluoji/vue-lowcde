import BasicWebComponentsIn, { BasicWebComponentsInfo } from './components/web';
import BasicMobileComponentsIn, {
  BasicMobileComponentsInfo
} from './components/mobile';
import Panels from './panels';
import ContainerComponentsIn, {
  ContainerComponentsInfo
} from './components/container';
import store from './store';

import Dragger from './dragger/Dragger.vue';

import './globalInjection.js';

export default {
  BasicWebComponentsIn,
  BasicMobileComponentsIn,
  ContainerComponentsIn,
  Panels
};

export const canvasStore = store.Canvas;
export const currentPanelStore = store.CurrentPanel;
export const metaStore = store.Meta;
export const langStore = store.Lang;

export const basicWebComponentsInfo = BasicWebComponentsInfo;
export const basicMobileComponentsInfo = BasicMobileComponentsInfo;
export const containerComponentsInfo = ContainerComponentsInfo;

export const DraggerLayout = Dragger;
