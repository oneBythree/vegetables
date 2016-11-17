<style scoped>
    @import './styles/common.css';
    @import './common/mui/css/mui.css';
</style>
<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import './common/mui/js/mui.js';
    export default {
        data () {
            return {}
        },
        ready () {
            console.log($)
        },
        beforeDestroy () {


        },
        methods: {

        }
    }
</script>

