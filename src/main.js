
import { createApp } from 'vue'

// 引入组件库
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// import "@/styles/base.scss";

import App from './App.vue'
import router from './router'
import store from './store'
// 引入路由全局守卫
import './permission'

import '@/icons'
import Icon from '@/components/Icon' // svg组件
import * as filters from './filters' // global filters




const app = createApp(App)
  .use(ElementPlus, { locale })
  .use(store)
  .use(router)
  .component('icon', Icon)

app.$router = router

app.config.globalProperties.$filters = { ...filters }

app.mount('#app')