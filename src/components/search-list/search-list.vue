<template>
    <div id="scrollMathSearch">
        <div class="m-search-form">
            <form @submit.prevent="EnterFuc">
                <span class="iconfont icon-search"></span>
                <input type="text" placeholder="{{searchPlaceholder}}" v-model="query" @keyup.enter="EnterFuc" />
                <i class="iconfont icon-clean" v-if="isClean" @click="cleanSearch"></i>
            </form>
        </div>
        <div class="m-search-list">
            <div class="m-search-content">
                <p class="page">共 {{filterList.length}} 数据</p>
                <ul class="list">
                    <slot name="type" v-if="filterList.length>0&&filterList[0].hasOwnProperty('index')">
                        <li v-if="searchDefault" class="default clearfix" @click="selectType(dfalutTypeData)" :class="searchSelected == -1?'active':'' ">
                            全选 <i v-if="searchSelected == -1" class="iconfont icon-right"></i>
                        </li>
                        <li v-for="type in filterList" class="default clearfix" @click="selectType(type)" :class="searchSelected == type.index?'active':'' ">
                            {{type.value}}
                            <i v-if="searchSelected == type.index" class="iconfont icon-right "></i>
                        </li>
                    </slot>
                    <slot name="twoRow" v-if="filterList.length>0&&filterList[0].hasOwnProperty('BIZ_ID')">
                        <li class="two-row n-flex-box" v-for="twoData in filterList" class="default clearfix" @click="selectType(twoData)" :class="searchSelected == twoData.BIZ_ID?'active':'' ">
                            <div class="n-flex-1">
                                <p>{{twoData.BIZ_NAME}}</p>
                                <p>{{twoData.BIZ_ID}}</p>
                            </div>
                            <span v-if="searchSelected == twoData.BIZ_ID" class="g-cell iconfont icon-right"></span>
                        </li>
                    </slot>
                    <slot name="twoRow2" v-if="filterList.length>0&&filterList[0].hasOwnProperty('NODE_ID')">
                        <li class="two-row g-table twoRow2" v-for="twoData2 in filterList" class="default clearfix" @click="selectType(twoData2)" :class="searchSelected == twoData2.NODE_ID?'active':'' ">
                            <div class="g-cell">
                                <p>{{twoData2.NODE_NAME}}</p>
                            </div>
                            <span v-if="searchSelected == twoData2.NODE_ID" class="g-cell iconfont icon-right "></i>
                    </li>
                </slot>
            </ul>
        </div>
    </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    data(){
        return{
            dfalutTypeData:{
                value:"全选",
                index:"-1"
            }
        }
    },
    props: {
        query: {
            type: String,
            require: false,
        },
        searchData: {
            type: Array,
            require: true
        },
        filterList: {
            type: Array,
            require: true
        },
        isClean: {
            type: Boolean,
            require: true,
            default: false
        },
        searchSelected: {
            type: String,
            require: true,
            default: ''
        },
        searchDefault:{
            type:Boolean,
            require:true,
            default:false
        },
        searchPlaceholder: {
            type: String,
            require: true,
            default: '请输入关键字',
        }
    },
    ready:function(){
        var that = this;
        this.setHeight();
        $(window).resize(function() {
            that.setHeight();
        });
    },
    methods: {
        cleanSearch: function() {
            this.query = '';
        },
        selectType: function(item) {
            this.$dispatch('select-type', item);
        },
        EnterFuc:function(){
            return false;
        },
        setHeight:function(){
            var greenHeight = $(window).height();
            var pageTop = $('.m-header').outerHeight();
            var pageHeight = $('.m-tab').outerHeight();
            var ulHeight = greenHeight - pageTop - pageHeight;
            $('.m-content ul.list').height(ulHeight);
        }
    },
    computed: {
        filterList: function() {
            var filter = Vue.filter('filterBy');
            return filter(this.searchData, this.query);
        }
    },
    watch: {
        query: function(cur, old) {
            if (cur.split('').length > 0) {
                this.isClean = true
            } else {
                this.isClean = false
            }
        },
        searchSelected: function(cur, old) {
            console.log(cur, old);
        }
    }
}

</script>
<style>
.m-search-list {
    position: relative;
    color: #7c7c7c;
}

.m-search-form {
    position: fixed;
    top: .88rem;
    left: 0;
    width: 100%;
    z-index: 2;
}

.m-search-form>form {
    display: box;
    display: flex;
    height: .8rem;
    line-height: .8rem;
    background: #fafafa;
    border-bottom: 1px solid #ececec;
}

.m-search-form>form i.icon-clean {
    display: inline-block;
    width: .5rem;
    border: none;
    font-size: .3rem;
    text-align: center;
}

.m-search-form>form span.icon-search {
    display: inline-block;
    width: .8rem;
    text-align: center;
    font-size: .3rem;
    text-align: center;
}

.m-search-form>form input[type="text"] {
    flex: 1;
    background: #fafafa;
    font-size: .28rem;
}

.m-search-content {
    padding-top: .8rem;
}

.m-search-list ul {
    padding: 0 .3rem;
    background: #fff;
    overflow-y: auto;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0); 
}

.m-search-list ul>li.default,
.m-search-list ul>li.two-row {
    border-bottom: 1px solid #ececec;
    font-size: .28rem;
    padding: .2rem 0;
}

.m-search-list ul>li.two-row.twoRow2{
    padding:.26rem 0;
}

.m-search-list ul>li.two-row p {
    color: #7c7c7c;
    margin: 0;
    overflow:hidden;
    text-overflow:ellipsis; 
    white-space:nowrap;
}

.m-search-list ul>li.default {
    padding: .2rem 0;
}
.m-search-list ul>li>div.g-cell{
    overflow:hidden;
    text-overflow:ellipsis; 
    white-space:nowrap;
}

/*.m-search-list ul>li:last-of-type {
    border: none;
}*/

.m-search-content p.page {
    padding: .2rem .3rem;
    font-size: .26rem;
    margin: 0;
}

.m-search-list ul>li.active {
    color: #22ac38;
}

.m-search-list ul>li.active i.icon-right {
    font-size: .3rem;
    float: right;
}
.m-search-list ul>li.active .g-cell.iconfont{
    width: .5rem;
    text-align: center;
    vertical-align: middle;
    margin-top: .2rem;
}

.n-flex-box{
    display: flex;
}
.n-flex-1{
    flex:1;
    overflow:hidden;
    text-overflow:ellipsis; 
    white-space:nowrap;
}
</style>
