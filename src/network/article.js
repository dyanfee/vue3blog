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
 * 获取首页信息
 */
export function getHomeInfo(params) {
  return request({
    url: '/homeInfo',
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
/** 
 * 新建文章
 */
export function addArticle(params) {
  return request({
    url: '/article',
    method: "POST",
    data: params
  })
}
/** 
 * 编辑文章
 */
export function editArticle(params) {
  return request({
    url: '/editArticle',
    method: "POST",
    data: params
  })
}
/** 
 * 删除文章
 */
export function deleteArticle(params) {
  return request({
    url: '/deleteArticle',
    method: "GET",
    params
  })
}
/** 
 * 获取所有分类类型
 */
export function allCategories() {
  return request({
    url: '/allCategories',
    method: "GET",
  })
}
/** 
 * 获取所有标签
 */
export function allTags() {
  return request({
    url: '/allTags',
    method: "GET",
  })
}

/** 
 * 获取所有分类
 */
export function getCategoryList(params) {
  return request({
    url: '/categoryList',
    method: "GET",
    params
  })
}
