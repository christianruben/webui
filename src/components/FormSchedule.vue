<template>
  <v-form v-model="valid" ref="form">
    <v-select
    v-model="forminput.type"
    :items="type_select"
    label="Type"
    required
    ></v-select>
    <v-autocomplete
    v-model="select_study"
    :loading="loading_study"
    :items="itemsStudy"
    :search-input.sync="search_study"
    item-text="value"
    item-value="id"
    cache-items
    class="mx-3"
    flat
    hide-no-data
    hide-details
    label="Pelajaran"
    ></v-autocomplete>
    <v-autocomplete
    v-model="select_teacher"
    :loading="loading_teacher"
    :items="itemsTeacher"
    :search-input.sync="search_teacher"
    item-text="value"
    item-value="id"
    cache-items
    class="mx-3"
    flat
    hide-no-data
    hide-details
    label="Guru"
    ></v-autocomplete>
  </v-form>
</template>
<script>
  export default {
    props: {
      forminput: Object,
    },
    data: () => ({
        select_teacher: [],
        loading_teacher: false,
        search_teacher: null,
        select_study: [],
        loading_study: false,
        search_study: null,
        type_select: ['KBM', 'EXAM'],
        valid: false,
        menu: false,
        dialog: false,
    }),
    methods: {
        searchTeacher(v){
            const {dispatch} = this.$store
            dispatch('searchLight', v)
        },
        searchStudy(v){
            const {dispatch} = this.$store
            dispatch('studies/searchLight', v)
        }
    },
    watch: {
        search_teacher (val){
            val && val !== this.select && this.searchTeacher(val)
        },
        search_study(val){
            val && val !== this.select && this.searchStudy(val)
        }
    },
    computed: {
        itemsTeacher(){
            return this.$store.getters['getLightResult']
        },
        itemsStudy(){
            return this.$store.getters['studies/getLightResult']
        }
    },
  }
</script>