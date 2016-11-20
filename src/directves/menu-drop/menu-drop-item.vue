<template>
    <li @click="menuSelect" :key="item.key">
        <i v-if="isIcon" class="iconfont {{item.icon}}"></i> {{item.text}}
    </li>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            require: true
        },
        isIcon: {
            type: Boolean,
            require: false,
            default: false
        }
    },
    methods: {
        menuSelect: function() {
            this.$dispatch('meu-select-fuc', this.item.key);
        }
    },
    computed: {
        isIcon: function() {
            return this.item.hasOwnProperty('icon') ? true : false;
        }
    }
}
</script>
