import store from '@/store'

const resizeList = []

const { body } = document
const WIDTH = 992
let curPalteform = ''
let clientReact = {}

function execHandler() {
    window.log('onResize')
    // 根据屏幕判断平台
    jugePlateform()
    // 执行屏幕变化回调函数
    resizeList.forEach(e => {
        e(clientReact || body.getBoundingClientRect())
    })
}

function $isMobile() {
    clientReact = body.getBoundingClientRect()
    return clientReact.width - 1 < WIDTH
}

function jugePlateform() {
    const isMobile = $isMobile()
    if (isMobile === curPalteform) return
    if (isMobile)
        store.dispatch('togglePlateform', 'mobile')
    else
        store.dispatch('togglePlateform', 'PC')
}

export const resizeMixin = {
    beforeMount() {
        jugePlateform()
        window.addEventListener('resize', execHandler)
    },
    beforeUnmount() {
        window.removeEventListener('resize', execHandler)
    },
    mounted() {

    }
}

export const resizeHandler = (fn, init = true) => {
    resizeList.push(fn)
    init && fn(body.getBoundingClientRect())
};