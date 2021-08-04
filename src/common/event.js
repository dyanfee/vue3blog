import mitt from 'mitt';
import _ from 'lodash'

export const createMitt = function () {
  let _mitt;
  return function () {
    return _mitt || (_mitt = mitt())
  }
}()
export function on(event, callback) {
  let _mitt = createMitt()
  // Reflect.apply(_mitt.on, _mitt, arguments);
  _mitt.on(event, callback)
}
export function off(event, callback) {
  let _mitt = createMitt()
  _mitt.off(event, callback)
}
export function emit(...args) {
  let _mitt = createMitt()
  _mitt.emit(args[0], args.slice(1))
}
export function all() {
  let _mitt = createMitt()
  return _mitt.all
}
export function install(vue) {
  let _mitt = createMitt()

  // 发布事件
  vue.config.globalProperties.$emit = (...args) => {
    _mitt.emit(args[0], args.slice(1))
  };

  // 全局订阅
  vue.config.globalProperties.$on = function (event, callback) {
    Reflect.apply(_mitt.on, _mitt, _.toArray(arguments));
  };

  // 取消订阅
  vue.config.globalProperties.$off = function (event, callback) {
    Reflect.apply(_mitt.off, _mitt, _.toArray(arguments));
  };
}
export default {
  install, on, off, emit, all
}