const fileRegex = /\.vue$/;

const keywords = ['/*__onMounted__*/'];

const newCode = `
Vue.onMounted(() => {
    if (p.props.__lifecycle__ && p.props.__lifecycle__.length) {
      implementCodeAsync(p.props.__lifecycle__[0]);
    }
});`;

// Vite 插件与 Rollup 插件结构类似，为一个name和各种插件 Hook 的对象
function insertCodePlugin() {
  return {
    name: 'insertCodePlugin',
    // transform钩子，也可以返回 ast，但在这个时候已经拿到了具体路径文件的 code，所以一般用于转换已经加载后的模块
    transform(code, id) {
      // console.log('insertCodePlugin', id);
      // 只有文件后缀名是.vue的时候才处理
      if (!fileRegex.test(id)) {
        return null;
      }

      let out = code;
      let modified = false;
      for (let key of keywords) {
        if (code.indexOf(key) > -1) {
          out = out.replace(key, newCode);
          modified = true;
        }
      }
      if (!modified) {
        return null;
      }

      console.log('after process', out, id);
      return {
        code: out,
        map: null // 如果可行将提供 source map
      };
    }
  };
}

export default insertCodePlugin;
