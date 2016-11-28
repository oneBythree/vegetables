<template>
    <div class="m-silder" v-if="isSilder" transition="down">
        <p class="title" v-if="isTitle">
            {{silderTitle}}
        </p>
        <div class="close">
            <span class="btn">
                        <i class="iconfont icon-close" @click="closeSilder"></i>
             </span>
        </div>
        <slot></slot>
        <div class="footer">{{silderFooter}}</div>
    </div>
    <v-covers :is-covers="isSilder" @close-covers="closeSilder"></v-covers>
</template>
<script>
import VCovers from '../covers/covers.vue';
export default {
    props: {
        isSilder: {
            type: Boolean,
            require: true,
            default: false
        },
        silderTitle: {
            type: String,
            require: true,
            default: '',
        },
        silderFooter: {
            type: String,
            require: true,
            default: '确定'
        },
        isTitle: {
            type: Boolean,
            require: true,
            default: false
        }
    },
    methods: {
        closeSilder: function() {
            this.isSilder = false;
        }
    },
    computed: {
        isTitle: function() {
            return this.silderTitle == '' ? false : true;
        }
    },
    components: {
        VCovers,
    }
}
</script>
