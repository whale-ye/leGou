<template>
  <div>
    <img class="banner" :src="renderData.banner_url" alt />
    <div class="seperate">
      <van-divider
        :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }"
      >{{renderData.name}}分类</van-divider>
    </div>
    <ul class="goods-box">
      <li
        @click="goToHorizontalCategory(item.id)"
        class="good-item"
        v-for="item in renderData.subList"
        :key="item.id"
      >
        <img class="show-img" :src="item.wap_banner_url" alt />
        <p class="title">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { currentaction as currentactionApi } from "@/api/category/index.js";
export default {
  name: "CategoryDetail",
  data() {
    return {
      id: "",
      renderData: {}
    };
  },
  props: {
    idvalue: {
      required: true,
      default: ""
    }
  },
  watch: {
    idvalue(newValue, oldValue) {
      this.id = newValue;
      this.getNavDetailData();
    }
  },
  methods: {
    goToHorizontalCategory(id) {
      this.$router.push({
        path: "/horizontalCategory",
        query: {
          id: id,
          isCategory:true
        }
      });
    },
    // 或者右侧具体数据
    getNavDetailData() {
      currentactionApi({
        id: this.id
      }).then(res => {
        this.renderData = res.data.currentOne;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  display: block;
  width: 261px;
  height: 109px;
}
.seperate {
  width: 150px;
  margin: 24px auto;
}
.goods-box {
  display: flex;
  // width:263px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  .good-item {
    // width: 33%;
    width: 88px;
    height: 88px;
    margin-bottom: 10px;
    text-align: center;
    img {
      display: inline-block;
      width: 60px;
      height: 60px;
    }
    .title {
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>