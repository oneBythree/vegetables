<template>
</template>
<style>
@import '../common/mui/css/app.css';
@import '../common/mui/css/mui.picker.min.css';
.m-mui-content {
    height: 0px;
    margin: 0px;
    background-color: #efeff4;
}

.mui-bar-nav ~ .m-mui-content {
    padding-top: 44px;
}
</style>
<script type="text/javascript">
import '../common/mui.js';
import '../common/mui/mui.picker.js';
import '../common/mui/mui.dtpicker.js';
export default {
    data() {
            return {
                msg: '时间组件'
            }
        },
        components: {

        }
}
</script>
