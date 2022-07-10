<template>
  <div>
    <div class="search-header">
      <van-icon class="search-icon" name="search" />
      <input
        @input="tipsHelper"
        @focus="handlerFocus"
        class="search"
        type="search"
        placeholder="请输入搜索关键词"
      />
      <router-link class="cancel" to="/home">取消</router-link>
      <!-- history -->
      <div v-if="pageStatus=='default'" class="his">
        <div class="history">
          <div v-if="historyData.length" class="title">
            <span>历史记录</span>
            <span @click="deleteHistory" class="iconfont delete">&#xe69d;</span>
          </div>
          <div v-if="historyData.length" class="history-container">
            <div
              @click="clickHistory(item,false)"
              class="history-item"
              v-for="item in historyData"
              :key="item.id"
            >{{item.keyword}}</div>
          </div>
        </div>
        <div class="hot-search">
          <div class="title">热门搜索</div>
          <div class="hot-container">
            <div
              :class="item.is_hot?'active':''"
              class="hot-item"
              v-for="item in hotKeywordList"
              :key="item.keyword"
              @click="clickHistory(item,true)"
            >{{item.keyword}}</div>
          </div>
        </div>
      </div>
      <!-- search -->
      <div v-if="pageStatus=='search'" class="search-keywords">
        <ul class="keywords-list" v-for="item in keywords" :key="item.id">
          <li @click="detailSearch(item,true)" class="keywords-item">{{item.name}}</li>
        </ul>
        <div class="empty" v-if="!keywords.length">当前暂时无此商品</div>
      </div>
      <div v-if="pageStatus=='detail'" class="detail">
        <SortGood :keywordDetail="keywordDetail"></SortGood>
      </div>
    </div>
  </div>
</template>

<script>
import SortGood from "@/views/home/components/SortGood";
import {
  indexaction as indexactionApi,
  clearhistoryAction as clearhistoryActionApi,
  helperaction as helperactionApi,
  addhistoryaction as addhistoryactionApi
} from "@/api/home/search";
export default {
  name: "Search",
  components: {
    SortGood
  },
  data() {
    return {
      hotKeywordList: [],
      historyData: [],
      defaultKeyword: [],
      pageStatus: "default", //'default' 'detail' 'search'
      searchOrder: "",
      keywords: [],
      keywordDetail: ""
    };
  },
  methods: {
    handlerFocus(event) {
      var value = event.target.value;
      if (value.trim().length) {
        this.pageStatus = "search";
        this.tipsHelper(event);
      } else {
        this.pageStatus = "default";
      }
    },
    //点击历史记录
    clickHistory(item, flag) {
      item.name = item.keyword;
      this.detailSearch(item, flag);
    },
    //点击搜索的得到的提示词
    detailSearch(item, flag) {
      var keyword = item.name;
      helperactionApi({
        keyword,
        order: this.searchOrder
      }).then(res => {
        this.keywords = res.keywords;
        if (!this.keywords.length) {
          this.pageStatus = "default";
          return;
        }
      });
      this.pageStatus = "detail";
      this.keywordDetail = item.name;
      if (flag) {
        addhistoryactionApi({
          keyword: this.keywordDetail,
          openId: "66"
        }).then(res => {
          this.getHistory();
        });
      }
      else{
        this.getHistory();
      }

      // console.log(this.keywordDetail);
    },
    //搜索提示词
    tipsHelper(event) {
      var keyword = event.target.value;
      if (!keyword.trim().length) {
        this.pageStatus = "default";
        return;
      }
      this.pageStatus = "search";
      helperactionApi({
        keyword,
        order: this.searchOrder
      }).then(res => {
        // console.log("搜索提示词", res.keywords);
        this.keywords = res.keywords;
      });
    },
    //清空历史记录
    deleteHistory() {
      clearhistoryActionApi({
        openId: "66"
      }).then(res => {
        // console.log('清空历史记录',res);
        this.historyData = [];
      });
    },
    //获取历史记录以及关键词
    getHistory() {
      indexactionApi({ openId: "66" }).then(res => {
        // console.log("历史记录和搜索记录数据", res);
        this.historyData = res.historyData;
        this.defaultKeyword = res.defaultKeyword;
        this.hotKeywordList = res.hotKeywordList;
      });
    }
  },
  created() {
    this.getHistory();
  }
};
</script>

<style lang="scss" scoped>
.search-header {
  position: relative;
  padding-top: 10px;
  width: 100%;
  background-color: #fff;
  .search-icon {
    position: absolute;
    font-size: 20px;
    top: 20px;
    left: 15px;
  }
  .search {
    display: inline-block;
    width: 316px;
    height: 40px;
    border: none;
    outline: none;
    margin-left: 10px;
    text-indent: 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #f5f5f5;
    text-indent: 25px;

    &::placeholder {
      color: gray;
      font-size: 12px;
    }
    .cancel {
      font-size: 13px;
    }
  }
}

//历史记录与搜索框
.his {
  background-color: #f5f5f5;

  .history {
    overflow: hidden;
    padding: 0 10px;
    margin-bottom: 10px;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-top: 34px;
      margin-bottom: 20px;
      span {
        font-size: 13px;
      }
      .delete {
        margin-right: 10px;
        font-size: 20px;
      }
    }
    .history-container {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      padding-bottom: 24px;
      .history-item {
        width: fit-content;
        font-size: 12px;
        padding: 0 5px;
        line-height: 26px;
        margin-right: 10px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
      }
    }
  }

  //热门搜索
  .hot-search {
    overflow: hidden;
    padding: 0 10px;
    background-color: #fff;
    .title {
      margin: 10px 0;
    }
    .hot-container {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      padding-bottom: 24px;
      .hot-item {
        width: fit-content;
        font-size: 12px;
        padding: 0 5px;
        line-height: 26px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        &.active {
          border: 1px solid #b4282d;
          color: #b4282d;
        }
      }
    }
  }
}

//搜索keywords
.search-keywords {
  position: fixed;
  box-sizing: border-box;
  background-color: #fff;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
  }
  .keywords-list {
    .keywords-item {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 20px;
      margin-bottom: 10px;
    }
  }
}

//detail
.detail {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>