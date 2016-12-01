<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">indexed list（索引列表）</h1>
        </header>
        <div class="mui-content">
            <div id='list' class="mui-indexed-list">
                <div class="mui-indexed-list-search mui-input-row mui-search">
                    <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索机场">
                </div>
                <div class="mui-indexed-list-bar">
                    <a>A</a>
                    <a>B</a>
                    <a>C</a>
                    <a>D</a>
                    <a>E</a>
                    <a>F</a>
                    <a>G</a>
                    <a>H</a>
                    <a>I</a>
                    <a>J</a>
                    <a>K</a>
                    <a>L</a>
                    <a>M</a>
                    <a>N</a>
                    <a>O</a>
                    <a>P</a>
                    <a>Q</a>
                    <a>R</a>
                    <a>S</a>
                    <a>T</a>
                    <a>U</a>
                    <a>V</a>
                    <a>W</a>
                    <a>X</a>
                    <a>Y</a>
                    <a>Z</a>
                </div>
                <div class="mui-indexed-list-alert"></div>
                <div class="mui-indexed-list-inner">
                    <div class="mui-indexed-list-empty-alert">没有数据</div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-indexed-list-item" v-for="searchitem in searchLists" :data-value="searchitem.index">
                            {{searchitem.value}}
                        </li>         
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../common/mui/mui.indexedlist.js';
export default {
    props: {
        searchLists: {
            type: Array,
            require: false
        }
    },
    ready: function() {
        mui.init();
        mui.ready(function() {
            var header = document.querySelector('header.mui-bar');
            var list = document.getElementById('list');
            //calc hieght
            list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
            //create
            window.indexedList = new mui.IndexedList(list);
        });
        this.initData();
    },
    methods: {
        initData: function() {
            var that = this;
            this.$http.get(configPath + 'testType.js').then(function(rs) {
                console.log(rs.json().data);
                that.searchLists = rs.json().data;
            })
        }
    }
}
</script>
<style type="text/css">
@import '../common/mui/css/mui.indexedlist.css'
</style>
