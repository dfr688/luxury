<template>
  <div class="productDetail">
		<Swiper v-if="detail!=''">
			<div class="top">
				<img :src="detail.luxuryInfo.imgUrl" alt=""/>
				<i @click="goBack"></i>
			</div>
			<div class="wrap">
				<div class="intro">
					<div class="title">
						<span>{{ detail.luxuryInfo.quality }}新</span>
						<p>{{ detail.luxuryInfo.title }}</p>
					</div>
					<div class="info">
						<div>
							<p>￥{{ detail.luxuryInfo.newPrice }}</p>
							<span>购买价：{{ detail.luxuryInfo.price }}</span>
						</div>
						<p><i></i>浏览：285</p>
					</div>
					<div class="tags">
						<span v-for="(item,index) in detail.labelList" :key="index">{{ tags[item-1] }}</span>
					</div>
				</div>
				<div class="about">
					<p class="title">关于</p>
					<ul class="basic">
						<li v-if="isShow">
							<span>品牌</span>
							<p>{{ detail.luxuryBrand.chineseName }}/{{ detail.luxuryBrand.englishName }}</p>
						</li>
						<li v-if="isSee">
							<span>型号</span>
							<p>{{ detail.luxuryInfo.model }}</p>
						</li>
						<li>
							<span>颜色</span>
							<p>{{ detail.luxuryInfo.color }}</p>
						</li>
						<li>
							<span>成色</span>
							<p>{{ detail.luxuryInfo.quality }}新</p>
						</li>
						<li v-if="isTrue">
							<span>尺寸</span>
							<p>{{ detail.luxuryInfo.size }}</p>
						</li>
						<li>
							<span>产地</span>
							<p>{{ detail.luxuryInfo.productionPlace }}</p>
						</li>
						<li>
							<span>适用人群</span>
							<p>{{ gender[detail.luxuryInfo.gender] }}</p>
						</li>
						<li>
							<span>附件</span>
							<p>{{ detail.luxuryInfo.annex }}</p>
						</li>
					</ul>
					<ul class="other">
						<li>
							<span>购买时间</span>
							<p>{{ formatDate(detail.luxuryInfo.buyTime) }}</p>
						</li>
						<li>
							<span>购买渠道</span>
							<p>{{ detail.luxuryInfo.buyType }}</p>
						</li>
						<li>
							<span>交易地点</span>
							<p>{{ detail.luxuryInfo.address }}</p>
						</li>
					</ul>
				</div>
				<div class="picture" v-if="detail.luxuryInfo.imageList.length!=0">
					<p>图片</p>
					<ul>
						<li v-for="(img,index) in detail.luxuryInfo.imageList" :key="index">
							<img :src="img" alt=""/>
						</li>
					</ul>
				</div>
				<div class="remark">
					{{ detail.luxuryInfo.description }}
				</div>
			</div>
		</Swiper>	
		<!-- 底部 -->
		<div class="consult" v-if="detail!=''">
			<a :href="'tel:'+ detail.userInfo.phone" v-if="!isLogin"></a>
			<div v-if="isLogin" @click="goPhone"></div>
			<p>
				<span :class="{active:collected}" @click="collect"></span>
			</p>
		</div>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import { Toast } from 'mint-ui';
	import axios from 'axios'
	const tags = ["限量版","明星同款","抖音同款","可议价","经典款"];
	const gender = ["不限","男","女"]
	
export default {
  name: 'ProductDetail',
  data () {
    return {
      luxuryId: "",
	  tags: tags,
	  gender: gender,
	  detail: "",
	  collected: false,
	  isShow : false,
	  isSee: false,
	  isTrue: false,
	  cities : [],
	  isLogin: true
    }
  },
	components: {
		Swiper
	},
	methods: {
		goBack() {
			// let remarkG = localStorage.getItem("remarkG");
			this.$router.go(-1);
		},
		// 联系卖家
		goPhone() {
			Toast({
			message: "请先登录！",
			duration: 1000
			});
			this.$router.push("/login");
		},
		getCityInfo () {
		    axios.get('/static/city.json').then(this.getCityInfoSucc)   //请求本地配置的mock数据
		},
		getCityInfoSucc(res){
			 let arr = res.data.city;
			for(let i=0;i<arr.length;i++){
				let list = arr[i].list;
				for(let j = 0;j<list.length;j++){
					this.cities.push(list[j]);
				}
			}
		},
		// 收藏与取消收藏
		collect() {
			if(this.collected){
				if(localStorage.getItem("token")===null){
					Toast({
					message: "请先登录！",
					duration: 1000
					});
					this.$router.push("/login");
				}else{
					// 取消收藏
					this.collected = false;
					let token = localStorage.getItem("token");
					this.baseJs.httpReq("/luxury/api/user/collection",this.luxuryId,{},"delete",token)
					.then(res => {
						// console.log(res);
						if(res.code === 200){
							Toast({
							message: "取消成功！",
							duration: 1000
							});
						}
					})
					.catch(err => {
						console.log(err);
					})
				}
			}else{
				// 收藏
				if(localStorage.getItem("token")===null){
					Toast({
					message: "请先登录！",
					duration: 1000
					});
					this.$router.push("/login");
				}else{
					this.collected = true;
					let token = localStorage.getItem("token");
					this.baseJs.ajaxReq("/luxury/api/user/collection",{luxuryId:this.luxuryId},"put",token)
					.then(res => {
						// console.log(res);
						if(res.code === 200){
							Toast({
							message: "收藏成功！",
							duration: 1000
							});
						}
					})
					.catch(err => {
						console.log(err);
					})
				}
			}
		}
	},
	created() {
		this.getCityInfo();
		
		this.luxuryId = this.$route.params.id;
		let token = localStorage.getItem("token");
		this.baseJs.httpReq("/luxury/api/luxury",this.luxuryId,{},"get",token)
		.then(res => {
			// console.log(res);
			this.detail = res.data;
			// console.log(this.detail);
			//根据地址code获取name
			for(let k = 0;k<this.cities.length;k++){
				if(this.cities[k].code == this.detail.luxuryInfo.address){
					this.detail.luxuryInfo.address = this.cities[k].name;
				}
			}
			
			if(this.detail.luxuryBrand === undefined){
				this.isShow = false;
			}else{
				this.isShow = true;
			}

			if(this.detail.luxuryInfo.model === undefined ||this.detail.luxuryInfo.model===""){
				this.isSee = false;
			}else{
				this.isSee = true;
			}

			if(this.detail.luxuryInfo.size === undefined){
				this.isTrue = false;
			}else{
				this.isTrue = true;
			}
			this.collected = res.data.luxuryInfo.collected;
			// console.log(this.detail);
		})
		.catch(err => {
			console.log(err);
		});

		if(token === null){
			this.isLogin = true;
		}else{
			this.isLogin = false;
		}
	},
	// beforeRouteEnter(to, from, next) {
	// 	 localStorage.setItem("remarkG",from.name)
	// 	 console.log(from.name)
	// 	 next();
	// }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/productDetail.css';
</style>
