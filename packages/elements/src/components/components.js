import { BasicWebComponentsInfo } from './basic/web';
import { BasicMobileComponentsInfo } from './basic/mobile';
import { ContainerComponentsInfo } from './container';

export default {
    ...BasicWebComponentsInfo,
    ...BasicMobileComponentsInfo,
    ...ContainerComponentsInfo
}