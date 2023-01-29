import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';

import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
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
        'elementplus-vendor': ['element-plus'],
        'vant-vendor': ['vant']
      }
    }),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: [
        'iOS >= 9',
        'Android >= 7',
        'last 2 versions',
        '> 0.5%',
        'not dead'
      ]
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
    }
  }
});
