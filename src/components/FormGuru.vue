<template>
  <v-form v-model="valid" ref="form">
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <img :src="imageUrl" height="150" v-if="imageUrl"/>
      <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
        required
      >
    </v-flex>
    <v-text-field
      v-model="forminput.name"
      :counter="50"
      label="Name"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-text-field
      v-model="forminput.nis"
      :counter="20"
      v-on:keypress="isNumber"
      label="NIS"
      required
    ></v-text-field>
    <v-select
      v-model="forminput.gender"
      :items="genderlist"
      label="Jenis Kelamin"
      required
    ></v-select>
    <v-select
      v-model="forminput.religion"
      :items="religionlist"
      label="Agama"
      required
    ></v-select>
    <v-text-field
      v-model="forminput.bornplace"
      :counter="50"
      label="Tempat Lahir"
      required
    ></v-text-field>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="forminput.borndate"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="forminput.borndate"
          label="Picker in menu"
          prepend-icon="event"
          readonly
          v-on="on"
          required
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="forminput.borndate"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
        required
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="forminput.fathername"
      :counter="50"
      label="Nama Ayah"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-text-field
      v-model="forminput.mothername"
      :counter="50"
      label="Nama Ibu"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-textarea
      :counter="50"
      label="Alamat"
      hint="Tulis alamat disini..."
      v-model="forminput.address"
    ></v-textarea>
    <v-text-field
      v-model="forminput.phonenumber"
      :counter="12"
      label="Nomor Telepon"
      v-on:keypress="isNumber"
      required
    ></v-text-field>
    <v-autocomplete
    v-model="forminput.class"
    :loading="loading_class"
    :items="itemsClass"
    :search-input.sync="search_class"
    item-text="value"
    item-value="id"
    cache-items
    class="mx-3"
    text
    hide-no-data
    hide-details
    label="Kelas"
    ></v-autocomplete>
  </v-form>
</template>
<script>
  export default {
    props: {
      forminput: Object,
      imageUrl: String
    },
    data: () => ({
      valid: false,
      menu: false,
      genderlist: ['Lelaki', 'Perempuan'],
      religionlist: ['Islam', 'Kristen Protestan', 'Katolik', 'Buddha', 'Hindu', 'Kong Hu Cu'],
      dialog: false,
      imageName: '',
      select_class: [],
      loading_class: false,
      search_class: "",
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
      },
      searchClass(v){
        const {dispatch} = this.$store
        dispatch('classdata/searchLight', v)
      },
      save (date) {
        this.$refs.menu.save(date)
      },
      pickFile () {
        this.$refs.image.click ()
      },
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.forminput.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.forminput.imageFile = ''
          this.imageUrl = ''
        }
      }
    },
    computed: {
      classselect () {
        return this.$store.getters['students/getClassList']
      },
      itemsClass(){
        return this.$store.getters['classdata/getLightResult']
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      search_class(val){
        val && val !== this.select_class && this.searchClass(val)
      }
    },
  }
</script>