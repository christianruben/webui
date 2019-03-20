const user = localStorage.getItem("user")
const initState = user ? {isLogged: true, user: user} : {isLogged: false, user: user}

export const authentication = {
    namespaced: true,
    state: initState,
    actions: {
        logIn({commit}, user){
            commit('saveUser', user)
            commit('setLogin')
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
        }
    }
}
