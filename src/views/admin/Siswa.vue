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
            <FormGuru :forminput="forminput" :imageUrl="imageUrl"/>
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
      Table Siswa
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
    <v-snackbar
      :value="errorMsg"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ errorMsg }}
      <v-btn
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
      FormGuru: () => import('@/components/FormGuru'),
      Dialog: () => import('@/components/Dialog'),
    },
    data () {
      return {
        color: '',
        mode: '',
        timeout: 6000,
        alert: false,
        forminput: {
          imageFile: null,
          name: 'Kristian',
          nis: '023912389123',
          gender: 'Lelaki',
          religion: 'Kristen Protestan',
          bornplace: 'Jakarta',
          borndate: '',
          fathername: '',
          mothername: '',
          address: 'Tangerang',
          phonenumber: '08943429343',
          class: {name:"", id:-1},
        },
        imageUrl: "",
        total: 0,
        selected: [],
        sortbylast: null,
        search: "",
        loading: false,
        formTitle: 'Input Siswa',
        hidden: false,
        options: {},
        dialog: false,
        editedIndex: -1,
        idselected: 0,
        sortingDesc: "ASC",
        theaders: [
          {text: 'Nama', value: 'name'},
          {text: 'NIS', value: 'NIS'},
          {text: 'Kelamin', value: 'gender'},
          {text: 'Agama', value: 'religion'},
          {text: 'Tempat Lahir', value: 'born_place'},
          {text: 'Tanggal Lahir', value: 'dateborn'},
          {text: 'Ayah', value: 'father_name'},
          {text: 'Ibu', value: 'mother_name'},
          {text: 'Alamat', value: 'address'},
          {text: 'No Telp', value: 'phone_number'},
          {text: 'Actions', value:'action', sortable: false }
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
        dispatch('students/removeError')
      },
      editItem (item) {
        const {class_id, class_name, father_name, mother_name, department_id, gender, student_id} = item
        this.editedIndex = -1
        this.forminput = {
          imageFile: null,
          name: item.name,
          nis: item.NIS,
          gender: `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`,
          religion: item.religion,
          bornplace: item.born_place,
          borndate: item.dateborn,
          address: item.address,
          fathername: father_name,
          mothername: mother_name,
          phonenumber: item.phone_number,
          class: {name: class_name, id: class_id, dept: department_id},
        }
        this.idselected = student_id
        this.imageUrl = `http://localhost:3000/images/uploads/${item.picture}`
        this.formTitle = 'Edit Siswa'
        const {dispatch} = this.$store;
        dispatch('students/openDialog')
      },
      addItem(){
        this.forminput = {
          imageFile: null,
          name: 'Kristian',
          nis: '023912389123',
          gender: 'Lelaki',
          religion: 'Kristen Protestan',
          bornplace: 'Jakarta',
          borndate: '',
          fathername: '',
          mothername: '',
          address: 'Tangerang',
          phonenumber: '08943429343',
          class: {},
        }
        this.imageUrl = ''
        this.editedIndex = 1
        this.formTitle = 'Tambah Siswa'
        const {dispatch} = this.$store;
        dispatch('students/openDialog')
      },
      deleteItem (item) {
        const index = this.table.indexOf(item)
        this.alert = true
        this.idselected = index
      },
      OkButton(){
        const {dispatch} = this.$store;
        dispatch('students/deleteStudent', {id: this.table[this.idselected].student_id})
        dispatch('students/deleteItems', {id: this.idselected})
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
        dispatch('students/closeDialog')
      },
      save () {
        if(this.isLoading) return;
        const formData = new FormData()
        if(this.editedIndex == -1){
          formData.append('id', this.idselected)
        }
        if(this.forminput.imageFile == null){
          return;
        }
        formData.append('imgusr', this.forminput.imageFile)
        formData.append('name', this.forminput.name)
        formData.append('nis', this.forminput.nis)
        formData.append('gender', this.forminput.gender)
        formData.append('religion', this.forminput.religion)
        formData.append('bornPlace', this.forminput.bornplace)
        formData.append('bornDate', this.forminput.borndate)
        formData.append('fatherName', this.forminput.fathername)
        formData.append('motherName', this.forminput.mothername)
        formData.append('address', this.forminput.address)
        formData.append('phoneNumber', this.forminput.phonenumber)
        formData.append('classid', this.forminput.class)
        const {dispatch} = this.$store;
        if(this.editedIndex == -1){
          dispatch('students/updateStudent', {data: formData})
        }else{
          dispatch('students/uploadStudent', {data: formData})
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
        dispatch('students/storeReq', {index: page, rows: itemsPerPage, search: this.search, sortby: this.sortbylast, sort: this.sortingDesc})
      }
    },
    computed: {
      table(){
        return this.$store.getters['students/getAllItems']
      },
      isLoading(){
        return this.$store.getters['students/getLoading']
      },
      lentable(){
        return this.$store.getters['students/getLenItems']
      },
      isUpload(){
        return this.$store.getters['students/getStatUpload']
      },
      errorMsg(){
        return this.$store.getters['students/getError']
      },
      params(){
          return {
              ...this.options,
              query: this.search
          }
      },
      dialogActive(){
        return this.$store.getters['students/getDialog']
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
