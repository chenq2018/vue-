<template>
    <div class="mui-container">
        <!-- 抽离轮播 -->
		<!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in goodInfoListImg" :key="index">
                <img :src="item.src" alt="">
            </mt-swipe-item>
        </mt-swipe> -->
        <swipe :lunBoList="goodInfoListImg" :isFull="false"></swipe>

		<div class="mui-card">
			<div class="mui-card-header">{{ goodsInfo.title }}</div>
			<div class="mui-card-content"> 
				<div class="mui-card-content-inner">
                  <!-- 小球动画   -->
                  <transition
                     @before-enter="beforeEnter"
                     @enter="enter"
                     @after-enter="afterEnter"
                  >
                      <div class="ball" v-show="isShow" ref="ball"></div>    
                  </transition> 
				  <p>
                      市场价 <span>¥{{ goodsInfo.market_price }}</span>&nbsp;&nbsp;
                      销售价 <span>¥{{ goodsInfo.sell_price }}</span>
                  </p>	
                  <p>
                      购买数量&nbsp;&nbsp; <numberBox @countNumber="getNumberCount" :max="goodsInfo.stock_quantity"></numberBox>
                  </p>
                  <mt-button type="primary">立即购买</mt-button>&nbsp;&nbsp;
                  <mt-button type="danger" @click="addToShopCar">加入购物车</mt-button>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号: {{ goodsInfo.goods_no }}</p>
					<p>库存情况: {{ goodsInfo.stock_quantity }}件</p>
					<p>上架时间: {{ goodsInfo.add_time | dataFormat}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="desc(imgid)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="comment(imgid)">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 引入轮播
import swipe from '../subComponents/lunbo.vue'
// 引入数字选择框插件
import numberBox from '../subComponents/number.vue' 

export default {
    data() {
        return {
            goodInfoListImg: [],
            goodsInfo: [],   // 商品参数区和价格，标题等数据
            imgid: this.$route.params.id,
            isShow: false,
            selectCount: 1  // 数量中的值保存到父组件中
        }
    },
    created() {
       this.getGoodInfoImg()
       this.getGoodsInfo()
    },
    methods: {
        getGoodInfoImg() {
            this.$http.get('api/getthumimages/' + this.imgid).then(result => {
                if(result.body.status == 0) {
                    Toast('图片获取成功')
                    // 因为轮播组件获取的是message中src的值，所以要添加img属性把src赋值给img
                    result.body.message.forEach(item => {
                        item.img = item.src
                    })
                    this.goodInfoListImg = result.body.message
                } else {
                    Toast('图片获取失败')
                }
            })
        },
        // 获取商品参数区和价格，标题等数据
        getGoodsInfo() {
            this.$http.get('api/goods/getinfo/' + this.imgid).then(result => {
                if(result.body.status == 0) {
                    this.goodsInfo = result.body.message[0]
                }
            })
        },
        // 图文介绍
        desc(id) {
            // $route获取的是地址参数对象
            // $router获取的是导航对象
            this.$router.push({path: '/home/goodsDesc/' + id})
        },
        // 商品评论
        comment(id) {
            this.$router.push({path: '/home/goodsComment/' + id})
        },
        addToShopCar() {
            this.isShow = !this.isShow
            // 设置购物车数组数据
            var carsInfo = {
                id: this.imgid,
                count: this.selectCount,
                price: this.goodsInfo.sell_price,
                selected: true
            }
            // 调用store中的mutations将商品加入购物车
            this.$store.commit('addToCar', carsInfo)
            // console.log(carsInfo)
        },
        // 小球动画函数
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)"
        },
        enter(el, done) {
            el.offsetWidth
            // 为了完成小球动画屏幕适配的问题，使用getBoundingClientRect() 来获取页面元素的位置 
            // 获取小球当前元素，使用ref
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            // 获取购物车0的元素
            const carPosition = document.getElementById('badge').getBoundingClientRect()
            // 获取x轴与y轴的间差值
            const x = carPosition.left - ballPosition.left
            const y = carPosition.top - ballPosition.top
            el.style.transform = `translate(${x}px,${y}px)`
            // el.style.transform = "translate(120px, 150px)"
            el.style.transition = "all 1s cubic-bezier(.4, -0.3, 1, .68)"
            //  此处的done()相当于调用了afterEnter()方法
            done()
        },
        afterEnter(el) {
            this.isShow = !this.isShow
        },
        getNumberCount(count) {
            this.selectCount = count   // 在父组件中保存子组件传来的数量
            // console.log('福相', count)
        }
    },
    components: {
        swipe,
        numberBox
    }
}
</script>

<style lang="less" scoped>
.mint-swipe {
        height: 250px;
        > .mint-swipe-items-wrap {
             > .mint-swipe-item {
                   width: 100%;

             > img {
                   width: 100%;
                   height: 100%;
               }
             }
          }
    }
    .mui-card-content-inner {
        color: #8f8f94;
        position: relative;
        > p {
            > span:first-child {
                text-decoration: line-through;
                padding-left: 10px;
            }
            > span:last-child {
                color: red;
                padding-left: 10px;
            }
        }
        > mt-button {
            padding-top: 10px;
        }
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            top: 55px;
            left: 35%;
            z-index: 500;
        }
    }
    .mui-card-footer {
        display: block;
        > .mint-button--primary.is-plain {
            margin-bottom: 5px;
        }
    }
    .mui-card {
        overflow: visible;
    } 
</style>


