<template>
    <div>
        <!-- 头部 -->
        <v-header :header-title="haedertitle" @left-action="goBack" :header-title="haedertitle">
        </v-header>
        <!-- 页眉 -->
        <v-footer :is-footer="isFooter">
            <div class="g-cell  left">
                <label @click="showSilder">
                    <span class="radio-check">
                        <i  class="iconfont icon-add1"></i>
                    </span>
                    <span>添加明细</span>
                    <em>()</em>
                </label>
            </div>
            <div class="g-cell right">
                <a href="javascript:;" class="right-btn">提交</a>
            </div>
        </v-footer>
        <div class="m-content">
            <form class="m-form">
                <v-come :comes-data.sync="comesData" :plate.sync="plate" :cars-num.sync="carsNum"></v-come>
            </form>
        </div>
        <silder-up :is-silder.sync="isSilder" :silder-title="silderTitle">
            <div class="m-form-group">
                <span class="lable">类型<em class="red">*</em></span>
                <label class="flex2 ">
                    <input type="text" v-model="info.type" readonly="" @click="showType">
                </label>
            </div>
            <div class="m-form-group">
                <span class="lable">重量<em class="red">*</em></span>
                <label class="flex2 ">
                    <input type="text" v-model="info.weight">
                </label>
            </div>
            <div class="m-form-group">
                <span class="lable">单价<em class="red">*</em></span>
                <label class="flex2 ">
                    <input type="text" v-model="info.money">
                </label>
            </div>
        </silder-up>
    </div>
</template>
<script type="text/javascript">
import VHeader from '../components/header/header.vue';
import VFooter from '../components/footer/footer.vue';
import SilderUp from '../components/silder-up/slider-up.vue';
import VCome from '../components/from/come.vue';
import Picker from '../components/picker.vue';
var typePicker = new mui.PopPicker({});
export default {
    data() {
            return {
                haedertitle: '添加进场',
                comesData: null,
                plate: null, //车牌归属地
                carsNum: '', //车牌号
                isFooter: true,
                isSilder: false, //上拉组件
                silderTitle: '添加明细',
                info: {
                    type: null,
                    weight: null,
                    money: null
                }
            }
        },
        ready: function() {
            mui.init();
             this.loadTypeData();
        },
        methods: {
            goBack: function() {
                // histroy.go(-1);
            },
            addInfoRouter: function() {
                this.toggleCome = false;

            },
            showSilder: function() { //展示上拉子表单（验证通过展示）
                if (this.validateCome()) {
                    this.isSilder = true;
                }
            },
            showType:function(){
               
                typePicker.show(function(item){

                })
            },
            validateCome: function() { //验证进场信息
                if (this.comesData == null || this.comesData.GYS_MC.value == null) {
                    mui.toast('供应商不能为空！');
                    return false
                }

                if (this.comesData.IN_DATE.value == null) {
                    mui.toast('进场日期不能为空!');
                    return false
                }

                if (this.plate == '车牌') {
                    mui.toast('请选择车牌归属地！');
                    return false;
                }
                var reg = /^[A-Z_0-9]{5}$/;
                if (this.carsNum == null) {
                    mui.toast('车牌不能为空!');
                    return false
                } else if (!reg.test(this.carsNum)) {
                    mui.toast('车牌格式不正确!');
                    return false
                }

                if (this.comesData.AREA_ORIGIN_NAME.value == null) {
                    mui.toast('产地不能为空！');
                    return false
                }
                if (this.comesData.SUPPLIER_NAME.value == null) {
                    mui.toast('供货单位不能为空！');
                    return false
                }
                return true;
            },
            loadTypeData:function(){ //加载明细类型
                this.$http.get(configPath+'testType.js').then(function(rs){
                    console.log(rs.json());
                    typePicker.setData(rs.json().data)
                    // typePicker.pickers[0].setSelectedIndex(index);
                    // typePicker.pickers[0].setSelectedValue(value);
                })
            }
        },
        computed: {

        },
        components: {
            VHeader,
            VFooter,
            SilderUp,
            VCome,
            Picker
            // DatePicker,
            // Picker
        }
}
</script>
<style>
</style>
