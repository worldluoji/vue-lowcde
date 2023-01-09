import BasicWebComponents, {
  BasicWebComponentsInfo
} from './components/basic/web';
import BasicMobileComponents, {
  BasicMobileComponentsInfo
} from './components/basic/mobile';
import Panels from './panels';
import ContainerComponents, {
  ContainerComponentsInfo
} from './components/container';
import store from './store';

export default {
  BasicWebComponents,
  BasicMobileComponents,
  ContainerComponents,
  Panels
};

export const canvasStore = store.Canvas;
export const currentPanelStore = store.CurrentPanel;
export const metaStore = store.Meta;

export const basicWebComponentsInfo = BasicWebComponentsInfo;
export const basicMobileComponentsInfo = BasicMobileComponentsInfo;
export const containerComponentsInfo = ContainerComponentsInfo;
