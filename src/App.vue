<template>
  <v-app>
    <v-toolbar v-if="auth"
      fixed
      app>
      <v-toolbar-side-icon v-if="!drawer" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn
          slot="activator"
          light
          icon
        >
          <v-icon>more_vert</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="(item, i) in menuItems"
            :key="i"
            ripple
            @click="optionClick"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-navigation-drawer
      v-if="auth"
      v-model="drawer"
      app
    >
      <v-list class="pa-1">
        <v-list-tile avatar @click="dialog=true">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-group
          prepend-icon="account_circle"
          value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Data Master</v-list-tile-title>
          </v-list-tile>
            <v-list-tile
              v-for="master in dataMaster"
              :key="master.title"
              @click="pushRoute(master.title)"
            >
              <v-list-tile-action>
                <v-icon>{{ master.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ master.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list-group>
        <v-list-tile
          v-for="item in list"
          :key="item.title"
          @click="pushRoute(item.routename)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- modal -->
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title>Profile</v-toolbar-title>
        </v-toolbar>
        <Profile/>
      </v-card>
    </v-dialog>
    <!-- modal -->
  </v-app>
</template>

<script>
import Profile from './components/Profile'

export default {
  components: {
    Profile
  },
  name: 'App',
  data () {
    return {
      //
      dialog: false,
      isLogged: true,
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard', routename: 'news'},
        { title: 'About', icon: 'question_answer', routename: '/'},
        { title: 'Jadwal', icon: 'schedule', routename: 'teacher'},
        { title: 'Nilai', icon: 'edit', routename: 'nilai'}
      ],
      itemsAdmin: [
        { title: 'Home', icon: 'dashboard', routename: 'news'},
      ],
      dataMaster: [
        { title: 'Siswa', icon: 'people'},
        { title: 'Guru', icon: 'people'},
        { title: 'Pelajaran', icon: 'book'},
        { title: 'Jadwal', icon: 'assignment'},
        { title: 'Kelas', icon: 'room'},
        { title: 'Berita', icon: 'description'},
        { title: 'User', icon: 'person'},
        { title: 'Semester', icon: 'list'},
        { title: 'Hari', icon: 'event'}
      ],
      menuItems: [
        { title: 'Settings' },
        { title: 'Logout' },
      ],
      drawers: {
      // sets the open status of the drawer
      open: true,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: false,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: true,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: false,
      // sets the drawer to the mini variant, showing only icons, of itself (true) 
      // or showing the full drawer (false)
      mini: false
    },
    }
  },
  methods: {
    pushRoute(name){
      this.$router.push(name);
    },
    optionClick(){

    }
  },
  computed: {
    auth(){
      return this.$store.getters['authentication/isUserLogged']
    },
    list(){
      return this.$store.getters['authentication/getLevel'] === 1 ? this.itemsAdmin : this.items
    }
  },
  beforeCreate(){
    this.$store.dispatch('header/switchOn')
  }
}
</script>
