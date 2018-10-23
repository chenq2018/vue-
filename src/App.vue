<template>
  <div id="app">
    <!-- 顶部 header 区域 -->
    <mt-header fixed title="固定在顶部">
			<!-- 返回按钮 -->
			<span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
		</mt-header>

    <!-- 中间 router 区域 -->
    <transition>
    	<router-view></router-view>
    </transition>	

    <!-- 底部 tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-tab" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-tab" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-tab" to="/shoppingcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">
						{{ this.$store.getters.getCount }}
					</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-tab" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    <!-- <router-view/> -->
  </div>
</template>

<script>
  export default {
		data() {
			return {
				name: 'App',
        flag: false   
			}
		},
		created() {
        this.flag = this.$route.path == '/home' ? false : true
		},
		methods: {
			goBack(){
				//  用$router的go方法实现回退
				this.$router.go(-1)
			}
		},
		watch: {
			// 监听路由地址是否为首页
			 '$route.path': function(newVal, oldVal) {
				  if(newVal == '/home') {
						 this.flag = false
					} else {
					   this.flag = true
					}
			 }
		}
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
	
	// 改类名，解决无效页面跳转的问题，把mui-tab-item修改成mui-tab-item-tab
	.mui-bar-tab .mui-tab-item-tab.mui-active {
		color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-tab {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
		color: #929292;
	}
	
.mui-bar-tab .mui-tab-item-tab .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
		padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-tab .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
		text-overflow: ellipsis;
}
</style>
