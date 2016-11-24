<template>
    <div>
        <v-header :header-title="haedertitle" :right-icon="rightIcon" @right-action="moreMenu" @left-action="goBack"></v-header>
        <!-- 悬浮菜单start -->
        <menu-drop :is-menu.sync="isMenu" :menu-datas="menuDatas" @meu-select-click="meuSelectClick"></menu-drop>
        <!-- 悬浮菜单end -->
        <div class="m-content">
            <!-- 搜索tab选项卡 start-->
            <nav-bar :items="items" :selected.sync="selected"></nav-bar>
            <!-- 搜索tab选项卡 end-->
            <drop-select :type-name="typeName1" :my-drop-name="myDropName1" :drop-name.sync="selected" :droplists="droplists" @drop-select-item="dropSelectItem" :select-droped.sync="isSelectDrop1"></drop-select>
            <drop-select :type-name="typeName2" :my-drop-name="myDropName2" :drop-name.sync="selected" :droplists="droplists" @drop-select-item="dropSelectItem" :select-droped.sync="isSelectDrop2"></drop-select>
            <drop-select :type-name="typeName3" :header-title="headerTitle" :my-drop-name="myDropName3" :drop-name.sync="selected" :select-droped.sync="isSelectDrop3" :transition="transitionDrop">
                <form class="r-timer-filter">
                    <div class="m-flex-box ">
                        <label>开始时间</label>
                        <input class="m-flex-1" v-model="starTime" type="text" readonly="" @click="dateTimer('start')">
                    </div>
                    <div class="m-flex-box">
                        <label>结束时间</label>
                        <input class="m-flex-1" v-model="endTime" type="text" readonly="" @click="dateTimer('end')">
                    </div>
                    <div class="m-flex-box r-submit">
                        <a href="javascript:;" class="r-button">确认搜索</a>
                    </div>
                </form>
            </drop-select>
            <!--         <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
            <div class="mui-scroll"> -->
            <card-item v-for="come in comes">
                <dt>
                    <strong>供应商</strong>
                    <span>{{come.tds.GYS_MC.value}}</span>
                </dt>
                <dd class="g-table-fix">
                    <div class="g-cell">
                        <strong>车牌号</strong>
                        <span>{{come.tds.TRANSPORTER_ID.value}}</span>
                    </div>
                    <div class="g-cell">
                        <strong>总重量</strong>
                        <span>{{come.tds.WEIGHT.value}}</span>
                    </div>
                </dd>
                <dd>
                    <strong>产地</strong>
                    <span>{{come.tds.AREA_ORIGIN_NAME.value}}</span>
                </dd>
                <dt>
                    <strong>进场日期</strong>
                    <span>{{come.tds.IN_DATE.value}}</span>
                </dt>
            </card-item>
            <!--             </div>
        </div> -->
        </div>
    </div>
</template>
<script>
import VHeader from '../components/header/header.vue';
import MenuDrop from '../components/menu-drop/menu-drop.vue';
import NavBar from '../components/nav.vue';
import DropSelect from '../components/drop-select.vue';
import DatePicker from '../components/date-picker.vue';
import CardItem from '../components/card/card-item.vue';
export default {
    data() {
            return {
                haedertitle: '蔬菜进场列表',
                rightIcon: 'icon-more',
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
                transitionDrop: 'right',
                isMenu: false,
                starTime: null,
                endTime: null,
                comes: []
            }
        },
        ready() {
            mui.init();
            this.getAjaxData();
        },
        methods: {
            dropSelectItem: function(key) {
                console.log(key);
            },
            meuSelectClick: function(key) {
                if (key === 'add') {
                    this.$router.go('/add');
                }
            },
            //点击展示 悬浮菜单
            moreMenu: function() {
                if (this.isMenu == false) {
                    this.isMenu = true;
                } else {
                    this.isMenu = false;
                }
            },
            dateTimer: function(type) {
                var that = this;
                var param = {
                    type: "date",
                    beginYear: 2012,
                    endYear: 2020
                };
                if (type == 'start') {
                    var picker1 = new mui.DtPicker(param);
                    picker1.show(function(rs) {
                        that.starTime = rs.value;
                    })
                } else {
                    if (that.starTime == null) {
                        mui.toast('请选择开始时间');
                        return false;
                    }
                    param.beginDate = new Date(that.starTime);
                    var picker2 = new mui.DtPicker(param);
                    picker2.show(function(rs) {
                        that.endTime = rs.value;
                    })
                }
            },
            getAjaxData: function() {
                var that = this;
                $.ajax({
                    type: "GET",
                    url: configPath + 'comeList.json',
                    dataType: "json",
                    success: function(json) {
                        console.log(json.data[1].trs)
                        that.comes = json.data[1].trs;
                    }
                });
            },
            goBack: function() {
                history.go(-1);
            }
        },
        components: {
            VHeader,
            NavBar,
            MenuDrop,
            DropSelect,
            DatePicker,
            CardItem
        }
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
                &:active {
                    background: #2bd547;
                }
            }
        }
    }
    label {
        display: inline-block;
        margin-right: .2rem;
        white-space: nowrap;
    }
}
</style>
