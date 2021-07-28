import { request } from './request'

/** 
 * 登录
 */
export function login(params) {
  return request({
    url: '/login',
    method: "POST",
    data: params
  })
}

/** 
 * 获取当前用户信息
 */
export function getInfo(params) {
  return request({
    url: '/getInfo',
    method: 'POST',
    data: params
  })
}