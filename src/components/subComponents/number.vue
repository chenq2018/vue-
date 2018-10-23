<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='0' :data-numbox-max='max'>
       <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
       <input class="mui-numbox-input" type="number"  @change="getCounts" ref="inputs"/>
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
            // 发布者订阅者模式
            // 参数一为父传递过来的方法名
            // 参数二为子传递给父组件的形参
            this.$emit('countNumber', parseInt(this.$refs.inputs.value))
        }
    },
    props: ['max'],
    // 因为光设置max无法达到监听效果，所以设置监听
    watch: {
        'max': function(newVal, oldVal) {
            // 使用JS API设置numbox
            mui('.mui-numbox').numbox().setOption('max', newVal)
        }
    }
}
</script>

<style lang="less" scoped>

</style>


