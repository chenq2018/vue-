<template>
    <div class="newInfoContainer">
        <!-- title区域 -->
		<div class="mui-media-body newInfoTitle">
			{{ newInfoList.title }}
			<p class='mui-ellipsis'>
                  <span>发表时间: {{ newInfoList.add_time }}</span>
                  <span>点击: {{ newInfoList.click }}次</span>
              </p>
		</div>

        <hr>

        <!-- 内容区域 -->
        <div class="newInfoBody">
             <!-- v-html来渲染html样式 -->
             <p v-html="newInfoList.content"></p>   
         </div>    

         <!-- 评论区域 -->
         <commentBox :id="this.id"></commentBox>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

// 引入评论组件
import comment from '../subComponents/comments.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newInfoList: []
        }
    },
    created() {
        this.getNewInfoMessage()
    },
    methods: {
        getNewInfoMessage() {
           // 获取数据
            this.$http.get('api/getnew/' + this.id).then( result => {
                if(result.body.status == 0) {
                    Toast('获取图文资讯详情成功')
                    // 获取的是数组中的第一个对象
                    this.newInfoList = result.body.message[0]
                } else {
                    Toast('获取图文资讯详情失败')
                }
            } )
        }
    },
    // 注册组件
    components: {
        commentBox: comment
    }
}
</script>

<style lang="less" scoped>
// scoped为局部设置样式，去掉scoped则是全局样式
   .newInfoContainer {
       padding: 0 10px;
       .newInfoTitle {
          padding-top: 20px;
          text-align: center;
          color: red;
          font-size: 18px;
          p {
              padding-top: 10px;
              padding-bottom: 10px;
              display: flex;
              justify-content: space-between;
              color: lightblue; 
          }
       }
       .newInfoBody {
           font-size: 15px;
           color: #fcfcfc;
           /deep/ img {       // 深度选择器
               width: 100%;
           }
       }
   }
</style>


