<style>
@import '../sass/common.css';
.back-transition {
    transition: transform .5s ease;
}

.back-enter {
    transform: translate(-100%, 0);
}

.back-leave {
    transform: translate(0%, 0);
}

.slide-transition {
    transition: transform 0.3s ease;
    width: 100%;
}


.slide-leave {
    transform: translateX(100%);
}
.slide-enter{
    transform: translateX(-100%);
}
.app-transition {
    transition: opacity 0.8s ease;
}

.app-enter,
.app-leave {
    opacity: 0;
}
</style>
<template>
    <div class="animated">
        <router-view transition="right" keep-alive></router-view>
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
        beforeDestroy() {

        },
        methods: {

        }
}
</script>
