import {
  implementCodeAsync,
  implementCodeSync
} from './utils/ProcodeHandler.js';

// window.__implementCodeAsync__ = implementCodeAsync;
// window.__implementCodeSync__ = implementCodeSync;

/**
 * 向window上挂载setSubSystemData、getSubSystemData方法
 * 不可修改
 */
if (!window.__implementCodeAsync__) {
  Object.defineProperties(window, {
    __implementCodeAsync__: {
      get() {
        return implementCodeAsync;
      },
      // eslint-disable-next-line no-unused-vars
      set(val) {
        // do nothing
      }
    },
    __implementCodeSync__: {
      get() {
        return implementCodeSync;
      },
      // eslint-disable-next-line no-unused-vars
      set(val) {
        // do nothing
      }
    }
  });
  // console.log('inject success..');
}
