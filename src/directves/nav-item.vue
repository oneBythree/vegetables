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
