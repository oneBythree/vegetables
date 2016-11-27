<template>
    <div>
        <!-- 头部 -->
        <v-header :header-title="haedertitle" @left-action="goBack" :header-title="haedertitle">
        </v-header>
        <div class="m-content">
            <form class="m-form">
                <div class="m-form-group">
                    <span class="lable">类型 <em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text">
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">价格 <em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text">
                    </label>
                </div>
                <div class="m-form-group">
                    <span class="lable">重量 <em class="red">*</em></span>
                    <label class="flex2 ">
                        <input type="text">
                    </label>
                </div>
                <!--                 <div transition="right">
                    <v-come @add-info="addInfoRouter" v-if="toggleCome" :comes-data.sync="comesData"></v-come>
                </div> -->
                <div v-if="!toggleCome">1111</div>
            </form>
        </div>
    </div>
</template>
<script type="text/javascript">
import VHeader from '../components/header/header.vue';
import VCome from '../components/from/come.vue';

export default {
    data() {
            return {
                haedertitle: '添加进场',
                toggleCome: true,
                comesData: null,
            }
        },
        ready: function() {
            mui.init();
        },
        methods: {
            goBack: function() {

            },
            addInfoRouter: function() {
                this.toggleCome = false;
                console.log(this.comesData);
            }
        },
        components: {
            VHeader,
            VCome
            // DatePicker,
            // Picker
        }
}
</script>
