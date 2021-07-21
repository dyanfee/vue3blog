import { request } from './request'

/** 
 * 获取文章列表
 */
export function getHotTags(params) {
  return request({
    url: '/tags/hotTags',
    method: "GET",
    params
  })
}