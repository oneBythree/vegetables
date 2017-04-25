/**
 * Created by ypf on 17/02/24.
 */

const routers = {
    '/login': {
        auth: false,
        component(resolve) {
            require(['../views/login.vue'], resolve);
        }
    },
    'menu': {
        auth: true,
        component(resolve) {
            require(['../views/menu.vue'], resolve);
        }
    },
    'retailVeg': {
        auth: true,
        component(resolve) {
            require(['../views/retailVeg/index.vue'], resolve);
        }
    },
    'retailVeg/add': {
        auth: true,
        component(resolve) {
            require(['../views/retailVeg/add.vue'], resolve);
        }
    },
    'retailVeg/module': {
        auth: true,
        component(resolve) {
            require(['../views/retailVeg/module.vue'], resolve);
        }
    },
    'retailVeg/sales': {
        auth: true,
        component(resolve) {
            require(['../views/retailVeg/sales.vue'], resolve);
        }
    },
    'retailMeat': {
        auth: true,
        component(resolve) {
            require(['../views/retailMeat/index.vue'], resolve);
        }
    },
    'retailMeat/add': {
        auth: true,
        component(resolve) {
            require(['../views/retailMeat/add.vue'], resolve);
        }
    },
    'retailMeat/sales': {
        auth: true,
        component(resolve) {
            require(['../views/retailMeat/sales.vue'], resolve);
        }
    }
};
export default routers;
