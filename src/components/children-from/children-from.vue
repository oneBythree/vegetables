<template>
    <article class="m-children-form" v-if="isChildernFrom">
        <div class="body">
            <slot name="info">
                <dl class="left-pull">
                    <dd>
                        <strong>类型</strong>
                        <span>{{infoChildrenData.type.value}}</span>
                    </dd>
                    <dd>
                        <strong>价格</strong>
                        <span>{{infoChildrenData.money}}元</span>
                    </dd>
                    <dd>
                        <strong>重量</strong>
                        <span>{{infoChildrenData.weight}}KG</span>
                    </dd>
                </dl>
                <dl class="right-pull" v-if="isWork">
                    <dt class="g-row">
                        <span class="g-cell">
                                <i class="iconfont icon-edit" @click="childrenEdit"></i>
                            </span>
                    </dt>
                    <dt class="g-row">
                        <span class="g-cell">
                                <i class="iconfont icon-del" @click="childrenDel"></i>
                             </span>
                    </dt>
                </dl>
        </div>
        </slot>
        <slot></slot>
        </div>
    </article>
</template>
<script>
export default {
    props: {
        isChildernFrom: {
            type: Boolean,
            require: true,
            default: false
        },
        infoChildrenData: {
            type: Object,
            require: true,
            default: {
                type: {
                    value: null,
                    index: null
                },
                money: null,
                weight: null
            }
        },
        isWork: {
            type: Boolean,
            require: true,
            default: true
        },
        infoIndex: {
            type: Number,
            require: true,
            default: 0
        }
    },
    methods: {
        childrenEdit: function() {
            this.$dispatch('children-edit', this.infoChildrenData, this.infoIndex)
        },
        childrenDel: function() {
            this.$dispatch('children-del', this.infoIndex);
        }
    }
}
</script>
<style>
.m-children-form {
    padding: 0 .1rem;
    margin: .2rem 0;
}

.m-children-form .body {
    background: #fff;
    border: 1px solid #ececec;
    display: table;
    width: 100%;
    font-size: .28rem;
    color: #7c7c7c;
    border-radius: .06rem;
}

.m-children-form .left-pull {
    display: table-cell;
}

.m-children-form .left-pull>dd {
    line-height: .6rem;
    padding: 0 .2rem;
}

.m-children-form .right-pull {
    position: relative;
    display: table-cell;
    width: 1rem;
    padding: 0 .2rem;
    border-left: 1px solid #ececec;
}

.m-children-form .box {
    padding: 0 .1rem;
    text-align: center;
}

.m-children-form .top-pull,
.m-children-form .bottom-pull {
    position: absolute;
    display: table-cell;
    text-align: center;
    left: 0;
    height: 50%;
    width: 100%;
    vertical-align: middle;
}

.m-children-form .top-pull {
    top: 0;
    left: 0;
    height: 50%;
    width: 100%;
    border-bottom: 1px solid #ececec;
}

.m-children-form .bottom-pull {
    bottom: 0;
    left: 0;
}

.m-children-form .iconfont {
    display: inline-block;
    font-size: .3rem;
    width: .5rem;
    height: .5rem;
    vertical-align: middle;
    text-align: center;
    color: #22ac38;
}
</style>
