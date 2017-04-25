<template>
    <div>
        <v-header :header-title="headerTitle" @left-action="goBack"></v-header>
        <div class="m-content">
            <form class="m-form">
                <div class="m-form-group">
                    <span class="lable">商户名称<em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text" v-model="customerName" readonly="" placeholder="请选择商户" @click="showDrop('customer')">
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">商品名称<em class="red">*</em></span>
                    <label class="flex2">
                        <input type="text" v-model="vegName" readonly="" placeholder="请选择商品名称" @click="showDrop('veg')">
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">日期<em class="red">*</em></span>
                    <label class="flex2 ">
                        <span v-text="timer" @click="selectedTimer"></span>
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
                    <label class="flex2 {{price==''?'':'price'}}">
                        <input type="text" v-model="price" placeholder="请输入价格" v-number-only>
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">供货单位<em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text" v-model="supplierName" placeholder="请选择供货单位" readonly="" @click="showDrop('supplier')">
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">产地名称<em class="red">*</em></span>
                    <label class="flex2">
                        <input type="text" placeholder="请选择产地" v-model="addressName" readonly="" @click="selectCity">
                    </label>
                </div>
            </form>
            <div class="form-submit-wapper" _>
                <a href="javascript:;" class="submit" @click="saveVeg">确认录入</a>
            </div>
        </div>
        <drop-select :type-name="dropCustomer" :my-drop-name="dropCustomer" :drop-name.sync="dropSelect" :header-title="headerCustomer">
            <search-list :search-data="customerData" :search-selected="customerSelected" @select-type="selectedDropList">
                <slot name="type"></slot>
            </search-list>
        </drop-select>
        <drop-select :type-name="dropVeg" :my-drop-name="dropVeg" :drop-name.sync="dropSelect" :header-title="headerVeg">
            <search-list :search-data="vegData" :search-selected="vegSelected" @select-type="selectedDropList">
                <slot name="type"></slot>
            </search-list>
        </drop-select>
        <drop-select :type-name="dropSupplier" :my-drop-name="dropSupplier" :drop-name.sync="dropSelect" :header-title="headerSupplier">
            <search-list :search-data="supplierData" :search-selected="supplierSelected" @select-type="selectedDropList">
                <slot name="type"></slot>
            </search-list>
        </drop-select>
        <v-dialog :is-show-dialog.sync="isShowDialog" :type-icon="dialogIcon" :dialog-text="dialogText" @dialog-callback="dialogCallback">
            <slot name="defaultDialog"></slot>
        </v-dialog>
    </div>
</template>
<script>
import VHeader from '../../components/header/header.vue';
import dataPicker from '../../components/date-picker.vue';
import cityPicker from '../../components/picker.vue';
import * as cityData from '../../common/mui/city.data-3.js';
import DropSelect from '../../components/drop-select.vue';
import SearchList from '../../components/search-list/search-list.vue';
import VDialog from '../../components/dialog/dialog.vue';
import API from './api.js';
import * as common from '../../common/common.js';

var pickerVegAddTimer, pickerVegAddCity;
var param = {
    type: "date",
    beginYear: 2015,
    endYear: 2020
};
pickerVegAddTimer = new mui.DtPicker(param); //时间插件

pickerVegAddCity = new mui.PopPicker({
    layer: 3
}); //地址选择插件
pickerVegAddCity.setData(cityData.cityData3);

