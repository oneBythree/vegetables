/**
 * Created by aresn on 16/6/20.
 */
// import '../common/mui/css/mui.min.css'
import '../common/animate/animate.css'
import '../common/mui.js';
import Vue from 'vue';
import VueTouch from 'Vue-touch';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import numberOnly from '../directives/number-only.js';
import infiniteScroll from '../directives/infiniteScroll.js';
import App from './app.vue';
import Routers from './router';
import Env from '../config/env';
import NProgress from 'nprogress'


Vue.use(VueRouter); // 引入路由
Vue.use(VueResource); // 引入 vue-resource
Vue.use(VueTouch);
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
};
Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = { withCredentials: true };



/*animate动画**/
Vue.transition('right', {
    enterClass: 'fadeInRightBig',
    leaveClass: 'fadeOutRight'
});

Vue.transition('left', {
    enterClass: 'fadeInLeft',
    leaveClass: 'fadeOuLeft'
})

Vue.transition('rightLite', {
    enterClass: 'fadeInRight',
    leaveClass: 'fadeOutRight'
})
Vue.transition('down', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});

Vue.transition('fade', {
    enterClass: 'zoomInDown',
    leaveClass: 'zoomOutUp'
});

Vue.transition('fadeUp', {
    enterClass: 'fadeInUpBig',
    leaveClass: 'fadeOutDownBig'
})


Vue.directive('numberOnly', numberOnly);
Vue.directive('infiniteScroll', infiniteScroll)

/**模拟数据 start**/
const configPath = '../../src/api/';
window.configPath = configPath;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
Vue.http.options.emulateJSON = true;
/**模拟数据 end**/

// 开启debug模式
Vue.config.debug = true;

// 路由配置
let router = new VueRouter({
    // 是否开启History模式的路由,默认开发环境开启,生产环境不开启。如果生产环境的服务端没有进行相关配置,请慎用
    // history: Env != 'production'
    history: false,
    saveScrollPosition: true,
    // transitionOnLoad:true,
    //设置全局的(激活的)链接样式,也可以单独设置.默认值是v-link-active
    linkActiveClass: 'link-active'
});

router.map(Routers);

router.beforeEach(function(transition) {
    if (transition.to.auth) {
        if (window.sessionStorage.getItem('accessToken')) {
            transition.next()
        } else {
            transition.redirect('/login')
        }
    } else {
        // NProgress.start()
        transition.next()
    }
});


router.afterEach(() => {

});

router.redirect({
    '*': "/login"
});

router.start(App, '#app');


String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}