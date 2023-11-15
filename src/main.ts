import './initialize'

import { createApp } from 'vue'

// 引入 unocss
import '@unocss/reset/tailwind.css'
import 'uno.css'

// 引入生成二维码工具
import QrcodeVue from 'qrcode.vue'

// 注册el-icon
import * as ElIconModules from '@element-plus/icons-vue'

// JSON美化工具
import JsonViewer from 'vue-json-viewer'

import App from './App.vue'

// 引入路由
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(JsonViewer)

app.component('QrcodeVue', QrcodeVue)

Object.entries(ElIconModules).forEach(([key, component]) => {
  app.component(key, component)
})
app.use(router)
app.mount('#app')
