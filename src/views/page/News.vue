<template>
  <v-container>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader>
          {{ title }}
        </v-subheader>
        <ListNews
          :key="item.id"
          :item="item"/>
        <v-divider
          v-if="index + 1 < items.length"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
    <v-layout justify-center>
      <v-flex xs8>
        <v-card>
          <v-card-text>
            <v-pagination
              v-model="page"
              :length="15"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ListNews from '../components/ListNews'
  export default {
    components: {
      ListNews
    },
    data () {
      title: "News"
    }
  }
</script>