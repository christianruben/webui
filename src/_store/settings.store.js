// import {EventBus} from '../evenbus'

const theme = localStorage.getItem("theme")
const initState = theme == "dark" ? {darkmode: true} : {darkmode: false}
export const settings = {
    namespaced: true,
    state: initState,
    actions: {
        changeTheme({commit}, value){
            commit("changeTheme", value)
        }
    },
    getters: {
        themeMode(state){
            return state.darkmode
        }
    },
    mutations: {
        changeTheme(state, value){
            localStorage.setItem('theme', value ? "dark" : "light")
            state.darkmode = value
        }
    }
}