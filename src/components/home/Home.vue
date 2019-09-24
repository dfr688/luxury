<template>
  <div class="home">
		<Swiper>
		<div class="top">
			<span>首页</span>
			<div>
				<i @click="goSearchList"></i>
			</div>
		</div>
		<div class="banner"></div>
		<!-- 权威鉴定 养护技巧 -->
		<ul class="authority_skill">
			<li @click="goAppraisal"></li>
			<li @click="goSkill"></li>
		</ul>
		<div class="offline"></div>
		<!-- 今日上新 -->
		<div class="update">
			<p class="title">今日上新</p>
			<div class="wrap">
					<div class="contain">
						<ul class="clearfix">
							<li class="fl" v-for="(todayList,index) in todayLists" :key="todayList.id" @click="goProductDetail(todayList.id)">
								<div class="image">
									<img :src="todayList.imgUrl" alt=""/>
								</div>
								<div class="tit"><span>全新</span>{{ todayList.title }}</div>
								<p><span>¥ {{ todayList.newPrice }}</span></p>
							</li>
						</ul>
					</div>
			</div>
		</div>
		<!-- 优选推荐 -->
		<div class="option">
			<p class="title">优选推荐</p>
			<Com :lists="goodOptions"/>
		</div>
		</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import Com from '../public/Com'
	
export default {
  name: '',
  data () {
    return {
      todayLists: [],
	  goodOptions: []
    }
  },
	components: {
		Swiper,
		Com
	},
	methods: {
		// 鉴定
		goAppraisal() {
			this.$router.push("/appraisal");
		},
		// 养护技巧
		goSkill() {
			this.$router.push("/skill");
		},
		// 列表页
		goSearchList() {
			this.$router.push("/searchlist");
		},
		// 今日上新 进入详情
		goProductDetail(id) {
			this.$router.push({name:"productdetail",params:{id:id}});
		}
	},
	created() {
		// 今日上新
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/luxury/api/luxury/today",{},"get",token)
		.then(res => {
			// console.log(res);
			this.todayLists = res.data;
		})
		.catch(err => {
			console.log(err);
		});
		// 优选推荐
		this.baseJs.ajaxReq("/luxury/api/luxury/optimal",{},"get",token)
		.then(res => {
			// console.log(res);
			this.goodOptions = res.data;
			// console.log(this.goodOptions);
		})
		.catch(err => {
			console.log(err);
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/home.css';
</style>
