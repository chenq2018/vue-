<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' data-numbox-max='100'>
       <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
       <input class="mui-numbox-input" type="number"  @change="getCounts" ref="inputs" :value="Numbercount"/>
       <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
// 引入mui.js
import mui from '../../assets/mui/dist/js/mui.min.js'

export default {
    mounted() {
        // 初始化数字选择框组件
        mui('.mui-numbox').numbox()
    },
    methods: {
        getCounts() {
            // 数量改变时提交对象,数据同步到购物车
            this.$store.commit('updateCount', {
                id: this.goodsId,
                count: this.$refs.inputs.value
            })
        }
    },
    props: ['Numbercount', 'goodsId']
}
</script>

<style lang="less" scoped>

</style>


