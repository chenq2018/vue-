<template>
    <div>
        <comment :id="this.$route.params.id"></comment>
    </div>
</template>

<script>
// 引入评论组件
import comment from '../subComponents/comments.vue'

export default {
    components: {
        comment
    }
}
</script>

<style lang="less" scoped>

</style>


