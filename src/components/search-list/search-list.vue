<template>
    <div class="m-search-list">
        <div class="m-search-form">
            <form>
                <span class="iconfont icon-search"></span>
                <input type="text" placeholder="请输入明细类型" v-model="query" />
                <i class="iconfont icon-clean" v-if="isClean" @click="cleanSearch"></i>
            </form>
        </div>
        <div class="m-search-content">
            <p class="page">共 {{filterList.length}} 数据</p>
            <ul class="list">
                <slot name="type">
                    <li v-for="type in filterList" class="clearfix" @click="selectType(type)" :class="searchSelected == type.index?'active':'' ">
                        {{type.value}}
                        <i v-if="searchSelected == type.index" class="iconfont icon-right "></i>
                    </li>
                </slot>
            </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
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
    },
    methods: {
        cleanSearch: function() {
            this.query = '';
        },
        selectType: function(item) {

            console.log(this.searchSelected)
            this.$dispatch('select-type', item);
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
}

.m-search-list ul>li {
    padding: .2rem 0;
    border-bottom: 1px solid #ececec;
    font-size: .28rem;
}

.m-search-list ul>li:last-of-type {
    border: none;
}

.m-search-content p.page {
    padding: .2rem .3rem;
    font-size: .26rem;
    margin: 0;
}

.m-search-list ul>li.active {
    color: #22ac38;
}

.m-search-list ul>li.active>i.icon-right {
    font-size: .3rem;
    float: right;
}
</style>
