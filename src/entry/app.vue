<style>
@import '../sass/common.css';
<style> .fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}

.child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}
</style>
</style>
<template>
    <div class="animated">
        <router-view transition="left" keep-live></router-view>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        ready() {

        },
        methods: {

        }
}
</script>
