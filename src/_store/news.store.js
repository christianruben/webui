import {news} from '../_method';

export const news = {
    namespace: true,
    state: {
        result: {},
        loading: false
    },
    actions: {
        insertItems({commit}, {index, search}){
            commit('updateLoading', true)
            news.getNewsList({index: index, search: search}, (json, err)=>{
                if(!err){
                    let {status, data, message} = json
                    if(status === 200){
                        commit('addAll', data)
                    }else{
                        commit('setErr', message)
                    }
                }else{
                    commit('setErr', err)
                }
                commit('updateLoading', false)
            })
        },
        updateItems({commit}, {id, items}){
            commit('updateItems', {id, items})
        },
        deleteItems({commit}, {id}){
            commit('deleteItems', {id})
        },
        getItems({commit}, {items, length}){
            commit('addAll', {items, length})
        }
    },
    getters: {
        getAllItems(state){
            let listitem = state.result.listItems;
            return listitem === undefined ? null : listitem
        },
        getLengthItems(state){
            let len = state.result.listlength;
            return len === undefined ? null : len
        },
        getError(state){
            let err = state.result.error;
            return err === undefined ? null : err 
        }
    },
    mutations: {
        addAll(state, {items, length}){
            state.result = {listItems : items}
            state.result = {listlength : length}
        },
        clear(state){
            state.result = {listItems : [], listlength : 0}
        },
        addItems(state, {item, length}){
            state.result.listItems.push(item)
            state.result.listlength = length
        },
        updateItems(state, {id, items}){
            state.result.listItems.find( (item, index) => {
                if(item.id === id){
                    state.result.listItems[index] = items
                }
            })
        },
        deleteItems(state, {id}){
            state.result.listItems.find((item, index)=>{
                if(item.id === id){
                    delete state.result.listItems[index]
                }
            })
        },
        setErr(state, err){
            state.result = {error: err}
        },
        updateLoading(state, status){
            state.loading = status
        }
    }
}