export default {
    route: {
        activate: function(transition) {
            console.log('进入!') //这里在每次进入该组件会触发
            transition.next() //这里如果写abort就是说这个路由下的组件的大门被关闭了，不可切换进来
        },
        deactivate: function(transition) {
            pickerVegAddTimer.hide();
            pickerVegAddCity.hide();
            transition.next() //同理这里abort就是说进来了不可离开
        }
    },
    data() {
        return {
            headerTitle: '蔬菜进场录入',
            customerId: '',
            customerName: '', //客户名称
            supplierId: '',
            supplierName: '', //供货单位
            timer: common.myDate(), //录入时间
            weight: '', //重量
            price: '', //价格
            vegId: '',
            vegName: '', //蔬菜名称
            addressName: '', //产品名称
            addressId: '',
            dropSelect: null, //选择控件展示名称 
            headerCustomer: '选择商户',
            customerData: [], //客户数据
            customerSelected: null, //被选中客户index
            dropCustomer: 'customer',
            headerVeg: '选择蔬菜',
            vegData: [], //蔬菜数据
            vegSelected: null, //被选中蔬菜index
            dropVeg: 'veg',
            headerSupplier: '选择供货单位',
            supplierData: [], //蔬菜数据
            supplierSelected: null, //被选中蔬菜index
            dropSupplier: 'supplier',
            nodeId: JSON.parse(sessionStorage.getItem('userInfo')).node_id,
            nodeName: JSON.parse(sessionStorage.getItem('userInfo')).node_name,
            isShowDialog: false,
            dialogIcon: 'icon-right',
            dialogText: '',
        }
    },
    ready() {
        this.getData();
    },
    methods: {
        goBack: function() { // 点击返回
            // console.log(111);
            window.history.go(-1)
        },
        getData: function() {
            var that = this;

            //获取客户列表
            API.getCustomerData({
                'node_id': that.nodeId,
                'type': 1002,
                'retailer': ''
            }, function(data) {
                var aa = data.replaceAll('BIZ_NAME', 'value');
                var ss = aa.replaceAll('BIZ_ID', 'index');
                that.customerData = JSON.parse(ss)[0].data;
            })

            //获取蔬菜类型列表
            API.getVegData({
                'node_id': that.nodeId,
                'type': 1002,
                'goods_code': ''
            }, function(data) {
                var aa = data.replaceAll('GOODS_NAME', 'value');
                var ss = aa.replaceAll('GOODS_CODE', 'index');
                that.vegData = JSON.parse(ss)[0].data;
            })


            API.getSupplierData({
                'node_id': that.nodeId,
                'ws_supplier': '',
                'type': 1002
            }, function(data) {
                var aa = data.replaceAll('NODE_NAME', 'value');
                var ss = aa.replaceAll('NODE_ID', 'index');
                that.supplierData = JSON.parse(ss)[0].data;
            })


        },
        selectedTimer: function() { //选择日期
            var that = this;
            pickerVegAddTimer.show(function(rs) {
                that.timer = rs.value;
            })
        },
        selectCity: function() {
            var that = this;
            pickerVegAddCity.show(function(items) {
                that.addressName = (items[0] || {}).text + "" + (items[1] || {}).text + "" + (items[2] || {}).text;
                that.addressId = (items[2] || {}).value;
            })
        },
        showDrop: function(type) { //展示搜索控件
            this.dropSelect = type;
        },
        selectedDropList: function(item) {
            if (this.dropSelect == 'customer') {
                if (this.customerSelected != item.index) {
                    this.customerSelected = item.index + '';
                    this.customerId = item.index;
                }
                this.customerName = item.value;
            } else if (this.dropSelect == 'veg') {
                if (this.vegSelected != item.index) {
                    this.vegSelected = item.index + '';
                    this.vegId = item.index;
                }
                this.vegName = item.value;
            } else if (this.dropSelect == 'supplier') {
                if (this.supplierSelected != item.index) {
                    this.supplierSelected = item.index + '';
                    this.supplierId = item.index; //supplierName
                }
                this.supplierName = item.value;
            }

            this.dropSelect = null;
        },
        saveVeg: function() {
            var that = this;
            var formData = {
                area_origin_id: this.addressId,
                area_origin_name: this.addressName,
                retailer_name: this.customerName,
                retailer_id: this.customerId,
                in_date: this.timer,
                ws_supplier_id: this.supplierId,
                ws_supplier_name: this.supplierName,
                weight: this.weight,
                veg_code: this.vegId,
                veg_name: this.vegName,
                price: this.price,
                node_id: this.nodeId,
                node_name: this.nodeName,
            }
            if (this.validateForm()) {
                API.saveVeg(formData, function(data) {
                    var rsData = JSON.parse(data)[0];
                    if (rsData.result) {
                        that.isShowDialog = true;
                        that.dialogIcon = 'icon-success';
                        that.dialogText = '保存录入数据成功！'
                    } else {
                        mui.toast(rsData.message);
                    }
                })
            }

        },
        validateForm: function() {
            if (this.customerName == '') {
                mui.toast('请选择商户');
                return false;
            }

            console.log(this.vegName)
            if (this.vegName == '') {
                mui.toast('请选择商品名称');
                return false;
            }

            if (this.weight == '') {
                mui.toast('请输入重量');
                return false;
            }

            if (this.price == '') {
                mui.toast('请输入价格')
                return false;
            } else if (this.price > 60) {
                mui.toast('价格在0~60之间')
                return false;
            }

            if (this.supplierName == '') {
                mui.toast('请选择供货单位');
                return false;
            }

            if (this.addressId == '') {
                mui.toast('请选择产地');
                return false;
            }

            return true;
        },
        dialogCallback: function() {
            this.$route.router.go('/retailVeg');
        }
    },
    components: {
        VHeader,
        dataPicker,
        DropSelect,
        SearchList,
        VDialog
    },
}
</script>
<style type="text/css">
.form-submit-wapper {
    display: block;
    text-align: center;
}

.form-submit-wapper .submit {
    display: inline-block;
    background: #22ac38;
    color: #fff;
    border-radius: .05rem;
    padding: .15rem .3rem;
    font-size: .3rem;
    margin-top: .3rem;
}
</style>
