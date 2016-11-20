<template>
    <a :class="{'active':isSelectDroped}" class="item m-border" @click="dropSelect">
        <i v-if="isSelectDroped" class="iconfont icon-right"></i>
        <slot></slot>
    </a>
</template>
<script>
export default {
    props: {
        key: {
            type: null,
            require: true
        },
        isSelectDroped: {
            type: Boolean,
            require: false,
            default: false
        }
    },
    methods: {
        dropSelect() {
            this.$dispatch('drop-select-item', this.key);
        }
    }
}
</script>
<style scoped lang="sass">
a.item {
    &:active {
        background: rgba(255, 255, 255, .5);
    }
    &.active {
        color: #22ac38;
        .iconfont {
            font-size: .3rem;
        }
    }
}
</style>
