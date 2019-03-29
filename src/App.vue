<template>
  <v-app>
    <v-toolbar v-if="auth"
      fixed
      app>
      <v-toolbar-side-icon v-if="!drawer" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
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
            @click="optionClick(item.id)"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
        <router-view></router-view>
      <div v-if="loadpage" class="text-xs-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
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
      <v-list v-if="getLevel == 2" class="pt-0" dense>
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
              @click="pushRoute(master.path)"
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
          v-for="item in (getLevel == 2 ? itemsAdmin : items)"
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
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
      title: "",
      dialog: false,
      isLogged: true,
      drawer: null,
      list: [],
      items: [
        { title: 'Home', icon: 'dashboard', routename: 'news'},
        { title: 'About', icon: 'question_answer', routename: '/'},
        { title: 'Jadwal', icon: 'schedule', routename: 'teacher'},
        { title: 'Nilai', icon: 'edit', routename: 'nilai'}
      ],
      itemsAdmin: [
        { title: 'Home', icon: 'dashboard', routename: '/admin'},
      ],
      dataMaster: [
        { title: 'Siswa', icon: 'people', path: '/admin/siswa'},
        { title: 'Guru', icon: 'people', path: '/admin/guru'},
        { title: 'Pelajaran', icon: 'book', path: '/admin/pelajaran'},
        { title: 'Jadwal', icon: 'assignment', path: '/admin/jadwal'},
        { title: 'Kelas', icon: 'room', path: '/admin/kelas'},
        { title: 'Berita', icon: 'description', path: '/admin/berita'},
        { title: 'User', icon: 'person', path: '/admin/user'},
        { title: 'Semester', icon: 'list', path: '/admin/semester'},
        { title: 'Hari', icon: 'event', path: '/admin/hari'}
      ],
      menuItems: [
        { title: 'Settings', id: 1 },
        { title: 'Logout', id: 2 },
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
    optionClick(id){
      if(id === 2){
        this.$store.dispatch('authentication/logOut')
      }
    }
  },
  computed: {
    auth(){
      return this.$store.getters['authentication/isUserLogged']
    },
    getLevel(){
      return this.$store.state.authentication.level
    },
    loadpage(){
      return this.$store.getters['loadpage/isShow']
    }
  },
  beforeCreate(){
    this.$store.dispatch('header/switchOn')
  },
  mounted() {
    const {dispatch} = this.$store
    dispatch('students/storeClass')
  },
}
</script>
