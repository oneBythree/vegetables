<template>
    <div class="m-silder animated" v-if="isSilder" transition="fadeUp">
        <p class="title" v-if="isTitle">
            {{silderTitle}}
        </p>
        <div class="close">
            <span class="btn">
                <i class="iconfont icon-close" @click="closeSilder"></i>
             </span>
        </div>
        <slot></slot>
        <div class="footer" @click="footerSubmit">{{silderFooter}}</div>
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
        },
        footerSubmit:function(){
            this.dispatch('footer-submit');
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
