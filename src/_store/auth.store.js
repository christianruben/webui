const user = localStorage.getItem("user")
const loginloader = require('../_method').login;
const initState = user ? {isLogged: true, user: user, loading: false} : {isLogged: false, user: user, loading: false}

export const authentication = {
    namespaced: true,
    state: initState,
    actions: {
        logIn({commit}, {username, password}){
            commit('setLoading', true)
            loginloader.authentication(username, password, (result)=>{
                if(!result.err){
                    commit('saveUser', result.usertoken)
                    commit('setLogin')
                }
                commit('setLoading', false)
            });
        },
        logOut({commit}){
            commit('setLogout')
        },
        refreshToken({commit}, user){
            commit('saveUser', user)
        }
    },
    getters: {
        isUserLogged(state){
            return state.isLogged
        },
        getToken(state){
            if(state.isLogged){
                return state.user.token
            }
            return null 
        }
    },
    mutations: {
        saveUser(state, user){
            state.user = user
        },
        setLogin(state){
            state.isLogged = true
        },
        setLogout(state){
            localStorage.clear()
            state.isLogged = false
        },
        setLoading(state, status){
            state.loading = status
        }
    }
}
