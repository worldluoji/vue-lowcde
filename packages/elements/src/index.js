import BasicComponents from './components';
import Panels from './panels';
import ContainerComponents from './components/container';
import store from './store';

export default {
    BasicComponents,
    Panels,
    ContainerComponents
}

export const canvasStore = store.Canvas;
export const currentPanelStore = store.CurrentPanel;
export const metaStore = store.Meta;