export const header = {
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
    mutations: {
        switchOn(state){  
            state.show = true
        },
        switchOff(state){
            state.show = false
        }
    }
}