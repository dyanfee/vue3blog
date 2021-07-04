import { SET_TOKEN } from './mutations-types'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    email: '',
    mobile: '',
    id: '',
}

const mutations = {
    [SET_TOKEN]: (state, token) => {
        state.token = token
    }
}

const actions = {
    setToken({ commit }, token) {
        commit(SET_TOKEN, token)
    }
}
export default {
    namespaced: false,
    state,
    mutations,
    actions
}