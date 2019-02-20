

<template>
    <div class="home-blog-detail" v-if="blogDetail">
        <scroller wrapperClass="article-wrapper" ref="iscroll" :onlyScroll="true">
            <Back></Back>
            <div class="content">
                <div class="box">
                    <div class="entry">
                        <h1>{{blogDetail.title}}</h1>
                        <time>{{blogDetail.releaseTime | parseTime('{y}-{m}-{d}')}}</time>
                        <div class="intro fmt" v-html="blogHtml"></div>
                    </div>
                </div>
            </div>
            <Back></Back>
        </scroller>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "blog-detail",
  data() {
    return {
      blogDetail: "",
      blogHtml: "",
      index: this.$route.query.index
    };
  },
  components: {},
  computed: {
    ...mapGetters(["blogList"])
  },
  created() {
    this.blogDetail = this.blogList[this.index];
    this.blogHtml = this.blogDetail.html.replace(/<a /gi, `<a target='_blank'`);
    console.log(this.blogDetail);
  },
  mounted() {
    if (!this.blogDetail) {
      this.$router.go(-1);
    }
    setTimeout(() => {
      this.$refs.iscroll.refresh();
    }, 500);
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.title {
  text-align: center;
  margin: 20px 0;
}
.article-wrapper {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 0;

  .content {
    width: 100%;
    padding: 10px;
    background: #f9f9f3 url("~assets/images/note-bg.jpg");
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.25);

    .box {
      padding: 0.3rem 0.6rem;
      border: 1px dashed #c9c9c7;
      position: relative;
      .github {
        position: absolute;
        right: 0;
        top: 0;
      }

      .entry {
        h1 {
          margin-bottom: 20px;
          text-align: center;
          color: @theme-red-color;
        }
        time {
          color: #b2b2ae;
          font-size: 12px;
          margin-bottom: 20px;
          display: block;
          text-align: center;
        }
        .intro {
          overflow-x: scroll;
          font-size: 14px;
          @media screen and (max-width: @pc-width) {
            font-size: 12px;
          }
        }
      }

      .logo {
        margin-top: 30px;
        margin-right: -20px;
        text-align: right;
        // padding-right: 0.3rem;
        img {
          width: 50px;
        }
      }
    }
  }
}
</style>
