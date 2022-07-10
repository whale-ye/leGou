<template>
  <div id="app">
    <div v-if="isHeader" class="new-goods-header">
      不凡
      <div @click="backHome" class="back">
        <van-icon name="arrow-left" />返回
      </div>
    </div>
    <router-view :style="{marginTop:mt}"></router-view>
    <van-tabbar  z-index="999999999" v-if="isFooter" class="footer" active-color="orange" route>
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/topic" icon="description">专题</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import {Toast} from 'vant'
export default {
  name: "App",
  data() {
    return {
      isFooter: true,
      isHeader: true,
      mt: "50px",
      path: "",
      query: {}
    };
  },
  methods: {
    backHome() {
      this.$router.back();
      Toast.clear(true);
    }
  },
  watch: {
    $route(to, from) {
      this.path = "/home";
      var routeArr = ["/home", "/category", "/my", "/topic", "/cart"];
      if (routeArr.includes(to.path)) {
        this.isFooter = true;
        this.isHeader = false;
        this.mt = 0;
      } else {
        this.isFooter = false;
        this.isHeader = true;
        this.mt = "50px";
      }
    }
  },
  created() {
    
  //存在历史记录中,个人信息
    //    var userInfo = {
    //   // "openId":"小鲸鱼",
    //   "openId":"66",
    //   "nickName":"赵六",
    //   "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132"
    // };
    // var openId = userInfo.openId;
    // localStorage.setItem("userInfo", JSON.stringify(userInfo));
    // localStorage.setItem("openId", openId); 
  }
  
  
};
</script>

<style lang="scss" scoped>
.new-goods-header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  z-index: 100000;
  border-bottom: 1px solid gray;
  .back {
    position: absolute;
    left: 5%;
    top: 0;
    color: #ae98fa;
  }
}
 ::v-deep .footer{
  position: fixed;
  bottom: 0;
  z-index: 999999999;
}
</style>
