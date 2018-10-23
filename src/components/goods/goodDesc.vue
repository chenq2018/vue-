<template>
    <div class="goodsDescBox">
        <h4>{{ goodsDesc.title }}</h4>
        <hr>
        <div v-html="goodsDesc.content" class="goodsBody"></div>       
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            goodsDesc: [],
            descid: this.$route.params.id
        }
    },
    created() {
        this.getGoodDesc()
    },
    methods: {
        getGoodDesc() {
            this.$http.get('api/goods/getdesc/' + this.descid).then(result => {
                if(result.body.status == 0) {
                    Toast('商品图文获取成功')
                    this.goodsDesc = result.body.message[0]
                } else {
                    Toast('商品图文获取失败')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .goodsDescBox {
        text-align: center;
        .goodsBody {
           p{
               img {
                   width: 100%;
               }
           }
        }
    }
</style>


