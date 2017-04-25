<template>
    <div class="relative">
        <v-header :header-title="headertitle" @left-action="goBack"></v-header>
        <!-- 页眉 -->
        <v-footer :is-footer="isFooter">
            <div class="g-cell  left">
                <label @click="addLaserCode">
                    <span class="radio-check">
                        <i  class="iconfont icon-add1"></i>
                    </span>
                    <span>激光码</span>
                    <em>({{laserCodes.length}})</em>
                </label>
            </div>
            <div class="g-cell right">
                <a href="javascript:;" class="right-btn" @click="submitAddLaserCode">提交</a>
            </div>
        </v-footer>
        <div class="m-content">
            <form class="m-form">
                <div class="m-form-group">
                    <span class="lable">商户<em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text" v-model="retailName" readonly="" @click="showDrop('retail')" placeholder="请选择商户">
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">商品名称<em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text" v-model="goodsTypeName" placeholder="请选择商品名称" readonly="" @click="showDrop('goodsType')">
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">日期<em class="red">*</em></span>
                    <label class="flex2 ">
                        <span type="text" v-text="time"  @click="showDate"></span>
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">重量<em class="red">*</em></span>
                    <label class="flex2 {{weight==''?'':'weight'}}">
                        <input type="text" v-model="weight" placeholder="请输入重量" v-number-only>
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">价格<em class="red">*</em></span>
                    <label class="flex2 {{price==''||price == undefined?'':'price'}}">
                        <input type="text" v-model="price" placeholder="请输入价格" v-number-only>
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">供货单位<em class="red">*</em></span>
                    <label class="flex2">
                        <input type="text" placeholder="请选择供货单位" @click="showDrop('supply')" v-model="supplyName" readonly="">
                    </label>
                </div>
                <h4 class="line"><span>激光码</span></h4>
                <div class="m-form-group" v-for="laserCode in laserCodes" track-by="$index">
                    <span class="lable">激光码 {{$index+1}} <em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text" v-model="laserCode" placeholder="请输入6位激光码" maxlength="6">
                    </label>
                    <span v-if="$index>0" class="iconfont icon-del right-more" @click="removeCode($index)"></span>
                </div>
            </form>
        </div>
        <drop-select :type-name="typeDrop" :my-drop-name="dropRetail" :drop-name.sync="dropSelect" :transition="transitionDrop" :header-title="headerRetail">
            <search-list :search-data="RetailData" :search-selected="RetailSelected" @select-type="selectSearhList">
                <slot name="twoRow"></slot>
            </search-list>
        </drop-select>
        <drop-select :type-name="dropSupply" :my-drop-name="dropSupply" :drop-name.sync="dropSelect" :transition="transitionDrop" :header-title="headerSale">
            <search-list :search-data="supplyData" :search-selected="supplySelected" @select-type="selectSearhList">
                <slot name="twoRow2"></slot>
            </search-list>
        </drop-select>
        <drop-select :type-name="dropGoodsType" :my-drop-name="dropGoodsType" :drop-name.sync="dropSelect" :transition="transitionDrop" :header-title="headerGoodsType">
            <search-list :search-data="goodsTypeData" :search-selected="goodsTypeSelected" @select-type="selectSearhList">
                <slot name="twoRow2"></slot>
            </search-list>
        </drop-select>
        <v-dialog :is-show-dialog.sync="isShowDialog" :type-icon="dialogIcon" :dialog-text="dialogText" @dialog-callback="dialogCallback">
            <slot name="defaultDialog"></slot>
        </v-dialog>
    </div>
