<template>
    <header class="m-header">
        <a href="javascript:;" class="left-icon iconfont {{leftIcon}}" @click="leftClick">
        </a>
        <a href="javascript:;" v-if="isRightIcon" class="right-icon iconfont {{rightIcon}}" @click="rightClick">
            <slot v-if="isRightText"></slot>
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
        },
        isRightText: {
            type: Boolean,
            require: true,
            default: false
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
    ready: function() {
        // console.log(this.rightIcon)
    },
    computed: {
        isRightIcon: function() {
            return this.rightIcon == '' ? false : true;
        },
        // rightIcon: function() {
        //     // console.log(this.isRightText)
        //     return this.isRightText ? 'temp' : this.rightIcon;
        // },
    }
}
</script>
<style >
    .right-icon.iconfont.temp{
        font-family: 'Helvetica Neue';
        -webkit-text-stroke-width: 0;
    }
</style>
