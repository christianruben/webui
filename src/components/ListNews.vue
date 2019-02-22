<template>
    <v-list-tile
        :key="item.id"
        avatar
        ripple
        @click="loadNews(item.id)"
        >
        <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-list-tile-action-text>{{ item.timestample}}</v-list-tile-action-text>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
export default {
    props: {
        item: Object
    },
    methods: {
        loadNews(id){
            this.$router.push({name: "newspost", params: {id: id}})
        }
    },
}
</script>