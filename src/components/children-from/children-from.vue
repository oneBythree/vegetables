<template>
    <section v-if="isChildernFrom">
        <h4><span>明细详情</span></h4>
        <article class="m-children-form" v-for="childrenData  in arrayChildrenData">
            <div class="body">
                <slot name="info">
                    <dl class="left-pull">
                        <dd>
                            <strong>类型</strong>
                            <span>{{childrenData.type.value}}</span>
                        </dd>
                        <dd>
                            <strong>价格</strong>
                            <span>{{childrenData.money}} 元</span>
                        </dd>
                        <dd>
                            <strong>重量</strong>
                            <span>{{childrenData.weight}} KG</span>
                        </dd>
                    </dl>
                    <dl class="right-pull" v-if="isWork">
                        <dt class="flex-box">
                            <span class="flex-1"  @click="childrenEdit(childrenData,$index)">
                                <i class="iconfont icon-edit"></i>
                            </span>
                            <span class="flex-1" @click="childrenDel(childrenData.type.value,$index)">
                                <i class="iconfont icon-del" ></i>
                             </span>
                        </dt>
                    </dl>
            </div>
            </slot>
            <slot></slot>
            </div>
        </article>
    </section>
    <v-dialog :is-show-dialog.sync="isShowDialog" :dialog-text="dialogText" :cancel-text="cancelText">
        <slot name="defaultDialog"></slot>
    </v-dialog>
</template>
<script>
import VDialog from '../dialog/dialog.vue';
export default {
    data() {
            return {
                isShowDialog: false,
                dialogText: '',
                cancelText: '取消'
            }
        },
        props: {
            isChildernFrom: {
                type: Boolean,
                require: true,
                default: false
            },
            arrayChildrenData: {
                type: Array,
                require: true,
                default: []
            },
            isWork: {
                type: Boolean,
                require: true,
                default: true
            },
        },
        methods: {
            childrenEdit: function(data, index) {
                this.$dispatch('children-edit', data, index)
            },
            childrenDel: function(val, index) {
                this.isShowDialog = true;
                this.dialogText = '是否删除明细类型 ' + val + ' ?';
                // this.arrayChildrenData.splice(index, 1);
            }
        },
        computed: {
            isChildernFrom: function() {
                return this.arrayChildrenData.length > 0 ? true : false;
            }
        },
        components: {
            VDialog
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
    padding: .1rem 0;
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

.m-children-form .flex-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.m-children-form .flex-1 {
    position: relative;
    text-align: center;
}

.m-children-form .flex-1 .iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -.25rem 0 0 -.25rem;
}

h4 {
    position: relative;
    text-align: center;
    line-height: .6rem;
    height: .6rem;
    font-size: .28rem;
    margin: .2rem 0;
}

h4:before {
    content: '';
    position: absolute;
    left: 5%;
    top: 50%;
    border-top: 1px dashed #ccc;
    width: 90%;
    z-index: 1;
}

h4 span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: #efeff4;
    z-index: 2;
    padding: 0 .3rem;
}
</style>
