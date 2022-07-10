import instance from '@/api/request'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/Index')
  },
  {
    path: '/home/newGoods',
    name: 'newGoods',
    component: () => import('@/views/home/components/NewGoods')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/home/components/Search')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/home/components/Map')
  },
  {
    path: '/sortGood',
    name: 'sortGood',
    component: () => import('@/views/home/components/SortGood')
  },
  {
    path: '/brandDirect',
    name: 'brandDirect',
    component: () => import('@/views/home/components/BrandDirect')
  },
  {
    path: '/brandlist',
    name: 'brandList',
    component: () => import('@/views/home/components/BrandList')
  },
  {
    path: '/detailofgood',
    name: 'detailOfGood',
    component: () => import('@/views/common/DetailOfGood')
  },
  {
    path: '/topic',
    name: 'topic',
    component: () => import('@/views/topic/Index')
  },
  {
    path: '/topic/detail',
    name: 'topicDetail',
    component: () => import('@/views/topic/components/TopicDetail')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/Index')
  },
  {
    path: '/horizontalCategory',
    name: 'horizontalCategory',
    component: () => import('@/views/category/components/HorizontalCategory')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/Index')
  },
  {
    path: '/buynow',
    name: 'buyNow',
    component: () => import('@/views/common/BuyNow')
  },
  {
    path: '/chooseaddress',
    name: 'chooseAddress',
    component: () => import('@/views/common/ChooseAddress')
  },
  {
    path: '/modifyaddress',
    name: 'modifyAddress',
    component: () => import('@/views/common/ModifyAddress')
  },
  {
    path: '/newaddress',
    name: 'newAddress',
    component: () => import('@/views/common/NewAddress')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/Index')
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('@/views/my/components/Comment')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/common/Collect')
  },

]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
      behavior: 'instant'
    }
  }
})

export default router
