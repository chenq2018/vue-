<template>
    <div class="shoppingCar">
        <div class="shopping" v-for="(item,index) in getShopping" :key="item.id">
            <!-- 使按钮变成选中状态 -->
            <mt-switch v-model="$store.getters.getSelected[item.id]" @change="changed(item.id, $store.getters.getSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="shoppingCar_r">
               <h5>{{ item.title }}</h5>
               <p>
                  <span>¥{{ item.sell_price }}</span>
                  <!-- 给数字框传入值 -->
                  <number :Numbercount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></number>
                  <a href="javaScript:;" @click.prevent="remove(item.id, index)">删除</a> 
               </p>
            </div>
        </div>
        <div class="shopping_f">
            <div class="shopping_fl">
               <p>总计（不含运费）</p>
               <p>已勾选商品<span>{{ $store.getters.getAllCount.count }}</span>件,总价<span>¥{{ $store.getters.getAllCount.amount }}</span></p>
            </div>
            <div class="shopping_r">
                <mt-button type="danger">去结算</mt-button>
            </div>    
        </div>
    </div>
</template>

<script>
// 引入数字组件
import number from '../subComponents/shoppingcar_number.vue'

export default {
    data() {
       return {
           getShopping: []
       }
    },
    created(){
       this.getShoppingCarInfo()
    },
    methods: {
        getShoppingCarInfo() {
            // 定义新数组
            var arr = []
            // 获取购物车中的id
            this.$store.state.car.forEach(item => arr.push(item.id))
            // 判断数组是否为空
            if(arr.length <=0) {
                return
            }
            this.$http.get('api/goods/getshopcarlist/' + arr.join(",")).then(result => {
                if(result.body.status == 0) {
                    this.getShopping = result.body.message
                }
            })
        },
        // 删除购物车内容
        remove(id, index) {
            this.getShopping.splice(index, 1)
            // 最新数据提交
            this.$store.commit('removeCar', id)
        },
        // 按钮手动改变时
        changed(id, val) {
            // console.log('aa')
            // 每当点击开关，把最新的开关状态，同步到store中
            // console.log(id + "----" + val)
            this.$store.commit('changedButton', { id: id, selected: val })
        }
    },
    components: {
        number
    }
}
</script>

<style lang="less" scoped>
   .shoppingCar {
       padding: 10px;
      > .shopping {
         margin-top: 20px; 
         overflow: hidden;
         border: 1px solid #f5f5f5;
         box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
         > .mint-switch {
             float: left;
             width: 15%;
             margin-top: 20px;
         }
         > img {
           display: block;
           width: 25%;
           height: 80px;
           float: left;
         }
         > .shoppingCar_r {
           float: right;
           width: 60%;
           > h5 {
              font-size: 14px; 
           }
           >p {
               > span:first-child {
                   color: red;
                   padding-right: 10px;
               }
               > a {
                   color: lightblue;
                   padding-left: 10px;
                   text-decoration: none;
               }
           }
        }
      }
      >.shopping_f {
          margin-top: 20px;
          overflow: hidden;
          border: 1px solid #f5f5f5;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
          >.shopping_fl {
              float: left;
              >p{
                  font-size: 13px;
                  padding-top: 10px;
                  span {
                     color: red;    
                  }
              }
          }
          >.shopping_r {
              float: right;
              padding-right: 50px;
              padding-top: 20px;
          }
      }
   }
</style>


