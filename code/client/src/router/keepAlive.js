// 配置需要路由缓存的页面,用页面name来做为标识 eg: ['shoppingCart']

const routeList = [
    'home',
    'blog-list',
    'blog-detail',
];

export default {
    value: routeList.join()
};