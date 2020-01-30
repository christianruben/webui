<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="forminput.classname"
      :counter="50"
      label="Nama Kelas"
      data-vv-name="name"
      required
      :rules="nameRules"
    ></v-text-field>
    <v-text-field
      v-model="forminput.departmentname"
      :counter="20"
      label="Jurusan"
      required
    ></v-text-field>
    <v-autocomplete
    v-model="select_department"
    :loading="loading_department"
    :items="itemsDepartment"
    :search-input.sync="search_department"
    item-text="value"
    item-value="id"
    cache-items
    class="mx-3"
    text
    hide-no-data
    hide-details
    label="Jurusan"
    ></v-autocomplete>
  </v-form>
</template>
<script>
  export default {
    props: {
      forminput: Object
    },
    data: () => ({
        valid: false,
        menu: false,
        dialog: false,
        search_department: "",
        nameRules: [ 
            (v) => !!v || "nama kelas tidak boleh kosong",
            (v) => v && v.length >= 3 || "nama kelas must more than 6 character",
            (v) => v && v.length <= 30 || "nama kelas harus kurang dari 20"
            ],
    }),
    methods: {
      search_department(){
      }
    },
    watch: {
      search_department(val){
        val && val != this.select
      }
    },
  }
</script>