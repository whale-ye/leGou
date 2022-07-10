<template>
  <div>
    <div class="nav-operate">
      <div
        @click="handlerOperate(index)"
        class="nav-item"
        v-for="(item,index) in navList"
        :key="item.name"
      >
        <div :class="current==index?'active':''" class="title">{{item.name}}</div>
        <div class="arrow" v-if="item.name=='价格'">
          <van-icon
            @click.stop="changeStatus('up')"
            :color="status=='up'?'red':'' "
            class="arrow-item"
            name="arrow-up"
          />
          <van-icon
            @click.stop="changeStatus('down')"
            :color="status=='down'?'red':'' "
            class="arrow-item"
            name="arrow-down"
          />
        </div>
      </div>
    </div>
    <ul class="goods">
      <li @click="goToDetailOfGood(item.id)" class="goods-item" v-for="item in goodsList" :key="item.id">
        <img :src="item.list_pic_url" alt />
        <p class="title">{{title==''?item.name:item.goods_brief}}</p>
        <p class="price">¥{{item.retail_price}}</p>
      </li>
      <li class="goods-item" v-if="goodsList.length%2"></li>
    </ul>
  </div>
</template>

<script>
import { goodsList as goodsListApi } from "@/api/home/newGoods/index.js";
import { helperaction as helperactionApi } from "@/api/home/search";
export default {
  name: "NewGoods",
  props: {
    title: {
      // type:'String',
      // required:true,
      default: ""
    },
    keywordDetail: {
      default: ""
    }
  },
  data() {
    return {
      current: 0,
      status: "default",
      order: "",
      isHot: "",
      isNew: "",
      goodsList: [],
      navList: [
        {
          name: "综合"
        },
        {
          name: "价格"
        },
        {
          name: "分类"
        }
      ]
    };
  },
  methods: {
     goToDetailOfGood(id){
      this.$router.push({
        name:'detailOfGood',
        query:{
          id
        }
      })
    },
    getNewGoods() {
      if (this.title) {
        goodsListApi({
          isHot: this.isHot,
          isNew: this.isNew,
          order: this.order
        }).then(res => {
          this.goodsList = res.data;
        });
        return;
      }
      if (this.keywordDetail) {
        helperactionApi({
          keyword: this.keywordDetail,
          order: this.order
        }).then(res => {
          this.goodsList = res.keywords;
        });
        return;
      }
    },
    changeStatus(status) {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
      this.status = status;
      if (this.status == "up") {
        this.order = "asc";
      } else if (this.status == "down" && this.current == 1) {
        this.order = "desc";
      } else {
        this.order = "asc";
        this.status = "up";
        this.current = 1;
      }
      this.getNewGoods();
    },
    handlerOperate(index) {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
      this.current = index;
      if (this.current == 1) {
        this.status = "up";
        this.order = "asc";
      } else {
        this.status = "default";
        this.order = "";
      }
      this.getNewGoods();
    }
  },
  created() {
    if (this.title.length) {
      if (this.title == "hot") {
        this.isHot = "1";
      } else if (this.title == "new") {
        this.isNew = "1";
      }
    }
    this.getNewGoods();
  }
};
</script>

<style lang="scss" scoped>
.pic-show {
  display: block;
  width: 100%;
  height: auto;
}
.nav-operate {
  position: sticky;
  top: 50px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: nowrap;
  margin-bottom: 5px;
  .nav-item {
    width: 33.3%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: nowrap;
    line-height: 40px;
    .arrow {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      flex-wrap: nowrap;
      .arrow-item {
        margin-left: 2px;
        font-size: 14px;
        &:last-child {
          margin-top: -6px;
        }
      }
    }
  }
}
.nav-operate {
  .active {
    color: #ba393d;
  }
}
.goods {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  background-color: #f5f5f5;
  .goods-item {
    width: 49.5%;
    height: 240px;
    text-align: center;
    margin-top: 5px;
    background-color: #fff;
    img {
      display: inline-block;
      width: 150px;
      height: 150px;
      object-fit: contain;
    }
    .title {
      width: 100%;
      font-size: 15px;
      font-weight: bolder;
      margin-bottom: 15px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: #ba393d;
    }
  }
}
</style>