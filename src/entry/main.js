/**
 * Created by aresn on 16/6/20.
 */
import '../common/animate/animate.css'
import '../common/mui.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './app.vue';
import Routers from './router2';
import Env from '../config/env';

Vue.use(VueRouter); // 引入路由
Vue.use(VueResource); // 引入 vue-resource

$.ajaxSettings.crossDomain = true;
Vue.transition('right', {
    enterClass: 'fadeInRightBig',
    leaveClass: 'fadeOutRightBig'
});

Vue.transition('rightLite', {
    enterClass: 'fadeInRight',
    leaveClass: 'fadeOutRight'
})
Vue.transition('down', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});


// 开启debug模式
Vue.config.debug = true;

// 路由配置
// let router = new VueRouter({
//     // 是否开启History模式的路由,默认开发环境开启,生产环境不开启。如果生产环境的服务端没有进行相关配置,请慎用
//     history: Env != 'production'
// });

// router.map(Routers);


// router.beforeEach(() => {
//     window.scrollTo(0, 0);
// });

// router.afterEach(() => {

// });

// router.redirect({
//     '*': "/index"
// });

var router = new VueRouter({
    //abstract:true,
    //地址栏不会有变化
    //以下设置需要服务端设置
    //history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
    //saveScrollPosition: false
    hashbang: true,
    history: true,
    saveScrollPosition: true,
    transitionOnLoad: true,
    linkActiveClass:'nav-active' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
});

require('./router2')(router);

router.start(App, '#app');
