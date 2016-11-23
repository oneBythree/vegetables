/**
 * Created by aresn on 16/8/22.
 */

const routers = {
    '/login': {
        component(resolve) {
            require(['../views/login.vue'], resolve);
        }
    },
    'list': {
        component(resolve) {
            require(['../views/list.vue'], resolve);
        }
    },
    'menu': {
        component(resolve) {
            require(['../views/menu.vue'], resolve);
        }
    },
    'add': {
        component(resolve) {
            require(['../views/add.vue'], resolve);
        }
    },
};
export default routers;
