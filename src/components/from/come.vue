<template>
    <div class="m-form-group">
        <span class="lable">供应商名称<em class="red">*</em></span>
        <label class="flex2 ">
            <input type="text" v-model="rc">
        </label>
        <span class="right-more iconfont icon-filter-down" :class="{'active':isRadios}" @click="showRadios"></span>
    </div>
    <div class="m-list-drop animated" v-if="isRadios" transition="down">
        <div class="m-form-group">
            <label class="radio-line" for="gyName">
                <input type="radio" name="gyName" value="我的供应商" @click="checkRadio" v-model="rc">
                <span>我的供应商</span>
            </label>
        </div>
        <div class="m-form-group">
            <label class="radio-line" for="gyName">
                <input type="radio" name="gyName" value="xxx" @click="checkRadio" v-model="rc">
                <span>xxx</span>
            </label>
        </div>
        <div class="m-form-group">
            <label class="radio-line" for="gyName">
                <input type="radio" name="gyName" value="1111" @click="checkRadio" v-model="rc">
                <span>1111</span>
            </label>
        </div>
    </div>
    <div class="m-form-group">
        <span class="lable">进场日期<em class="red">*</em></span>
        <label class="flex2 ">
            <input type="text" readonly="" @click="showDate" v-model="time">
        </label>
    </div>
    <div class="m-form-group">
        <span class="lable">运输车牌号<em class="red">*</em></span>
        <span class="right-more" @click="showPlate" >{{plate}}</span>
        <label class="flex2 ">
            <input type="text" v-model="carsNum">
        </label>
    </div>
    <div class="m-form-group">
        <span class="lable">产地 <em class="red">*</em></span>
        <label class="flex2 ">
            <input type="text" readonly="" @click="showAddress" v-model="address">
        </label>
    </div>
    <div class="m-form-group">
        <span class="lable">供货单位 <em class="red">*</em></span>
        <label class="flex2 ">
            <input type="text" readonly="" v-model="supplier" @click="showSupplier">
        </label>
    </div>
    <div class="m-form-group">
        <span class="lable">总重量</span>
        <label class="flex2 ">
            <input type="text" v-model="weight" readonly="">
        </label>
    </div>
    <!-- <silder-plate :is-silder="isSilder"></silder-plate> -->
</template>
<script>
import DatePicker from '../date-picker.vue';
import Picker from '../picker.vue';
// import SilderPlate from '../silder-up/silder-plate.vue';
import * as cityData from '../../common/mui/city.data-3.js';
import * as plateData from '../../common/plate-data.js';
var cityPicker3, picker, supplierPicker;
var param = {
    type: "date",
    beginYear: 2012,
    endYear: 2020
};
picker = new mui.DtPicker(param);
cityPicker3 = new mui.PopPicker({
    layer: 3
});
cityPicker3.setData(cityData.cityData3);
supplierPicker = new mui.PopPicker({
    layer: 2
})
supplierPicker.setData(plateData.plateData);
export default {
    props: {
        isRadios: false,
        rc: null,
        time: null,
        address: null,
        addressValue: null,
        carsNum: null,
        comesData: null,
        weight: null,
        supplier: null,
        plate:'京A',
    },
    ready: function() {
        mui.init()
        this.initSupplier();
    },
    methods: {
        showRadios: function() { //展示单选组
            this.isRadios = this.isRadios ? false : true;
        },
        initSupplier: function() {

        },
        checkRadio: function() { //点击单选 关闭展示
            this.isRadios = false;
        },
        showDate: function() { //时间控件
            var that = this;
            picker.show(function(rs) {
                that.time = rs.value;
            })
        },
        showPlate: function() {
            var that = this;
            supplierPicker.show(function(item) {
                that.plate = item[1].text;
            })
        },
        showAddress: function() { //三级联动地址控件
            var that = this;
            cityPicker3.show(function(items) {
                that.address = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                that.addressValue = (items[0] || {}).value + " " + (items[1] || {}).value + " " + (items[2] || {}).value;
            })
        },
        showSupplier: function() { //显示供货商
            var that = this;
            supplierPicker.show(function(item) {
                console.log(item[0].text)
                that.supplier = item[0].text
            })
        },
        conserveComeData: function() { //保存进场数据
            if (this.rc == null) {
                mui.toast('供应商不能为空！');
                return false
            }

            if (this.time == null) {
                mui.toast('进场日期不能为空!');
                return false
            }

            if (this.address == null) {
                mui.toast('产地不能为空！');
                return false
            }

            if (this.carsNum == null) {
                mui.toast('运输车牌不能为空!');
                return false
            }

            if (this.supplier == null) {
                mui.toast('供货单位不能为空！');
                return false
            }
            this.comesData = {
                'gys': this.rc,
                'date': this.time,
                'address': this.addressValue,
                'cards': this.carsNum,
                'weight': this.weight
            }
            this.$dispatch('add-info')
        }
    },
    components: {
        DatePicker,
        Picker,
        // SilderPlate
    }
}
</script>
