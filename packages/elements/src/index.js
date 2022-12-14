import BasicWebComponentsIn, {
  BasicWebComponentsInfo
} from './components/basic/web';
import BasicMobileComponentsIn, {
  BasicMobileComponentsInfo
} from './components/basic/mobile';
import Panels from './panels';
import ContainerComponentsIn, {
  ContainerComponentsInfo
} from './components/container';
import store from './store';

export default {
  BasicWebComponentsIn,
  BasicMobileComponentsIn,
  ContainerComponentsIn,
  Panels
};

export const canvasStore = store.Canvas;
export const currentPanelStore = store.CurrentPanel;
export const metaStore = store.Meta;

export const basicWebComponentsInfo = BasicWebComponentsInfo;
export const basicMobileComponentsInfo = BasicMobileComponentsInfo;
export const containerComponentsInfo = ContainerComponentsInfo;
