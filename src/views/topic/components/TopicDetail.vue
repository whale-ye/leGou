<template>
  <div>
    <div class="detail-imgs" v-html="contentHtml"></div>
    <div class="topic-detail">
        <div class="title">专题推荐</div>
        <ul class="topic-list">
            <li v-for="item in recommendList" :key="item.id" class="topic-item">
                <img :src="item.scene_pic_url" alt="">
                <p class="desc">{{item.title}}</p>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import {detailaction as detailactionApi} from '@/api/topic/index.js'
export default {
    name:'TopicDetail',
    data(){
        return {
            id:'',
            contentHtml:'',
            recommendList:[]
        }
    },
    methods: {
        getDetail(){
            detailactionApi({
                id:this.id
            })
            .then(res=>{
                // console.log('专题详情数据',res);
                this.contentHtml=res.data.content;
                this.recommendList=res.recommendList;
            })
        }
    },
    created(){
        this.id=this.$route.query.id;
        this.getDetail();
        
    }
}
</script>
<style lang="scss"  scoped>
.detail-imgs{
   ::v-deep img{
        width:100%;
    }
}
.topic-detail{
    width: 100%;
    height:100vh;
    background-color: #f5f5f5;
    .title{
        width:100%;
        height:60px;
        line-height: 60px;
        text-align: center;
        color:gray;
    }
    .topic-list{
        width: 100%;;
        .topic-item{
            box-sizing: border-box;
            width: 95%;
            // height: 250px;
            background-color: #fff;
            margin:0 auto 20px;
            padding:10px;
            img{
                display: block;
                width: 100%;
                height:200px;
            }
            .desc{
                margin-top: 10px;
                font-size: 14px;
                margin-bottom: 10px;;
            }
        }
    }
}

</style>