// Vite 插件与 Rollup 插件结构类似，为一个name和各种插件 Hook 的对象
function insertCodePlugin(fileRegex, keywords, template) {
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
      for (let keyword of keywords) {
        if (code.indexOf(keyword.key) === -1) {
          continue;
        }
        let newCode = template;
        if (keyword.values && keyword.values.length) {
          for (let i = 0; i < keyword.values.length; i++) {
            newCode = newCode.replaceAll(
              `__template{${i}}__`,
              keyword.values[i]
            );
          }
        }
        out = out.replaceAll(keyword.key, newCode);
        modified = true;
      }
      if (!modified) {
        return null;
      }
      console.log(333, out);

      // console.log('after process', out, id);
      return {
        code: out,
        map: null // 如果可行将提供 source map
      };
    }
  };
}

export default insertCodePlugin;
