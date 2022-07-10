<template>
  <div>
    <!-- 主页面居家好物 -->
    <ul class="good-list" >
      <li @click="goToDetailOfGood(item.id)" :style="{'textAlign':titleStyle}" class="good-item" v-for="item in goodsList" :key="item.id">
        <img :src="item.list_pic_url" alt="图片加载失败" />
        <p  class="name">{{item.name}}</p>
        <p class="price">¥{{item.retail_price}}</p>
      </li>
        <slot></slot>
    </ul>
    <div class="no-good" v-if="isShow">
      数据库还未添加此类商品...
    </div>
    
  </div>
</template>

<script>
export default {
  name: "GoodList",
  props: {
    goodsList: {
      default: function() {
        return [];
      }
    },
    titleStyle:{
        default:'center'
    }
  },
  data() {
    return {
      isShow:false
    };
  },
  created() {
  },
  methods: {
    goToDetailOfGood(id){
      this.$router.push({
        name:'detailOfGood',
        query:{
          id
        }
      })
    }
  },
  watch:{
    goodsList(newValue,oldValue){
      if(!newValue.length){
        this.isShow=true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//好物合集
.nice-good {
  .title {
    text-align: center;
    line-height: 60px;
  }
  
}
.good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .good-item {
      box-sizing: border-box;
      width: 180px;
      height: 235px;
      margin-left: 5px;
      margin-bottom: 5px;
      background-color: #fff;
      img {
        display: block;
        margin:0 auto;
        width: 150px;
        height: 150px;
        object-fit: contain;
      }
      .name {
        text-indent: 10px;
        font-size: 12px;
        font-weight: bolder;
        margin-bottom: 10px;
      }
      .price {
        text-indent: 10px;
        color: #9c3232;
      }
      .more {
        text-align: center;
        margin: 30px 0;
      }
      .more-img {
        display: block;
        width: 35px;
        height: 35px;
        margin: 0 auto;
      }
    }
  }

.no-good{
  color:gray;
  height:100px;
  font-size: 14px;
  line-height: 100px;
  text-align: center;
}


</style>