<template>
  <div class="tabbar">
		<ul>
			<li class="home" @click="goHome">
				<span :class="{selected:isSelected === 0}"></span>
				<p>首页</p>
			</li>
			<li class="sort" @click="goSort">
				<span :class="{selected:isSelected === 1}"></span>
				<p>分类</p>
			</li>
			<li class="release" @click="goRelease">
				<span :class="{selected:isSelected === 2}"></span>
				<p>发布</p>
			</li>
			<li class="my" @click="goMy">
				<span :class="{selected:isSelected === 3}"></span>
				<p>我的</p>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isSelected: 0
    }
  },
	methods: {
		goHome() {
			this.$router.push("/home");
			this.isSelected = 0;
		},
		goSort() {
			this.$router.push("/sort");
			this.isSelected = 1;
		},
		goRelease() {
			this.$router.push("/release");
			this.isSelected = 2;
		},
		goMy() {
			this.$router.push("/my");
			this.isSelected = 3;
		}
	},
	watch: {
		$route(to,from) {
			if(to.name === 'home'){
				this.isSelected = 0;
			}else if(to.name === 'brand'){
				this.isSelected = 1;
			}else if(to.name === 'type'){
				this.isSelected = 1;
			}else if(to.name === 'release'){
				this.isSelected = 2;
			}else if(to.name === 'my'){
				this.isSelected = 3;
			}
		}
	},
	created() {
		if(this.$route.name === "home") {
			this.isSelected = 0;
		}else if(this.$route.name === "brand") {
			this.isSelected = 1;
		}else if(this.$route.name === "type") {
			this.isSelected = 1;
		}else if(this.$route.name === "release") {
			this.isSelected = 2;
		}else if(this.$route.name === "my") {
			this.isSelected = 3;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tabbar{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		box-shadow: 0px 4px 22px 2px rgba(58, 58, 58, 0.15);
		z-index: 1;
	}
	.tabbar ul{
		display: flex;
	}
	.tabbar ul li{
		flex: 1;
		text-align: center;
		font-size: .24rem;
		color: #999;
		padding: .2rem 0;
	}
	.tabbar ul li span{
		display: inline-block;
	}
	.tabbar ul .home span{
		width: .28rem;
		height: .35rem;
		background: url(../../assets/images/public/home.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .home span.selected{
		background: url(../../assets/images/public/home_selected.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .sort span{
		width: .37rem;
		height: .35rem;
		background: url(../../assets/images/public/sort.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .sort span.selected{
		background: url(../../assets/images/public/sort_selected.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .release span{
		width: .33rem;
		height: .33rem;
		background: url(../../assets/images/public/release.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .release span.selected{
		background: url(../../assets/images/public/release_selected.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .my span{
		width: .31rem;
		height: .35rem;
		background: url(../../assets/images/public/my.png) no-repeat left top;
		background-size: 100%;
	}
	.tabbar ul .my span.selected{
		background: url(../../assets/images/public/my_selected.png) no-repeat left top;
		background-size: 100%;
	}
</style>
