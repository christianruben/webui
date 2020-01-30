<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="forminput.title"
      :counter="50"
      label="Judul"
      data-vv-name="name"
      required
      :rules="nameRules"
    ></v-text-field>
    <v-textarea
      name="input-7-1"
      filled
      label="Kontent"
      auto-grow
      :outlined="true"
      v-model="forminput.content"
    ></v-textarea>
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
            (v) => !!v || "nama kelas tidak boleh kosong",
            (v) => v && v.length >= 3 || "nama kelas must more than 6 character",
            (v) => v && v.length <= 50 || "nama kelas harus kurang dari 50"
            ],
    }),
    methods: {
    },
    watch: {
    },
  }
</script>