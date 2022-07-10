
<template>
  <div>
      <img
      class="pic-show"
      src="http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png"
      alt
    />
    <SortGood :title="title"></SortGood>
  </div>
</template>

<script>
import SortGood from '@/views/home/components/SortGood'
export default {
  name:'NewGoods',
  data(){
    return{
      title:''
    }
  },
  components:{
    SortGood
  },
  created() {
    this.title = this.$route.query.title;
  },
}
</script>

<style lang="scss" scoped>
.pic-show{
  display: block;
  width: 100%;;
  height: auto;
}
</style>
 