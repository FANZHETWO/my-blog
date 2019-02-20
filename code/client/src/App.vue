<template>
    <div class="app-header-wrapper">
        <div class='app-header-nav-top'>
            <div class='app-header-item row'>
                <div class="app-header-list col">主页</div>
                <div class="app-header-list col">所有文章</div>
                <div class="app-header-list col">分类</div>
                <div class="app-header-list col">关于我</div>
            </div>
        </div>
        <div class="app-aside-left">
            <img class="app-aside-avtor" src="~assets/images/darline.jpg" />
            <div class="app-aside-title">快意恩仇个人博客</div>
            <div class="app-adide-author-des">可以称呼我为老潘，或者极爷，这一称呼来自于逻辑思维的一档节目。“劫就劫皇纲，嫖就嫖娘娘”。做一件事，要么做好，要么就别做。要拥有死磕精神，死磕到底，你就会成功。</div>
            <div class="app-aside-nav row">
                <span class="app-aside-nav-list col">所有文章</span>
                <span class="app-aside-nav-list col">分类</span>
            </div>
            <img class="app-aside-qr" src="~assets/images/QR-code.jpg" alt="">
            <div class="app-aside-qr-des">个人微信号</div>
        </div>
        <transition :name="transitionName">
            <keep-alive :include="keepAlive.value">
                <router-view class="child-view" :key="$route.fullPath"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
import keepAlive from "./router/keepAlive.js";
export default {
  name: "app",
  comments: {},
  data() {
    return {
      transitionName: "",
      noAnimate: true,
      keepAlive: keepAlive
    };
  },
  beforeCreate() {
    let self = this,
      origin =
        (self.$router.history && self.$router.history.getCurrentLocation()) ||
        "",
      originRoute = origin.split("?")[0],
      excludes = [];
    if (originRoute == "/initial") return;
    if (excludes.indexOf(originRoute) == -1) {
      self.$router.$replace(
        {
          path: "/initial",
          query: {
            old: origin
          }
        },
        true
      );
    } 
  },
    watch: {
            $route(to, from) {
        
                let goTo = this.$router.goTo,
                    noAnimatePages = {
                        // 从下列页面跳转到其它页面都没有转场动画 eg:['/initial']
                        from: [],
                        // 跳转到下列页面都没有转场动画 eg:['/initial']
                        to: [],
                        // 同时满足to和from时没有转场动画 eg:[{to:'/message/detail', from:'/'}]
                        and: [{
                            to: '/',
                            from: '/'
                        }]
                    };
                if (noAnimatePages.to.indexOf(to.path) > -1 || noAnimatePages.from.indexOf(from.path) > -1) {
                    this.noAnimate = true;
                } else if (noAnimatePages.and.find(item => item.to === to.path && item.from === from.path)) {
                    this.noAnimate = true;
                } else {
                    this.noAnimate = this.$router.noAnimate || false;
                }
                if (!this.noAnimate) {
                    // 判断页面回退还是前进
                    if (goTo) {
                        this.transitionName = 'slide-right'
                    } else {
                        this.transitionName = 'slide-left'
                    }
                } else {
                    this.transitionName = 'no-animate'
                }
                window.scrollTo(0, 0);
                this.$router.goTo = false;
                this.$router.noAnimate = false;
            }
        }
};
</script>

