<template>
    <div class="m-dialog animated" v-if="isShowDialog" transition="down">
        <slot name="defaultDialog">
            <div class="default-body">
                <div class="div-icon">
                    <i class="iconfont {{typeIcon}}"></i>
                </div>
                <div class="div-text">
                    <p>{{dialogText}}</p>
                </div>
                <div class="dialog-footer">
                    <span class="m-btn-cancel" v-if="!!cancelText" @click="clickDialog">{{cancelText}}</span>
                    <span class="m-btn-right">{{rightText}}</span>
                </div>
            </div>
        </slot>
    </div>
    <v-covers :is-covers="isShowDialog" @close-covers="clickDialog"></v-covers>
</template>
<script>
import VCovers from '../covers/covers.vue';
export default {
    props: {
        isShowDialog: {
            type: Boolean,
            require: true,
            default: false
        },
        typeDialog: {
            type: String,
            require: true,
            default: 'alert'
        },
        typeIcon: {
            type: String,
            require: true,
            default: 'icon-info'
        },
        dialogText: {
            type: String,
            require: false
        },
        cancelText: {
            type: String,
            require: false
        },
        rightText: {
            type: String,
            require: true,
            default: '确认'
        }
    },
    methods: {
        clickDialog: function() {
            this.isShowDialog = false;
        }
    },
    watch: {
        isShowDialog: function(cur, old) {
            if (cur) {
                var el = $('.m-dialog');
                var w = -el.innerWidth() / 2;
                var h = -el.innerHeight() / 2;
                el.css({
                    'marginLeft': w,
                    'marginTop': h,
                })
            }
        }
    },
    components: {
        VCovers
    }
}
</script>
<style>
.m-dialog {
    position: fixed;
    width: 80%;
    top: 50%;
    left: 50%;
    background: #fff;
    border-radius: .1rem;
    z-index: 1001;
    margin-left: -10%;
    padding: .35rem 0;
}

.m-dialog>div.default-body {
    padding: 0 .6rem;
    transform: translate(-50%, -50%, 0);
}

.m-dialog .div-icon {
    text-align: center;
    margin-bottom: .2rem;
}

.m-dialog .div-icon>.iconfont {
    font-size: .8rem;
    line-height: normal;
}

.iconfont.icon-info {
    color: #919191;
}

.m-dialog .div-text>p {
    font-size: .32rem;
    color: #333;
    text-align: center;
}

.m-dialog div.dialog-footer {
    text-align: center;
}

.m-btn-cancel,
.m-btn-right {
    display: inline-block;
    text-align: center;
    height: .6rem;
    line-height: .6rem;
    color: #fff;
    font-size: .28rem;
    border-radius: .06rem;
    cursor: pointer;
}

.m-btn-cancel~.m-btn-right,
.m-btn-cancel {
    padding: 0 .3rem;
    width: auto;
}

.m-btn-cancel {
    margin-right: .2rem;
    background: #919191;
}

.m-btn-cancel:active {
    background: #858585;
}

.m-btn-right {
    width: 1rem;
    background: #22ac38;
}

.m-btn-right:active {
    background: #2bd547;
}
</style>
