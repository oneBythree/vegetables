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
        <span class="check-span" @click="showPlate">{{plate}}</span>
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
    data() {
            return {

            }
        },
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
            transporter: null,
            plate: {
                type: String,
                require: true,
                default: '车牌'
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

                if (this.plate == '车牌') {
                    mui.toast('请选择车牌归属地！');
                    return false;
                }

                if (this.carsNum == null) {
                    mui.toast('运输车牌不能为空!');
                    return false
                } else if (this.carsNum.test('/^[A-Z_a-z_0-9]{5}$/')) {
                    mui.toast('运输车牌格式不正确!');
                }

                if (this.supplier == null) {
                    mui.toast('供货单位不能为空！');
                    return false
                }
                this.comesData = {
                    'gys': this.rc,
                    'date': this.time,
                    'address': this.addressValue,
                    'transporter': this.transporter,
                    'weight': this.weight
                }
                this.$dispatch('add-info')
            }
        },
        computed: {
            transporter: function() {
                return this.plate + this.carsNum.toUpperCase();
            }
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
