import {teacher} from '../_method'

export const teachers = {
    namespace: true,
    state: {
        listItems: [],
        error: null,
        totalItems: 0,
        loading: false,
        upload: false,
        dialog: false
    },
    actions: {
        storeReq({commit}, {index, rows, search, sortby, sort}){
            commit('removeError')
            commit('setLoading', true)
            teacher.list({index: index, rows: rows, search: search, sortby: sortby, sort: sort}, (result)=>{
                const {err, json} = result;
                setTimeout(()=>{
                    if(err){
                        commit('setError', err)
                    }else{
                        commit('addAll', {items: json.table, len: json.len})
                    }
                    commit('setLoading', false)
                }, 100)
            })
        },
        uploadTeacher({commit}, {data}) {
            commit('removeError')
            commit('setLoading', true)
            commit('setUpload', true)
            teacher.insert(data, (result)=>{
                const {err, json} = result;
                if(err){
                    commit('setError', err)
                    commit('setUpload', true)
                }else{
                    if(json){
                        commit('setUpload', false)
                        commit('setDialog', false)
                    }
                }
            })
            commit('setLoading', false)
        },
        updateTeacher({commit}, {data}){
            commit('removeError')
            commit('setLoading', true)
            commit('setUpload', true)
            teacher.update(data, (result)=>{
                const {err, json} = result;
                if(err){
                    commit('setError', err)
                    commit('setUpload', true)
                }else{
                    if(json){
                        commit('setUpload', false)
                        commit('setDialog', false)
                    }
                }
            })
            commit('setLoading', false)
        },
        updateItems({commit}, {id, items}){
            commit('updateItems', {id, items})
        },
        deleteItems({commit}, {id}){
            commit('deleteItems', {id})
        },
        deleteTeacher({commit}, {id}){
            commit('removeError')
            commit('setLoading', true)
            commit('setUpload', true)
            teacher.del(id, result=>{
                const {err, json} = result
                if(err){
                    commit('setError', err)
                    commit('setUpload', true)
                }else{
                    if(json){
                        commit('setUpload', false)
                    }
                }
            })
            commit('setLoading', false)
        },
        removeError({commit}){
            commit('setError', null)
        },
        openDialog({commit}){
            commit('setDialog', true)
        },
        closeDialog({commit}){
            commit('setDialog', false)
        }
    },
    getters: {
        getAllItems(state){
            return state.listItems
        },
        getLoading(state){
            return state.loading
        },
        getLenItems(state){
            return state.totalItems
        },
        getStatUpload(state){
            return state.upload
        },
        getError(state){
            return state.error
        },
        getDialog(state){
            return state.dialog
        }
    },
    mutations: {
        setPagination (state, payload) {
            state.pagination = payload
        },
        setLoading(state, stat){
            state.loading = stat
        },
        setDialog(state, stat){
            state.dialog = stat
        },
        setError(state, err){
            state.error = err
        },
        removeError(state){
            state.error = null
        },
        addAll(state, {items, len}){
            state.listItems = items
            state.totalItems = len
        },
        setUpload(state, val){
            state.upload = val
        },
        clear(state){
            state.listItems = []
            state.lengthItems = 0
        },
        addItems(state, {item}){
            state.listItems.push(item)
        },
        updateItems(state, {id, items}){
            state.listItems.find( (item, index) => {
                if(item.id === id){
                    state.listItems[index] = items
                }
            })
        },
        deleteItems(state, {id}){
            state.listItems.find((item, index)=>{
                if(item.id === id){
                    delete state.listItems[index]
                }
            })
        }
    }
}