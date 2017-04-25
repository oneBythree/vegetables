<template>
    <div>
        <v-header :header-title="haedertitle" :is-left-icon="isLeftIcon">
        </v-header>
        <div class="m-content">
            <!--     <h1 class="title">E追溯</h1> -->
            <form class="login">
                <ul class="list">
                    <li class="flex-box mui-input-row">
                        <span>用户名:</span>
                        <div class="flex-1">
                            <input v-model="username" type="text" maxlength="10" style="imeMode:inactive ">
                        </div>
                    </li>
                    <li class="flex-box ">
                        <span>密&nbsp;码:</span>
                        <div class="flex-1">
                            <input v-model="password" type="password" maxlength="10">
                        </div>
                    </li>
                </ul>
                <a href="javascript:;" class="m-submit" @click="login">确认登录</a>
            </form>
        </div>
    </div>
</template>
<script>
"use strict";

import VHeader from '../components/header/header.vue';
const loginUrl = 'mobileTrace.do?method=loginUser';

export default {
    data() {
            return {
                haedertitle: '登录',
                isLeftIcon: false,
                username: '',
                password: '',
                loginUrl: ''
            }
        },
        components: {
            VHeader,
        },
        ready: function() {
            this.clearSession();
        },
        methods: {
            login: function() {
                var that = this;
                if (this.username == '') {
                    mui.toast('用户名不能为空！');
                    return false;
                }

                if (this.password == '') {
                    mui.toast('密码不能为空！');
                    return false;
                }

                var _url = loginUrl + '&username=' + that.username.trim() + '&password=' + that.password.trim();
                $.ajax({
                    url: _url,
                    type: "GET",
                    success: function(rs) {
                        var rsData = JSON.parse(rs)[0].data;
                        if (rsData.result) {
                            sessionStorage.setItem('accessToken', rsData.result);
                            sessionStorage.setItem('userInfo', JSON.stringify(rsData.data));
                            that.$route.router.go('/menu');
                        } else {
                            mui.toast(rsData.message);
                            sessionStorage.removeItem('accessToken');
                            sessionStorage.removeItem('userInfo');
                        }
                    },
                    error: function(rs) {
                        mui.toast('请求数据错误码:' + rs.status);
                    }
                });
            },
            clearSession: function() {
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('userInfo');
            }
        }
}
</script>
<style>
h1.title {
    font-size: .84rem;
    color: #22ac38;
    margin: 1.18rem 0 .94rem;
    text-align: center;
}

form.login {
    font-size: .3rem;
    padding: 0 .42rem;
    margin-top: .5rem;
    /*没有抬头*/
}

form.login ul.list {
    background: #fff;
    border-radius: 3px;
    padding: 0 .2rem;
}

form.login ul.list li {
    position: relative;
    height: .78rem;
    line-height: .78rem;
}

form.login ul.list li:not(:last-of-type):after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}

form.login li.flex-box>span {
    display: inline-block;
    margin-right: 0.2rem;
    width: 1.4rem;
}

form.login li.flex-box input {
    width: 100%;
    height: 100%;
}

form.login a.m-submit {
    display: block;
    background: #22ac38;
    color: #fff;
    margin-top: .4rem;
    height: .84rem;
    line-height: .84rem;
    text-align: center;
    border-radius: 3px;
}

form.login a.m-submit:active {
    background: #2bd547;
}
</style>
