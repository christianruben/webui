<template>
  <v-form v-model="valid" ref="form">
    <v-select
    v-model="forminput.type"
    :items="type_select"
    class="mx-3"
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
    text
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
    text
    hide-no-data
    hide-details
    label="Guru"
    ></v-autocomplete>
    <v-autocomplete
    v-model="select_day"
    :loading="loading_day"
    :items="itemsDay"
    :search-input.sync="search_day"
    item-text="value"
    item-value="id"
    cache-items
    class="mx-3"
    text
    hide-no-data
    hide-details
    label="Hari"
    ></v-autocomplete>
    <v-autocomplete
    v-model="select_class"
    :loading="loading_class"
    :items="itemsClass"
    :search-input.sync="search_class"
    item-text="value"
    item-value="id"
    cache-items
    class="mx-3"
    text
    hide-no-data
    hide-details
    label="Kelas"
    ></v-autocomplete>
    <v-autocomplete
    v-model="select_time"
    :loading="loading_time"
    :items="itemsTime"
    :search-input.sync="search_time"
    item-text="value"
    item-value="id"
    cache-items
    class="mx-3"
    text
    hide-no-data
    hide-details
    label="Kelas"
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
        search_teacher: "",
        select_study: [],
        loading_study: false,
        search_study: "",
        select_day: [],
        loading_day: false,
        search_day: "",
        select_class: [],
        loading_class: false,
        search_class: "",
        select_time: [],
        loading_time: false,
        search_time: false,
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
        },
        searchTime(v){
          const {dispatch} = this.$store
          dispatch('times/searchLight', v)
        }
    },
    watch: {
        search_teacher (val){
            val && val !== this.select_teacher && this.searchTeacher(val)
        },
        search_study(val){
            val && val !== this.select_study && this.searchStudy(val)
        },
        search_time(val){
          val && val !== this.select_time && this.search_time(val)
        },
        search_class(val){
          val && val !== this.select_class && this.search_class(val)
        }
    },
    computed: {
        itemsTeacher(){
            return this.$store.getters['getLightResult']
        },
        itemsStudy(){
            return this.$store.getters['studies/getLightResult']
        },
        itemsTime(){
          return this.$store.getters['times/getLightResult']
        },
        itemsClass(){
          return this.$store.getters['classdata/getLightResult']
        },
        searchTeacherLength(){
          return this.search_teacher.length;
        },
        searchStudyLength(){
          return this.search_study.length;
        },
        searchTimeLength(){
          return this.search_time.length;
        },
        seacrhClassLength(){
          return this.search_class.length;
        }
    },
  }
</script>