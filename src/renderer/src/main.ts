import { createApp } from 'vue'
import App from './App.vue'
//路由
import router from '@router'
// 国际化
import i18n from './locales'

//全局引入icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// store
import { createPinia } from 'pinia'
//引入pinia的持久化存储插件
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)

app.use(router).use(store).use(i18n).mount('#app')
