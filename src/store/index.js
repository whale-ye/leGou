import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city:'',//显示城市
    searchCity:'',//搜索的城市
    address:{},//坐标信息
  },
  getters: {
    getAddress(state){
      return state.address;
    }
  },
  mutations: {
    updateCity(state,payload){
      state.city=payload;
    },
    updateSearchCity(state,payload){
      state.searchCity=payload;
    },
    updateAddress(state,payload){
      state.address.lng=payload.lng;
      state.address.lat=payload.lat;
    }
  },
  actions: {
  },
  modules: {
  }
})
