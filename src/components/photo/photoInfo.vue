<template>
    <div class="photoInfoContainer">
        <!-- title区域 -->
		<div class="mui-media-body photoInfoTitle">
			{{ photoInfoList.title }}
			<p class='mui-ellipsis'>
                  <span>发表时间: {{ photoInfoList.add_time | dataFormat}}</span>
                  <span>点击: {{ photoInfoList.click }}次</span>
              </p>
		</div>

        <hr>

        <!-- 图片部分 -->
        <img class="preview-img" v-for="(item, index) in imgList" :key="index" :src="item.src" 
             height="100" @click="$preview.open(index, imgList)">

        <!-- 内容区域 -->
        <div class="photoInfoBody">
             <!-- v-html来渲染html样式 -->
             <p v-html="photoInfoList.content"></p>   
         </div>    

         <!-- 评论区域 -->
         <commentBox :id="this.imgid"></commentBox>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
// 引入评论
import comment from '../subComponents/comments.vue'

export default {
   data() {
       return {
           photoInfoList: [],
           imgid: this.$route.params.id,
           imgList: []   // 缩略图
       }
   },
   created() {
      this.getPhotoInfo()
      this.getImg()
   },
   methods: {
       getPhotoInfo() {
          this.$http.get('api/getimageInfo/' + this.imgid).then( result => {
              if(result.body.status == 0) {
                //   console.log(result.body.message)
                  Toast('图片详情获取成功')
                  this.photoInfoList = result.body.message[0]
              } else {
                  Toast('图片详情获取失败')
              }
          } ) 
       },
       getImg() {
           this.$http.get('api/getthumimages/' + this.imgid).then(result => {
               if(result.body.status == 0) {
                   result.body.message.forEach(item => {
                       item.w = 600   // 设置图片的宽，缩略图必须设置
                       item.h = 400   // 设置图片的高，缩略图必须设置
                   })
                   this.imgList = result.body.message
               }
           })
       }
   },
   components: {
       commentBox: comment 
   } 
}
</script>

<style lang="less" scoped>
  .photoInfoContainer {
       padding: 0 10px;
       .photoInfoTitle {
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
       .photoInfoBody {
           font-size: 15px;
           color: #fcfcfc;
           /deep/ img {       // 深度选择器
               width: 100%;
           }
       }
       img {
           margin-right: 6px;
       }
   }
</style>


