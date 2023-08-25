import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import legacy from '@vitejs/plugin-legacy';

import autoprefixer from 'autoprefixer';

import topLevelAwait from 'vite-plugin-top-level-await';

import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';
import { vitePluginInsertLifecycle } from '@lowcode/viteplugins';

// 全局对象
let globals = externalGlobals(
  {
    vue: 'Vue',
    pinia: 'Pinia',
    'vue-router': 'VueRouter',
    'element-plus': 'ElementPlus',
    rxjs: 'RxJS',
    vuedraggable: 'vuedraggable'
  },
  {
    exclude: ['**/codicon.css']
  }
);

const plugins =
  process.env.NODE_ENV === 'production' ? [] : [commonjs(), globals];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // chunkSplitPlugin({
    //   customSplitting: {
    //     'vue-vendor': ['vue', 'vue-router', 'pinia']
    //   }
    // }),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: [
        'iOS >= 9',
        'Android >= 7',
        'last 2 versions',
        '> 0.5%',
        'not dead'
      ]
    }),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`
    }),
    vitePluginInsertLifecycle(),
    ...plugins
  ],
  build: {
    assetsDir: './static',
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'vue-router',
        'element-plus',
        'rxjs',
        'vuedraggable'
      ],
      plugins: [commonjs(), globals]
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: [
            'iOS >= 9',
            'Android >= 7',
            'last 2 versions',
            '> 0.5%',
            'not dead'
          ]
        })
      ]
    }
  }
});
