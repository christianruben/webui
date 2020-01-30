<template>
  <v-app>
    <transition name="component-fade" mode="out-in">
      <v-app-bar 
        v-if="auth"
        fixed
        app>
        <v-app-bar-nav-icon v-if="!drawer" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template 
            v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              light
              icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              @click="optionClick(item.id)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </transition>
    <v-dialog
      persistent
      v-model="settingpop"
      max-width="250px">
      <v-card>
        <v-card-title>
          <span class="headline">Settings</span>
        </v-card-title>
        <v-card-text>
          Theme
          <v-switch
            v-model="theme"
            :label="`${theme?'Dark':'Light'}`"
            v-on:change="changeTheme()"
          ></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="blue darken-1" 
            text 
            @click="closeSetting">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog 
      persistent 
      v-model="confirmLogout" 
      max-width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirm</span>
        </v-card-title>
        <v-card-text>
          Are you sure want to logout?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="blue darken-1" 
            text 
            @click="cancelLogout">
            Cancel
          </v-btn>
          <v-btn 
            color="red darken-1" 
            text 
            @click="runLogout">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-content>
      <transition 
        name="component-fade" 
        mode="out-in">
        <router-view></router-view>
      </transition>
      <div 
        v-if="loadpage" 
        class="text-xs-center">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
    </v-content>
    <transition name="component-fade" mode="out-in">
      <v-navigation-drawer
        v-if="auth"
        v-model="drawer"
        app>
        <v-list class="pa-1">
          <v-list-item @click="showProfile">
            <v-avatar size="36">
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title>&nbsp;&nbsp;&nbsp;John Leider</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list 
          v-if="getLevel == 2" 
          class="pt-0" 
          dense>
          <v-divider></v-divider>
          <v-list-group
            sub-group
            prepend-icon="account_circle"
            value="true">
            <v-list-item 
              slot="activator">
              <v-list-item-title>Data Master</v-list-item-title>
            </v-list-item>
              <v-list-item
                v-for="master in dataMaster"
                :key="master.title"
                @click="pushRoute(master.path)">
                <v-list-item-action>
                  <v-icon>{{ master.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ master.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list-group>
          <v-list-item
            v-for="item in (getLevel == 2 ? itemsAdmin : items)"
            :key="item.title"
            @click="pushRoute(item.routename)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </transition>
  </v-app>
</template>

<script>
import VApp from 'vuetify/lib/components/VApp'
import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer'
export default {
  name: 'App',
  components: {
    VApp,
    VNavigationDrawer,
  },
  data () {
    return {
      //
      settingpop: false,
      darkmode: true,
      confirmLogout: false,
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
        { title: 'Jurusan', icon: 'room', path: '/admin/jurusan'},
        { title: 'Kelas', icon: 'room', path: '/admin/kelas'},
        { title: 'Berita', icon: 'description', path: '/admin/berita'},
        { title: 'User', icon: 'person', path: '/admin/user'},
        { title: 'Akun', icon: 'person', path: '/admin/akun '},
        { title: 'Nilai Siswa', icon: 'person', path: 'admin/nilai'},
        { title: 'Jam Pelajaran', icon: 'access_alarm', path: '/admin/jampelajaran'},
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
      this.$router.push(name).catch((err)=>{
        err
      });
    },
    optionClick(id){
      if(id === 2){
        this.confirmLogout = true
      }else{
        this.settingpop = true
      }
    },
    closeSetting(){
      this.settingpop = false
    },
    cancelLogout(){
      this.confirmLogout = false
    },
    runLogout(){
      this.confirmLogout = false
      this.$store.dispatch('authentication/logOut')
    },
    changeTheme(){
      this.$store.dispatch('settings/changeTheme', !this.theme)
      this.$vuetify.theme.dark = this.theme
    },
    showProfile(){
      this.$router.push('/admin/profile')
    }
  },
  computed: {
    auth(){
      return this.$store.getters['authentication/isUserLogged']
    },
    theme:{
      get(){
        return this.$store.getters['settings/themeMode']
      },
      set(value){
        return value
      }
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
    this.$vuetify.theme.dark = this.theme
  },
}
</script>
