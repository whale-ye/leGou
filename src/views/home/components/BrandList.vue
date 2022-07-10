<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="啦啦啦,我也是有底线的..." @load="onLoad">
      <ul class="brand-list">
        <li @click="goToBrandDirect(item.id)" class="brand-item" v-for="item in brandList" :key="item.id">
          <img :src="item.app_list_pic_url" alt />
          <p class="desc">
            {{item.name}}
            <span>|</span>
            {{item.floor_price}}元起
          </p>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { listaction as listactionApi } from "@/api/home/brandDirect/index.js";
export default {
  name: "BrandList",
  data() {
    return {
      page: 1,
      brandList: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    goToBrandDirect(id){
        console.log(id);
        this.$router.push({
            path:'/brandDirect',
            query:{
                id
            }
        })
    },
    onLoad() {
      // 异步更新数据
      this.getBrandList()
      //滚动到底部的时候触发加载,loading为真,加载完毕一次后把loading设置为false
        //this.finished = true;数据全部加载完毕时候赋值为真
    },
    getBrandList() {
      listactionApi({
        page: this.page
      }).then(res => {
        // console.log("商标列表", res);
        this.brandList.push(...res.data);
        this.loading = false;
        this.page++;
        if(this.page>res.total){
            this.finished = true;
        }
      });
    }
  },
  created() {
    // this.getBrandList();
  }
};
</script>

<style lang="scss" scoped>
.brand-list {
  background-color: #fff;
  width: 100%;
  .brand-item {
    position: relative;
    width: 100%;
    height: 210px;
    margin-bottom: 2px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .desc{
        position: absolute;
        top: 50%;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 20px;
        font-weight: bold;
        transform: translateY(-50%);
        color:#fff;
    }
  }
}
</style>