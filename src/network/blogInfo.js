import { request } from './request'

/** 
 * 获取blog信息
 */
export function getBlogInfo(params) {
  return request({
    url: '/blogInfo',
    method: "GET",
    params
  })
}