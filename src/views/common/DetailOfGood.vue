<template>
  <div>
    <!-- 上层图片轮播 -->
    <van-swipe class="good" :autoplay="3000" indicator-color="#fff">
      <van-swipe-item class="swiper-item" v-for="item in gallery " :key="item.id">
        <img :src="item.img_url" alt />
      </van-swipe-item>
    </van-swipe>

    <!-- 30天退款 -->
    <ul class="condition">
      <li class="condition-item">20天无忧退款</li>
      <li class="condition-item">48小时快速退款</li>
      <li class="condition-item">满88元免邮券</li>
    </ul>

    <!-- 商品信息info -->
    <div class="info">
      <div class="title">{{info.name}}</div>
      <div class="desc">{{info.goods_brief}}</div>
      <div class="price">¥{{info.retail_price}}</div>
      <van-cell class="base" is-link title="请选择规格数量" @click="choose" />
      <van-action-sheet v-model="show" title></van-action-sheet>
    </div>

    <!-- 商品参数 -->
    <div class="good-param">
      <p class="title">商品参数</p>
      <ul class="param-box">
        <li class="param-item" v-for="item in attribute" :key="item.name">
          <div class="label">{{item.name}}</div>
          <div class="label-value">{{item.value}}</div>
        </li>
      </ul>
    </div>

    <div class="html-imgs" v-html="info.goods_desc"></div>

    <!-- 常见问题 -->
    <div class="issue">
      <van-divider class="divider" :style="{padding:'0 90px',borderColor: 'gray' }">常见问题</van-divider>
      <ul class="issue-box">
        <li class="issue-item" v-for="item in issue" :key="item.id">
          <p class="question">{{item.question}}</p>
          <p class="answer">{{item.answer}}</p>
        </li>
      </ul>
    </div>

    <!-- 大家都在看 -->
    <div class="all-look">
      <van-divider class="divider" :style="{padding:'0 90px',borderColor: 'gray' }">大家都在看</van-divider>
      <GoodsList class="good-copy" :titleStyle="titleStyle" :goodsList="goodsList"></GoodsList>
    </div>

    <div class="good-footer">
      <div @click="addStar" class="icon star">
        <van-icon :color="collected?'red':''" class="icon-icon" size="20" name="star-o" />
      </div>
      <div @click="goToCart" class="icon car">
        <van-badge :content="allnumber">
          <van-icon class="icon-icon" size="20" name="cart-o" />
        </van-badge>
      </div>
      <div @click="popUp('buy')" class="icon buy">立即购买</div>
      <div @click="popUp('car')" class="icon buy add-cart">加入购物车</div>
    </div>

    <!--  -->
    <van-popup
      :style="{ height: '35%','margin-bottom':'60px' }"
      closeable
      v-model="show"
      position="bottom"
    >
      <div class="content">
        <div class="top clearfix">
          <img :src="info.primary_pic_url" />
          <div class="right">
            <div class="content-price">价格¥{{info.retail_price}}</div>
            <div class="tips">请选择数量</div>
          </div>
        </div>
        <div class="num">
          <span>数量</span>
          <van-stepper class="num-count" v-model="num" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import GoodsList from "@/views/home/components/GoodsList";
