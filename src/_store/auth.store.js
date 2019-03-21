const user = localStorage.getItem("user")
const level = localStorage.getItem("level")
import {login} from '../_method'
import router from '../router';

const initState = user ? {isLogged: true, user: user, loading: false, errmsg: null, level: level} : {isLogged: false, user: user, loading: false, errmsg: null, level: null}

export const authentication = {
    namespaced: true,
    state: initState,
    actions: {
        fakelogin({commit}){
            commit('saveUser', {user: "dsdasdoqwe781232981291qweuqhweo", level: 1})
            commit('setLogin')
            localStorage.setItem("user", 'dsdasdoqwe781232981291qweuqhweo')
            localStorage.setItem("level", 1)
        },
        fakeloginadm({commit}){
            commit('saveUser', {user: 'dsdasdoqwe781232981291qweuqhweo', level: 2})
            commit('setLogin')
            localStorage.setItem("user", "dsdasdoqwe781232981291qweuqhweo")
            localStorage.setItem("level", 2)
        },
        logIn({commit}, {username, password}){
            commit('setLoading', true)
            commit('setErrMsg', null)
            login.authentication(username, password, (result)=>{
                const {json, err} = result;
                if(!err){
                    if(json.auth){
                        commit('saveUser', json.token)
                        commit('setLogin')
                        router.push('/');
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
            login.authentication(username, password, (result)=>{
                const {json, err} = result;
                if(!err){
                    if(json.auth){
                        commit('saveUser', json.token)
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
        logOut({commit}){
            commit('setLogout')
            router.replace('/login')
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
        saveUser(state, {user, level}){
            state.user = user
            state.level = level
        },
        setLogin(state){
            state.isLogged = true
        },
        setLogout(state){
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
