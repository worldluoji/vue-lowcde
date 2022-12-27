import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';

import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [VantResolver(), ElementPlusResolver()],
    }),
    chunkSplitPlugin({
      customSplitting: {
        'vue-vendor': ['vue', 'vue-router', 'pinia']
      }
    }),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ['last 2 versions and since 2018 and > 0.5%','ie >= 11'],
    })
  ],
  resolve: {
    alias: {
      '@store': path.join(__dirname, 'src/store'),
      '@util': path.join(__dirname, 'src/utils')
    }
  }
})
