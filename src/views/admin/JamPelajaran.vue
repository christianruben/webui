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
            <FormTime :forminput="forminput" ref="form"/>
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
        <td>{{ props.item.time_name }}</td>
        <td>{{ props.item.time_start }}</td>
        <td>{{ props.item.time_end }}</td>
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
  import FormTime from '../../components/FormTime'
  import Dialog from '../../components/Dialog'
  export default {
    components: {
      FormTime,
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
          timename: "",
          timestart: null,
          timeend: null,
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
          {text: 'Jam Pelajaran', value: 'time_name'},
          {text: 'Jam Mulai', value: 'time_start'},
          {text: 'Jam Berakhir', value: 'time_end'},
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
        dispatch('times/removeError')
      },
      editItem (index) {
        const {time_name, time_start, time_end} = this.table[index]
        this.editedIndex = -1
        this.forminput = {
          timename: time_name,
          timestart: time_start,
          timeend: time_end,
        }
        this.idselected = this.table[index]
        this.formTitle = 'Edit Jam Pelajaran'
        const {dispatch} = this.$store;
        dispatch('times/openDialog')
      },
      addItem(){
        this.forminput = {
          timename: "",
          timestart: null,
          timeend: null,
        }
        this.imageUrl = ''
        this.editedIndex = 1
        this.formTitle = 'Tambah Jam Pelajaran'
        const {dispatch} = this.$store;
        dispatch('times/openDialog')
      },
      deleteItem (id) {
        this.alert = true
        this.idselected = id
      },
      OkButton(){
        const {dispatch} = this.$store;
        dispatch('times/deleteTime', {id: this.idselected.study_id})
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
        dispatch('times/closeDialog')
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
            dispatch('times/updateTime', {data: data})
          }else{
            dispatch('times/uploadTime', {data: data})
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
        dispatch('times/storeReq', {index: page, rows: rowsPerPage, search: this.search, sortby: this.sortbylast, sort: !descending ? "ASC" : "DESC"})
      }
    },
    computed: {
      table(){
        return this.$store.getters['times/getAllItems']
      },
      isLoading(){
        return this.$store.getters['times/getLoading']
      },
      lentable(){
        return this.$store.getters['times/getLenItems']
      },
      isUpload(){
        return this.$store.getters['times/getStatUpload']
      },
      errorMsg(){
        return this.$store.getters['times/getError']
      },
      params(){
          return {
              ...this.pagination,
              query: this.search
          }
      },
      dialogActive(){
        return this.$store.getters['times/getDialog']
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
