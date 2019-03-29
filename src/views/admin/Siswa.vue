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
            <v-btn color="blue darken-1" flat @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.NIS }}</td>
        <td>{{ props.item.gender }}</td>
        <td>{{ props.item.religion }}</td>
        <td>{{ props.item.born_place }}</td>
        <td>{{ props.item.dateborn }}</td>
        <td>{{ props.item.father_name }}</td>
        <td>{{ props.item.mother_name }}</td>
        <td>{{ props.item.address }}</td>
        <td>{{ props.item.phone_number }}</td>
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
  import FormGuru from '../../components/FormGuru'
  import Dialog from '../../components/Dialog'
  export default {
    components: {
      FormGuru,
      Dialog
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
        formTitle: 'Input Guru',
        hidden: false,
        pagination: {},
        dialog: false,
        editedIndex: -1,
        idselected: 0,
        theaders: [
          {text: 'Nama', value: 'name'},
          {text: 'NIS', value: 'NIS'},
          {text: 'Kelamin', value: 'gender'},
          {text: 'Agama', value: 'religion'},
          {text: 'Tempat Lahir', value: 'born_place'},
          {text: 'Tanggal Lahir', value: 'born_date'},
          {text: 'Ayah', value: 'father_name'},
          {text: 'Ibu', value: 'mother_name'},
          {text: 'Alamat', value: 'address'},
          {text: 'No Telp', value: 'phone_number'},
          {text: 'Actions', sortable: false }
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
      editItem (index) {
        const {class_id, class_name, father_name, mother_name, department_id, gender, student_id} = this.table[index]
        this.editedIndex = -1
        this.forminput = {
          imageFile: null,
          name: this.table[index].name,
          nis: this.table[index].NIS,
          gender: `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`,
          religion: this.table[index].religion,
          bornplace: this.table[index].born_place,
          borndate: this.table[index].dateborn,
          address: this.table[index].address,
          fathername: father_name,
          mothername: mother_name,
          phonenumber: this.table[index].phone_number,
          class: {name: class_name, id: class_id, dept: department_id},
        }
        this.idselected = student_id
        this.imageUrl = `http://localhost:3000/images/uploads/${this.table[index].picture}`
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
      deleteItem (id) {
        this.alert = true
        this.idselected = id
      },
      OkButton(){
        const {dispatch} = this.$store;
        dispatch('students/deleteStudent', {id: this.idselected.teacher_id})
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
        formData.append('classid', this.forminput.class.id)
        const {dispatch} = this.$store;
        if(this.editedIndex == -1){
          dispatch('students/updateStudent', {data: formData})
        }else{
          dispatch('students/uploadStudent', {data: formData})
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
        dispatch('students/storeReq', {index: page, rows: rowsPerPage, search: this.search, sortby: this.sortbylast, sort: !descending ? "ASC" : "DESC"})
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
              ...this.pagination,
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
