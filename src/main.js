import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons'
// import Vue from 'vue'
import Icon from '@/components/Icon' // svg组件



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

app.mount('#app')