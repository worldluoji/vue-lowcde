import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';

import autoprefixer from 'autoprefixer';

const prefix = 'monaco-editor/esm/vs';

// https://vitejs.dev/config/
export default () =>
  defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver(), ElementPlusResolver()]
      }),
      Components({
        resolvers: [VantResolver(), ElementPlusResolver()]
      }),
      chunkSplitPlugin({
        customSplitting: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'utils-vendor': ['throttle-debounce', 'vuedraggable'],
          'elementplus-vendor': ['element-plus'],
          'vant-vendor': ['vant']
        }
      }),
      legacy({
        // 设置目标浏览器，browserslist 配置语法
        targets: ['last 2 versions and since 2018 and > 0.5%']
      })
    ],
    resolve: {
      alias: {
        '@store': path.join(__dirname, 'src/store'),
        '@util': path.join(__dirname, 'src/utils'),
        '@assets': path.join(__dirname, 'src/assets')
      }
    },
    build: {
      rollupOptions: {
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
