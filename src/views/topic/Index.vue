<template>
  <div class="topic">
    <ul ref="topicList" class="topic-list">
      <li  @click="goToTopicDetail(item.id)" class="topic-item" v-for="item in topicList" :key="item.id">
        <img :src="item.scene_pic_url" alt="图片加载失败" />
        <p class="title">{{item.title}}</p>
        <p class="subtitle">{{item.subtitle}}</p>
        <p class="price">{{item.price_info}}元起</p>
      </li>
    </ul>

    <div class="loading" v-show="isLoading">正在加载中...请稍后...</div>
    <div class="limit" v-show="isShow">没有更多了</div>
  </div>
</template>

<script>
import { listaction as listactionApi } from "@/api/topic/index.js";
export default {
  name: "Topic",
  data() {
    return {
      topicList: [],
      totalPage: 0,
      isShow: false,
      currentPage: 0,
      timer: null,
      isLoading:false
    };
  },
  methods: {
    goToTopicDetail(id){
      this.$router.push({
        name:'topicDetail',
        query:{
          id
        }
      })
    },
    init() {
      var that = this;
      window.onscroll = function(e) {
        var topicList = that.$refs.topicList;
        var topicListHeight = topicList.offsetHeight;
        // console.log(document.documentElement.scrollTop);
        that.isShow = false;
        if (
          topicListHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=0
             &&
          that.currentPage <= that.totalPage
        ) {
          if (!that.timer)
          // that.isLoading=true;
            that.timer = setTimeout(() => {
              // console.log('请求申请资源');
              listactionApi({ page: ++that.currentPage }).then(res => {
                that.topicList.push.apply(that.topicList, res.data);
                clearTimeout(that.timer);
                that.timer=null;
                // that.isLoading=false;
              });
            });
        } else if (that.currentPage > that.totalPage) {
          that.isShow = true;
        }
      };
    }
  },
  created() {
    listactionApi({ page: 1 }).then(res => {
      this.topicList.push.apply(this.topicList, res.data);
      this.totalPage = res.total;
      this.currentPage = 1;
      this.init();
    });
  },
  beforeDestroy() {
    window.onscroll=null;
  },
};
</script>

<style lang="scss" scoped>
//专题列表
.topic-list {
  width: 100%;
  // padding-bottom: 60px;
  .topic-item {
    width: 100%;
    text-align: center;
    margin-bottom: 12px;
    background-color: #fff;
    img {
      display: block;
      height: 210px;
      width: 100%;
      object-fit: cover;
    }
    .title {
      font-weight: bolder;
      font-size: 17px;
      color: rgb(51, 51, 51);
      margin: 20px 0 24px;
    }
    .subtitle {
      font-size: 12px;
      color: rgb(153, 153, 153);
    }
    .price {
      margin: 18px 0 24px;
      color: rgb(180, 40, 45);
    }
  }
}
.limit,.loading {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: rgb(153, 153, 153);
  margin-bottom: 60px;
}
// .topic{
//   position: relative;
//   .loading{
//     position: absolute;
//     bottom: 0;
//   }
// }
</style>