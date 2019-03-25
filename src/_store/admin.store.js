export const admin = {
    namespace: true,
    state: {
        result: {}
    },
    actions: {
        insertItems({commit}, items){
            commit('additems',items)
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
            return {items: state.result.listItems, len: state.result.listLength}
        },
    },
    mutations: {
        addAll(state, {items, length}){
            state.result = {listItems : items}
            state.result = {listLength : length}
        },
        clear(state){
            state.result = {listItems : null}
        },
        addItems(state, {item}){
            state.result.listItems.push(item)
        },
        updateItems(state, {id, items}){
            state.result.listItems.find( (item, index) => {
                if(item.id === id){
                    state.result.listItems[index] = items
                }
            })
        },
        deleteItems(state, {id}){
            state.listItems.find((item, index)=>{
                if(item.id === id){
                    delete state.result.listItems[index]
                }
            })
        }
    }
}