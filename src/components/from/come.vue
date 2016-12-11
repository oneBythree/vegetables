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
    <div class="m-form-group m-diff">
        <span class="lable">运输车牌号<em class="red">*</em></span>
        <span class="check-span" @click="showPlate">{{plate==null?"京A":plate}}</span>
        <label class="flex2 ">
            <input type="text" v-model="carsNum" maxlength="5">
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
</template>
<script>
import DatePicker from '../date-picker.vue';
import Picker from '../picker.vue';
import * as cityData from '../../common/mui/city.data-3.js';
import * as plateData from '../../common/plate-data.js';
var cityPicker3, picker, supplierPicker, platePicker;
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
supplierPicker = new mui.PopPicker({})
platePicker = new mui.PopPicker({
    layer: 2
})
platePicker.setData(plateData.plateData);
export default {
    props: {
        isRadios: false,
        rc: {
            type: String,
            require: true,
            default: '我的供应商'
        },
        time:new Date(),
        address: null,
        addressValue: null,
        carsNum: null,
        comesData: {
            type: Object,
            require: true,
            default: {
                GYS_MC: {
                    value: null
                },
                IN_DATE: {
                    value: new Date()
                },
                AREA_ORIGIN_NAME: {
                    value: null
                },
                TRANSPORTER_ID: {
                    value: null
                },
                WEIGHT: {
                    value: null,
                },
                SUPPLIER_NAME: {
                    value: null
                }
            }
        },
        weight: null,
        supplier: null,
        transporter: null,
        plate: {
            type: String,
            require: true,
            default: '京A'
        }
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
            this.$http.get(configPath + 'supplier.js', {
                type: "sydata"
            }, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                emulateJSON: true
            }).then(function(response) {
                var supplierData = response.json().data;
                supplierPicker.setData(supplierData);
            }).catch(function(response) {
                mui.toast('请求错误' + Response)
            })
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
            platePicker.show(function(item) {
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
                that.supplier = item[0].text
            })
        },
      
    },
    computed: {
        transporter: function() {
            return this.plate + this.carsNum;
        },
        comesData: function() {
            return {
                GYS_MC: {
                    value: this.rc
                },
                IN_DATE: {
                    value: this.time
                },
                AREA_ORIGIN_NAME: {
                    value: this.address
                },
                TRANSPORTER_ID: {
                    value: this.transporter
                },
                WEIGHT: {
                    value: this.weight,
                },
                SUPPLIER_NAME: {
                    value: this.supplier
                }
            }
        }, 
    },
    components: {
        DatePicker,
        Picker,
        // SilderPlate
    }
}
</script>
<style>
.m-form-group span.check-span {
    display: inline-block;
    width: 1.2rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    margin: 0 .2rem;
    border: 1px solid #22ac38;
    border-radius: .06rem;
    vertical-align: top;
    margin-top: .1rem;
    font-size: .3rem;
}

.m-form-group.m-diff {
    padding: 0 .3rem;
    height: .8rem;
    line-height: .8rem;
}
</style>
