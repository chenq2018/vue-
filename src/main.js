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
import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// import App from './App.vue'

Vue.use(MintUI)

// new Vue({
//   el: '#app',
//   components: { App }
// })

// 引入mint-ui的header
// import { Header, Button, Lazyload } from 'mint-ui';

// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// 引入图片懒加载
// Vue.use(Lazyload);

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

// 设置请求的根目录
Vue.http.options.root = 'http://027xin.com:8899'
// 设置提交表单的内容类型为普通表单数据格式
Vue.http.options.emulateJSON = true

// 设置时间过滤器
import moment from 'moment'

Vue.filter('dataFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern) 
})

// 引入图片缩略图插件
// vue-preview安装报错，使用vue2-preview
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 获取localStorage上数据
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {     // this.$store.state.***
      car: car    // 购物车中存储数据，用一个数据存储起来, 
                 // 可以设计商品对象为{id: 商品的id, count: 要购买的数量, price: 商品的价格, selected: false}
  },
  mutations: {    // this.$store.commit('方法的名称', '按需传递唯一的参数')
      addToCar(state, carsInfo) {
          // 如果购物车中，已经有对应的商品了，则更新数量
          // 如果购物车中，没有对应的商品，则push到car中
          var flag = false
          
          state.car.some(item => {
            if(item.id == carsInfo.id) {
              //  购物车中已经存在商品
              item.count += parseInt(carsInfo.count)
              flag = true
              return true
            }

          })

          // 如果商品不存在，则添加新的商品
          if(!flag){
            state.car.push(carsInfo)
          }

          // 更新car之后，储存到localStorage上
          localStorage.setItem('car', JSON.stringify(state.car))
      },
      // 更新购物车数量改变时的状态
      updateCount(state, carsInfo) {
          state.car.some(item => {
            if(item.id == carsInfo.id) {
              item.count = parseInt(carsInfo.count)
              return true
            }
          })

          // 更新之后储存到localStorage中
          localStorage.setItem('car', JSON.stringify(state.car))
      },
      //  删除购物车
      removeCar(state, id) {
          state.car.some((item, i) => {
              if(item.id == id) {
                  state.car.splice(i, 1)
                //   console.log('aa')
              }
              return true
          })
          // 更新之后储存到localStorage中
          localStorage.setItem('car', JSON.stringify(state.car))
      },
      changedButton(state, info) {
          state.car.some(item => {
              if(item.id == info.id) {
                  item.selected = info.selected
                  return true
              }
          })
          // 更新之后储存到localStorage中
          localStorage.setItem('car', JSON.stringify(state.car))
      } 
  },
  getters: {     // this.$store.getters.***
      // 相当于计算器属性
      getCount(state){
          var c = 0
          state.car.forEach(item => {
             c += item.count
          })
          return c
      },
      // 使数量框中获取数值
      getGoodsCount(state) {
          var o = {}
          state.car.forEach(item => {
             o[item.id] = item.count
          })
          return o
      },
      // 获得购物车按钮的选中状态
      getSelected(state) {
          var o = {}
          state.car.forEach(item => {
            o[item.id] = item.selected
          })
          return o
      },
      // 计算商品数量和总价
      getAllCount(state) {
          var o = {
              count: 0,   // 商品数量
              amount: 0   // 商品总价
          }
          state.car.forEach(item => {
              if(item.selected) {
                  o.count += item.count
                  o.amount += item.price * item.count
              }
            })
          return o
      }
  }
})

// 引入switch button组件
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);
 
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store  // 挂载store状态管理对象
})
