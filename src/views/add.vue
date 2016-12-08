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
            <chilren-from :is-childern-from="isChildernFrom" :info-children-data="infoChildrenData" :info-index="infoIndex">
                <slot name="info">
            </chilren-from>
        </div>
        <silder-up :is-silder.sync="isSilder" :silder-title="silderTitle" @footer-submit="silderSubmit">
            <div class="m-form-group">
                <span class="lable">类型<em class="red">*</em></span>
                <label class="flex2 ">
                    <input type="text" v-model="info.type.value" readonly="" @click="showType">
                </label>
            </div>
            <div class="m-form-group">
                <span class="lable">重量（kg）<em class="red">*</em></span>
                <label class="flex2 ">
                    <input type="text" v-model="info.weight" placeholder="请输入重量">
                </label>
            </div>
            <div class="m-form-group">
                <span class="lable">单价（元）<em class="red">*</em></span>
                <label class="flex2 ">
                    <input type="text" v-model="info.money" placeholder="请输入单价">
                </label>
            </div>
        </silder-up>
        <drop-select :type-name="typeName" :header-title="headerTitle" :my-drop-name="myDropType" :drop-name.sync="selected" :transition="transitionDrop">
            <search-list :search-data="searchlist" :search-selected="searchSelected" @select-type="selectType">
                <slot name="type"></slot>
            </search-list>
        </drop-select>
    </div>
</template>
<script type="text/javascript">
import VHeader from '../components/header/header.vue';
import VFooter from '../components/footer/footer.vue';
import SilderUp from '../components/silder-up/slider-up.vue';
import VCome from '../components/from/come.vue';
import DropSelect from '../components/drop-select.vue';
import SearchList from '../components/search-list/search-list.vue';
import ChilrenFrom from '../components/children-from/children-from.vue';
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
                info: { //明细
                    type: {
                        value: null,
                        index: null
                    },
                    weight: null,
                    money: null
                },
                headerTitle: '明细类型选择',
                typeName: 'GreenAll',
                myDropType: 'infoType',
                transitionDrop: 'right',
                selected: null,
                searchlist: null,
                searchSelected: null,
                infos: [], //添加明细数组
                isChildernFrom: null, //子菜单明细是否显示
                infoChildrenData: null, //子菜单明细数据
                infoIndex: null //明细数组数组的位置
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
            showType: function() {
                // this.isSelectDropType = true;
                this.selected = 'infoType';
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
            loadTypeData: function() { //加载明细类型
                this.$http.get(configPath + 'testType.js').then(function(rs) {
                    this.searchlist = rs.json().data;
                })
            },
            selectType: function(item) { //点击明细
                if (this.searchSelected != item.index) {
                    this.searchSelected = item.index + '';
                }
                this.selected = null;
                this.info.type = item;
            },
            silderSubmit: function() { //上拉表单提交
                if (this.silderTypeViladate()) {
                    this.isSilder = false;
                    this.isChildernFrom = true;
                    this.infoChildrenData = this.info;
                }
            },
            silderTypeViladate: function() { // 提交明细验证
                if (this.info.type.value == null) {
                    mui.toast('请选择产品类型');
                    return false
                }

                if (this.info.weight == null) {
                    mui.toast('请输入重量');
                    return false
                }

                if (this.info.money == null) {
                    mui.toast('请输入价格');
                    return false
                }
                return true;
            }
        },
        computed: {

        },
        components: {
            VHeader,
            VFooter,
            SilderUp,
            VCome,
            DropSelect,
            SearchList,
            ChilrenFrom
            // DatePicker,
            // Picker
        }
}
</script>
<style>
/* .m-search-list {
    position: relative;
}

.m-search-form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.m-search-form>form {
    display: box;
    display: flex;
    height: .8rem;
    line-height: .8rem;
    background: #fff;
}

.m-search-form>form button {
    display: inline-block;
    width: 1rem;
    border: none;
    color: #22ac38;
}

.m-search-form>form span {
    display: inline-block;
    width: .8rem;
    text-align: center;
}

.m-search-form>form input[type="text"] {
    flex: 1;
    padding-left: .2rem;
}

.m-search-list ul {
    padding-top: .8rem;
} */
</style>
