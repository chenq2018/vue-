<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in swipeList" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <router-link to="/home/newList">
                        <img src="../../../images/menu1.png" alt="">
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <router-link to="/home/photolist">
                        <img src="../../../images/menu2.png" alt="">
                        <div class="mui-media-body">图片分享</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <a href="#">
                        <img src="../../../images/menu3.png" alt="">
                        <div class="mui-media-body">商品购买</div>
                    </a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <a href="#">
                        <img src="../../../images/menu4.png" alt="">
                        <div class="mui-media-body">留言反馈</div>
                    </a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <a href="#">
                        <img src="../../../images/menu5.png" alt="">
                        <div class="mui-media-body">视频专区</div>
                    </a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <a href="#">
                        <img src="../../../images/menu6.png" alt="">
                        <div class="mui-media-body">联系我们</div>
                    </a></li>
            </ul>
    </div>

    </div>
</template>

<script>
    // 引入Toast
    import { Toast } from 'mint-ui';

    // 获取轮播图数据
    export default {
        data() {
            return {
               swipeList: []
            }
        },
        created() {
           this.getSwipe()
        },
        methods: {
            getSwipe() {
                //  请求数据
                this.$http.get('api/getlunbo').then(result => {
                     if(result.body.status == 0) {
                         this.swipeList = result.body.message
                         Toast('轮播数据加载成功');
                     } else {
                         Toast('轮播数据加载失败');
                     }
                })
            }
        }
    }
</script>

<style lang="less">
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
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img {
            width: 80px;
            height: 80px;
          }

    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }

</style>