<template>
  <div>
    <div class="brand-title">
      <div class="banner">
        <img :src="top.app_list_pic_url" alt />
        <div class="title">{{top.name}}</div>
      </div>
      <div class="desc">{{top.simple_desc}}</div>
    </div>
    <GoodsList :goodsList="goodsList"></GoodsList>
  </div>
</template>

<script>
import GoodsList from "@/views/home/components/GoodsList";
import {
  detailaction as detailactionApi,
  listaction as listactionApi
} from "@/api/home/brandDirect/index.js";
export default {
  name: "BrandDirect",
  components: {
    GoodsList
  },
  data() {
    return {
      id: "",
      top: {},
      goodsList: []
    };
  },
  methods: {
    getDetail() {
      detailactionApi({
        id: this.id
      }).then(res => {
        this.top = res.data;
        this.goodsList = res.goodsList;
        console.log(this.top, this.goodsList);
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetail();
  }
};
</script>

<style lang="scss"  scoped>
.brand-title {
  width: 100%;
  height: 250px;
  background-color: #fff;
  margin-bottom: 10px;
  .banner {
    position: relative;
    width: 100%;
    height: 150px;
    text-align: center;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      width: fit-content;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 20px;
      &::after {
        display: block;
        content: "";
        width: 100%;
        height: 2px;
        background-color: #fff;
      }
    }
  }
  .desc {
    padding: 20px 16px;
    color:gray;
    text-align: center;
    font-size: 15px;
  }
}
</style>