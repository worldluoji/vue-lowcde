import vitePluginInsertCode from './vite-plugin-insertcode.js';

// 限定的文件类型
const fileRegex = /\.vue$/;

// 要替换的代码模版
const template = `
Vue.__template{0}__(() => {
    if (p.props.__lifecycle__ && p.props.__lifecycle__['__template{0}__']) {
      __implementCodeAsync__(p.props.__lifecycle__['__template{0}__']);
    }
});`;

// 先用values填充模版为代码，然后把文件中出现key值的地方替换掉
const keywords = [
  { key: '/*__onBeforeMount__*/', values: ['onBeforeMount'] },
  { key: '/*__onMounted__*/', values: ['onMounted'] }
];

export default function () {
  return vitePluginInsertCode(fileRegex, keywords, template);
}
