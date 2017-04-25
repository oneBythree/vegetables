<template>
    <div class="m-loading animated" v-if="isLoading" :delay-timer="delayTimer">
        <i class="fa fa-spinner fa-pulse animated"></i>
        <p>加载中....</p>
    </div>
    <div class="r-transition" v-if="isLoading"></div>
</template>
<script>
export default {
    props: {
        isLoading: {
            require: true,
            type: Boolean,
            default: false
        },
        delayTimer: {
            require: true,
            type: Number,
            default: 2500
        },
        isBefore: {
            require: true,
            type: Boolean,
            default: false,
        }
    },
    ready() {
        var that = this;
        if (!this.isBefore) {
            setTimeout(function() {
                that.isLoading = false;
            }, that.delayTimer)
        }
    },
    watch: {
        isLoading: function(cur, old) {
            let that = this;
            if (!this.isBefore) {
                if (cur) {
                    setTimeout(function() {
                        that.isLoading = false;
                    }, that.delayTimer)

                }
            }
        }
    }
}
</script>
<style>
.r-transition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    z-index: 1001;
}

.m-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: .05rem;
    transform: translate3d(-50%, -50%, 0);
    background: rgba(0, 0, 0, .4);
    text-align: center;
}

.m-loading>i.fa.fa-spinner {
    margin: .12rem 0;
    display: block;
    font-size: .8rem;
    color: #fff;
}

.m-loading>p {
    color: #fff;
    font-size: .26rem;
}
</style>
