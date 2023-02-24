import { BasicWebComponentsInfo } from './web';
import { BasicMobileComponentsInfo } from './mobile';
import { ContainerComponentsInfo } from './container';

export default {
  ...BasicWebComponentsInfo,
  ...BasicMobileComponentsInfo,
  ...ContainerComponentsInfo
};
