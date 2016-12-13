<template>
    <div class="m-covers animated" v-if="isCovers" @click="closeCovers" :transition="animateCovers"></div>
</template>
<script>
export default {
    props: {
        isCovers: {
            type: Boolean,
            require: true,
            default: true
        },
        animateCovers: {
            type: String,
            require: true,
            default: 'down'
        }
    },
    methods: {
        closeCovers: function() {
            this.$dispatch('close-covers');
        }
    }
}
</script>
<style type="text/css">
.m-covers {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
}
</style>
