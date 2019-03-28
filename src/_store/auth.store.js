import {login} from '../_method'
import {EventBus} from '../evenbus'
import router from '../router'
const user = EventBus.$session.get("apitoken")
const level = EventBus.$session.get("userlvl")
const initState = user ? {isLogged: true, user: user, loading: false, errmsg: null, level: level} : {isLogged: false, user: user, loading: false, errmsg: null, level: null}

export const authentication = {
    namespaced: true,
    state: initState,
    actions: {
        logIn({commit}, {username, password}){
            commit('setLoading', true)
            commit('setErrMsg', null)
            login.authentication(username, password, (result)=>{
                const {json, err} = result;
                if(!err){
                    if(json.auth){
                        commit('saveUser',{user: json.token, level: 1})
                        commit('setLogin')
                        router.push('/')
                    }else{
                        commit('setErrMsg', json.message)
                        setTimeout(()=>{
                            commit('setErrMsg', null)
                        }, 2500)
                    }
                }
                commit('setLoading', false)
            });
        },
        adminLogIn({commit}, {username, password}){
            commit('setLoading', true)
            commit('setErrMsg', null)
            login.authenticationAdmin(username, password, (result)=>{
                const {json, err} = result;
                if(!err){
                    if(json.auth){
                        commit('saveUser',{user: json.token, level: 2})
                        commit('setLogin')
                        router.push('/admin')
                    }else{
                        commit('setErrMsg', json.message)
                        setTimeout(()=>{
                            commit('setErrMsg', null)
                        }, 2500)
                    }
                }
                commit('setLoading', false)
            });
        },
        checkLogin({commit}){
            login.checkup(result=>{
                const {json, err} = result;
                if(!err){
                    if(!json.auth){
                        commit('setLogout')
                    }
                }else{
                    commit('setLogout')
                }
            })
        },
        logOut({commit}){
            let lvl = level
            commit('setLogout')
            if(lvl == 2){
                router.replace('/admin/login')
            }else{
                router.replace('/login')
            }
        },
        refreshToken({commit}, user){
            commit('saveUser', user)
        }
    },
    getters: {
        getError(state){
            return state.errmsg
        },
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
        saveUser(state, {user, level}){
            state.user = user
            state.level = level
            window.$cookies.set('apitoken', user)
            window.$cookies.set('userlvl', level)
        },
        setLogin(state){
            state.isLogged = true
        },
        setLogout(state){
            window.$cookies.remove('apitoken')
            window.$cookies.remove('userlvl')
            localStorage.clear()
            state.isLogged = false
            state.level = null
            state.user = null
        },
        setLoading(state, status){
            state.loading = status
        },
        setErrMsg(state, msg){
            state.errmsg = msg
        }
    }
}
