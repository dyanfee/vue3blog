import { request } from './request'


export function getArticles(params) {
    return request({
        url: '/articles',
        method: "GET",
        data: params
    })
}