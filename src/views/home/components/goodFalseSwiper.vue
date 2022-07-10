<template>
  <div>
    <ul class="list">
      <li @click="goToDetailOfGood(item.id)" class="list-item" v-for="item in list" :key="item.id">
        <img :src="item.list_pic_url" alt />
        <p class="title">{{item.name}}</p>
        <p class="desc">{{item.goods_brief}}</p>
        <p class="price">¥ {{item.retail_price}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "goodFalseSwiper",
  props: {
    list: {
      type: Array,
      require: true,
      default: []
    }
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
};
</script>

<style  lang="scss" scoped>
.list {
  display: flex;
  overflow: auto;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  .list-item {
    position: relative;
    width: 120px;
    margin: 0.06667rem 0 0.06667rem 0.33333rem;
    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      height: 85%;
      width: 1px;
      background-color: #f4f4f4;
    }
    &:first-child::before {
      background-color: #fff;
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .title {
      text-indent: 1em;
      font-size: 0.4rem;
      font-weight: bolder;
    }
    .desc {
      text-indent: 1em;
      color: #8a8a8a;
      margin: 16px 0;
    }
    .price {
      text-indent: 1em;
      color: #bf7a7a;
      margin-bottom: 20px;
    }
  }
}
</style>