<template>
    <!-- 'hitme':isDown,' -->
    <a :class="{'g-cell':true,'hitme':isDown,'up':isSelected}" @click="dropSelect">
        <slot></slot>
        <i v-if="!isDown" class="iconfont {{item.icon}}"></i>
    </a>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            require: true
        },
        isDown: {
            type: Boolean,
            require: false,
            default: true
        },
        isSelected: {
            type: Boolean,
            require: false,
            default: false
        }
    },
    ready: function() {},
    methods: {
        dropSelect() {
            this.$dispatch('m-props-module', this.item.key);
        }
    },
    computed: {
        isDown: function() {
            return this.item.hasOwnProperty('icon') ? false : true;
        }
    }
}
</script>
<style scoped>
    /* 渐入菜单 */
ul.m-menu-drop {
    position: fixed;
    top: .88rem;
    right: 1px;
    background: #fff;
    z-index: 1000;
    border: 1px solid #c7c7c7;
    font-size: .3rem;
}

ul.m-menu-drop li {
    line-height: .8rem;
    height: .8rem;
    padding: 0 .6rem 0 .3rem;
}

 .iconfont{
    font-size: .3rem;
}
</style>
