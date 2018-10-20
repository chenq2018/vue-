import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 引入tabbar中的组件
import homeContainer from '../components/tabbar/homeContainer.vue'
import memberContainer from '../components/tabbar/memberContainer.vue'
import shoppingcarContainer from '../components/tabbar/shoppingcarContainer.vue'
import searchContainer from '../components/tabbar/searchContainer.vue'
import newListContainer from '../components/news/newList.vue'
import newInfoContainer from '../components/news/newInfo.vue'
import photoContainer from '../components/photo/photoList.vue'
import photoInfoContainer from '../components/photo/photoInfo.vue'

export default new Router({
  routes: [
    //  path路径要和APP.vue中的to路径保持一致
     { path: '/home', component: homeContainer, alias: '/'},
     { path: '/member', component: memberContainer},
     { path: '/shoppingcar', component: shoppingcarContainer},
     { path: '/search', component: searchContainer},
     { path: '/home/newList', component: newListContainer },
     { path: '/home/newList/:id', component: newInfoContainer },
     { path: '/home/photolist', component: photoContainer },
     { path: '/home/photoInfo/:id', component: photoInfoContainer },
    //  { path: '*', redirect: '/home' }
  ],
  linkActiveClass: "mui-active"  // 默认覆盖路由高亮的类
})
