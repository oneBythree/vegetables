<script>
export default {
    data() {
            
        var cc = Math.round(Math.random() * 10);

        return {
            Index: {
                bgimg:'bg'+cc,
                siteInfo: {
                    sitename: "微信蔬菜进场管理"
                }
            }
        }

    },
    methods: {
        goBack: function(e) {
            history.go(-1);
        }

    }
}
</script>
<style type="text/css">
    .mui-input-group{
        margin-top: 15px;
    }
</style>
<template>
    <header class="header mui-bar mui-bar-nav">
        <h1 id="title" class="mui-title">{{Index.siteInfo.sitename}}</h1></header>
    <div class="mui-content index-page" v-bind:class="Index.bgimg">
        <!-- <div class="button-box">
            <button v-link="{ path: '/list' }" class="mui-btn go-button">马上选出吃什么！</button>
            <br>
            <span>选择困难症患者福音</span>
        </div> -->
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>用户名</label>
            <input type="text" class="mui-input-clear" placeholder="请输入用户名">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password" placeholder="请输入密码">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary">登录</button>
                <button v-link="{ path: '/list' }" type="button" class="mui-btn mui-btn-danger">取消</button>
            </div>
        </form>
    </div>
</template>
