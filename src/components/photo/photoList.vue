<template>
    <div class="mui-content">
			<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active': '']" href="#item1mobile" data-wid="tab-top-subpage-1.html"
                           v-for="item in categoryList" :key="item.id" @click.prevent="getImg(item.id)">
							{{ item.title }}
						</a>
					</div>
				</div>

			</div>

            <ul>
              <router-link v-for="item in list" :key="item.id" class="liBox" :to="'/home/photoInfo/' + item.id">
                <img v-lazy="item.img_url">
                <div class="box">
                   <h5>{{ item.title }}</h5>
                   <p>{{ item.zhaiyao }}</p>
                </div>
              </router-link>
            </ul>
		</div>

</template>

<script>
// 引入mui
import mui from '../../assets/mui/dist/js/mui.min.js'

// 添加scroll插件后，报错
// caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
// 原因为，vue-cli是严格模式，去除严格模式方法
// 1. 将mui放到vue-cli项目的src/assets路径下
// 2 在webpack.base.conf.js的resolve中的alias中添加 mui当前行代码
//  resolve: {
//      extensions: ['.js', '.vue', '.json'],
//      alias: {
//          'vue$': 'vue/dist/vue.esm.js',
//          '@': resolve('src'),
//          // 定义别名和插件位置
//          'mui': path.resolve(__dirname, '../src/assets/mui/js/mui.js')
//      }
//  }
// 3. 在webpack.dev.conf.js中配置mui相关
// plugins: [
//      new webpack.ProvidePlugin({
//          mui: "mui",
//          "window.mui": "mui"
//      }),
//      new webpack.DefinePlugin({
//        'process.env': require('../config/dev.env')
//      }),
//  ]
// 4. 在.banbelrc中配置 
//  "plugins": ["transform-vue-jsx", "transform-runtime"],
//  "ignore": [
//    "./src/assets/mui/js/*.js",
//  ]


export default {
    data() {
        return {
           categoryList: [],
           list: []
        }
    },
    created() {
       this.getCategory()
       this.getImg(0)
    },
    mounted(){
       //  事件放在mounted中 
       mui('.mui-scroll-wrapper').scroll({
	     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
       });
    },
    methods: {
        getCategory() {
            this.$http.get('api/getimgcategory').then( result => {
                if(result.body.status == 0) {
                    // 手动拼接出一个完整的分类列表
                    result.body.message.unshift({title: '全部', id: 0})
                    this.categoryList = result.body.message
                }
            } )
        },
        getImg(cateid) {
            this.$http.get("api/getimages/" + cateid).then( result => {
                if(result.body.status == 0) {
                    this.list = result.body.message
                }
            } )
        }    
    }
}
</script>

<style lang="less" scoped>
    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .mui-content {
        ul {
            list-style: none;
            padding: 0;
            margin-top: 0;
            img {
                width: 100%;
            }
            >.liBox {
               position: relative; 
               margin-top: 5px;
               &:first-child {
                   margin-top: 0;
               }
               .box {
                 position: absolute;
                 bottom: 5px;
                 left: 0;
                 z-index: 2;
                 background: rgba(0, 0, 0, 0.3);
                 > h5, p {
                     color: #fff;
                     font-size: 13px;
                 }
               }
            }
        }
    }
</style>


