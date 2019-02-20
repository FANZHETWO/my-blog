//todo client

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import './assets/style/index.css'
import './assets/style/less/index.less'
import './javascript/index'
import * as filters from './filters'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import scroll from './components/scroller/index.js'
import FastClick from 'fastclick'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
FastClick.attach(document.body);
import customComponents from './custom-components'
Vue.use(customComponents).use(scroll)
Vue.use(ElementUI);


// 为了能够正确执行转场动画，跳转页面的方法需要做一层包装
VueRouter.prototype.$go = function(noAnimate) {
    this.noAnimate = noAnimate || false;
    this.goTo = false;
    this.go(-1);
};
VueRouter.prototype.$push = function(location, noAnimate, onComplete, onAbort) {
    this.noAnimate = noAnimate || false;
    this.goTo = true;
    this.push(location, onComplete, onAbort);
};
VueRouter.prototype.$replace = function(location, noAnimate, onComplete, onAbort) {
    this.noAnimate = noAnimate || false;
    this.goTo = true;
    this.replace(location, onComplete, onAbort);
};
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})