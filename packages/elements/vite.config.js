import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { resolve } from 'path';

import autoprefixer from 'autoprefixer';

import progress from 'vite-plugin-progress';
import cleanPlugin from 'vite-plugin-clean';
import { visualizer } from 'rollup-plugin-visualizer';

import {
  vitePluginInsertLifecycle,
  vitePluginInjectLifecycleTemplate
} from '@lowcode/viteplugins';

export default ({ mode }) =>
  defineConfig({
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/index.js'),
        name: loadEnv(mode, process.cwd()).VITE_PACKAGE_NAME,
        // the proper extensions will be added
        fileName: loadEnv(mode, process.cwd()).VITE_PACKAGE_NAME,
        formats: ['umd']
      },
      outDir: `dist/${loadEnv(mode, process.cwd()).VITE_PACKAGE_NAME}/${
        loadEnv(mode, process.cwd()).VITE_PACKAGE_VERSION
      }`,
      cssCodeSplit: true,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'element-plus', 'vuedraggable'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            vuedraggable: 'vuedraggable'
          }
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
          VantResolver()
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
          VantResolver()
        ]
      }),
      cleanPlugin({
        targetFiles: ['dist']
      }),
      vitePluginInjectLifecycleTemplate(),
      vitePluginInsertLifecycle(),
      progress(),
      visualizer({
        open: true
      })
    ],
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
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./src/style/element/index.scss" as *;' //关键
        }
      }
    },
    define: { 'process.env': {} }
  });
