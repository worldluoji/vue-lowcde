import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

import indexHtmlPlugin from './plugins/indexHtmlPlugin'
import htmlPlugin from './plugins/htmlPlugin'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [VantResolver(), ElementPlusResolver()],
    }),
    indexHtmlPlugin(loadEnv(mode, process.cwd()).VITE_APP_MODE),
    htmlPlugin()
  ],
  resolve: {
    alias: {
      '@store': path.join(__dirname, 'src/store'),
      '@util': path.join(__dirname, 'src/utils')
    }
  }
})
