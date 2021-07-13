import { request } from './request'

/** 
 * 通过id获取文章评论
 */
export function getComments(params) {
    return request({
        url: '/comments',
        method: "GET",
        params
    })
}
/**
 * 评论文章
 * type:1 评论  0回复
 */

export function replyComment(data) {
    return request({
        url: '/addComment',
        method: "POST",
        data
    })
}