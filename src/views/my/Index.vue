<template>
  <div>
    <div class="user-info">
      <img src="@/assets/img/images/whale.jpg" alt="">
      <span>用户名</span>
    </div>
    <table >
      <tr>
        <td>我的订单</td>
        <td>优惠券</td>
        <td class="last-td">我的足迹</td>
      </tr>
      <tr>
        <td @click="goToCollect">我的收藏</td>
        <td @click="goToChooseAddress">地址管理</td>
        <td class="last-td">联系客服</td>
      </tr>
      <tr class="last-row">
        <td>帮助中心</td>
        <td @click="goToComment">意见反馈</td>
        <td class="last-td"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
    name:'My',
    data(){
      return {

      }
    },
    methods: {
      
      goToComment(){
        this.$router.push('/comment')
      },
      goToCollect(){
        this.$router.push('/collect')
      },
      goToChooseAddress(){
        this.$router.push('/chooseaddress')
      }
    },
}
</script>
<style lang="scss" scoped>
//头像栏目
.user-info{
  overflow: hidden;
  background: rgb(51,51,51);
  height:142px;
  width:100%;
  line-height: 142px;
  img{
    display: inline-block;
    width: 76px;
    height:76px;
    border-radius: 50%;
    margin:33px 14px;
    vertical-align: middle;
  }
  span{
    color:#fff;
    font-size: 14px;
    font-weight: bolder;
    font-size: 14px;
  }
}
//用户信息详情
table{
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  border:0 solid #ccc;
  background-color: #fff;
  tr{
    width: 100%;
  }
  td{
    width:33.3%;
    height:72px;
    line-height: 72px;
    font-size: 12px;
    border-left:0;
    border-top:0;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .last-td{
    border-right:0;
  }
  .last-row td{
    border-bottom:0;
  }
}
</style>