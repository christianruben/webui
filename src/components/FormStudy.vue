<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      v-model="forminput.studyname"
      :counter="50"
      label="Nama Pelajaran"
      data-vv-name="name"
      required
      :rules="nameRules"
    ></v-text-field>
    <v-text-field
      v-model="forminput.studycode"
      :counter="20"
      label="Kode Pelajaran"
      :rules="codeRules"
      v-on:keypress="isNumber"
      required
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
            (v) => !!v || "nama pelajaran tidak boleh kosong",
            (v) => v && v.length >= 3 || "nama pelajaran must more than 6 character",
            (v) => v && v.length <= 30 || "nama pelajaran harus kurang dari 20"
            ],
        codeRules: [ 
            (v) => !!v || "kode pelajaran tidak boleh kosong",
            (v) => v && v.length >= 3 || "nama pelajaran must more than 6 character",
            (v) => v && v.length <= 20 || "nama pelajaran harus kurang dari 20"
            ],
    }),
    methods: {
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode != 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        }
    },
    watch: {
    },
  }
</script>