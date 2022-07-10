<template>
  <div class="category clearfix">
    <router-link to="/search" class="search-container">
      <button class="search">
        <van-icon class="search-icon" name="search" />商品搜索共239款好物
      </button>
    </router-link>
    <van-sidebar class="sidebar" v-model="activeKey">
      <van-sidebar-item
        class="sidebar-item"
        @click="changeIndex(item.id)"
        v-for="item in navList"
        :key="item.id"
        :title="item.name"
      />
    </van-sidebar>
    <div class="content">
      <CategoryDetail :idvalue="idvalue"></CategoryDetail>
    </div>
  </div>
</template>

<script>
import CategoryDetail from "@/views/category/components/CategoryDetail";
import { indexaction as indexactionApi } from "@/api/category/index.js";
export default {
  name: "Category",
  components: {
    CategoryDetail
  },
  data() {
    return {
      activeKey: 0,
      navList: [],
      idvalue: "",
      backId: ""
      // componentId: ""
    };
  },
  methods: {
    //获取左侧导航栏项目
    getNavList() {
      indexactionApi().then(res => {
        this.navList = res.categoryList;
        // console.log('this.idvalue初始值',this.idvalue);
        if(this.backId.length!=0){
          this.idvalue=this.backId;
        }else if (!this.idvalue.length) {
          this.idvalue = res.categoryList[0].id;
          // console.log('idvalue',this.idvalue);
        }
      });
    },
    

    changeIndex(id) {
      this.idvalue = id;
      console.log(this.activeKey);
      // console.log("this.idvalue", this.idvalue);
    }
  },
  created() {
    this.getNavList();
  },
  beforeRouteEnter(to, from, next) {
    // console.log('进去',from,to);
    if(from.meta.idvalue!=undefined&&from.path=='/horizontalCategory'){
      next(vm=>{
        vm.backId=from.meta.idvalue;
        vm.activeKey=from.meta.activeKey;
      })
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    // console.log('离开',from,to);

    to.meta.idvalue = this.idvalue;
    to.meta.activeKey=this.activeKey;
    next();
  }
};
</script>
<style lang="scss" scoped>
.category {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  padding-top: 36px;
  .search-container {
    position: fixed;
    widows: 100%;
    height: 26px;
    top: 0;
    z-index: 10;
    background-color: #fff;
    &::after {
      display: block;
      content: "";
      width: 100vw;
      height: 1px;
      background-color: #ccc;
    }
    .search {
      width: 345px;
      height: 26px;
      line-height: 26px;
      background-color: #f5f5f5;
      text-align: center;
      border-radius: 10px;
      margin: 8px 15px;
      border: none;

      .search-icon {
        font-size: 16px;
      }
    }
  }
  .sidebar {
    float: left;
    margin-top: 10px;
    width: 82px;
    .sidebar-item {
      position: relative;
      width: 100%;
      height: 40px;
      padding: 0;
      text-align: center;
      line-height: 40px;
      font-size: 12px;
      background-color: #fff;
    }
    .van-sidebar-item--select {
      color: rgb(171, 43, 43);
      font-size: 18px;
      &::before {
        top: 0;
        height: 40px;
        transform: translateY(0);
      }
    }
  }
  .content {
    left: 92px;
    float: right;
    margin-top: 10px;
    width: calc(100% - 82px);
    height: 100vh;
  }
}
</style>