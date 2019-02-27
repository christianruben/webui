<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline"></span>
                </v-card-title>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props: {
        condition: Boolean,
        
    }
}
</script>
