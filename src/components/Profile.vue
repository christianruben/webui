<template>
    <v-container>
        <v-layout align-center justify-center>
            <v-flex xs12>
            <v-layout align-center justify-center>
                <v-avatar
                    :size="120">
                    <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-avatar>
            </v-layout>
            <br/>
            <v-list two-line>
                <v-list-tile ripple @click="editNameShow">
                    <v-list-tile-action>
                        <v-icon color="blue">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                    <v-list-tile-title><h4>Name</h4></v-list-tile-title>
                    <v-list-tile-sub-title>Kristian Ruben</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile ripple @click="editAboutShow">
                    <v-list-tile-action>
                        <v-icon color="blue">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                    <v-list-tile-title><h4>About</h4></v-list-tile-title>
                    <v-list-tile-sub-title>Kristian Ruben</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                editName: false,
                editAbout: false
            }
        },
        methods: {
            editNameShow(){
                return
            },
            editAboutShow(){
                return
            }
        },
    }
</script>