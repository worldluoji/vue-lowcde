import vitePluginInsertCode from './vite-plugin-insertcode.js';

// 限定的文件类型
const fileRegex = /\.vue$/;

// 要替换的代码模版
const template = `
/*__onBeforeMount__*/
/*__onMounted__*/
`;

const keywords = [{ key: '/*__lifecycles__*/', values: null }];

export default function () {
  return vitePluginInsertCode(fileRegex, keywords, template);
}
