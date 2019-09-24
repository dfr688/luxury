<template>
  <div class="appraisal">
		<Swiper>
		  <HeaderTop title="鉴定"/>
			<div class="appraisal_btn">
				<ul>
					<li class="online" @click="goOnline"></li>
					<li class="idea" @click="goIdea"></li>
				</ul>
			</div>
			<div class="my_appraisal">
				<p class="title">我的鉴定</p>
				<ul>
					<li v-for="(item,index) in appraisalLists" :key="item.id" @click="goDetail(item.id)" >
						<div class="left">
							<img :src="imgs[item.type -1].img" alt=""/>
						</div>
						<div class="right">
							<div class="top">
								<p>{{ item.title }}</p>
								<div>
									<span>{{ status[item.status-1] }}</span>
								</div>
							</div>
							<p class="text">
								{{ item.description }}
							</p>
							<ul>
								<li v-for="(img,index) in item.imageList" :key="index">
									<img :src="img" alt=""/>
								</li>
							</ul>
						</div>
					</li>
				</ul>
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
      appraisalLists: [],
	  status: status,
	  imgs: imgs
    }
  },
	components: {
		Swiper,
		HeaderTop
	},
	methods: {
		// 鉴定详情
		goDetail(id) {
			this.$router.push({name:"appraisaldetail",params:{id:id}});
		},
		// 在线鉴定
		goOnline() {
			this.$router.push("/online");
		},
		// 鉴定妙招
		goIdea() {
			this.$router.push("/idea");
		}
	},
	created() {
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/luxury/api/user/identification",{},"get",token)
		.then(res => {
			// console.log(res);
			this.appraisalLists = res.data;
		})
		.catch(err => {
			console.log(err)
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/appraisal.css';
</style>
