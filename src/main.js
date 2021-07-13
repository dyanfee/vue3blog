import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入路由全局守卫
import './permission'

import '@/icons'
// import Vue from 'vue'
import Icon from '@/components/Icon' // svg组件
import * as filters from './filters' // global filters


if (window) {
    window.log = (...args) => {
        console.log(...args)
    }
}


const app = createApp(App)
    .use(store)
    .use(router)
    .component('icon', Icon)

app.$router = router

app.config.globalProperties.$filters = { ...filters }
// Object.keys(filters).forEach(key => {
//     App.filter(key, filters[key])
// })
// console.log(app.config.globalProperties.$filters)
app.mount('#app')