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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia', { 'element-plus': ['ElMessageBox', 'ElMessage'] }],
      resolvers: [ElementPlusResolver()],
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
    {
      name: 'add_timestamp',
      enforce: 'post',
      async transformIndexHtml(html) {
        return html.replace(/\$_config/, `/config.js?_t=${Date.now()}`)
      },
    },
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
      'element-plus/es',
      'element-plus/es/components/message/style/css',
      // 'element-plus/es/components/notification/style/css',
      'element-plus/es/components/message-box/style/css',
    ],
  },
})
