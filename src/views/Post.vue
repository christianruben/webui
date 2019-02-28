<template>
    <div>
        Post
    </div>
</template>
<script>
export default {
    mounted(){
        this.$store.dispatch('header/switchOff')
    }
}
</script>