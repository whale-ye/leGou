<template>
  <div class="horizontal">
    <van-tabs v-model="active" @click="onClick" class="top-nav">
      <van-tab v-for="item in navList" :key="item.id" :title="item.name"></van-tab>
    </van-tabs>
    <!-- <div v-for="item in navList" :key="item.id"> -->
    <div class="title-container">
      <div class="title">{{currentNav.name}}</div>
      <div class="desc">{{currentNav.front_desc}}</div>
    </div>
    <GoodsList :goodsList="goodsList"></GoodsList>
    <!-- </div> -->
  </div>
</template>

<script>
import GoodsList from "@/views/home/components/GoodsList";
import {
  indexaction as indexactionApi,
  currentaction as currentactionApi,
  goodsList as goodsListApi,
  categoryNav as categoryNavApi
} from "@/api/category/index.js";

export default {
  name: "HorizontalCategory",
  components: {
    GoodsList
  },
  data() {
    return {
      id: "",
      navList: [],
      goodsList: [],
      currentNav: {},
      active: 0,
      isCategory: false,
      navId: "", //从分类页面传过来的id
      backActive:'',
      backId:''
    };
  },
  methods: {
    onClick(name, title) {
      // console.log(name,title);
      //name为tab导航栏的索引下标
      // console.log("active", this.active);
      this.id = this.navList[name].id;
      window.scroll({
        top: 0
      });
      this.getNav();
    },
    //获取左侧导航栏项目
    getNavList() {
      if(this.backId.length!=0){
        this.id=this.backId;
      }
      if (!this.isCategory) {
        indexactionApi().then(res => {
          this.navList = res.categoryList;
          var index = this.navList.findIndex(el => el.id == this.id);
          this.active = index;
          // console.log("导航栏数据", this.navList);
        });
      } else {
        categoryNavApi({
          id: this.navId
        }).then(res => {
          this.navList = res.navData;
          var index = this.navList.findIndex(el => el.id == this.navId);
          this.active = index;
          // console.log("导航栏数据", this.navList);
        });
      }
    },
    //尝试获得导航
    getNav() {
      goodsListApi({
        categoryId: this.id
      }).then(res => {
        this.currentNav = res.currentNav;
        this.goodsList = res.data;
      });
    }
  },
  mounted() {
    
    if(this.backId.length!=0){
      this.id=this.backId;
    }else{
      this.id = this.$route.query.id;
    }
    this.navId = this.id;

    if ("isCategory" in this.$route.query) {
      this.isCategory = true;
    }
    this.getNavList();
    this.getNav();
  },
  beforeRouteEnter(to, from, next) {
    if(to.meta.backId!=undefined&&from.path=='/detailofgood'){
      next(vm=>{
        vm.backId=to.meta.backId;
      })
    }else{
      next(vm=>{
        vm.backId='';
      })
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    from.meta.backId = this.id;
    next();
  }
};
</script>

<style lang="scss" scoped>
.horizontal {
  .title-container {
    overflow: hidden;
    margin-top: 20px;
    background-color: #fff;
    text-align: center;
    height: 100px;
    margin-bottom: 4px;
    .title {
      margin: 32px 0 16px;
      font-size: 14px;
      line-height: 14px;
      font-weight: bold;
    }
    .desc {
      font-size: 12px;
      color: gray;
    }
  }
}
.top-nav {
  position: sticky;
  top: 50px;
}
</style>