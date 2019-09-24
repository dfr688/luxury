<template>
  <div class="skillDetail">
		<Swiper ref="swiper">
				<HeaderTop :title="title"/>
				<p class="time">{{ detail.createTime }}</p>
				<div class="detail_step" v-html="detail.content"></div>
		</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import HeaderTop from '../public/HeaderTop'
	
export default {
  name: '',
  data () {
    return {
    title: "",
	  articleId: "",
	  detail: ""
    }
  },
	components: {
		Swiper,
		HeaderTop
	},
	created() {
		this.articleId = this.$route.params.id;
		let token = localStorage.getItem("token");
		this.baseJs.httpReq("/luxury/api/raiders",this.articleId,{},"get",token)
		.then(res => {
			// console.log(res);
			this.detail = res.data;
			this.title = res.data.title;
// 			this.$nextTick(function(){
// 				this.$refs.swiper.update();
// 			})
			setTimeout(() => {
				this.$refs.swiper.update();
			},500)
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.skillDetail{
		height: 100%;
	}
	.skillDetail .time{
		font-size: .36rem;
		color: #999;
		margin-left: .4rem;
		margin-top: -.14rem;
	}
	.skillDetail .detail_step{
		width: 6.7rem;
		margin: 0 auto;
		margin-top: 1rem;
		font-size: .3rem;
		overflow-x: hidden;
	}
</style>
