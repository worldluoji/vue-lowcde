import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'path';

import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';

import autoprefixer from 'autoprefixer';

import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';

const prefix = 'monaco-editor/esm/vs';

// 全局对象
let globals = externalGlobals(
  {
    vue: 'Vue',
    pinia: 'Pinia',
    'vue-router': 'VueRouter',
    'element-plus': 'ElementPlus',
    'vue-i18n': 'VueI18n'
  },
  {
    exclude: ['**/codicon.css']
  }
);

const plugins =
  process.env.NODE_ENV === 'production' ? [] : [commonjs(), globals];

// https://vitejs.dev/config/
export default () =>
  defineConfig({
    plugins: [
      vue(),
      chunkSplitPlugin({
        customSplitting: {
          'utils-vendor': ['throttle-debounce', 'vuedraggable']
        }
      }),
      legacy({
        // 设置目标浏览器，browserslist 配置语法
        targets: ['last 2 versions and since 2018 and > 0.5%']
      }),
      ...plugins
    ],
    resolve: {
      alias: {
        '@store': path.join(__dirname, 'src/store'),
        '@util': path.join(__dirname, 'src/utils'),
        '@assets': path.join(__dirname, 'src/assets')
      }
    },
    build: {
      assetsDir: './static',
      rollupOptions: {
        external: ['vue', 'pinia', 'vue-router', 'vue-i18n', 'element-plus'],
        plugins: [commonjs(), globals],
        output: {
          manualChunks: {
            jsonWorker: [`${prefix}/language/json/json.worker`],
            tsWorker: [`${prefix}/language/typescript/ts.worker`],
            editorWorker: [`${prefix}/editor/editor.worker`]
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['last 2 versions and since 2018 and > 0.5%']
          })
        ]
      }
    },
    // optimizeDeps: {
    //   // 配置为一个字符串数组，将 `vue`强制进行预构建
    //   include: ['vue']
    // },
    define: { 'process.env': {} }
  });
