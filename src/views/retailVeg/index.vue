<style type="text/css">
</style>
<template>
    <div>
        <!-- 头部 -->
        <v-header :header-title="haedertitle" @left-action="goBack" :right-icon="rightIcon" @right-action="moreMenu"></v-header>
        <div class="m-content">
            <!-- 搜索tab选项卡 start-->
            <nav-bar :items="items" :selected.sync="selected"></nav-bar>
            <!-- 搜索tab选项卡 end-->
            <drop-select :type-name="typeName" :my-drop-name="myDropName1" :header-title="headerTitle1" :drop-name.sync="selected" :droplists="droplists" @drop-select-item="dropSelectItem" :select-droped.sync="isSelectDrop1">
                <search-list :search-data="customerData" :search-selected="retailer" @select-type="customerSelectedFuc" :search-default="isDefaultAll">
                    <slot name="type"></slot>
                </search-list>
            </drop-select>
            <drop-select :type-name="typeName" :my-drop-name="myDropName3" :header-title="headerTitle2" :drop-name.sync="selected" :select-droped.sync="isSelectDrop3">
                <form class="r-timer-filter">
                    <div class="m-flex-box ">
                        <label>开始时间</label>
                        <span class="m-flex-1" v-text="starTime" @click="dateTimer('start')"></span>
                    </div>
                    <div class="m-flex-box">
                        <label>结束时间</label>
                        <span class="m-flex-1" v-text="endTime" @click="dateTimer('end')"></span>
                    </div>
                    <div class="m-flex-box r-submit">
                        <a href="javascript:;" class="r-button" @click="filterTimerData()">确认搜索</a>
                    </div>
                </form>
            </drop-select>
            <div class="veges-list-wapper" :style="{height:vegesHeight}" v-if="!isLoad" transition="down">
                <card-item v-for="come in comes">
                    <dd class="overflow-hide">
                        <strong>商户</strong>
                        <span>{{come.RETAILER_NAME}}</span>
                    </dd>
                    <dd class="g-table-fix">
                        <div class="g-cell">
                            <p class="webkit-clamp1">
                                <strong>商品</strong>
                                <span>{{come.VEG_NAME}}</span>
                            </p>
                        </div>
                        <div class="g-cell">
                            <strong>日期</strong>
                            <span>{{come.IN_DATE}}</span>
                        </div>
                    </dd>
                    <dd class="g-table-fix">
                        <div class="g-cell">
                            <strong>价格</strong>
                            <span>{{come.PRICE}} 元/Kg</span>
                        </div>
                        <div class="g-cell">
                            <strong>重量</strong>
                            <span>{{come.WEIGHT}} Kg</span>
                        </div>
                    </dd>
                    <dd class="overflow-hide">
                        <strong>供货单位</strong>
                        <span>{{come.WS_SUPPLIER_NAME}}</span>
                    </dd>
                    <dd class="overflow-hide">
                        <strong>产地</strong>
                        <span>{{come.AREA_ORIGIN_NAME}}</span>
                    </dd>
                </card-item>
                <next-page :cur.sync="page" :all.sync="allPage" @next-page="nextPageFuc"></next-page>
                <no-data :is-no-data="isNOData"></no-data>
            </div>
        </div>
        <v-loading :is-loading.sync="isLoad"></v-loading>
    </div>
</template>
<script>
import * as tool from '../../common/common.js';
import VHeader from '../../components/header/header.vue';
import MenuDrop from '../../components/menu-drop/menu-drop.vue';
import NavBar from '../../components/nav.vue';
import DropSelect from '../../components/drop-select.vue';
import DatePicker from '../../components/date-picker.vue';
import CardItem from '../../components/card/card-item.vue';
import SearchList from '../../components/search-list/search-list.vue';
import NextPage from '../../components/nextpage/nextpage.vue';
import NoData from '../../components/nodata/nodata.vue';
import VLoading from '../../components/loading/loading.vue';
var param = {
    type: "date",
    beginYear: 2015,
    endYear: 2020
};
var pickerVegFitlerTimer1, pickerVegFitlerTimer2;
pickerVegFitlerTimer1 = new mui.DtPicker(param); //时间插件

const listUrl = 'mobileTrace.do?method=getSaleVegIn';
const customerUrl = 'mobileTrace.do?method=getRetailer';

