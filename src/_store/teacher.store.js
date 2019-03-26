import {teacher} from '../_method'

export const teachers = {
    namespace: true,
    state: {
        table: {}
    },
    actions: {
        storeReq({commit}, {index, rows, search, sortby, sort}){
            commit('removeError')
            commit('setLoading', true)
            teacher.list({index: index, rows: rows, search: search, sortby: sortby, sort: sort}, (result)=>{
                const {err, json} = result;
                if(err){
                    commit('setError', err)
                }else{
                    commit('addAll', {items: json.table, len: json.length})
                }
                commit('setLoading', false)
            })
        },
        updateItems({commit}, {id, items}){
            commit('updateItems', {id, items})
        },
        deleteItems({commit}, {id}){
            commit('deleteItems', {id})
        }
    },
    getters: {
        getAllItems(state){
            let list = state.table.listItems
            return list == undefined || list == null ? [] : list
        },
        getLength(state){
            let length = state.table.lengthItems
            return length == undefined || length == null ? 0 : length
        }
    },
    mutations: {
        setLoading(state, stat){
            state.table = {loading: stat}
        },
        setError(state, err){
            state.table = {error: err}
        },
        removeError(state){
            state.table = {error: null}
        },
        addAll(state, {items, len}){
            state.table = {listItems : items}
            state.table = {lengthItems: len}
        },
        clear(state){
            state.table = {listItems : []}
            state.table = {lengthItems: 0}
        },
        addItems(state, {item}){
            state.table.listItems.push(item)
        },
        updateItems(state, {id, items}){
            state.table.listItems.find( (item, index) => {
                if(item.id === id){
                    state.table.listItems[index] = items
                }
            })
        },
        deleteItems(state, {id}){
            state.table.listItems.find((item, index)=>{
                if(item.id === id){
                    delete state.table.listItems[index]
                }
            })
        }
    }
}