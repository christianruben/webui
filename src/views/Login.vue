<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-6">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{getType.title}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
                <v-alert
                    :value="errMessage"
                    color="error"
                    icon="warning"
                    transition="fade-transition"
                >
                    {{errMessage}}
                </v-alert>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username" :rules="userRules" required></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="passRules" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submitLogin" :loading="isLoading" :disabled="isLoading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
<script>
    export default {
        data() {
            return {
                valid: false,
                username: "",
                password: "",
                passRules: [ 
                    (v) => !!v || "password is required",
                    (v) => v && v.length > 6 || "Password must more than 6 character"
                    ],
                userRules: [ 
                    v => !!v || "Username is required",
                    v => v && v.length > 5 || "Username must more than 5 character"
                    ],
                loadaction: false
            }
        },
        methods: {
            sub(){
                if(this.$refs.form.validate()){
                    this.loadaction = true;
                    setTimeout(() => {
                        (this.loadaction = false)
                        if(this.getType.type === 1){
                            this.$store.dispatch('authentication/fakeloginadm')
                        this.$router.push('/admin')
                        }else{
                            this.$store.dispatch('authentication/fakelogin')
                        this.$router.push('/')
                        }
                    }, 3000);
                }
            },
            submitLogin(){
                const {username, password} = this;
                const {dispatch} = this.$store;
                if(this.$refs.form.validate()){
                    if(this.getType.type === 1){
                        dispatch('authentication/adminLogIn', {username, password})
                    }else{
                        dispatch('authentication/logIn', {username, password})
                    }
                }
            }
        },
        computed: {
            isLoading(){
                return this.$store.state.authentication.loading;
            },
            errMessage(){
                return this.$store.getters['authentication/getError'];
            },
            getType(){
                if(this.$route.path.split('/')[1] === 'admin'){
                    return {
                        title: 'Admin Login',
                        type: 1
                    }
                }else{
                    return {
                        title: 'User Login',
                        type: 2
                    }
                }
            },
            isLoged(){
                return this.$store.getters['authentication/isUserLogged']
            }
        },
    }
</script>