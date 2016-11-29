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
                <v-come @add-info="addInfoRouter" v-if="toggleCome" :comes-data.sync="comesData"></v-come>
            </form>
        </div>
        <silder-up :is-silder.sync="isSilder" :silder-title="silderTitle">
            <div class="m-form-group">
                <span class="lable">类型<em class="red">*</em></span>
                <label class="flex2 ">
                    <input type="text" v-model="info.type">
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

export default {
    data() {
            return {
                haedertitle: '添加进场',
                toggleCome: true,
                comesData: null,
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
        },
        methods: {
            goBack: function() {
                // histroy.go(-1);
            },
            addInfoRouter: function() {
                this.toggleCome = false;
                console.log(this.comesData);
            },
            showSilder: function() {
                
                this.isSilder = true;
            }
        },
        components: {
            VHeader,
            VFooter,
            SilderUp,
            VCome
            // DatePicker,
            // Picker
        }
}
</script>
<style>
</style>
