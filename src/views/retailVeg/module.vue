<template>
    <div>
        <v-header :header-title="headerTitle" @left-action="goBack"></v-header>
        <v-footer :is-footer="isFooter">
            <div class="g-cell  left">
                <label @click="checkAll">
                    <span class="radio-check" :class="{ 'active':delCheck}">
                        <i  v-if="delCheck" class="iconfont icon-right"></i>
                    </span>
                    <span>删除</span>
                    <em>({{checkData.length}})</em>
                </label>
            </div>
            <div class="g-cell right">
                <a href="javascript:;" class="right-btn">确认</a>
            </div>
        </v-footer>
        <div class="m-content">
            <form class="m-form">
                <div class="m-form-group">
                    <span class="lable">模板日期<em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text" v-model="timer" readonly="" placeholder="选择模板日期" @click="selectedTimer">
                    </label>
                </div>
            </form>
            <article class="m-children-form" v-for="item in muduleData">
                <div class="body">
                    <dl class="left-pull">
                        <dd class="g-table-fix">
                            <div class="g-cell">
                                <strong>客户</strong>
                                <span>{{item.tds.RETAILER_NAME.value}}</span>
                            </div>
                            <div class="g-cell">
                                <strong>名称</strong>
                                <span>{{item.tds.VEG_NAME.value}}</span>
                            </div>
                        </dd>
                        <dd class="g-table-fix">
                            <div class="g-cell">
                                <strong>价格</strong>
                                <span>{{item.tds.PRICE.value}} 元</span>
                            </div>
                            <div class="g-cell">
                                <strong>重量</strong>
                                <span>{{item.tds.WEIGHT.value}} Kg</span>
                            </div>
                        </dd>
                        <dd>
                            <strong>供货单位</strong>
                            <span>{{item.tds.WS_SUPPLIER_NAME.value}}</span>
                        </dd>
                    </dl>
                    <dl class="right-pull">
                        <dt class="flex-box">
                            <span class="flex-1">
                                <i class="iconfont icon-right"></i>
                            </span>
                            <span class="flex-1">
                                <i class="iconfont icon-del"></i>
                             </span>
                        </dt>
                    </dl>
                    <div class="card-cover">
                        <!-- {{item.checked}} -->
                        <!--         <div class="checkboxFour">
                            <input type="checkbox"  name="vegModule" v-model="item.checked" />
                            <label for="checkboxFourInput" ></label>
                        </div> -->
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" name="checkbox1" checked="checked">
                            <i class="icont-checkbox"></i>
                        </div>
                        <!-- {{item.tds.ID.value}} -->
                        <!-- <input class="m-checkbox" type="checkbox" name="vegModule" v-model="item.checked"> {{item.checked}} -->
                        <!-- <em class="check-card active" v-model="item.checked"><i class="iconfont icon-right"></i></em> -->
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>
<script type="text/javascript">
import VHeader from '../../components/header/header.vue';
import datePicker from '../../components/date-picker.vue';
import VFooter from '../../components/footer/footer.vue';

var picker;
var param = {
    type: "date",
    beginYear: 2015,
    endYear: 2020
};

picker = new mui.DtPicker(param); //时间插件



export default {
    data() {
            return {
                headerTitle: '零售蔬菜模板录入', //header抬头
                isFooter: true, //底部显示
                timer: '', //模板时间
                muduleData: [], //模板数据
                checkData: [] //选择数据
            }
        },
        ready: function() {
            this.getModuleData();
        },
        methods: {
            goBack: function() {
                window.history.go(-1);
            },
            selectedTimer: function() {
                var that = this;
                picker.show(function(res) {
                    that.timer = res.value
                })
            },
            getModuleData: function() { //获取某天数据
                var that = this;
                $.ajax({
                    type: "GET",
                    url: configPath + 'retailVegApproach.json',
                    dataType: "json",
                    success: function(json) {
                        that.muduleData = json.data;
                    }
                });
            }
        },
        components: {
            VHeader,
            datePicker,
            VFooter
        }
}
</script>
<style type="text/css">
.card-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
}

.check-card {
    left: .2rem;
    margin-top: 0;
}

.check-card .iconfont {
    vertical-align: top;
}

input[name="vegModule"] {
    /*display: none;*/
    position: absolute;
}

.checkboxFour {
    width: .5rem;
    height: .5rem;
    background: #fff;
    /*margin: 20px 90px;*/
    border-radius: 50%;
    position: relative;
    border: 1px solid #22ac38;
    font-size: 0;
    /* -webkit-box-shadow: 0px 1px 3px rgba(34, 172, 56, 0.5);*/
    /*-moz-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);*/
    /*box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);*/
}

.checkboxFour label {
    /*visibility: hidden;*/
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    -webkit-transition: all .5s ease;
    cursor: pointer;
    position: absolute;
    top: .1rem;
    left: .1rem;
    z-index: 1;
    background: #999;
    /*    -webkit-box-shadow: inset 0px 1px 3px rgba(34, 172, 56, 0.5);
    -moz-box-shadow: inset 0px 1px 3px rgba(34, 172, 56, 0.5);*/
}

.checkboxFour input[type=checkbox]:checked + label {
    background: #22ac38;
    display: block;
}


/*input[type=checkbox] {
    visibility: hidden;
}*/

.weui-cell__hd {
    padding-right: .2rem;
}

.weui-check {
    position: absolute;
    left: -9999em;
}

.weui-check+.icont-checkbox {
    display: inline-block;
    width: .4rem;
    height: .4rem;
    background: url(../../images/icon/checkbox.png) 0 0 no-repeat;
    background-size: cover;
}

.weui-check:checked+.icont-checkbox{
	background: url(../../images/icon/checkbox-checked.png) 0 0 no-repeat;
	background-size: cover;
}
</style>
