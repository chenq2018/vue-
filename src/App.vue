<template>
  <div id="app">
    <!-- 顶部 header 区域 -->
    <mt-header fixed title="固定在顶部"></mt-header>

    <!-- 中间 router 区域 -->
    <transition>
    	<router-view></router-view>
    </transition>	

    <!-- 底部 tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shoppingcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    <!-- <router-view/> -->
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less" scoped> 
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  	padding-top: 40px;
  	padding-bottom: 50px;
  	background-color: #fff;
  	// 裁剪 div 元素中内容的左/右边缘 - 如果溢出元素的内容区域的话,hidden 裁剪内容 - 不提供滚动机制。
		overflow-x:hidden;
		>.mint-header.is-fixed {
      z-index: 3;
    }
	}

  .v-enter {
	opacity: 0;
	transform: translateX(100%);
  }

  .v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
	transition: all 0.5s ease;
  }
</style>
