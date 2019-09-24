<template>
  <div class="online">
		<Swiper>
			<div class="top">
					<i @click="goBack"></i>
					<p>在线鉴定</p>
			</div>
			<div class="step"></div>
			<div class="title">
				<div class="line"></div><div class="tit">在线鉴定</div><div class="line"></div>
			</div>
			<ul>
				<li>
					<p>标题</p>
					<div>
						<input type="text" placeholder="如：Rogervivier芭蕾舞鞋" v-model="brandTitle"/>
					</div>
				</li>
				<li @click="chooseType">
					<p>分类 </p>
					<div>
						<input type="text" placeholder="如:精品鞋履" v-model="type" readonly onfocus="this.blur()"/>
					</div>
				</li>
				<li>
					<p>描述</p>
					<div>
						<input type="text" placeholder="入手渠道等" v-model="description"/>
					</div>
				</li>
				<li class="photo">
					<p>照片</p>
					<div>
						<Upload @giveData="giveData"/>
					</div>
				</li>
			</ul>
			<div class="note">
				注：请上传商品整体照，logo及所有刻印或品牌图案的细节图，商品各个细节以及附件并保证图片清晰
			</div>
			<div class="btn" @click="goToSubmit">
				提交
			</div>
		</Swiper>
		<!-- 分类弹框 -->
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="types">
			  <div>
				  <p v-for="(type,index) in types" :key="index" @click="chooseItem(index)">
					  {{ type }}
				  </p>
			  </div>
		  </div>
		</mt-popup>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import Upload from '../public/Upload'
	import { Toast } from 'mint-ui';
	let types = ["精致箱包","精品鞋履","高级成衣","珍贵珠宝","至臻腕表","时尚配饰"];
	
export default {
  name: '',
  data () {
    return {
      brandTitle: "",
	  type: "",
	  description: "",
	  imageArr: [],
	  popupVisible: false,
	  types: types,
	  itemIndex: ""
    }
  },
	components: {
		Swiper,
		Upload
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		// 获取上传的图片，确定是否上传
		giveData(val) {
			this.imageArr = val;
		},
		// 分类弹框
		chooseType() {
			this.popupVisible = true;
		},
		// 选择分类
		chooseItem(index) {
			this.itemIndex = index + 1;
			this.type = this.types[index];
			this.popupVisible = false;
		},
		// 提交按钮
		goToSubmit() {
			if(this.brandTitle === ""){
				Toast({
				  message: '请填写标题',
				  duration: 1000
				});
			}else if(this.type === ""){
				Toast({
				  message: '请选择分类',
				  duration: 1000
				});
			}else if(this.description === ""){
				Toast({
				  message: '请填写描述',
				  duration: 1000
				});
			}else if(this.imageArr.length === 0){
				Toast({
				  message: '请上传图片',
				  duration: 1000
				});
			}else{
				let token = localStorage.getItem("token");
				let data = {
					title:this.brandTitle,
					type:this.itemIndex,
					description:this.description,
					imageList: []
				}
				for(let i=0;i<this.imageArr.length;i++){
					data.imageList.push(this.imageArr[i][0]);
				};
				this.baseJs.ajaxReq("/luxury/api/identification",data,"put",token)
				.then(res => {
					// console.log(res);
					if(res.code === 200){
						Toast({
						  message: res.sms,
						  duration: 1000
						});
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	},
	created() {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/online.css';
</style>
