const user = localStorage.getItem("user")
const initState = user ? {isLogged: true, user: user, level: null} : {isLogged: false, user: user, level: 1}

export const authentication = {
    namespaced: true,
    state: initState,
    actions: {
        logIn({commit}, user, level){
            commit('saveUser', user, level)
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
            return !state.isLogged
        },
        getToken(state){
            if(state.isLogged){
                return state.user.token
            }
            return null 
        },
        getLevel(state){
            if(state.isLogged){
                return state.level
            }
            return null
        }
    },
    mutations: {
        saveUser(state, user, level){
            state.user = user
            state.level = level
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
