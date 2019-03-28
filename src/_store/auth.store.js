const user = localStorage.getItem("user")
const level = localStorage.getItem("level")
import {login} from '../_method'
import router from '../router'
import {util} from '../util'

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
                        // Vue.$session.set('Token', json.token)
                        // Vue.$session.set('TokenLvl', 1)
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
                        // Vue.$session.set('Token', json.token)
                        // Vue.$session.set('TokenLvl', 2)
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
            localStorage.setItem("user", user)
            localStorage.setItem("level", level)
        },
        setLogin(state){
            state.isLogged = true
        },
        setLogout(state){
            util.deleteAllCookies()
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