export default {
    data() {
            return {
                haedertitle: '蔬菜进场',
                rightIcon: 'icon-add2', //右边按钮 图标
                menuDatas: [{ // 悬浮按钮初始数据
                    'key': 'add',
                    'text': '录入',
                    'icon': 'icon-add'
                }],
                items: [{
                    'key': 'customer',
                    'text': '商户筛选',
                    'icon': 'icon-filter'
                }, {
                    'key': 'timer',
                    'text': '时间筛选',
                    'icon': 'icon-filter'
                }],
                selected: null,
                myDropName1: 'customer',
                myDropName3: 'timer',
                typeName: 'GreenAll',
                headerTitle1: '商户筛选',
                headerTitle2: '时间筛选',
                transitionDrop: 'right',
                starTime: tool.myDate(2),
                endTime: tool.myDate(),
                comes: [],
                vegesHeight: 'auto',
                customerData: [], // 客户数据
                retailer: '', //选择客户索引
                page: 1,
                allPage: null,
                nodeId: JSON.parse(sessionStorage.getItem('userInfo')).node_id, //节点id
                isNOData: false,
                isDefaultAll: true,
                isLoad: true
            }
        },
        ready() {
            mui.init();
            var that = this;
            this.$nextTick(function() {
                that.initFilterDate();
                that.getAjaxData();
                that.initHeight();
            })
        },
        methods: {
            initFilterDate: function() { //筛选时间
                var initStartDate = tool.splitDate(this.starTime);
                var initEndDate = tool.splitDate(this.endTime);
                this.items[1].text = initStartDate + '/' + initEndDate;
            },
            initHeight: function() {
                var windHeight = $('body').height();
                var vegesTop = $('.r-tab-filter').outerHeight() + $('.m-header').outerHeight();
                var _vegesHeight = (windHeight - vegesTop) + 'px';
                this.vegesHeight = _vegesHeight;
            },
            //点击展示 悬浮菜单
            moreMenu: function() {
                this.$router.go('/retailVeg/add');
            },
            dateTimer: function(type) {
                var that = this;
                $('.mui-dtpicker').show();
                if (type == 'start') {
                    pickerVegFitlerTimer1.show(function(rs) {
                        that.starTime = rs.value;
                        that.endTime = that.starTime > that.endTime ? that.starTime : that.endTime; //结束时间？开始时间大于结束时间:开始时间
                    })
                } else {
                    if (that.starTime == null) {
                        mui.toast('请选择开始时间');
                        return false;
                    }
                    param.beginDate = new Date(that.starTime);
                    pickerVegFitlerTimer2 = new mui.DtPicker(param);
                    pickerVegFitlerTimer2.show(function(rs) {
                        that.endTime = rs.value;
                    })
                }
            },
            getAjaxData: function() {
                var that = this;
                this.getList();
                this.getCustomerData();
            },
            goBack: function() {
                this.$router.go('/menu');
            },
            filterTimerData: function() { //时间筛选
                if (this.starTime == '') {
                    mui.toast('请选择开始时间');
                    return false;
                }

                if (this.endTime == '') {
                    mui.toast('请选择结束时间');
                    return false;
                }

                var starSplitStr = tool.splitDate(this.starTime);
                var endSplitStr = tool.splitDate(this.endTime);
                this.items[1].text = starSplitStr + '/' + endSplitStr;
                this.selected = null;
                this.comes = [];
                this.isLoad = true;
                this.page = 1; // 重置页面数
                this.getList();

            },
            getList: function() { //获取列表数据
                var url = listUrl + '&node_id=' + this.nodeId + '&retailer=' + this.retailer + '&start_date=' + this.starTime + '&end_date=' + this.endTime + '&page=' + this.page;
                var that = this;
                // this.isLoad = true;
                this.allPage = null;
                $.ajax({
                    'url': url,
                    'type': 'GET',
                    'dataType': "json",
                    'success': function(data) {
                        var oldData = JSON.parse(data)[0];
                        if (oldData.result) {
                            that.comes = that.page == 1 ? oldData.data.resultList : that.comes.concat(oldData.data.resultList);
                            that.isNOData = !that.comes.length > 0 && !that.isLoading ? true : false;
                            that.allPage = oldData.data.totalPageNum;
                        }
                    }
                })
            },
            getCustomerData: function() { //获取客户数据
                var that = this;
                var url = customerUrl + '&node_id=' + this.nodeId + '&type=1002&retailer=';
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "json",
                    success: function(json) {
                        var aa = json.replaceAll('BIZ_NAME', 'value');
                        var ss = aa.replaceAll('BIZ_ID', 'index');
                        that.customerData = JSON.parse(ss)[0].data;
                    }
                });
            },
            nextPageFuc: function() { //翻页
                this.page = this.page + 1;
                this.getList();
            },
            customerSelectedFuc: function(item) { //选择客户点击事件
                this.retailer = item.index == -1 ? '' : item.index + '';
                this.items[0].text = item.index == -1 ? '商户筛选' : item.value;
                this.selected = null;
                this.page = 1; // 重置页码数
                this.comes = [];
                this.isLoad = true;
                this.getList();
            },
        },
        components: {
            VHeader,
            NavBar,
            MenuDrop,
            DropSelect,
            DatePicker,
            CardItem,
            SearchList,
            NextPage,
            NoData,
            VLoading
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
        span.m-flex-1 {
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
