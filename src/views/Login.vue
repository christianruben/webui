<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-6">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username" :rules="userRules" required></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="passRules" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="sub" :loading="loadaction" :disabled="loadaction">Login</v-btn>
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
                        this.$router.push('/about')
                    }, 3000);
                }
            }
        },
    }
</script>