<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline"></span>
                </v-card-title>
                <form>
                    <v-text-field
                    :counter="10"
                    label="Name"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="E-mail"
                    required
                    ></v-text-field>

                    <v-btn @click="submit">submit</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props: {
        dialog: Boolean,
    },
    data() {
        return {
            nip: "",
            name: "",
            gender: "",
            religion: "",
            bornplace: "",
            borndate: "",
            address: "",
            phonenumber: "",
            relationship: "",
            nipRules: [
                (v) => !!v || "nip is required",
                (v) => v && v.length > 6 || "Nip must more than 6 number"
            ],
        }
    },
}
</script>
