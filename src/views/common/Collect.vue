<template>
  <div>
    <div class="collection-title">我的收藏</div>
    <GoodsList :goodsList="goodsList"></GoodsList>
    
  </div>
</template>

<script>
import { listAction as listActionApi } from "@/api/good/index.js";
import GoodsList from '@/views/home/components/GoodsList'
export default {
    name:'CollectGoods',
    components:{
        GoodsList
    },
    data(){
        return{
            goodsList:[]
        }
    },
    methods: {
        getCollectList(){
            listActionApi().then(res=>{
                this.goodsList=res.collectGoodsList;
                console.log('获取收藏列表',this.goodsList);
            })
        }
    },
    created() {
        this.getCollectList();
    },
}
</script>

<style lang="scss" scoped>
.collection-title{
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #fff;
    margin-bottom: 5px;
}

</style>