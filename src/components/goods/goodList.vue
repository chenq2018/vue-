<template>
    <div class="goodsBox">
       <ul>
         <!-- 跳转方法一，把li变成router-link，加tag='li'   -->
         <!-- <router-link v-for="item in goodsList" :key="item.id" :to="'/home/goodInfo/' + item.id" tag="li">
           <a href="javaScript:;">
              <img :src="item.img_url" alt="">
              <h5>{{ item.title }}</h5>
            </a>
            <p>¥{{ item.sell_price }}<span>¥{{ item.market_price }}</span></p>   
            <p>
               <span>热卖中</span>
               <span>剩余{{ item.stock_quantity }}件</span>      
            </p> 
         </router-link>  -->

         <!-- 跳转方法二，添加click事件，使用$router.push()方法 -->
         <li v-for="item in goodsList" :key="item.id" @click="pushGoodInfo(item.id)">
           <a href="javaScript:;">
              <img :src="item.img_url" alt="">
              <h5>{{ item.title }}</h5>
            </a>
            <p>¥{{ item.sell_price }}<span>¥{{ item.market_price }}</span></p>   
            <p>
               <span>热卖中</span>
               <span>剩余{{ item.stock_quantity }}件</span>      
            </p> 
         </li> 
       </ul> 
       <mt-button type="danger" size="large"  @click="getMoreGoodsList">加载更多</mt-button>    
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            goodsList: [],
            pageindex: 1
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            // 获取商品信息
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                if(result.body.status == 0) {
                   Toast('商品信息列表获取成功')
                //    拼接数组
                   this.goodsList = this.goodsList.concat(result.body.message)
                } else {
                    Toast('商品信息列表获取失败')
                }
            })
        },
        getMoreGoodsList() {
            this.pageindex++
            this.getGoodsList()
        },
        pushGoodInfo(id) {
            // $route获取的是地址参数对象
            // $router获取的是导航对象
            this.$router.push({path: '/home/goodInfo/' + id})
        }
    }
}
</script>

<style lang="less" scoped>
   .goodsBox {
       padding: 5px;
       background-color: #eee;
       > ul {
          width: 100%;
          list-style: none;
          padding-inline-start: 0px;
          margin-block-start: 0em;
          margin-bottom: 5px;
          overflow: hidden;
          > li {
              width: 49%;
              float: left;
              border: 1px solid lightgray;
              margin-top: 7px;
              &:nth-of-type(odd) {
                  margin-right: 5px;
              }
              > a {
                  display: block;
                  width: 100%;
                  background-color: #fff;
                  > img {
                      display: block;
                      width: 100%;
                  }
                  > h5 {
                      color: #000;
                      font-size: 14px;
                      height: 30px;
                  }
              }
              > p {
                  font-size: 13px;
                  margin-top: 10px;
                  padding: 0 10px;
                  &:first-of-type {
                     font-size: 15px;
                     color: red;
                     > span {
                         text-decoration: line-through;
                         color: #b9b4b4;
                         padding-left: 30px;
                     }
                  }
                  &:last-of-type {
                      display: flex;
                      justify-content: space-between;
                      color:#b9b4b4;
                  }
              }
          }
       }
   }
</style>


