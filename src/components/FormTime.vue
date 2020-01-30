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
    <v-menu
        ref="menu"
        v-model="menustart"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="forminput.time_start"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
            v-model="forminput.time_start"
            label="Picker in menu"
            prepend-icon="access_time"
            readonly
            v-on="on"
            required
            :rules="timeRules"
            ></v-text-field>
        </template>
        <v-time-picker
            v-if="menustart"
            v-model="forminput.time_start"
            @click:minute="$refs.menu.save(forminput.time_start)"
        ></v-time-picker>
    </v-menu>
    <v-menu
        ref="menu"
        v-model="menuend"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="forminput.time_end"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
            v-model="forminput.time_end"
            label="Picker in menu"
            prepend-icon="access_time"
            readonly
            v-on="on"
            required
            :rules="timeRules"
            ></v-text-field>
        </template>
        <v-time-picker
            v-if="menuend"
            v-model="forminput.time_end"
            @click:minute="$refs.menu.save(forminput.time_end)"
        ></v-time-picker>
    </v-menu>
  </v-form>
</template>
<script>
  export default {
    props: {
      forminput: Object
    },
    data: () => ({
        valid: false,
        menustart: false,
        menuend: false,
        dialog: false,
        nameRules: [ 
            (v) => !!v || "jam pelajaran tidak boleh kosong",
            (v) => v && v.length >= 3 || "jam pelajaran must more than 6 character",
            (v) => v && v.length <= 30 || "jam pelajaran harus kurang dari 20"
            ],
        timeRules: [ 
            (v) => !!v || "Jam harus di isi"
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