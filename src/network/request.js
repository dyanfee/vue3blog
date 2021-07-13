import axios from 'axios'

// 默认类型
// axios.defaults.headers.post['Content-type'] = 'application/json'

console.log('环境:', process.env.NODE_ENV, '\nBaseUrl', process.env.VUE_APP_BASE_API)
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

if (localStorage.getItem('token')) {
    // 带上token
    instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token').replace(/(^\")|(\"$)/g, '')
  }

instance.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    // 1000 请求失败
    if (res.data && res.data.code == 1000) {
        alert(res.data.message)
    }
    return res.data
}, err => {
    if (err.message) {
        console.log(err.message)
    }
    return Promise.reject(err)
})

export function request(config) {

    return instance(config)
}