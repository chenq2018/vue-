import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 引入tabbar中的组件
import homeContainer from '../tabbar/homeContainer.vue'
import memberContainer from '../tabbar/memberContainer.vue'
import shoppingcarContainer from '../tabbar/shoppingcarContainer.vue'
import searchContainer from '../tabbar/searchContainer.vue'

export default new Router({
  routes: [
    //  path路径要和APP.vue中的to路径保持一致
     { path: '/home', component: homeContainer, alias: '/'},
     { path: '/member', component: memberContainer},
     { path: '/shoppingcar', component: shoppingcarContainer},
     { path: '/search', component: searchContainer},
    //  { path: '*', redirect: '/home' }
  ],
  linkActiveClass: "mui-active"  // 默认覆盖路由高亮的类
})
