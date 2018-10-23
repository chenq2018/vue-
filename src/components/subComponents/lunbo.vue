<template>
   <div>
      <mt-swipe :auto="4000">
          <!-- :class="{full: isFull}设置图片是否为100% -->
            <mt-swipe-item v-for="(item, index) in lunBoList" :key="index" :class="{full: isFull}">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
   </div>    
</template>

<script>
export default {
    props: ['lunBoList', 'isFull']
}
</script>

<style lang="less" scoped>
  .mint-swipe {
        height: 250px;
        text-align: center;
        > .mint-swipe-items-wrap {
             > .mint-swipe-item {
                   width: 100%;

             > img {
                //    width: 100%;
                   height: 100%;
               }
             }
          }
    }
    // 设置图片是否为100%
    .full {
        width: 100%;
    }
</style>


