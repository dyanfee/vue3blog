import { TOGGLE_PLATEFORM } from './mutations-types'
import { getBlogInfo } from "network/blogInfo";
const state = {
  plateform: 'PC', // 记录用户使用平台: PC mobile
  info: {}, // 博客信息
}

const mutations = {
  [TOGGLE_PLATEFORM]: (state, plateform) => {
    state.plateform = plateform
  },
  ['SET_BLOG_INFO']: (state, info) => {
    state.info = info
  }
}

const actions = {
  togglePlateform({ commit }, plateform) {
    commit(TOGGLE_PLATEFORM, plateform)
  },
  setBlogInfo({ commit }, info) {
    commit('SET_BLOG_INFO', info)
  },
  blogInfo({ commit }) {
    getBlogInfo().then(res => {
      const info = res.body
      commit('SET_BLOG_INFO', info)
    })
  }
}



export default {
  namespaced: false,
  state,
  mutations,
  actions
}