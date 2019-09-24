<template>
  <div class="appraisalDetail">
		<Swiper>
			<HeaderTop title="鉴定"/>
			<ul class="detail">
				<li>
					<div class="left" v-if="detail !=''">
						<img :src="imgs[detail.type-1].img" alt=""/>
					</div>
					<div class="right">
						<div class="top">
							<p>{{ detail.title }}</p>
							<div>
								<span>{{ status[detail.status-1] }}</span>
							</div>
						</div>
						<p class="text">
							{{ detail.description }}
						</p>
						<ul>
							<li v-for="(item,index) in detail.imageList" :key="index">
								<img :src="item" alt=""/>
							</li>
						</ul>
					</div>
				</li>
			</ul>
			<div class="reply">
				<div class="left">
					<span></span>
				</div>
				<div class="right">
					<div>
						<p class="title">鉴定平台</p>
						<p class="time">{{ detail.timeDifference }}</p>
					</div>
					<p class="word">
						{{ detail.result }}
					</p>
				</div>
			</div>
		</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import HeaderTop from '../public/HeaderTop'
	const status = ["等待鉴定","已鉴定"];
	const imgs = [
			 {
				 img: require("../../assets/images/home/icon_1.png"),
			 },
			 {
				 img: require("../../assets/images/home/icon_2.png"),
			 },
			 {
			 	 img: require("../../assets/images/home/icon_3.png"),
			 },
			 {
			 	 img: require("../../assets/images/home/icon_4.png"),
			 },
			 {
			 	 img: require("../../assets/images/home/icon_5.png"),
			 },
			 {
			 	 img: require("../../assets/images/home/icon_6.png"),
			 }
	]
export default {
  name: '',
  data () {
    return {
      id: "",
	  status: status,
	  imgs: imgs,
	  detail: ""
    }
  },
	components: {
		Swiper,
		HeaderTop
	},
	created() {
		this.id = this.$route.params.id;
		let token = localStorage.getItem("token");
		this.baseJs.httpReq("/luxury/api/user/identification",this.id,{},"get",token)
		.then(res => {
			// console.log(res);
			this.detail = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/appraisalDetail.css';
</style>