</template>
<script>
import VHeader from '../../components/header/header.vue';
import VFooter from '../../components/footer/footer.vue';
import DropSelect from '../../components/drop-select.vue';
import SearchList from '../../components/search-list/search-list.vue';
import DatePicker from '../../components/date-picker.vue';
import VDialog from '../../components/dialog/dialog.vue';
import * as common from '../../common/common.js';
var pickerAddMeatTimer;
var param = {
    type: "date",
    beginYear: 2015,
    endYear: 2020,
};
pickerAddMeatTimer = new mui.DtPicker(param);
const retailUrl = 'mobileTrace.do?method=getRetailer&type=2004';
const supplierUrl = 'mobileTrace.do?method=getWsSupplier&type=2004';
const goodsTypeUrl = 'mobileTrace.do?method=getGoodsCode'; //肉品类型
export default {
    data() {
            return {
                headertitle: '肉品进场录入',
                typeDrop: 'GreenAll', //drop类型全屏
                dropRetail: 'retail',
                dropSelect: null,
                transitionDrop: 'right', //drop 动画类型
                retailName: '',
                retailId: '',
                headerRetail: '选择商户', //零售选择header的title
                RetailSelected: null, //零售选择值
                RetailData: [],
                dropSupply: 'supply',
                headerSale: '选择供货单位',
                supplySelected: null,
                supplyName: '',
                supplyId: '',
                supplyData: [],
                goodsTypeData: [],
                goodsTypeId: '',
                goodsTypeName: '',
                headerGoodsType: '选择商品名称',
                dropGoodsType: 'goodsType',
                goodsTypeSelected: null,
                time: common.myDate(), //进场时间
                weight: '',
                price: '',
                isFooter: true,
                laserCodes: [''],
                isShowDialog: false,
                dialogIcon: 'icon-right',
                dialogText: '',
                nodeId: JSON.parse(sessionStorage.getItem('userInfo')).node_id
            }
        },
        route: {
            activate: function(transition) {
                console.log('进入!') //这里在每次进入该组件会触发
                transition.next() //这里如果写abort就是说这个路由下的组件的大门被关闭了，不可切换进来
            },
            deactivate: function(transition) {
                pickerAddMeatTimer.hide();
                transition.next() //同理这里abort就是说进来了不可离开
            }
        },
        components: {
            VHeader,
            DropSelect,
            SearchList,
            DatePicker,
            VFooter,
            VDialog
        },
        ready: function() {
            this.loadData();
        },

        methods: {
            goBack: function() {
                history.go(-1);
            },
            showDrop: function(type) {
                this.dropSelect = type;
            },

            loadData: function() { //加载数据
                var that = this;

                $.get(retailUrl + '&node_id=' + this.nodeId, {},
                    function(rs) {
                        that.RetailData = JSON.parse(rs)[0].data;
                    })

                $.get(supplierUrl + '&node_id=' + this.nodeId + '&ws_supplier=', {},
                    function(rs) {
                        that.supplyData = JSON.parse(rs)[0].data;
                    })

                $.get(goodsTypeUrl + '&goods_code=&node_id=' + this.nodeId + '&type=2004', {},
                    function(rs) {
                        var aa = rs.replaceAll('GOODS_CODE', 'index');
                        var ss = aa.replaceAll('GOODS_NAME', 'value');
                        that.goodsTypeData = JSON.parse(ss)[0].data;
                    })
            },
            selectSearhList: function(item) {
                console.log(this.dropSelect)
                if (this.dropSelect == 'retail') {
                    if (this.RetailSelected != item.BIZ_ID) {
                        this.RetailSelected = item.BIZ_ID + '';
                        this.retailId = item.BIZ_ID;
                    }
                    this.retailName = item.BIZ_NAME;
                } else if (this.dropSelect == 'supply') {
                    if (this.supplySelected != item.NODE_ID) {
                        this.supplySelected = item.NODE_ID + '';
                        this.supplyId = item.NODE_ID;
                    }
                    this.supplyName = item.NODE_NAME;
                } else if (this.dropSelect == 'goodsType') {
                    if (this.goodsTypeSelected != item.index) {
                        this.goodsTypeSelected = item.index + '';
                        this.goodsTypeId = item.index;
                    }
                    this.goodsTypeName = item.value;
                }
                this.dropSelect = null;

            },
            showDate: function() {
                var that = this;
                pickerAddMeatTimer.show(function(rs) {
                    that.time = rs.value;
                })
            },
            addLaserCode: function() {
                if (this.laserCodes.length < 5 && this.laserCodes.length > 0) {
                    this.laserCodes.push('');
                }
            },
            removeCode: function(index) {
                this.laserCodes.splice(index, 1)
            },
            validateForm: function() {
                if (this.retailName == '') {
                    mui.toast('请选择商户');
                    return false;
                }

                if (this.weight == '') {
                    mui.toast('重量不能为空');
                    return false;
                }

                if (this.price == '') {
                    mui.toast('价格不能为空');
                    return false;
                }

                if (this.supplyName == '') {
                    mui.toast('请选择供货单位');
                    return false;
                }
                var codes = this.laserCodes.length;
                for (var i = 0; i < codes; i++) {
                    if (this.laserCodes[i] == '') {
                        mui.toast('激光码' + (parseInt(i) + 1) + '不能为空');
                        return false;
                    } else if (this.laserCodes[i].toString().length != 6) {
                        mui.toast('激光码' + (parseInt(i) + 1) + '格式不正确');
                        return false;
                    }
                }
                return true;
            },
            submitAddLaserCode: function() {
                var that = this;
                if (this.validateForm()) {
                    var _laser_no = this.laserCodes.join(",");
                    var formData = {
                        laser_no: _laser_no,
                        in_date: this.time,
                        ws_supplier_id: this.supplyId,
                        ws_supplier_name: this.supplyName,
                        weight: this.weight,
                        retailer_id: this.retailId,
                        retailer_name: this.retailName,
                        price: this.price,
                        meat_code: this.goodsTypeId,
                        meat_name: this.goodsTypeName,
                        node_id: this.nodeId,
                        node_name: JSON.parse(sessionStorage.getItem('userInfo')).node_name,
                    }
                    var on = true;
                    console.log(formData)
                    $.post('mobileTrace.do?method=savesalemeatin', formData, function(rs) {
                        var rsData = JSON.parse(rs)[0];
                        if (rsData.result) {
                            that.isShowDialog = true;
                            that.dialogIcon = 'icon-success';
                            that.dialogText = '保存录入数据成功'
                        } else {
                            mui.toast(rsData.message);
                        }
                    })
                }
            },
            dialogCallback: function() {
                this.isShowDialog = false;
                this.$route.router.go('/retailMeat');
            },
            lasercodePrint: function(code, index) {
                if (code.trim().toString().length >= 7) {
                    this.laserCodes.$set(index, code.slice(0, 5).toString());
                }
            }
        },
        watch: {
            weight: function(cur, old) {
                if (!(cur <= 500 && cur >= 1)) {
                    mui.toast('重量应为1-500(kg)之间');
                    this.weight = '';
                }
            },
            price: function(cur, old) {
                if (!(cur <= 60 && cur >= 1)) {
                    mui.toast('价格应为1-60(元/kg)之间');
                    this.price = '';
                }
            }
        }
}
</script>
<style>
.flex2.weight,
.flex2.price {
    position: relative;
}

.flex2.weight:after,
.flex2.price:after {
    position: absolute;
    top: 0;
    color: #919191;
}

.flex2.weight:after {
    content: 'kg';
    left: 1.25rem;
}

.flex2.price:after {
    content: '元/kg';
    left: 1rem;
}

.m-form-group~h4.line {
    background: #efeff4;
    margin-top: 0;
}
</style>
