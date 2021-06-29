import { TOGGLE_PLATEFORM } from './mutations-types'
const state = {
    plateform: 'PC' // 记录用户使用平台: PC mobile
}

const mutations = {
    [TOGGLE_PLATEFORM]: (state, plateform) => {
        state.plateform = plateform
    }
}

const actions = {
    togglePlateform({ commit }, plateform) {
        commit(TOGGLE_PLATEFORM, plateform)
    }
}


export default {
    namespaced: false,
    state,
    mutations,
    actions
}