import vitePluginInsertCode from './vite-plugin-insertcode';

// 限定的文件类型
const fileRegex = /\.vue$/;

// 要替换的代码模版
const template = `
Vue.__template{0}__(() => {
    if (p.props.__lifecycle__ && p.props.__lifecycle__.length) {
      implementCodeAsync(p.props.__lifecycle__[__template{1}__]);
    }
});`;

// 先用values填充模版为代码，然后把文件中出现key值的地方替换掉
const keywords = [
  { key: '/*__onBeforeMount__*/', values: ['onBeforeMount', '0'] },
  { key: '/*__onMounted__*/', values: ['onMounted', '1'] }
];

export default vitePluginInsertCode(fileRegex, keywords, template);
