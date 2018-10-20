<template>
   <div class="newListContainer">
      <ul class="mui-table-view" >
				<li class="mui-table-view-cell mui-media" v-for="item in newListInfo" :key="item.id">
					<router-link :to="'/home/newList/' + item.id">
                        <!-- 只写src="{{item.img_url}}"这会被解析成字符串而报错 -->
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
                            {{ item.title }}
							<p class='mui-ellipsis'>
                                <span>发表时间: {{ item.add_time | dataFormat}}</span>
                                <span>点击: {{ item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>  
   </div> 
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            newListInfo: []
        }
    },
    created() {
       this.getNewListInfo()
    },
    methods: {
        getNewListInfo() {
            this.$http.get('api/getnewslist').then( result => {
                if(result.body.status == 0) {
                    Toast('图文资讯获取成功')
                    this.newListInfo = result.body.message
                } else {
                    Toast('图文资讯获取失败')
                }
            } )
        }
    }
    
}
</script>

<style lang="less" scoped>
    .newListContainer {
        padding: 0 10px;
        .mui-media-body {
            font-weight: 700;
            p {
                display: flex;
                justify-content: space-between;
                padding-top: 10px;
                color: lightblue;
            }
        } 
    }
</style>


