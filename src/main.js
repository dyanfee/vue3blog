
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
import event from 'common/event'
// 引入路由全局守卫
import './permission'

import '@/icons'
import Icon from '@/components/Icon' // svg组件
import * as filters from './filters' // global filters

console.log('%cyanfee.com', 'color:#fff;background:#000;line-height:18px;border-radius:3px;')


const app = createApp(App)
  .use(ElementPlus, { locale })
  .use(store)
  .use(router)
  .component('icon', Icon)

app.$router = router
app.config.globalProperties.$filters = { ...filters }
// 全局事件绑定
event.install(app)

app.mount('#app')