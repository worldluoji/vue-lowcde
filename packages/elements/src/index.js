import BasicComponents,{ BasicComponentsInfo } from './components';
import Panels from './panels';
import ContainerComponents,{ ContainerComponentsInfo } from './components/container';
import store from './store';

export default {
    BasicComponents,
    Panels,
    ContainerComponents
}

export const canvasStore = store.Canvas;
export const currentPanelStore = store.CurrentPanel;
export const metaStore = store.Meta;

export const basicComponentsInfo = BasicComponentsInfo;
export const containerComponentsInfo = ContainerComponentsInfo;