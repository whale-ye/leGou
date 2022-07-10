<template>
  <div>
    <div class="add-address">
      <ul class="list">
        <li class="li-item">
          <input v-model="userName" type="text" placeholder="姓名" />
        </li>
        <li class="li-item">
          <input v-model="telNumber" type="text" placeholder="手机号" />
        </li>
        <li @click="show=true" class="li-item">
          <input v-model="addressInput" disabled type="text" placeholder="省份、城市、区县" />
        </li>
        <li class="li-item">
          <!-- <van-area title="详细地址、如楼道、楼盘号等" :area-list="areaList" /> -->
          <input v-model="detailadress" type="text" placeholder="详细地址、如楼道、楼盘号等" />
        </li>
        <li class="li-item">
          <input v-model="checked" id="is-default" type="checkbox" />
          <label for="is-default">
            <span>设置为默认地址</span>
          </label>
        </li>
      </ul>
    </div>

    <van-popup position="bottom" v-model="show" :style="{ height: '40%' }">
      <div class="content">
        <van-area @confirm="confirmAddress" title="标题" :area-list="areaList" />
      </div>
    </van-popup>
    <div @click="deleteAddress" v-if="ifDelete=='true'"  class="delete-address">删除</div>
    <div @click="saveAddress" class="save">保存</div>
  </div>
</template>

<script>
// import {Toast} from 'vant'
import { areaList } from "@vant/area-data";
import { saveAction as saveActionApi,deleteActionOfAddress as deleteActionOfAddressApi } from "@/api/good/index.js";

export default {
  name: "newAddress",
 
  data() {
    return {
      show: false,
      areaList,
      userName: "",
      telNumber: "",
      detailadress: "",
      checked: false,
      addressId: "",
      address: "",
      addressInput: "",
      passAddress: {},
      ifDelete:false
    };
  },
  methods: {
    deleteAddress(){
      deleteActionOfAddressApi({
        id:this.addressId
      })
      .then(res=>{
        this.$router.back();
      })
    },
    confirmAddress(arr) {
      console.log("地址信息", arr);
      this.show = false;
      this.addressInput = arr[0].name + " " + arr[1].name + " " + arr[2].name;
    },
    saveAddress() {
      saveActionApi({
        address: this.address,
        addressId: this.addressId,
        checked: this.checked,
        detailadress: this.detailadress,
        telNumber: this.telNumber,
        userName: this.userName
      }).then(res => {
        // console.log("保存地址结果", res);
        this.$router.back();
      });
    }
  },
  created() {
    this.ifDelete=this.$route.query.ifDelete;

    // console.log(this.$route.query.address);
    if (this.$route.query.address) {
      var info = JSON.parse(this.$route.query.address);
      this.userName = info.name;
      this.telNumber = info.mobile;
      this.detailadress = info.address_detail;
      this.checked = info.is_default ? true : false;
      this.addressId = info.id;
      this.addressInput = info.address;
      // console.log(this.addressInput);
    }

  }
};
</script>

<style lang="scss" scoped>
.add-address {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0 15px;
  background-color: #fff;
  .list {
    width: 100%;
    .li-item {
      height: 65px;
      line-height: 65px;
      border-bottom: 1px solid #ccc;
      &:last-child {
        border: none;
      }
      input {
        display: inline-block;
        width: 100%;
        border: none;
        text-indent: 10px;
        &::placeholder {
          color: #ccc;
        }
      }
      input:disabled {
        background-color: #fff;
      }
      input[type="checkbox"] {
        width: 20px;
        height: 20px;
        visibility: hidden;
      }
      input[type="checkbox"]:checked + label:before {
        background-color: #b4282d;
        content: "√";
        color: #fff;
      }
      label {
        position: relative;
        font-size: 14px;
        width: 100%;
        height: 100%;
        line-height: 65px;
        span {
          margin-left: 20px;
        }
        &::before {
          display: inline-block;
          position: absolute;
          content: "";
          left: -15px;
          top: -5px;
          line-height: 20px;
          font-size: 20px;
          width: 20px;
          height: 20px;
          border: 2px solid #ccc;
        }
      }
    }
  }
}
.save {
  position: fixed;
  bottom: 0;
  background-color: #b4282d;
  color: #fff;
  width: 100%;
  height: 60px;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
}
.delete-address{
  position: fixed;
  bottom: 70px;
  background-color: #b4282d;
  color: #fff;
  width: 100%;
  height: 60px;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
}
</style>