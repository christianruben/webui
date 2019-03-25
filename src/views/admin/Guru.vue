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
        :headers="headers"
        :pagination.sync="pagination"
        :search="search"
        :items="desserts"
        class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
          <span slot="activator">
          {{ props.header.text }}
          </span>
          <span>
          {{ props.header.text }}
          </span>
      </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-center">{{ props.item.iron }}</td>
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
        sortbylast: null,
        search: "",
        pagination: {},
        loading: false,
        formTitle: 'Guru',
        hidden: false,
        dialog: false,editedIndex: -1,
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
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'NIP' },
          { text: 'Fat (g)', value: 'name' },
          { text: 'Carbs (g)', value: 'gender' },
          { text: 'Protein (g)', value: 'religion' },
          { text: 'Iron (%)', value: 'born_place' },
          { text: 'Actions', value: 'born_date', sortable: false }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    },
    methods: {
      editItem () {
        console.log('edit')
      },
      deleteItem () {
        console.log('delete')
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
      getData(){
        this.loading = true
        // return new Promise((resolve, reject) => {
        //   const {sortBy, descending, page, rowsPerPage} = this.pagination
        // })
        const {dispatch} = this.$store;
        const {sortBy, descending, page, rowsPerPage} = this.pagination
        if(sortBy){
          this.sortbylast = sortBy
        }
        dispatch('storeReq', {index: page, rows: rowsPerPage, search: this.search, sortby: this.sortbylast, sort: !descending ? "ASC" : "DESC"}, {root: true})
        // dispatch('teacher/deleteItems', {id:1})
      }
    },
    beforeCreate() {
    },
    watch: {
      pagination: {
        handler () {
          this.getData()
        }
      }
    },
  }
</script>