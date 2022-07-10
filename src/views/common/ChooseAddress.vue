<template>
  <div class="choose-address">
    <AddressDetail
      @click.native.once="goToBuyNow(item)"
      class="address-box"
      :address="item"
      v-for="item in addressList"
      :key="item.id"
    ></AddressDetail>
    <div class="add">
      <div @click="addAddress" class="info">+新建地址</div>
    </div>
  </div>
</template>

<script>
import AddressDetail from "@/views/common/AddressDetail";
import { getListAction as getListActionApi } from "@/api/good/index.js";
export default {
  name: "ChooseAddress",
  components: {
    AddressDetail
  },
  data() {
    return {
      addressList: [],
      address: {},
    };
  },
  methods: {
    //新建地址
    addAddress() {
      this.$router.push({
        path:'/newaddress',
        query:{
          ifDelete:false
        }
      });
    },
    goToBuyNow(item) {
      this.address = JSON.stringify(item);
      localStorage.setItem("address", this.address);
      this.$router.back();
    },
    getAddressList() {
      getListActionApi().then(res => {
        this.addressList = res.data;
      });
    }
  },
  mounted() {
    this.getAddressList();
  },

};
</script>

<style lang="scss" scoped>
.choose-address {
  padding-bottom: 70px;
}
.address-box {
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }
}
.add {
  position: fixed;
  box-sizing: border-box;
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding: 20px 25px;
  background-color: #fff;
  .info {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #c35256;
    border: 1px solid #c35256;
  }
}
</style>