import {
  detailaction as detailactionApi,
  addcollect as addcollectApi,
  cartList as cartListApi,
  addCart as addCartApi,
  submitAction as submitActionApi
} from "@/api/good/index.js";
export default {
  name: "DetailOfGood",
  components: {
    GoodsList
  },
  data() {
    return {
      id: "",
      attribute: [], //商品规格
      gallery: [], //循环展示商品图片
      issue: [], //运费问题
      goodsList: [], //大家都在看
      titleStyle: "left",
      info: {}, //商品单独信息
      show: false,
      num: 1, //选择数量
      allnumber: "",
      collected: false,
      isOperate: false
    };
  },
  methods: {
    goToCart(){
      this.$router.push('/cart');
    },
    choose() {
      this.show = true;
      this.isOperate = true;
    },
    //获取购物车列表
    getCarCount() {
      cartListApi().then(res => {
        this.allnumber = res.data.length;
        // console.log('获取购物车列表',res);
      });
    },
    //添加收藏
    addStar() {
      addcollectApi({
        goodsId: this.id
      }).then(res => {
        if (res.data == "success") {
          this.collected = !this.collected;
        }
        // console.log('添加爱收藏的结果',res);
      });
    },
    //提交订单
    submitOrder(){
      var allPrise=this.num*this.info.retail_price;
      submitActionApi({
        allPrise:allPrise,//商品总价
        goodsId:this.id//商品id
      })
      .then(res=>{
        // console.log('提交订单',res);
        if(res.data){
           this.$router.push({
            path: "buynow"
          });
        }
      })
    },
    popUp(str) {
      if (!this.show) {
        this.show = !this.show;
        this.isOperate = true;
      } else if (this.isOperate) {
        if (str == "car") {
          addCartApi({
            goodsId: this.id,
            number: this.num
          }).then(res => {
            Toast.allowMultiple();
            Toast.success({
              message: "添加购物车成功!"
              // duration:2000
            });
            // Toast.success("添加购物车成功!");
            this.getCarCount();
            this.show = !this.show;
            this.isOperate = false;
          });
        } else {
          this.show = !this.show;
          this.isOperate = false;
          this.submitOrder();
         
        }
      }
    },
    getDetailOfGood() {
      detailactionApi({
        id: this.id
      }).then(res => {
        // console.log("商品详情", res);
        this.attribute = res.attribute;
        this.gallery = res.gallery;
        this.issue = res.issue;
        this.goodsList = res.productList;
        this.info = res.info;
        // console.log(this.info);
        this.collected = res.collected;
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetailOfGood();
    this.getCarCount();
  },
  watch:{
    '$route'(newValue,oldValue){
       this.id = this.$route.query.id;
    this.getDetailOfGood();
    this.getCarCount();
    }
  }
};
</script>

<style lang="scss" scoped>
.good-footer {
  display: flex;
  position: fixed;
  flex-wrap: nowrap;
  background-color: #fff;
  bottom: 0;
  justify-content: space-around;
  align-items: center;
  z-index: 999999;
  width: 100%;
  height: 60px;
  .icon {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 1px solid gray;
    &:last-child {
      border: none;
    }
    .icon-icon {
      border: 1px solid #ccc;
    }
  }
  .buy {
    padding: 0 10px;
  }
  .add-cart {
    background-color: red;
    color: #fff;
  }
}
.content {
  padding: 16px 16px 0;

  .top {
    width: 100%;
    height: 88px;
    line-height: 40px;
    font-size: 12px;
    img {
      float: left;
      width: 88px;
      height: 100%;
      margin-right: 20px;
    }
    .right {
      float: left;
    }
    .content-price {
      color: #b62d32;
    }
  }
  .num {
    text-align: left;
    span {
      display: block;
      margin: 20px 0;
    }
  }
}
.condition {
  height: 60px;
  width: 100%;
  display: flex;
  .condition-item {
    text-indent: 10px;
    font-size: 12px;
    width: 33.3%;
    line-height: 40px;
    // list-style-type: circle;
    // list-style-position: inside;
    color: #9e9e9e;
    &::before {
      content: "";
      display: inline-block;
      width: 3px;
      height: 3px;
      border: 1px solid #b62d32;
      border-radius: 50%;
      margin-right: 4px;
      vertical-align: middle;
      margin-top: -5px;
    }
  }
}
.info {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  text-align: center;
  margin-bottom: 15px;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .desc {
    font-size: 14px;
    color: #999;
  }
  .price {
    color: #b62d32;
    margin-top: 20px;
    margin-bottom: 25px;
  }
  .base {
    text-align: left;
    color: #333;
    line-height: 40px;
    border-top: 1px solid #ccc;
    .van-cell__right-icon {
      line-height: 40px;
    }
  }
}
.html-imgs {
  width: 100vw;
  p {
    width: 100%;
  }
  ::v-deep img {
    display: block;
    width: 100%;
    // height:100%;
    // object-fit: cover;
  }
}
.good {
  width: 100%;
  .swiper-item {
    width: 100vw;
    height: 376px;
    img {
      display: block;
      width: 100vw;
      height: 100%;
    }
  }
}
::v-deep .van-swipe__indicator {
  background-color: gray;
  width: 6px;
  height: 6px;
}
.all-look {
  width: 100%;
  margin-bottom: 60px;
}
.divider {
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  color: #333;
}
.good-param {
  width: 100%;
  background-color: #fff;
  .title {
    font-size: 20px;
    font-weight: bold;
    text-indent: 20px;
    line-height: 60px;
  }
  .param-box {
    width: 100%;
    padding-bottom: 10px;
    .param-item {
      width: 90vw;
      margin: 0 auto 10px;
      background-color: #f5f5f5;
      line-height: 40px;
      display: flex;
      flex-wrap: nowrap;
      .label {
        white-space: nowrap;
        width: max-content;
        color: #a6a6a6;
        margin-right: 10px;
      }
      .label-value {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.good-copy {
  margin-top: -20px;
}
.issue {
  background-color: #fff;
  padding-bottom: 10px;
  margin-bottom: 40px;
  .issue-box {
    width: 100%;
    .issue-item {
      margin: 0 auto;
      width: 345px;
      padding-left: 10px;
      margin-bottom: 7px;
      .question {
        position: relative;
        font-size: 15px;
        line-height: 15px;
        margin-bottom: 7px;
        &::before {
          position: absolute;
          top: 50%;
          left: -10px;
          transform: translateY(-50%);
          display: block;
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          line-height: 15px;
          background-color: red;
        }
      }
      .answer {
        line-height: 20px;
        color: #787878;
      }
    }
  }
}
</style>