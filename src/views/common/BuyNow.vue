<template>
  <div>
    <!-- 条纹 -->
    <div class="stripe"></div>
    <AddressDetail
    v-if="!noAddress"
      :name="'arrow'"
      :color="'#ccc'"
      :address="address"
      @click.native="goToChooseAddress"
    ></AddressDetail>
    <div @click="addNewAddress" v-else class="no-address"> 当前还还没地址,赶快来添加吧</div>
    <div class="all-info">
      <div class="all-item">
        <div class="label">商品合计</div>
        <div class="info">¥{{allPrise}}</div>
      </div>
      <div class="all-item">
        <div class="label">运费</div>
        <div class="info">免运费</div>
      </div>
      <div class="all-item">
        <div class="label">优惠券</div>
        <div class="info">暂无</div>
      </div>
    </div>

    <ul class="good-list">
      <li class="good-items" v-for="item in goodsList" :key="item.id">
        <img :src="item.list_pic_url" alt />
        <div class="left">
          <p>{{item.goods_name}}</p>
          <p>¥{{item.retail_price}}</p>
        </div>
        <div class="right">X{{item.number}}</div>
      </li>
    </ul>

    <div class="pay-footer">
      <div class="real-pay">实付: &nbsp; ¥{{allPrise}}</div>
      <div @click="goToPay" class="pay">支付</div>
    </div>
  </div>
</template>

<script>
import AddressDetail from "@/views/common/AddressDetail";
import { Toast } from "vant";
import {
  detailAction as detailActionApi,
  deleteAction as deleteActionApi,
  cartList as cartListApi
} from "@/api/good/index.js";
export default {
  name: "BuyNow",
  components: {
    AddressDetail
  },
  data() {
    return {
      addressId: "",
      address: {},
      goodsList: [],
      allPrise: "",
      carList: [],
      backAddress: "",
      noAddress:false
    };
  },
  methods: {
    addNewAddress(){
      // this.$router.push('/newaddress');
      this.$router.push({
        path:'/newaddress',
        ifDelete:false
      });
    },
    //获取购物车列表
    getCarCount() {
      cartListApi().then(res => {
        this.allnumber = res.data.length;
        this.carList = res.data;
      });
    },

    goToChooseAddress() {
      this.$router.push({
        path: "/chooseaddress"
      });
    },
    //删除购物车商品
    deleteCarGood(id) {
      return deleteActionApi({
        id: id
      });
    },
    //点击支付
    goToPay() {
      var toastPay = Toast({
        message: "当前支付功能尚未开发,\n敬请期待哟",
        duration: 2000
      });
      // console.log('购物车商品',this.carList);
      var carId = [];
      this.carList.forEach(item => {
        carId.push(item.id);
      });
      // Toast.allowMultiple();
      for (let i = 0; i < this.goodsList.length; i++) {
        let item = this.goodsList[i];
        if (carId.includes(item.id)) {
          deleteActionApi({
            id: item.id
          });
          // console.log('删除结果',res);
        }
      }
    },
    getOrderDetail() {
      detailActionApi({
        addressId: this.addressId
      }).then(res => {
        if(this.backAddress){
          this.address=JSON.parse(this.backAddress);
          // console.log('返回地址',this.address);
        }else{
          this.address = res.address;
          // console.log('正常地址',this.address);
        }
        // console.log('地址显示',this.address);
        if(this.address.id==undefined){
          this.noAddress=true;
        }
        this.goodsList = res.goodsList;
        // console.log('订单商品',this.goodsList);
        this.allPrise = res.allPrise;
        this.getCarCount();
      });
    }
  },
 
  mounted() {
    this.backAddress=localStorage.getItem('address');
    this.getOrderDetail();
  },
  beforeRouteLeave (to, from, next) {
    localStorage.setItem('address','')
    next()
  }
};
</script>

<style lang="scss" scoped>
.no-address{
  width: 100%;
  height:110px;
  background-color: #fff;
  line-height: 110px;
  text-align: center;
}
.stripe {
  margin-top: 50px;
  width: 100%;
  height: 20px;
  background: url(@/assets/img/images/address-bg-bd.png) repeat-x;
  background-size: 20% 20px;
}
.address {
  position: relative;
  padding: 25px 15px 20px;
  display: flex;
  height: 65px;
  background-color: #fff;
  .name-box {
    width: 20%;
    line-height: 25px;
    text-align: center;
    .is-default {
      display: inline-block;
      width: fit-content;
      color: #c34948;
      padding: 0 5px;
      border: 1px solid #c34948;
    }
  }
  .address-detail {
    line-height: 25px;
    .mobile {
      font-weight: bold;
    }
    .address-info {
      margin-top: 3px;
      color: gray;
    }
  }
  .icon {
    position: absolute;
    font-size: 25px;
    right: 30px;
    color: #ccc;
    top: 50%;
    transform: translateY(-50%);
  }
}
.all-info {
  width: 100%;
  background-color: #fff;
  margin: 15px 0;
  .all-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100vw;
    background-color: #fff;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    .label {
      padding-left: 15px;
      width: fit-content;
    }
    .info {
      width: fit-content;
      padding-right: 15px;
    }
  }
}
.good-list {
  width: 100%;
  background-color: #fff;
  .good-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 96px;
    line-height: 30px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border: none;
    }
    img {
      display: block;
      width: 62px;
      height: 62px;
    }
    .left {
      flex: 1;
    }
    .right {
      padding-right: 15px;
    }
  }
}
.pay-footer {
  display: flex;
  position: fixed;
  box-sizing: border-box;
  padding-left: 15px;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  .pay {
    color: #fff;
    background-color: #b4282d;
    text-align: center;
    padding: 0 40px;
    font-size: 16px;
  }
}
</style>