// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1. 所有的脚手架项目总的路由在 router/index.js中配置
// 2. 每一个.vue的文件都是一个组件 --> 每一个.vue的template中只能有一个根元素
// 3. main.js就是我们项目的js入口文件 你想要在所有组件中使用的一些都要在main.js中引入
// 4. APP.vue根组件

// 引入Mint-UI组件，官方步骤
// import Vue from 'vue'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// import App from './App.vue'

// Vue.use(MintUI)

// new Vue({
//   el: '#app',
//   components: { App }
// })

// 引入mint-ui的header
import { Header } from 'mint-ui';

Vue.component(Header.name, Header);

// 引入mint-ui的css样式 node_modules中
import 'mint-ui/lib/style.css'

// 引入mui的css样式
import './assets/mui/dist/css/mui.min.css'

// 引入fonts扩展css
import './assets/mui/dist/css/icons-extra.css'

Vue.config.productionTip = false  // 报错信息

// 引入轮播组件
import { Swipe, SwipeItem } from 'mint-ui';

// 引入ajax请求vue-resouce
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
