<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="forminput.dayname"
      :counter="50"
      label="Nama Hari"
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
            (v) => !!v || "nama hari tidak boleh kosong",
            (v) => v && v.length >= 3 || "nama hari must more than 2 character",
            (v) => v && v.length <= 30 || "nama hari harus kurang dari 20"
            ],
    }),
    methods: {
    },
    watch: {
    },
  }
</script>