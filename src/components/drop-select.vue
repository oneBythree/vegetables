<template>
    <div class="m-props-module animated" :class="{'m-green-all':!isType,'m-drop-select-module':isType}" :drop-select="dropName" :my-drop-name="myDropName" v-if="selectDrop" :transition="transition" @click.self="colseDrop">
        <div class="m-props-wapper" v-if="isType">
            <div class="m-props-content ">
                <div class="m-props-select">
                    <drop-select-item v-for="droplist in changLists" :is-select-droped="droplist.key === SelectDroped" @click="selectValue('drop-select-item',droplist.key)">{{droplist.text}}</drop-select-item>
                    <slot></slot>
                </div>
                <div class="m-props-covers" v-if="selectDrop" @click="colseDrop">></div>
            </div>
        </div>
        <div v-else>
            <header class="m-header">
                <a href="javascript:;" class="left-icon" @click="colseDrop">
                    <i class="iconfont icon-close"></i>
                </a>
                <h1>{{headerTitle}}</h1>
            </header>
            <div class="m-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import DropSelectItem from './drop-select-item.vue';
export default {
    props: {
        // 类型下拉搜索 全屏自定义
        typeName: {
            type: String,
            require: true,
        },
        dropName: {
            type: null,
            require: true,
        },
        myDropName: {
            type: String,
            require: true,
            default: ''
        },
        droplists: {
            type: Array,
            require: false,
        },
        SelectDroped: {
            type: null,
            require: true,
        },
        headerTitle: {
            type: String,
            require: false,
            default: ''
        },
        transition: {
            type: String,
            require: true,
            default: 'down'
        }
    },
    computed: {
        selectDrop: function() {
            return this.myDropName === this.dropName ? true : false;
        },
        isType: function() {
            return this.typeName === 'unGreenAll' ? true : false;
        },
        changLists: function() {
            var _data = [];
            $.each(this.droplists, function(key, item) {
                if (typeof item === 'string') {
                    _data.push({
                        key: key,
                        item: item
                    })
                } else {
                    _data.push(item);
                }
            })
            return _data;
        }
    },
    ready: function() {},
    methods: {
        selectValue: function(event, key) {
            if (this.SelectDroped !== key) {
                this.SelectDroped = key;
            }
            this.selectDrop = false;
            this.dropName = null;
        },
        colseDrop: function() {
            if (this.isType) {
                this.selectDrop = false;
                this.dropName = null;
            }
        }
    },
    components: {
        DropSelectItem
    }
}
</script>
<style scoped lang="sass">
.m-props-module {
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
}

.m-props-module.m-drop-select-module {
    top: 0;
    padding-top: 1.68rem;
}

.m-props-wapper {
    width: 100%;
    height: 100%;
}

.m-props-module .m-props-content {
    position: relative;
    height: 100%;
}

.m-props-covers {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    z-index: 1;
}

.m-props-select {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    padding: 0 .3rem;
    z-index: 2;
    border-top: 1px solid #e7e7e7;
}

.m-props-module a.item {
    font-size: .3rem;
    display: block;
    color: #7c7c7c;
    line-height: .75rem;
    height: .75rem;
}

.m-props-module a.item.m-border:last-of-type {
    border-bottom: none;
}

.m-props-module.m-green-all {
    top: 0;
    left: 0;
    background: #ebebeb;
}

.m-props-module.animated.m-drop-select-module {
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
}
</style>
