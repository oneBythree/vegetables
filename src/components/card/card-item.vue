<template>
    <dl class="g-list r-list m-border" :class="{'is-del':isDel}" @click="listItemClick" :data-check="delCheck">
        <slot></slot>
        <dd v-if="isDel" class="del-radio" :class="{'active':delCheck}">
            <i v-if="delCheck" class="iconfont icon-right"></i>
        </dd>
    </dl>
</template>
<script>
export default {
    props: {
        isDel: {
            type: Boolean,
            require: true,
            default: false
        },
        delCheck: {
            type: Boolean,
            require: true,
            default: false
        }
    },
    methods: {
        listItemClick: function() {
            if (this.isDel) {
                this.$dispatch('del-item-click', this.delCheck);
                this.delCheck = this.delCheck ? false : true;              
            } else {
                this.$dispatch('default-item-click');
            }
        }
    },
    watch: {
        isDel: function(cur, old) {
            if (cur) {
                this.delCheck = false;
            }
        }
    }
}
</script>
<style>
.g-list.r-list.is-del {
    position: relative;
    background: rgba(0, 0, 0, 0.2);
}

.g-list.r-list.is-del dd.del-radio {
    content: '';
    position: absolute;
    top: 30%;
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    margin-top: -.25rem;
    border: 1px solid #fff;
    line-height: .5rem;
    text-align: center;
}

.g-list.r-list.is-del dd.del-radio.active {
    background: #22ac38;
}

.g-list.r-list.is-del dd.del-radio.active .iconfont {
    color: #fff;
    font-size: .3rem;
    color: #fff;
}
</style>
