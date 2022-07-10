<template>
  <div>
    <!-- 地点显示与搜索入口 -->
    <div class="head-search">
      <div @click="goToMap" class="address">{{showCity}}</div>
      <!-- <router-link class="address" :to="{path:'/map',query:{address:cityAddress}}">{{city}}</router-link> -->
      <router-link to="/search">
        <van-search class="search" disabled placeholder="请输入搜索关键词" />
      </router-link>
    </div>
    <div id="container"></div>
    <!-- 主页轮播图 -->
    <van-swipe class="banner" :autoplay="3000" indicator-color="black">
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <img class="banner-img" :src="item.image_url" alt="图片加载失败" />
      </van-swipe-item>
    </van-swipe>

    <!-- 频道channel分块 -->
    <div class="channel">
      <div @click="channelClick(item.id)" class="channel-item" v-for="item in channelList" :key="item.id">
        <img :src="item.icon_url" alt="图片加载失败" />
        <p class="title">{{item.name}}</p>
      </div>
    </div>

    <!-- 品牌制造商分块 -->
    <div class="brand-series">
      <!-- <p class="title" >品牌制造商直供</p> -->
      <router-link class="title" to="/brandlist">品牌制造商直供</router-link>
      <div class="content">
        <div @click="brandDirect(item)" class="brand-item" v-for="item in brandList" :key="item.id">
          <p>{{item.name}}</p>
          <p>{{item.floor_price}}元起</p>
          <img :src="item.pic_url" alt="图片加载失败" />
        </div>
      </div>
    </div>

    <!-- 新品首发-->
    <div @click="getNewGoods('new')" class="recommend new">
      <div class="title">新品首发</div>
      <button >查看全部</button>
      <div class="mask">NEW</div>
    </div>
    <GoodFalseSwiper :list="newGoods"></GoodFalseSwiper>

    <!-- 好物精选 -->
    <div @click="getNewGoods('hot')" class="recommend hot">
      <div class="title">人气推荐·好物精选</div>
      <button >查看全部</button>
      <div class="mask">HOT</div>
    </div>
    <GoodFalseSwiper :list="hotGoods"></GoodFalseSwiper>

    <!--专题精选  -->
    <div class="topic-select">
      <div class="title">
        专题精选
        <img src="@/assets/img/images/right.png" alt />
      </div>
      <div class="content">
        <ul class="list">
          <li @click="goToTopicDetail(item.id)" class="list-item" v-for="item in topicList" :key="item.id">
            <img :src="item.item_pic_url" alt />
            <p class="title">
              {{item.title}}
              <span>{{item.price_info}}元起</span>
            </p>
            <p class="subtitle">{{item.subtitle}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 好物推荐集合 -->
    <div class="nice-good" v-for="good in newCategoryList" :key="good.id">
      <div class="title">{{good.name}}好物</div>
      <ul class="good-list">
        <GoodsList :titleStyle="titleStyle" :goodsList="good.goodsList">
          <template>
            <li @click="moreGood(good.id)" class="good-item">
              <p class="more">{{good.name}}好物</p>
              <img class="more-img" src="@/assets/img/images/icon_go_more.png" alt />
            </li>
          </template>
        </GoodsList>
      </ul>
    </div>

    <div style="margin-bottom:60px;"></div>
  </div>
</template>

<script>
import GoodsList from "@/views/home/components/GoodsList";
import { index as indexApi } from "@/api/home/index.js";
import GoodFalseSwiper from "./components/goodFalseSwiper.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    GoodFalseSwiper,
    GoodsList
  },
  data() {
    return {
      swiperList: [],
      channelList: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      showCity: "",
      titleStyle:'left'
    };
  },
  computed: {
    ...mapState(["city", "searchCity", "address"])
  },
  methods: {
    ...mapMutations(["updateCity", "updateSearchCity", "updateAddress"]),
    moreGood(id){
      console.log(id);
      this.$router.push({
        path:'/horizontalCategory',
        query:{
          id
        }
      })
    },
    goToTopicDetail(id){
      this.$router.push({
        name:'topicDetail',
        query:{
          id
        }
      })
    },
    channelClick(id){
      this.$router.push({
        path:'/horizontalCategory',
        query:{
          id:id
        }
      })
    },
    brandDirect(item){
      this.$router.push({
        path:'/brandDirect',
        query:{
          id:item.id
        }
      });
    },
    goToMap() {
      this.$router.push("/map");
    },
    getNewGoods(query) {
      this.$router.push({
        name: "newGoods",
        query: { title: query }
      });
    }
  },
  created() {
    indexApi().then(res => {
      // console.log("首页全部数据", res);
      this.swiperList = res.banner;
      this.channelList = res.channel;
      this.brandList = res.brandList;
      this.hotGoods = res.hotGoods;
      this.newGoods = res.newGoods;
      this.topicList = res.topicList;
      this.newCategoryList = res.newCategoryList;
    });
  },
  mounted() {
    var map = new AMap.Map("container", {
      zoom: 8 //级别
      // center: [116.397428, 39.90923], //中心点坐标
    });
    var that = this;
    if (this.searchCity.length) {
      this.showCity = this.searchCity;
    } else {
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            that.updateCity(result.city);
            that.showCity = that.city;
            var location = result.rectangle.split(";")[0];
            var lng = location.split(",")[0];
            var lat = location.split(",")[1];
            that.updateAddress({ lng, lat });
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  top: 100px;
  left: 0;
  z-index: 10;
  display: none;
  position: absolute;
  width: 300px;
  height: 180px;
}
//首页搜索框
.head-search {
  position: fixed;
  display: flex;
  // justify-content:flex-start ;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
  line-height: 60px;
  background-color: #fff;
  .address {
    display: block;
    text-indent: 10px;
    width: 75px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search {
    display: inline-block;
    width: calc(100% - 75px);
    line-height: 60px;
    background-color: #fff !important;
  }
  .van-search__content {
    background-color: #fff;
  }
}

//轮播图banner
.banner {
  margin-top: 60px;
  .banner-img {
    width: 100%;
    height: auto;
  }
}

::v-deep .van-swipe__indicator {
  background-color: gray;
  width: 4px;
  height: 4px;
}
//频道channel分块
.channel {
  display: flex;
  padding: 10px 0;
  justify-content: space-around;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  background-color: #fff;
  img {
    display: block;
    width: 30px;
    height: 30px;
    margin-bottom: 16px;
  }
}
//品牌商brand
.brand-series {
  overflow: hidden;
  background-color: #fff;
  .title {
    display: block;
    margin: 20px 0;
    text-align: center;
    font-weight: bolder;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .brand-item {
      position: relative;
      width: 178px;
      height: 116px;
      margin: 4px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      p {
        position: absolute;
        top: 40%;
        left: 0;
        text-indent: 10px;
        &:first-child {
          top: 15%;
        }
      }
    }
  }
}

//新品首发
.recommend {
  position: relative;
  overflow: hidden;
  height: 122px;
  background: url(@/assets/img/images/bgnew.png) no-repeat center;
  background-size: contain;
  margin-bottom: 10px;
  text-align: center;
  box-sizing: border-box;
  color:#8c9bae;
  .title {
    margin: 20px 0;
  }
  button{
    padding:0 20px;
    line-height: 30px;
    background-color: #d8e4f0;
    font-size: 12px;
    border:none
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 100px;
    text-align: center;
    color: #fff;
    opacity: 1;
    z-index: -1;
  }
}
.hot {
  color:#b1a279;
  background-image: url(@/assets/img/images/bgtopic.png);
  button{
    background-color: #f4e9cb;
  }
}

//专题精选
.topic-select {
  background-color: #fff;
  text-align: center;
  .title {
    font-weight: bolder;
    height: 60px;
    line-height: 60px;
    img {
      margin-left: 5px;
      display: inline-block;
      width: 20px;
      height: auto;
      vertical-align: middle;
    }
  }
  .list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;
    overflow: auto;
    width: 100%;
    text-align: left;
    .list-item {
      width: 245px;
      margin-left: 12px;
      img {
        display: block;
        width: 245px;
        height: 138px;
      }
      .title {
        position: relative;
        font-weight: bolder;
        font-size: 15px;
        span {
          position: absolute;
          top: 0;
          right: 0;
          color: #9c3232;
        }
      }
      .subtitle {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #ccc;
        margin: 10px 0;
      }
    }
  }
}

//好物合集
.nice-good {
  .title {
    text-align: center;
    line-height: 60px;
  }
}
</style>