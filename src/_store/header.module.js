export const header = {
    namespaced: true,
    state: {
        show: true,
    },
    getters: {
        isShow: function(state){
            state.show
        }
    },
    actions: {
        changeShow(context, status){
            context.commit('change', status);
        }
    },
    mutations: {
        change(state, status){
            state.show = status;
        }
    }
}