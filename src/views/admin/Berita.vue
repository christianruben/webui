<template>
  <v-container>
    <v-dialog persistent :value="dialogActive" max-width="800px">
        <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template> -->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <FormNews :forminput="forminput"/>
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
        @click="addItem"
        >
          <v-icon>add</v-icon>
        </v-btn>
    </v-fab-transition>
    <v-card-title>
      Tabel Berita
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
      item-key="name"
    >
      <template v-slot:item.action="{item}">
      <td class="justify-center layout px-0">
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
      </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    components: {
      FormNews: () => import('@/components/FormNews'),
      Dialog: () => import('@/components/Dialog')
    },
    data () {
      return {
        total: 0,
        selected: [],
        forminput: {
          title: "",
          content: ""
        },
        alert: false,
        sortbylast: null,
        sortingDesc: "ASC",
        search: "",
        loading: false,
        formTitle: 'Guru',
        hidden: false,
        options: {},
        dialog: false,
        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        theaders: [
          { text: 'Title', value: 'title'},
          { text: 'Tanggal Berita', value: 'date_written'},
          { text: 'Penulis', value: 'username'},
          { text: 'Actions', value: 'action', sortable: false }
        ]
      }
    },
    methods: {
      editItem (item) {
        const {title, content} = item
        this.editedIndex = -1
        this.forminput = {
          title: title,
          content: content,
        }
        this.idselected = item
        this.formTitle = 'Edit Pelajaran'
        const {dispatch} = this.$store;
        dispatch('newsStore/openDialog')
      },
      deleteItem (item) {
        const index = this.table.indexOf(item)
        this.alert = true
        this.idselected = index
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      addItem(){
        this.forminput = {
          title: "",
          content: "",
        }
        this.editedIndex = 1
        this.formTitle = 'Tambah Berita'
        const {dispatch} = this.$store;
        dispatch('newsStore/openDialog')
      },
      OkButton(){
        const {dispatch} = this.$store;
        dispatch('newsStore/deleteNews', {id: this.table[this.idselected].news_id})
        dispatch('newsStore/deleteItems', {id: this.idselected})
        this.alert = false
        this.idselected = 0
      },
      NoButton(){
        this.alert = false
      },
      closeDialog(){
        const {dispatch} = this.$store;
        dispatch('newsStore/closeDialog')
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      getDataFromApi(){
        if(this.isLoading) return;
        const {dispatch} = this.$store;
        let {sortBy, sortDesc, page, itemsPerPage} = this.options
        if(sortBy.length > 0){
          this.sortbylast = sortBy
        }
        if(sortDesc.length === 1){
          this.sortingDesc = !sortDesc[0] ? "ASC" : "DESC"
        }
        dispatch('newsStore/storeReq', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sortingDesc})
      }
    },
    computed: {
      table(){
        return this.$store.getters['newsStore/getAllItems']
      },
      isLoading(){
        return this.$store.getters['newsStore/getLoading']
      },
      lentable(){
        return this.$store.getters['newsStore/getLenItems']
      },
      isUpload(){
        return this.$store.getters['newsStore/getStatUpload']
      },
      errorMsg(){
        return this.$store.getters['newsStore/getError']
      },
      params(){
          return {
              ...this.options,
              query: this.search
          }
      },
      dialogActive(){
        return this.$store.getters['newsStore/getDialog']
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
