<template>
    <div class="commentContainer">
       <h3>发表评论</h3> 
       <hr>
       <textarea placeholder="请输入要BB的内容(最多BB 120个字)" maxlength="120" v-model="msg"></textarea>
       <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
       <div class="body" v-for="(item, index) in commentsList" :key="index"> 
           <p>第{{ index + 1 }}楼 用户: {{ item.user_name }} 发表时间: {{ item.add_time | dataFormat}}</p>
           <p>{{ item.content == 'undefined' ? '此用户什么也没留下' : item.content}}</p>
       </div>
       <mt-button type="danger" size="large" plain  @click="getMoreComments">加载更多</mt-button>
    </div>

</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            commentsList: [],
            pageindex: 1,
            msg: ''        
        }
    },
    created() {
       this.getCommentsInfo()  
    },
    methods: {
        getCommentsInfo() {
            // 获取id，父向子传值 
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then( result => {
                if(result.body.status == 0) {
                    // Toast('发表评论数据获取成功')
                    // 为了展现第1页以后的页面，拼接数组,方式一:
                    this.commentsList = this.commentsList.concat(result.body.message)
                    // 补充: 数组拼接方式二:
                    // var a = [111, 222]
                    // var b = [333, 444]
                    // console.log([...a, ...b])
                    // VM271:1 (4) [111, 222, 333, 444]
                } else {
                    Toast('发表评论数据获取失败')
                }
            } )
        },
        getMoreComments() {
            this.pageindex = this.pageindex + 1
            this.getCommentsInfo()
        },
        // 发表评论
        postComments() {
            // 验证
            if(this.msg.trim().length == 0) {
                Toast('评论内容不能为空')
                return
            }
            this.$http.post('api/postcomment/' + this.$route.params.id, { content: this.msg.trim() }).then( result => {
                if(result.body.status == 0) {
                    Toast('发表评论成功')
                    // 设置新数据
                    var addContent = {
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.msg.trim()
                    } 
                    // 添加到数组中
                    this.commentsList.unshift(addContent) 
                    this.msg = ''   
                }
            })
        }
    },
    props: ['id']
}
</script>

<style lang="less" scoped>
    .commentContainer {
        padding: 0 10px;
        > textarea {
            height: 80px;
        }
        > .body {
          padding-top: 10px;
          > p {
             text-align: center;
             font-size: 16px;
             color: #000;
             &:nth-child(1) {
                 background-color:#ccc;
             } 
           }  
        }
    }
</style>


