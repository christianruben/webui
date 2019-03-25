export const loadpage = {
    namespaced: true,
    state: {
        show: null
    },
    actions: {
        switchOn({commit}){
            commit('switchOn')
        },
        switchOff({commit}){
            commit('switchOff')
        }
    },
    getters: {
        isShow(state){
            return state.show
        }
    },
    mutations: {
        switchOn(state){  
            state.show = true
        },
        switchOff(state){
            state.show = false
        }
    }
}