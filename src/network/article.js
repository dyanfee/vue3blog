import { request } from './request'

/** 
 * 获取文章列表
 */
export function getArticles(params) {
    return request({
        url: '/articles',
        method: "GET",
        params
    })
}
/** 
 * 通过id获取文章
 */
export function getArticle(params) {
    return request({
        url: '/article',
        method: "GET",
        params
    })
}
