
<template>
    <div class="home-index-wrapper">
        <scroller wrapperClass="home-index-liW" ref="iscroll" :pullDown="false" @pullUp="pullUp" :describe="blogLoadingMore">
            <ul>
                <li class="home-index-list" v-for="(item,index) in blogList" @click="goDetail(index)">
                    <h2 class="home-index-title p-t-b-2">{{item.title}}</h2>
                    <p class="home-index-article-des p-t-b-2">{{item.desc}}</p>

                    <div class="home-index-tag p-t-b-2">
                        <span class="home-index-tag-author">作者：{{item.author || 'pan'}}</span>
                        <span class="home-index-tag-time">时间：{{item.createTime | parseTime}}</span>
                    </div>
                    <div class="home-index-tag-list p-t-b-2">
                        <img class="home-index-tag-svg" src="~assets/images/tag-icon.svg">
                        <span class="home-index-tag-type" v-for="tag in item.type">{{tag}}</span>
                    </div>
                </li>
            </ul>
        </scroller>

    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Loading } from "element-ui";
import BScroll from "better-scroll";
import infoComponent from "./info.vue";
import BlogComponent from "./blog.vue";
import TagsComponent from "./tags.vue";
export default {
  name: "blog-list",
  data() {
    return {
      pageindex: 1,
      pagesize: 5,
      scroll: ""
    };
  },
  components: {
    infoComponent,
    BlogComponent,
    TagsComponent
  },
  computed: {
    ...mapGetters(["blogList", "blogLoadingMore", "blogLoadingBol"])
  },
  created() {
    this.getBlogData();
  },
  mounted() {},
  methods: {
    async getBlogData() {
      const LOADING = this.$loading({ text: "数据加载中~" });
      await this.$store.dispatch("getBlogList", {
        pageindex: this.pageindex,
        pagesize: this.pagesize
      });
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        LOADING.close();
      });
      this.$nextTick(() => {
        this.$refs.iscroll.refresh();
      });
    },
    pullUp() {
        if(this.blogLoadingMore) return;
        this.pageindex++;
        this.getBlogData()
    },
    goDetail(indexObj) {
        this.$router.push({path:'/blogDetail',query:{index:indexObj}})
    }
  }
};
</script>
