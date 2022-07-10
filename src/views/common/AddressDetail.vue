<template>
  <div>
    <div class="address">
      <van-icon v-if="icon=='records'" @click.self.stop="goToMiodifyAddress" class="icon1" :style="{color:color}" name="records" />
      <van-icon  class="icon1" :style="{color:color}" v-if="icon=='arrow'" name="arrow" />
      <div class="name-box">
        <div class="name">{{address.name}}</div>
        <div class="is-default" v-if="address.is_default">默认</div>
      </div>
      <div class="address-detail">
        <div class="mobile">{{address.mobile}}</div>
        <div class="address-info">{{address.address}}{{address.address_detail}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressDetail",
  props: {
    address: {
      default: function() {
        return {
          icon:''
        };
      }
    },
    name: {
      default: "records"
    },
    color: {
      default: "#333"
    }
  },
  methods: {
    goToMiodifyAddress() {
      // console.log(this.address);
      if (this.name == "records") {
        this.$router.push({
          path: '/newaddress',
          query:{
            address:JSON.stringify(this.address),
            ifDelete:true
          }
        });
      }
    }
  },
  created() {
    
    this.icon=this.name;
  }
};
</script>

<style lang="scss"  scoped>
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
    font-size: 12px;
    width: 220px;
    .mobile {
      font-weight: bold;
    }
    .address-info {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-top: 3px;
      color: gray;
    }
  }
  .icon1 {
    position: absolute;
    font-size: 25px;
    right: 30px;
    color: #ccc;
    top: 50%;
    padding:0 10px;
    height:105px;
    line-height: 105px;
    transform: translateY(-50%);
  }
}
</style>