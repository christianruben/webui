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
            <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="save">Save</v-btn>
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
      Table Jam Pelajaran
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
          class="mr-2"
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
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
        text
        @click="removeError()"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    components: {
      FormTime: () => import('@/components/FormTime'),
      Dialog: () => import('@/components/Dialog'),
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
        sortingDesc: "ASC",
        search: "",
        loading: false,
        formTitle: 'Input Guru',
        hidden: false,
        options: {},
        dialog: false,
        editedIndex: -1,
        idselected: 0,
        theaders: [
          {text: 'Jam Pelajaran', value: 'time_name'},
          {text: 'Jam Mulai', value: 'time_start'},
          {text: 'Jam Berakhir', value: 'time_end'},
          {text: 'Actions', value: 'action', sortable: false }
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
      editItem (item) {
        const {time_name, time_start, time_end} = item
        this.editedIndex = -1
        this.forminput = {
          timename: time_name,
          timestart: time_start,
          timeend: time_end,
        }
        this.idselected = item
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
      deleteItem (item) {
        const index = this.table.indexOf(item)
        this.alert = true
        this.idselected = index
      },
      OkButton(){
        const {dispatch} = this.$store;
        dispatch('times/deleteTime', {id: this.table[this.idselected].time_id})
        dispatch('times/deleteItems', {id: this.idselected})
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
        const {dispatch} = this.$store;
        let {sortBy, sortDesc, page, itemsPerPage} = this.options
        if(sortBy.length > 0){
          this.sortbylast = sortBy
        }
        if(sortDesc.length === 1){
          this.sortingDesc = !sortDesc[0] ? "ASC" : "DESC"
        }
        dispatch('times/storeReq', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sortingDesc})
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
              ...this.options,
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
