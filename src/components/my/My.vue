<template>
  <div class="my">
	<Swiper>
		<div class="top">
			我的
		</div>
		<div class="info">
			<div>
				<img src="../../assets/images/my/headImg.png" alt=""/>
			</div>
			<p class="login_register" v-if='isLogin' @click="goLogin">登录/注册</p>
			<p v-if='!isLogin'>{{ phone }}</p>
		</div>
		<div class="list">
			<ul>
				<li class="browse" @click="goBrowse">
					<div class="left">
						<i></i><span>我的浏览</span>
					</div>
					<div class="right">
						<span>{{ browseLists.length }}</span><i></i>
					</div>
				</li>
				<li class="collect" @click="goCollect">
					<div class="left">
						<i></i><span>我的收藏</span>
					</div>
					<div class="right">
						<span>{{ collectLists.length }}</span><i></i>
					</div>
				</li>
				<li class="my_release" @click="goMyRelease">
					<div class="left">
						<i></i><span>我的发布</span>
					</div>
					<div class="right">
						<span>{{ list.length }}</span><i></i>
					</div>
				</li>
				<li class="suggest" @click="goSuggest">
					<div class="left">
						<i></i><span>意见反馈</span>
					</div>
					<div class="right">
						<i></i>
					</div>
				</li>
				<li class="version">
					<div class="left">
						<i></i><span>版本信息</span>
					</div>
					<div class="right">
						<span>1.1.0</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="signOut" @click="goToSignOut">
			退出登录
		</div>
	</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
export default {
  name: '',
  data () {
    return {
      phone: "",
	  browseLists: [],
	  collectLists: [],
	  list: [],
	  isLogin: true
    }
  },
	components: {
		Swiper
	},
	methods: {
		// 去登录
		goLogin() {
			this.$router.push("/login");
		},
		// 浏览
		goBrowse() {
			this.$router.push("/browse");
		},
		// 收藏
		goCollect() {
			this.$router.push("/collection");
		},
		// 发布
		goMyRelease() {
			this.$router.push("/myrelease");
		},
		// 意见反馈
		goSuggest() {
			this.$router.push("/suggest");
		},
		 // 隐藏手机中间四位
		geTel(tel) {
			return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
		},
		// 退出登录
		goToSignOut() {
			localStorage.removeItem("phone");
			localStorage.removeItem("token");
			this.isLogin = true;
		}
	},
	created() {
		this.phone = localStorage.getItem("phone");
		if(this.phone != null){
		  this.phone = this.geTel(this.phone);
		}
		
		let token = localStorage.getItem("token");
		// 浏览记录
		this.baseJs.ajaxReq("/luxury/api/user/history",{},"get",token)
		.then(res => {
			// console.log(res);
			this.browseLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
		// 收藏
		this.baseJs.ajaxReq("/luxury/api/user/collection",{},"get",token)
		.then(res => {
			// console.log(res);
			this.collectLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
		// 我的发布
		this.baseJs.ajaxReq("/luxury/api/user/luxury/publish",{},"get",token)
		.then(res => {
			// console.log(res);
			this.list = res.data;
			// console.log(this.list);
		})
		.catch(err => {
			console.log(err);
		})

		if(token == null){
			this.isLogin = true;
		}else{
			this.isLogin = false;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/my.css';
</style>
