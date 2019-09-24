<template>
  <div class="ideaDetail">
		<Swiper ref="swiper">
				<HeaderTop :title="title"/>
				<p class="time">{{ detail.createTime }}</p>
				<div class="detail_step" v-html="detail.content">
				</div>
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
		this.baseJs.httpReq("/luxury/api/article",this.articleId,{},"get",token)
		.then(res => {
			// console.log(res);
			this.detail = res.data;
			this.title = res.data.title;
			this.$nextTick(function(){
				this.$refs.swiper.update();
			});
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
	.ideaDetail{
		height: 100%;
	}
	.ideaDetail .time{
		font-size: .36rem;
		color: #999;
		margin-left: .4rem;
		margin-top: -.14rem;
	}
	.ideaDetail .detail_step{
		width: 6.7rem;
		margin: 0 auto;
		margin-top: 1rem;
		font-size: .3rem;
		overflow: hidden;
	}
	.ideaDetail .detail_step .step{
		margin-bottom: .4rem;
	}
	.ideaDetail .detail_step .step h3{
		font-size: .3rem;
	}
	.ideaDetail .detail_step .step p{
		font-size: .26rem;
		margin: .4rem 0;
		letter-spacing: .02rem;
		line-height: .42rem;
	}
	.ideaDetail .detail_step .step div{
		width: 100%;
		height: 3.77rem;
	}
	.ideaDetail .detail_step .step img{
		width: 100%;
		height: 100%;
	}
</style>
