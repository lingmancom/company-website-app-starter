import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'

// import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Inspector from '@djie/vite-plugin-vue-inspector'
import { VitePWA } from 'vite-plugin-pwa'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

import { LingManWebAutoImport } from 'lingman/resolve'
import LingMan from 'lingman/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia', { 'element-plus': ['ElMessageBox', 'ElMessage'] }, LingManWebAutoImport()],
      resolvers: [
        ElementPlusResolver(),
      ],
      dirs: [
        'src/api',
        'src/hooks',
        'src/store',
      ],
      dts: true,
    }),
    ElementPlus({
      useSource: false,
    }),
    Components({
      extensions: ['vue', 'tsx'],
      resolvers: [
        ElementPlusResolver(),
        // (componentName) => { console.log(componentName) },
      ],
      dts: true,
    }),
    vueJsx(),
    // visualizer(),
    Unocss(),

    VitePWA({
      injectRegister: 'auto',
      manifest: {
        name: 'name',
        short_name: 'short_name',
        icons: [
          { src: 'icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      registerType: 'autoUpdate',
    }),

    legacy({
      targets: ['> 1%, last 1 version, ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
    }),

    Inspector(),
    LingMan(),
  ],
  base: './',
  root: process.cwd(),
  css: {
    preprocessorOptions: {
      scss: {
        // 全局变量
        additionalData: '@import "./src/assets/style/global-variables.scss";@import "./src/assets/style/global.scss";',
        charset: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, './'),
    },
  },
  server: {
    host: true,
    port: 8134,
    // proxy: {
    //     '/api': {
    //         target: 'https://www.xxx.com', // 后端接口的域名
    //         changeOrigin: true,
    //     },
    // },
  },
  build: {
    rollupOptions: {
      output: {
        // 拆分单独模块
        manualChunks: {
          'element-plus': ['element-plus'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'vue',
      'sass',
      'axios',
      'pinia',
      'unocss',
      'vue-router',
      '@vueuse/core',
      'element-plus',
      'element-plus/es',
      'element-plus/es/locale/lang/zh-cn',
      'element-plus/es/locale/lang/en',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/icon/style/css',
      'element-plus/es/components/avatar/style/css',
      'element-plus/es/components/space/style/css',
      'element-plus/es/components/backtop/style/css',
      'element-plus/es/components/form/style/css',
      'element-plus/es/components/radio-group/style/css',
      'element-plus/es/components/radio/style/css',
      'element-plus/es/components/checkbox/style/css',
      'element-plus/es/components/checkbox-group/style/css',
      'element-plus/es/components/switch/style/css',
      'element-plus/es/components/time-picker/style/css',
      'element-plus/es/components/date-picker/style/css',
      'element-plus/es/components/descriptions/style/css',
      'element-plus/es/components/descriptions-item/style/css',
      'element-plus/es/components/link/style/css',
      'element-plus/es/components/tooltip/style/css',
      'element-plus/es/components/drawer/style/css',
      'element-plus/es/components/dialog/style/css',
      'element-plus/es/components/checkbox-button/style/css',
      'element-plus/es/components/option-group/style/css',
      'element-plus/es/components/radio-button/style/css',
      'element-plus/es/components/cascader/style/css',
      'element-plus/es/components/color-picker/style/css',
      'element-plus/es/components/input-number/style/css',
      'element-plus/es/components/rate/style/css',
      'element-plus/es/components/select-v2/style/css',
      'element-plus/es/components/tree-select/style/css',
      'element-plus/es/components/slider/style/css',
      'element-plus/es/components/time-select/style/css',
      'element-plus/es/components/autocomplete/style/css',
      'element-plus/es/components/image-viewer/style/css',
      'element-plus/es/components/upload/style/css',
      'element-plus/es/components/col/style/css',
      'element-plus/es/components/form-item/style/css',
      'element-plus/es/components/alert/style/css',
      'element-plus/es/components/breadcrumb/style/css',
      'element-plus/es/components/select/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/breadcrumb-item/style/css',
      'element-plus/es/components/tag/style/css',
      'element-plus/es/components/pagination/style/css',
      'element-plus/es/components/table/style/css',
      'element-plus/es/components/table-v2/style/css',
      'element-plus/es/components/table-column/style/css',
      'element-plus/es/components/card/style/css',
      'element-plus/es/components/row/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/option/style/css',
      'element-plus/es/components/dropdown/style/css',
      'element-plus/es/components/dropdown-menu/style/css',
      'element-plus/es/components/dropdown-item/style/css',
      'element-plus/es/components/skeleton/style/css',
      'element-plus/es/components/skeleton/style/css',
      'element-plus/es/components/backtop/style/css',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/dropdown/style/css',
      'element-plus/es/components/tree/style/css',
      'element-plus/es/components/dropdown-menu/style/css',
      'element-plus/es/components/dropdown-item/style/css',
      'element-plus/es/components/badge/style/css',
      'element-plus/es/components/breadcrumb/style/css',
      'element-plus/es/components/breadcrumb-item/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/collapse-transition/style/css',
      'element-plus/es/components/timeline/style/css',
      'element-plus/es/components/timeline-item/style/css',
      'element-plus/es/components/collapse/style/css',
      'element-plus/es/components/collapse-item/style/css',
      'element-plus/es/components/button-group/style/css',
      'element-plus/es/components/text/style/css',
      'element-plus/es/components/divider/style/css',
      'element-plus/es/components/empty/style/css',
      'element-plus/es/components/aside/style/css',
      'element-plus/es/components/container/style/css',
      'element-plus/es/components/main/style/css',
      'element-plus/es/components/header/style/css',
      'element-plus/es/components/popover/style/css',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/tab-pane/style/css',
      'element-plus/es/components/loading/style/css',
    ],
  },
})
