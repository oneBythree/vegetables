<template>
    <header class="m-header">
        <a href="javascript:;" class="left-icon iconfont icon-back">
        </a>
        <a href="javascript:;" class="right-icon iconfont icon-more r-meun-drop" @click="moreMenu">
        </a>
        <h1>蔬菜进场</h1>
    </header>
    <!-- 悬浮菜单start -->
    <menu-drop :is-menu="isMenu" :menu-datas="menuDatas" @meu-select-click="meuSelectClick"></menu-drop>
    <!-- 悬浮菜单end -->
    <div class="m-content">
        <!-- 搜索tab选项卡 start-->
        <nav-bar :items="items" :selected.sync="selected"></nav-bar>
        <!-- 搜索tab选项卡 end-->
        <drop-select :type-name="typeName1" :my-drop-name="myDropName1" :drop-name.sync="selected" :droplists="droplists" @drop-select-item="dropSelectItem" :select-droped.sync="isSelectDrop1"></drop-select>
        <drop-select :type-name="typeName2" :my-drop-name="myDropName2" :drop-name.sync="selected" :droplists="droplists" @drop-select-item="dropSelectItem" :select-droped.sync="isSelectDrop2"></drop-select>
        <drop-select :type-name="typeName3" :header-title="headerTitle" :my-drop-name="myDropName3" :drop-name.sync="selected" :select-droped.sync="isSelectDrop3" :transition="transition">
            <form class="r-timer-filter">
                <div class="m-flex-box ">
                    <label>开始时间</label>
                    <input class="m-flex-1" type="text" readonly="">
                </div>
                <div class="m-flex-box">
                    <label>结束时间</label>
                    <input class="m-flex-1" type="text" readonly="">
                </div>
                <div class="m-flex-box r-submit">
                    <a href="javascript:;" class="r-button">确认搜索</a>
                </div>
            </form>
        </drop-select>
        <dl class="g-list r-list m-border">
            <dt>
                <strong>供应商</strong>
                <span>北京蓝波绿农科技有限公司</span>
            </dt>
            <dd class="g-table-fix">
                <div class="g-cell">
                    <strong>车牌号</strong>
                    <span>京AL5938</span>
                </div>
                <div class="g-cell">
                    <strong>总重量</strong>
                    <span>200.00</span>
                </div>
            </dd>
            <dd>
                <strong>产地</strong>
                <span>上海市奉贤区海湾镇</span>
            </dd>
            <dt>
                <strong>进场日期</strong>
                <span>2016-11-16</span>
            </dt>
        </dl>
        <dl class="g-list r-list m-border-tb">
            <dt>
                <strong>供应商</strong>
                <span>北京蓝波绿农科技有限公司</span>
            </dt>
            <dd class="g-table-fix">
                <div class="g-cell">
                    <strong>车牌号</strong>
                    <span>京AL5938</span>
                </div>
                <div class="g-cell">
                    <strong>总重量</strong>
                    <span>200.00</span>
                </div>
            </dd>
            <dd>
                <strong>产地</strong>
                <span>上海市奉贤区海湾镇</span>
            </dd>
            <dt>
                <strong>进场日期</strong>
                <span>2016-11-16</span>
            </dt>
        </dl>
    </div>
</template>
<script>
import MenuDrop from '../directves/menu-drop/menu-drop.vue';
import NavBar from '../directves/nav.vue';
import DropSelect from '../directves/drop-select.vue';

export default {
    data() {
            return {
                menuDatas: [{
                    'key': 'add',
                    'text': '添加',
                    'icon': 'icon-add'
                }, {
                    'key': 'del',
                    'text': '删除',
                    'icon': 'icon-del'
                }],
                items: [{
                    'key': 'timer',
                    'text': '进场时间'
                }, {
                    'key': 'weight',
                    'text': '重量'
                }, {
                    'key': 'filter',
                    'text': '筛选',
                    'icon': 'icon-filter'
                }],
                droplists: [{
                    'key': 0,
                    'text': '顺序'
                }, {
                    'key': 1,
                    'text': '倒序'
                }],
                selected: null,
                isSelectDrop1: false, //timer下拉列表是否被选中
                isSelectDrop2: false, //weight下拉列表是否被选中
                myDropName3: false, //filter 筛选是否点击
                myDropName1: 'timer',
                myDropName2: 'weight',
                myDropName3: 'filter',
                typeName1: 'unGreenAll',
                typeName2: 'unGreenAll',
                typeName3: 'GreenAll',
                headerTitle: '时间筛选',
                transition: 'right',
                // isMenu: false
            }
        },
        props: {
            isMenu: {
                type: Boolean,
                require: true,
                default: false
            }
        },
        ready: function() {

        },
        methods: {
            dropSelectItem: function(key) {
                console.log(key);
            },
            meuSelectClick: function(key) {
                console.log(key)
            },
            //点击展示 悬浮菜单
            moreMenu: function() {
                if (this.isMenu == true) {
                    this.isMenu = false;
                } else {
                    this.isMenu = true;
                }
            },
        },
        components: {
            NavBar,
            MenuDrop,
            DropSelect,

        },
}
</script>
<style scoped lang="sass">
dl.r-list {
    background: #fff;
    font-size: .3rem;
    color: #7c7c7c;
    dd,
    dt {
        line-height: 175%;
    }
}

form.r-timer-filter {
    font-size: .3rem;
    padding: .3rem;
    background: #fff;
    .m-flex-box {
        display: flex;
        display: box;
        margin-bottom: .3rem;
        height: .6rem;
        line-height: .6rem;
        &:last-of-type {
            margin-bottom: 0;
        }
        input.m-flex-1 {
            flex: 1;
            box-flex: 1;
            border: 1px solid #e7e7e7;
            border-radius: .05rem;
            padding-left: .1rem;
        }
        &.r-submit {
            display: block;
            text-align: center;
            a.r-button {
                display: inline-block;
                background: #22ac38;
                color: #fff;
                border-radius: .05rem;
                padding: 0 .3rem;
            }
        }
    }
    label {
        display: inline-block;
        margin-right: .2rem;
    }
}
</style>
