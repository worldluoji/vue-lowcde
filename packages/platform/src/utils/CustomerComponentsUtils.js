import { request } from '@lowcode/helper';
const $request = request.$request;

const STATIC_RES_URL = `${import.meta.env.VITE_STATIC_RES_URL}`;
export async function getCustomerComponents(appId) {
  let registries = await $request.get(`/v1/registry/list?appId=${appId}`);
  //   console.log('1', registries);
  let customerComponents = {};
  let customerPanels = {};
  let customerComponentsInfo = {};
  if (registries && registries.length > 0) {
    for (let it of registries) {
      if (!it) {
        continue;
      }
      console.log(it.registerName, it.packageName, it.version);
      // TODO 这里直接写本地的地址，实际应该根据url下载到本地，再import读取, 还要处理已经存在的情况
      const url = `${STATIC_RES_URL}${it.packageName}/${it.version}/${it.packageName}.js`;
      console.log(222, url);
      const m = await import(url);
      console.log('re', m);
      Object.assign(customerComponents, m.CustomerComponents);
      Object.assign(customerPanels, m.CustomerComponentPanels);
      Object.assign(customerComponentsInfo, m.CustomerComponentsInfo);
    }
  }
  //   console.log('res', all);
  return { customerComponents, customerPanels, customerComponentsInfo };
}
