<template>
  <v-container>
    <v-dialog persistent :value="dialogActive" max-width="600px">
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
            <FormStudy :forminput="forminput" ref="form"/>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="closeDialog">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click="save">Save</v-btn>
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
        small
        fixed
        bottom
        right
        @click="addItem"
        >
          <v-icon>add</v-icon>
        </v-btn>
    </v-fab-transition>
    <v-card-title>
      Table Guru
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
      :pagination.sync="pagination"
      :total-items="lentable"
      :loading="isLoading"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.study_name }}</td>
        <td>{{ props.item.study_code }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.index)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-snackbar
      :value="errorMsg"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ errorMsg }}
      <v-btn
        dark
        flat
        @click="removeError()"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #lateral .v-speed-dial,
  #lateral .v-btn--floating {
    position: absolute;
  }
  #lateral .v-btn--floating {
    margin: 32px 32px 16px 16px;
  }
</style>

<script>
  import FormStudy from '../../components/FormStudy'
  import Dialog from '../../components/Dialog'
  export default {
    components: {
      FormStudy,
      Dialog
    },
    data () {
      return {
        valid: false,
        color: '',
        mode: '',
        timeout: 6000,
        alert: false,
        forminput: {
          studyname: "",
          studycode: ""
        },
        imageUrl: "",
        total: 0,
        selected: [],
        sortbylast: null,
        search: "",
        loading: false,
        formTitle: 'Input Guru',
        hidden: false,
        pagination: {},
        dialog: false,
        editedIndex: -1,
        idselected: 0,
        theaders: [
          {text: 'Nama Pelajaran', value: 'study_name'},
          {text: 'Kode Pelajaran', value: 'study_code'},
          {text: 'Actions', align: 'center', sortable: false }
        ],
        currentY: 0,
        lastY:0
      }
    },
    methods: {
      handleScroll (event) {
        this.currentY = event.pageY
        if(this.currentY > this.lastY){
          this.hidden = true
        }else{
          this.hidden = false
        }
        this.lastY = this.currentY
      },
      removeError(){
        const {dispatch} = this.$store;
        dispatch('studies/removeError')
      },
      editItem (index) {
        const {study_name, study_code} = this.table[index]
        console.log(study_name, study_code)
        this.editedIndex = -1
        this.forminput = {
          studyname: study_name,
          studycode: study_code,
        }
        this.idselected = this.table[index]
        this.formTitle = 'Edit Pelajaran'
        const {dispatch} = this.$store;
        dispatch('studies/openDialog')
      },
      addItem(){
        this.forminput = {
          studyname: "",
          studycode: "",
        }
        this.imageUrl = ''
        this.editedIndex = 1
        this.formTitle = 'Tambah Pelajaran'
        const {dispatch} = this.$store;
        dispatch('studies/openDialog')
      },
      deleteItem (id) {
        this.alert = true
        this.idselected = id
      },
      OkButton(){
        const {dispatch} = this.$store;
        dispatch('studies/deleteStudy', {id: this.idselected.study_id})
        this.alert = false
        this.idselected = 0
      },
      NoButton(){
        this.alert = false
      },
      close () {
        this.idselected = 0
      },
      closeDialog(){
        const {dispatch} = this.$store;
        dispatch('studies/closeDialog')
      },
      save () {
        if(this.$refs.form.$refs.form.validate()){
        // if(this.$children.$refs.form.validate()){
          if(this.isLoading) return;
          let data = {};
          if(this.editedIndex == -1){
            data.id = this.idselected.study_id
          }
          data.studyname = this.forminput.studyname
          data.studycode = this.forminput.studycode
          const {dispatch} = this.$store;
          if(this.editedIndex == -1){
            dispatch('studies/updateStudy', {data: data})
          }else{
            dispatch('studies/uploadStudy', {data: data})
          }
        }
        // this.close()
      },
      getDataFromApi(){
        if(this.isLoading) return;
        const {dispatch} = this.$store;
        let {sortBy, descending, page, rowsPerPage} = this.pagination
        if(sortBy){
          this.sortbylast = sortBy
        }
        dispatch('studies/storeReq', {index: page, rows: rowsPerPage, search: this.search, sortby: this.sortbylast, sort: !descending ? "ASC" : "DESC"})
      }
    },
    computed: {
      table(){
        return this.$store.getters['studies/getAllItems']
      },
      isLoading(){
        return this.$store.getters['studies/getLoading']
      },
      lentable(){
        return this.$store.getters['studies/getLenItems']
      },
      isUpload(){
        return this.$store.getters['studies/getStatUpload']
      },
      errorMsg(){
        return this.$store.getters['studies/getError']
      },
      params(){
          return {
              ...this.pagination,
              query: this.search
          }
      },
      dialogActive(){
        return this.$store.getters['studies/getDialog']
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
      pagination: {
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
      },
      isUpload: {
        handler(value, valueold){
          // console.log(value, valueold)
          // // if(value == valueold)
          // //   return
          // console.log(~value&&valueold)
          if(~value&&valueold)
            this.getDataFromApi()
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi();
    },
    created () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
