export const schedule = {
    namespace: true,
    state: {
        listItems: []
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
            return state.listItems
        }
    },
    mutations: {
        addAll(state, {items}){
            state.listItems = items
        },
        clear(state){
            state.listItems.length = 0
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