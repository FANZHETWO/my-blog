/**
 * Created by walker on 2017/5/26.
 */
import scroller from './index.vue'

export default {
    install (Vue, options = {}) {
        //Vue._IScroll = options.IScroll || options;
        Vue.component('scroller', scroller)
    }
}
