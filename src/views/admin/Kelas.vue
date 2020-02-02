<template>
  <v-container>
    <v-dialog persistent v-model="dialogActive" max-width="500px">
        <v-card>
          <v-alert
            :value="errorMsg"
            dismissible
            color="error"
          >
            {{errorMsg}}
          </v-alert>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          
          <v-card-text>
            <FormClass :forminput="forminput"/>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <Dialog :dialog="alert" :title="`Hapus data`" :text="`Anda yakin ingin menghapus data ini ?`" v-on:ok="OkButton" v-on:no="NoButton"/>
      <v-fab-transition>
        <v-btn
        v-show="!hidden"
        color="pink"
        fab
        dark
        medium
        fixed
        bottom
        right
        @click="dialog = true"
        >
          <v-icon>add</v-icon>
        </v-btn>
    </v-fab-transition>
    <v-card-title>
      Table Kelas
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="theaders"
      :items="table"
      :options.sync="options"
      :server-items-length="lentable"
      :loading="isLoading"
      class="elevation-1"
    >
      <template v-slot:item.action="{item}">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    components: {
      FormClass: () => import('@/components/FormClass'),
      Dialog: () => import('@/components/Dialog'),
    },
    data () {
      return {
        total: 0,
        alert: false,
        forminput: {
          classname: "",
          deparmentid: ""
        },
        selected: [],
        sortbylast: null,
        sortingDesc: "ASC",
        search: "",
        loading: false,
        formTitle: 'Kelas',
        hidden: false,
        options: {},
        dialog: false,
        editedIndex: -1,
        theaders: [
          {text: 'Nama Kelas', value: 'class_name'},
          {text: 'Jurusan', value: 'department_name'},
          { text: 'Actions', value: 'action', sortable: false }
        ]
      }
    },
    methods: {
      editItem (item) {
        console.log(item)
        const {class_name, department_id, department_name} = item
        this.editedIndex = -1
        this.forminput = {
          classname: class_name,
          departmentname: department_name,
          deparmentid: department_id,
        }
        this.idselected = item
        this.formTitle = 'Edit Kelas'
        const {dispatch} = this.$store;
        dispatch('classdata/openDialog')
      },
      deleteItem (item) {
        const index = this.table.indexOf(item)
        this.alert = true
        this.idselected = index
      },
      close () {
        this.dialog = false
      },
      closeDialog(){
        const {dispatch} = this.$store;
        dispatch('classdata/closeDialog')
      },
      save () {
        this.close()
      },
      getDataFromApi(){
        const {dispatch} = this.$store;
        let {sortBy, sortDesc, page, itemsPerPage} = this.options
        if(sortBy.length > 0){
          this.sortbylast = sortBy
        }
        if(sortDesc.length === 1){
          this.sortingDesc = !sortDesc[0] ? "ASC" : "DESC"
        }
        dispatch('classdata/storeReq', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sortingDesc})
      },
      OkButton(){
        const {dispatch} = this.$store;
        dispatch('classdata/deleteClass', {id: this.table[this.idselected].class_id})
        dispatch('classdata/deleteItems', {id: this.idselected})
        this.alert = false
        this.idselected = 0
      },
      NoButton(){
        this.alert = false
      },
    },
    computed: {
      table(){
        return this.$store.getters['classdata/getAllItems']
      },
      isLoading(){
        return this.$store.getters['classdata/getLoading']
      },
      lentable(){
        return this.$store.getters['classdata/getLenItems']
      },
      errorMsg(){
        return this.$store.getters['classdata/getError']
      },
      params(){
          return {
              ...this.options,
              query: this.search
          }
      },
      dialogActive(){
        return this.$store.getters['classdata/getDialog']
      }
    },
    watch: {
      dialogActive: {
        handler(val){
          if(!val){
            this.close()
          }
        },
        deep: true
      },
      options: {
        handler () {
          this.getDataFromApi();
        },
        deep: true
      },
      params: {
          handler(){
              this.getDataFromApi()
          },
          deep: true
      }
    },
    mounted () {
      this.getDataFromApi();
    },
  }
</script>
