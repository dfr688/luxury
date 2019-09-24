<template>
  <div class="suggest">
		<Swiper>
		<HeaderTop title="意见反馈"/>
		<div class="text">
			<textarea name="" id="" placeholder="详细叙述你的建议，我们将不断改善" v-model="text"></textarea>
		</div>
		<div class="contact">
			<p>联系方式</p>
			<input type="text" placeholder="请输入手机号或邮箱，以便我们给你反馈" v-model="phone"/>
		</div>
		<div class="btn" @click="goToSubmit">
			提交
		</div>
		</Swiper>
  </div>
</template>

<script>
	import HeaderTop from '../public/HeaderTop'
	import Swiper from '../public/Swiper'
	import { Toast } from 'mint-ui';
	
export default {
  name: '',
  data () {
    return {
      text: "",
	  phone: ""
    }
  },
	components: {
		HeaderTop,
		Swiper
	},
	methods: {
		// 提交
		goToSubmit() {
			if(this.text === ""){
				Toast({
				  message: '请输入您的反馈！',
				  duration: 1000
				});
			}else if(this.phone === ""){
				Toast({
				  message: '请填写您的联系方式！',
				  duration: 1000
				});
			}else{
				Toast({
				  message: '感谢您的反馈！',
				  duration: 1000
				});
				this.$router.push("/my");
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.suggest{
		height: 100%;
	}
	.suggest .text{
		width: 6.7rem;
		height: 5.09rem;
		background: #fff;
		box-shadow: 0px -4px 22px 2px rgba(58, 58, 58, 0.15);
		border-radius: .1rem;
		margin: 0 auto;
		margin-top: .64rem;
	}
	.suggest .text textarea{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		font-size: .3rem;
		padding: 0 .24rem;
		padding-top: 1rem;
	}
	.suggest .contact{
		width: 6.7rem;
		height: 2rem;
		background: #fff;
		box-shadow: 0px -4px 22px 2px rgba(58, 58, 58, 0.15);
		border-radius: .1rem;
		margin: 0 auto;
		margin-top: .2rem;
		box-sizing: border-box;
		padding: 0 .24rem;
		padding-top: .4rem;
		font-size: .36rem;
	}
	.suggest .contact p{
		margin-bottom: .2rem;
	}
	.suggest .contact input{
		width: 100%;
		font-size: .3rem;
	}
	.suggest .btn{
		width: 6.7rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .32rem;
    color: #fff;
    background: #2e323b;
    border-radius: .4rem;
    margin: 0 auto;
    margin-top: .7rem;
	}
</style>
