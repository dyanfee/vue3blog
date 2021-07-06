import { request } from './request'

/** 
 * 获取文章列表
 */
export function getArticles(params) {
    return request({
        url: '/articles',
        method: "GET",
        data: params
    })
}
/** 
 * 通过id获取文章
 */
export function getArticle(params) {
    console.log('-----')
    return request({
        url: '/article',
        method: "GET",
        params
    })
}