<template>
    <header class="m-header">
        <a href="javascript:;" class="left-icon iconfont {{leftIcon}}" @click="leftClick">
        </a>
        <a href="javascript:;" v-if="isRightIcon" class="right-icon iconfont {{rightIcon}}" @click="rightClick">
        </a>
        <h1>{{headerTitle}}</h1>
    </header>
</template>
<script>
export default {
    props: {
        leftIcon: {
            type: String,
            require: true,
            default: 'icon-back'
        },
        rightIcon: {
            type: String,
            require: false,
        },
        isRightIcon: {
            type: Boolean,
            require: true,
            default: false
        },
        headerTitle: {
            type: String,
            require: true,
            default: ''
        }
    },
    methods: {
        leftClick: function() {
            this.$dispatch('left-action')
        },
        rightClick: function() {
            this.$dispatch('right-action')
        }
    },
    computed: {
        isRightIcon: function() {
            return this.rightIcon == '' ? false : true;
        }
    }
}
</script>
