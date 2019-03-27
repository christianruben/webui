<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500px">
        <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template> -->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-fab-transition>
        <v-btn
        v-show="!hidden"
        color="pink"
        fab
        dark
        medium
        fixed
        bottom
        right
        @click="dialog = true"
        >
          <v-icon>add</v-icon>
        </v-btn>
    </v-fab-transition>
    <v-card-title>
      Nutrition
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
      item-key="name"
      select-all
    >
      <template v-slot:items="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.NIP }}</td>
      <td>{{ props.item.gender }}</td>
      <td>{{ props.item.religion }}</td>
      <td>{{ props.item.born_place }}</td>
      <td>{{ props.item.dateborn }}</td>
      <td class="justify-center layout px-0">
        <v-icon
          small
          class="mr-2"
          @click="editItem(props.item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(props.item)"
        >
          delete
        </v-icon>
      </td>
      </template>
    </v-data-table>
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
  export default {
    data () {
      return {
        total: 0,
        selected: [],
        sortbylast: null,
        search: "",
        loading: false,
        formTitle: 'Guru',
        hidden: false,
        pagination: {},
        dialog: false,
        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0
        },
        theaders: [
          {text: 'Nama', value: 'name'},
          {text: 'NIP', value: 'NIP'},
          {text: 'Kelamin', value: 'gender'},
          {text: 'Agama', value: 'religion'},
          {text: 'Tempat Lahir', value: 'born_place'},
          {text: 'Tanggal Lahir', value: 'born_date'},
          { text: 'Actions', sortable: false }
        ]
      }
    },
    methods: {
      editItem () {
      },
      deleteItem () {
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      getDataFromApi(){
        if(this.isLoading) return;
        const {dispatch} = this.$store;
        let {sortBy, descending, page, rowsPerPage} = this.pagination
        if(sortBy){
          this.sortbylast = sortBy
        }
	dispatch('storeReq', {index: page, rows: rowsPerPage, search: this.search, sortby: this.sortbylast, sort: !descending ? "ASC" : "DESC"}, {root: true})
      }
    },
    computed: {
      table(){
        return this.$store.getters['getAllItems']
      },
      isLoading(){
        return this.$store.getters['getLoading']
      },
      lentable(){
        return this.$store.getters['getLenItems']
      },
      params(nv){
          return {
              ...this.pagination,
              query: this.search
          }
      }
    },
    watch: {
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
      }
    },
    mounted () {
      this.getDataFromApi();
    },
  }
</script>
