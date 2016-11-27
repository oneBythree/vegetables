/**
 * Created by aresn on 16/6/20.
 */
import '../common/animate/animate.css'
import '../common/mui.js';
// import '../common/zepto/zepto.min.js'
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './app.vue';
import Routers from './router';
import Env from '../config/env';

Vue.use(VueRouter); // 引入路由
Vue.use(VueResource); // 引入 vue-resource

/*animate动画**/
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
Vue.transition('fade', {
    enterClass: 'zoomInDown',
    leaveClass: 'zoomOutUp'
});

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
    history: Env != 'production'
});

router.map(Routers);

router.beforeEach(() => {
    window.scrollTo(0, 0);
});

router.afterEach(() => {

});

router.redirect({
    '*': "/login"
});

router.start(App, '#app');
