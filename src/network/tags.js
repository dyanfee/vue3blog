import { request } from './request'

/** 
 * 获取tags列表
 */
export function getHotTags(params) {
  return request({
    url: '/hotTags',
    method: "GET",
    params
  })
}
/** 
 * 获取所有标签
 */
export function getTagsList(params) {
  return request({
    url: '/tagsList',
    method: "GET",
    params
  })
}
