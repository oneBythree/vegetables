module.exports = function(router) {
    //路由表
    router.map({
        //默认
        // '/':{
        //     name:'index',
        //     component: require('./app.vue')

        // },
        // //首页
        // '/list':{
        //     name:'list',
        //     component: function(reslove){
        //         return require(['./views/list.vue'],reslove)
        //     }
        // },
        // //商品详情页
        // '/detail/:goodsid':{
        //     name:'detail',
        //     component: function(reslove){
        //         return require(['./views/detail.vue'],reslove)
        //     }
        // },

        // //购物车页
        // '/cart':{
        //     name:'cart',
        //     component: require('./views/cart.vue')
        // },

        // //订单页
        // '/order/:uid/:orderid':{
        //     name:'order',
        //     component: require('./views/order.vue')
        // },

        // //收货地址页
        // '/address/:uid':{
        //     name:'address',
        //     component: require('./views/address.vue')
        // },


        // //个人中心页
        // '/user/:userid':{
        //     name:'user',
        //     component: require('./views/user.vue')
        // },

        //默认登录页面
        '/login':{
            name:'login',
            component: function(reslove){
                return require(['../views/login.vue'],reslove)
            }
        },
        //菜单页面
        'menu':{
            name:'menu',
            component:function(reslove){
                return require(['../views/menu.vue'],reslove)
            }
        },
        //列表页面
        '/list':{
            name:'list',
            component: function(reslove){
                return require(['../views/list.vue'],reslove)
            }
        },
        //添加页面
        '/add':{
            name:'add',
            component: function(reslove){
                return require(['../views/add.vue'],reslove)
            }
        },

        // // 404 页
        // '*': {
        //     name: '404error',
        //     component: require('./views/404.vue')
        // },

    });


    //默认List主页
    router.redirect({
        '/': "/login"
    });


    //登录中间验证，页面需要登录而没有登录的情况直接跳转登录
    window.routeList = [];




    router.beforeEach(function(transition) {
        //处理左侧滚动不影响右边
        $("html, body, .page").removeClass("scroll-hide");

        //router.app.progressbar = false;

        if (routeList.length > 1 && transition.to.name == routeList[routeList.length - 2]['name']) {

            router.app.effect = 'back';

            routeList.splice(routeList.length - 1, 1);

            router.app.progressbar = false;

        } else {

            router.app.effect = 'fade';

            router.app.progressbar = true;

            routeList.push({
                name: transition.to.name,
                path: transition.to.path,
                query: transition.to.query,
                params: transition.to.params,
                timer: +new Date
            });

        }

        transition.next();

    });


    //router.app.progressbar = true;
    //注册路由切换后
    router.afterEach(function(transition) {
        //console.log('成功浏览到: ' + transition.to.path)
    });

};
