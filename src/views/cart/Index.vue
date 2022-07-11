<template>
  <div>
    <!-- 30天退款 -->
    <ul class="condition">
      <li class="condition-item">20天无忧退款</li>
      <li class="condition-item">48小时快速退款</li>
      <li class="condition-item">满88元免邮券</li>
    </ul>
    <ul class="list">
      <van-swipe-cell class="swiper-cell" v-for="item in cartList" :key="item.id">
        <van-cell :border="false" />
        <li class="item">
          <input v-model="item.singleCheck" :id="item.id" type="checkbox" />
          <label class="label" :for="item.id"></label>
          <div class="center">
            <img :src="item.list_pic_url" alt />
            <div class="info">
              <div class="desc">{{item.goods_name}}</div>
              <div class="price">¥&nbsp;{{item.retail_price}}</div>
            </div>
          </div>
          <div class="num">X{{item.number}}</div>
        </li>
        <template #right>
          <van-button @click="deleteCart(item.id)" square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </ul>
    <div class="pay">
      <div class="choose-box">
        <input v-model="isAllCheck" id="choose" type="checkbox" />
        <label class="label" for="choose"></label>
        <span>全选</span>
      </div>
      <div class="pay-box">
        <div class="price">¥&nbsp;{{allInTo}}</div>
        <div @click="submitOrder" class="pay-now">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  cartList as cartListApi,
  deleteAction as deleteActionApi,
  submitAction as submitActionApi
} from "@/api/good/index.js";

export default {
  name: "Cart",
  data() {
    return {
      cartList: [],
      beforeList: []
    };
  },
  computed: {
    //计算总价
    allInTo() {
      return this.cartList.reduce((all, item) => {
        if (item.singleCheck) {
          return all + item.number * item.retail_price;
        } else {
          return all;
        }
      }, 0);
    },
    //全选与反选
    isAllCheck: {
      get() {
        return this.cartList.every(item => item.singleCheck);
      },
      set(value) {
        this.cartList.forEach(item => {
          item.singleCheck = value;
        });
      }
    }
  },
  methods: {
    //删除商品
    deleteCart(id) {
      deleteActionApi({ id }).then(res => {
        this.getCarList();
      });
    },
    //提交订单
    submitOrder() {
      var allPrise = this.allInTo;
      var goodsId = "";
      var chooseList = this.cartList.filter(item => item.singleCheck);
      chooseList.forEach(item => {
        goodsId = goodsId + "," + item.goods_id;
      });
      goodsId = goodsId.slice(1);
      submitActionApi({
        allPrise: allPrise, //商品总价
        goodsId: goodsId //商品id
      }).then(res => {
        // console.log('提交订单',res);
        if (res.data) {
          this.$router.push({
            path: "buynow"
          });
        }
      });
    },
    //获取购物车列表
    getCarList() {
      cartListApi().then(res => {
        res.data.forEach(el => {
          el.singleCheck = false;
        });
        this.cartList = res.data;
      });
    }
  },
  created() {
    this.getCarList();
  }
};
</script>

<style lang="scss"  scoped>
.swiper-cell {
  // height: 96px;
  padding-top: -0.73333rem 0;
  border-bottom: 1px solid #ccc;
}
::v-deep .van-button {
  margin-top: 10px;
  height: 100%;

  // height:96px;
}
input {
  display: block;
  width: 20px;
  height: 100%;
  display: none;
}
.label {
  position: relative;
  width: 20px;
  height: 20px;
  visibility: hidden;
  &::after {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    content: "";
    border-radius: 50%;
    visibility: visible;
    border: 1px solid #ccc;
  }
}
input:checked + label::after {
  font-family: "iconfont" !important;
  background-color: #b4282d;
  color: #fff;
  text-align: center;
  content: "\e610";
}
.pay {
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  bottom: 50px;
  box-sizing: border-box;
  padding-left: 15px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  .choose-box {
    line-height: 50px;
    span {
      display: inline-block;
      line-height: 50px;
      vertical-align: -3px;
    }
    .label {
      width: 20px;
      height: 20px;
      color: #fff;
      // text-align: center;
      line-height: 20px;
      margin-right: 30px;
    }
  }
  .pay-box {
    line-height: 50px;
    .price {
      display: inline-block;
      margin-right: 20px;
      color: #b4282d;
    }
    .pay-now {
      display: inline-block;

      width: 100px;
      color: #fff;
      text-align: center;
      background-color: #b4282d;
    }
  }
}

.list {
  // overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px 0;
  background-color: #fff;
  .item {
    display: flex;
    // margin-top: 10px;
    width: 100%;
    // height: 96px;
    align-items: center;
    flex-wrap: nowrap;
    &:last-child {
      border: none;
    }
    .center {
      display: flex;
      flex-wrap: nowrap;
      flex: 1;
      align-items: center;
      img {
        display: block;
        margin-left: 15px;
        width: 63px;
        height: 63px;
      }
      .info {
        flex: 1;
        font-size: 12px;
        line-height: 30px;
        background-color: #fff;
      }
    }
    .num {
      width: 90px;
      line-height: 96px;
      text-align: center;
    }
  }
}
.condition {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .condition-item {
    text-indent: 10px;
    font-size: 12px;
    // width: 33.3%;
    line-height: 60px;
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
</style>