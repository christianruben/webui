<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="forminput.departmentname"
      :counter="50"
      label="Nama Jurusan"
      data-vv-name="name"
      required
      :rules="nameRules"
    ></v-text-field>
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
        nameRules: [ 
            (v) => !!v || "nama jurusan tidak boleh kosong",
            (v) => v && v.length >= 3 || "nama kelas must more than 2 character",
            (v) => v && v.length <= 30 || "nama kelas harus kurang dari 20"
            ],
    }),
    methods: {
    },
    watch: {
    },
  }
</script>