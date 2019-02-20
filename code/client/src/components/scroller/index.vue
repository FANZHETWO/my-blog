<style lang="less" scoped>
    .scroll-view {
        touch-action: none;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }

    .content-view {
        min-height: 101%;
    }

    .scroll-content {
        padding-bottom: 5px;
    }

    .pullDown {
        width: 100%;
        margin-top: -60px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .pullDownIcon {
        margin: 0 auto 8px;
        display: block;
        width: 20px;
        height: 20px;
    }

    .pullDown.scroller-loadState {
        margin-top: 0;
    }

    .pullDown.scroller-loadState .pullDownIcon {
        margin-top: 0;
    }

    @keyframes rotateLoading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes rotateLoading {
        from {
            -webkit-transform: rotate(0);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .pullDownLabel {
        display: block;
        font-size: 12px;
        color: #9b9b9b;
        line-height: 12px;
        text-align: center;
        font-family: PingFangSC-Light;
    }

    .divider-bottom {
        overflow: hidden;
        padding: 15px;
        padding-top:10px;
        width: 100%;
        box-sizing: inherit;
        .divider-content {
            margin: 0 auto;
            width: 220px;
            height: 50px;
        }
        .divider-line {
            float: left;
            margin-top: 24px;
            width: 58px;
            height: 1px;
            background: #e1e1e1;
        }
        .divider-img {
            float: left;
            display: block;
            margin: 0 10px;
            height: 50px;
        }
        .divider-text {
            margin-top: 15px;
            line-height: 14px;
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #999;
            text-align: center;
            letter-spacing: 0;
        }
    }

    .arrow {
        width: 20px;
        height: 20px;
        margin: 0 auto 0;
        -webkit-transform: translateZ(0) rotate(0deg);
        transform: translateZ(0) rotate(0deg);
        transition: transform .2s linear;
        &.active {
            transform: translateZ(0) rotate(180deg);
        }
    }
</style>
<template>
    <div ref="scrollView" class="scroll-view" :style="wrapperStyle" :class="wrapperClass">
        <div :style="scrollerStyle" class="content-view" :class="scrollerClass">
            <div class="pullDown" :class="{'scroller-loadState': downState}" v-if="pullDown&&showPullDownLabel">
                <span class="pullDownIcon">
                    <svg viewBox="0 0 63.657 63.657" xml:space="preserve" width="512px" height="512px" class="arrow" :class="{'active': pullDownLabel === '松手刷新'}" v-show="!downState">
                         <g>
                             <g>
                                 <polygon points="31.891,63.657 0.012,35.835 2.642,32.821 31.886,58.343 61.009,32.824 63.645,35.832" fill="#AAA"></polygon>
                             </g>
                         </g>
                         <g>
                             <g>
                                 <rect x="29.827" width="4" height="60" fill="#AAA"></rect>
                             </g>
                         </g>
                    </svg>
                    <img src="~assets/images/load.gif" width="20" height="20" alt="" v-show="downState"/>
                </span>
                <span class="pullDownLabel">{{pullDownLabel}}</span>
            </div>
            <div class="scroll-content" ref="scrollContent">
                <slot></slot>
            </div>
            <div class="divider-bottom" v-show="describe && showDescribe">
                <div class="divider-content">
                    <b class="divider-line"></b>
                    <img class="divider-img" src="../../assets/images/no_data.png" alt="">
                    <b class="divider-line"></b>
                </div>
                <p class="divider-text">{{describeText}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import IScroll from './iscroll.js'
    export default {
        name: 'iscroll-view',
        props: {
            options: {
                type: Object,
                default () {
                    let clickVal = (function () {
                        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
                        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
                        if (/Silk/i.test(navigator.userAgent)) return false;
                        if (/Android/i.test(navigator.userAgent)) {
                            var s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
                            return parseFloat(s[0] + s[3]) < 44 ? false : true
                        }
                    }())
                    return {
                        probeType: 3,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
                        scrollbars: false,//有滚动条
                        mouseWheel: true,//允许滑轮滚动
                        fadeScrollbars: false,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
                        bounce: true,//边界反弹
                        //shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
                        //tap: true , // 允许点击事件
                        click: clickVal,
                        disablePointer: true,
                        disableTouch: false,
                        disableMouse: false
                        //preventDefault: false
                    }
                }
            },
            // 是否仅需要滚动
            onlyScroll: {
                type: Boolean,
                default: false
            },
            // 是否启动无限加载
            pullUp: {
                type: Boolean,
                default: true
            },
            // 是否启动下拉
            pullDown: {
                type: Boolean,
                default: true
            },
            // 是否监听滚动事件
            listenScroll: {
                type: Boolean,
                default: false
            },
            wrapperClass: {
                type: String,
                default () {
                    return ''
                }
            },
            wrapperStyle: {
                type: Object,
                default () {
                    return {}
                }
            },
            scrollerClass: {
                type: Object,
                default () {
                    return {}
                }
            },
            scrollerStyle: {
                type: Object,
                default () {
                    return {}
                }
            },
            // 是否显示底部分割线
            describe: {
                type: Boolean,
                default() {
                    return false
                }
            },
            describeText: {
                type: String,
                default() {
                    return "没有更多内容了"
                }
            }
        },
        data() {
            return {
                pullDownLabel: '下拉刷新',
                showPullDownLabel: false,
                isReadyLoadIng: false,  // 是否准备加载数据
                downState: false,
                upState: false,
                isBack: false,
                showDescribe: false
            }
        },
        watch: {
            describe() {
                this.isDescribe();
            }
        },
        methods: {
            isDescribe() {
                if (this.describe) {
                    setTimeout(() => {
                        let offsetHeight = this.$refs.scrollContent.offsetHeight;
                        let clientHeight = document.documentElement.clientHeight - 100;
                        console.log(offsetHeight, clientHeight)
                        if (offsetHeight > clientHeight) {
                            this.showDescribe = true;
                            this.$nextTick(() => {
                                this.iscroll.refresh();
                            })
                        } else {
                            this.showDescribe = false;
                        }
                    }, 100)
                }
            },
            scrollToElement () {
                this.$nextTick(() => this.iscroll.scrollToElement.apply(this.iscroll, arguments))
            },
            scrollBy () {
                this.$nextTick(() => this.iscroll.scrollBy.apply(this.iscroll, arguments))
            },
            scrollTo () {
                this.$nextTick(() => this.iscroll.scrollTo.apply(this.iscroll, arguments))
            },
            refresh () {
                this.downState = false;
                this.showPullDownLabel = false;
                this.upState = false;
                this.$nextTick(() => this.iscroll.refresh.apply(this.iscroll, arguments))
            }
        },
        beforeDestroy () {
            this.iscroll && this.iscroll.destroy()
            this.iscroll = null
        },
        mounted () {
            setTimeout(() => {
                this.$refs.scrollView.scrollTop = 0;
                try {
                    location.hash && this.iscroll.scrollToElement(location.hash, 0)

                }
                catch (e) {
                }
            }, 0);
            this.$nextTick(() => {
                this.iscroll = new IScroll(this.$refs.scrollView, this.options)
                const {iscroll} = this;
                this.iscroll.on('scroll', e => {
                    // 当加载状态===0
                    if (!this.onlyScroll) {
                        if (iscroll.y > 0 && iscroll.y < 60 && this.pullDown && !this.downState) {
                            this.showPullDownLabel = true;
                            this.isReadyLoadIng = false;
                            this.pullDownLabel = '下拉刷新';
                        } else if (iscroll.y >= 60 && this.pullDown && !this.downState) {
                            this.showPullDownLabel = true;
                            this.isReadyLoadIng = true;
                            this.pullDownLabel = '松手刷新';
                        } else if (iscroll.maxScrollY - iscroll.y > -20 && !this.upState && this.pullUp) {
                            this.upState = true;
                            this.$emit('pullUp', iscroll);
                        }

                    }
                    if (this.listenScroll) {
                        this.$emit('on-scroll', iscroll)
                    }
                    if (iscroll.maxScrollY - iscroll.y > -20 && iscroll.pointY < 100 && !this.isBack) {
                        this.isBack = true;
                        this.scrollTo(0, iscroll.maxScrollY, 400);
                    }
                });
                if (!this.onlyScroll) {
                    if (this.pullDown) {
                        console.log(this.pullDown, 'pulldown');
                        this.iscroll.on('slideDown', e => {
                            if (this.isReadyLoadIng) {
                                this.downState = true;
                                this.iscroll.refresh();
                                this.pullDownLabel = '正在努力加载中...';
                                this.isReadyLoadIng = false;
                                this.$emit('pullDown', iscroll);
                            }
                        });
                    }
                }
                this.iscroll.on('scrollStart', e => {
                    if (!!document.activeElement) {
                        document.activeElement.blur();
                    }
                });
                this.iscroll.on('scrollEnd', e => {
                    this.isBack = false;
                });
                this.isDescribe();
            })
        }
    }
</script>
