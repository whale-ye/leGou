<template>
  <div class="map-vue">
    <input class="search" @input="autoKeywords" type="text" placeholder="搜索" />
    <ul class="keyword-list">
      <li
        @click="backHome(item)"
        class="keyword-item"
        v-for="item in keywordList"
        :key="item.id"
      >{{item.name}}</li>
    </ul>
    <div class="map">
      <h3>显示当前位置:</h3>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Map",
  data() {
    return {
      keyword: "",
      keywordList: [],
      fixedCity: ""
    };
  },
  computed: {
    ...mapState(["city", "searchCity", "address"])
  },
  methods: {
    ...mapMutations(["updateCity", "updateSearchCity", "updateAddress"]),
    backHome(item) {
      var name = item.name;
      var lng = item.location.lng;
      var lat = item.location.lat;
      this.updateAddress({ lng, lat });
      this.updateSearchCity(name);
      this.$router.push("/home");
    },
    autoKeywords(event) {
      this.keyword = event.target.value;
      if (!this.keyword.trim()) {
        return;
      }
      var that = this;
      AMap.plugin("AMap.AutoComplete", function() {
        var autoOptions = {
          //city 限定城市，默认全国
          city: that.city.length?that.city:that.fixedCity
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(that.keyword, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          that.keywordList = result.tips;
        });
      });
    }
  },
  mounted() {
    if (this.city.length) {
      var lng = this.address.lng;
      var lat = this.address.lat;
      var map = new AMap.Map("map", {
        zoom: 16, //级别
        center: [lng, lat] //中心点坐标
      });
      // 将创建的点标记添加到已有的地图实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat) // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
      map.add(marker);
    } else {
      var map = new AMap.Map("map", {
        zoom: 8 //级别
      });
      var that = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            that.fixedCity = result.city;
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.map-vue {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
//地图显示
.map {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 200px;
  h3 {
    text-indent: 20px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  #map {
    width: 100%;
    height: calc(100% - 30px);
  }
}
.search {
  display: block;
  width: calc(100% - 20px);
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  margin: 10px auto;
  text-indent: 20px;
  outline: none;
  border: 1px solid gray;
  &::placeholder {
    color: #eee;
  }
}

.keyword-list {
  padding: 0 10px;
  .keyword-item {
    line-height: 20px;
    margin-bottom: 10px;
  }
}
</style>