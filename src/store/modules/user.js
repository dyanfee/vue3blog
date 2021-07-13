import { SET_TOKEN } from './mutations-types'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from "network/user";
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  email: '',
  mobile: '',
  id: '',
  isLogin: false,
}

const mutations = {
  [SET_TOKEN]: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USER_ID: (state, id) => {
    state.id = id
  },
  SET_IS_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_USER_NAME: (state, name) => {
    state.name = name
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  setToken({ commit }, token) {
    commit(SET_TOKEN, token)
  },
  setUserId({ commit }, id) {
    commit('SET_USER_ID', id)
  },
  setLoginState({ commit }, isLogin) {
    commit('SET_IS_LOGIN', isLogin)
  },
  setAvatar({ commit }, avatar) {
    commit('SET_AVATAR', avatar)
  },
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  setEmail({ commit }, email) {
    commit('SET_EMAIL', email)
  },
  setMobile({ commit }, mobile) {
    commit('SET_MOBILE', mobile)
  },
  setRoles({ commit }, roles) {
    commit('SET_ROLES', roles)
  },
  login({ commit }, data) {
    return userLogin(commit, data)
  },
  getInfo({ commit }) {
    return getUserInfo(commit)
  },
  loginOut({ commit }) {
    removeToken()
    commit(SET_TOKEN, '')
    commit('SET_USER_ID', '')
    commit('SET_AVATAR', '')
    commit('SET_USER_NAME', '')
    commit('SET_EMAIL', '')
    commit('SET_MOBILE', '')
    commit('SET_IS_LOGIN', false)
  },
  resetToken({ commit }) {
    removeToken()
    commit(SET_TOKEN, '')
    commit('SET_USER_ID', '')
    commit('SET_ROLES', [])
    commit('SET_IS_LOGIN', false)
  }

}

function getUserInfo(commit) {
  console.log('getUserInfo')
  return new Promise((resolve, reject) => {
    const token = getToken()
    getInfo({token}).then(res => {
      const { id, nickName, email } = res.body
      commit('SET_USER_ID', id)
      // commit('SET_AVATAR', '')
      commit('SET_USER_NAME', nickName)
      commit('SET_EMAIL', email)
      // commit('SET_MOBILE', '')
      commit('SET_IS_LOGIN', true)
      resolve(res.body)
    }).catch(err => {
      reject(err)
    })
  })
}

function userLogin(commit, data) {
  return new Promise((resolve, reject) => {
    login(data).then(
      (res, err) => {
        if (err) {
          reject(err)
        }
        if (res.code == 200) {
          const { id, token } = res.body
          commit('SET_USER_ID', id)
          commit(SET_TOKEN, token)
          resolve('登录成功')
        } else {
          reject(res.body.message)
        }
      }
    );
  })
}


export default {
  namespaced: false,
  state,
  mutations,
  actions
}