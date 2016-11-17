/**
 * Created by aresn on 16/8/22.
 */
const routers = {
    '/index': {
        component (resolve) {
            require(['./views/index.vue'], resolve);
        }
    },
    '/menu':{
    	component(resolve){
    		require(['./views/menu.vue'],resolve);
    	}
    },
    '/setting':{
    	component(resolve){
    		require(['./views/list.vue'],resolve);
    	}
    }
};
export default routers;
// 
// module.exports = function(router){
// 	router.map({
// 		'*': {
//             views: require('./views/index.vue')
//         },
//         '/index': {
//             views: require('./views/index.vue')
//         },
//         '/menu': {
//             views: require('./views/menu.vue')
//         } 
//     })	
// }