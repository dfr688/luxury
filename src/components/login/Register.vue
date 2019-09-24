<template>
  <div class="register">
		 <div class="top">
			 <HeaderTop title="注册"/>
			 <div class="tip">已有账号，<router-link to="/login">立即登录</router-link></div>
		 </div>
		 <ul>
			 <li>
				 <p><i class="phone_icon"></i>手机号码</p>
				 <input type="text" placeholder="请输入您的手机号" v-model="phone"/>
			 </li>
			 <li>
				 <p><i class="psw_icon"></i>密码</p>
				 <input type="password" placeholder="请输入登录密码" v-model="psw"/>
			 </li>
			 <li>
				 <p><i class="code_icon"></i>验证码</p>
				 <div>
					 <input type="text" placeholder="请输入验证码" v-model="code"/>
					 <div>
						 <Vcode :phone="phone"/>
					 </div>
				 </div>
			 </li>
		 </ul>
		 <div class="btn" @click="goToRegister">
			 注册
		 </div>
     <div class="remarkTip">
       注册即表示同意<router-link to="/pravicy">《隐私政策》</router-link>
     </div>
  </div>
</template>

<script>
	import Vcode from '../public/Vcode'
	import HeaderTop from '../public/HeaderTop'
	import { Toast } from 'mint-ui';

export default {
  name: '',
  data () {
    return {
      phone: "",
	  psw: "",
	  code: ""
    }
  },
	components: {
		Vcode,
		HeaderTop
	},
	methods: {
		// 返回
		goBack() {
			this.$router.go(-1);
		},
		// 注册按钮
		goToRegister() {
			if(this.phone == ""){
				Toast({
					message: '手机号不能为空',
					duration: 1000
				});
			}else if(this.psw == ""){
				Toast({
					message: '密码不能为空',
					duration: 1000
				});
			}else if(!/^[0-9]{6,18}$/.test(this.psw)){
				Toast({
					message: '请输入6到18位数字！',
					duration: 1000
				});
			}else if(this.code == ""){
				Toast({
					message: '验证码不能为空',
					duration: 1000
				});
			}else{
				this.baseJs.ajaxReq("/luxury/api/signUp",{phone:this.phone,smsCode:this.code,password:this.psw},'post',"")
				.then(res => {
					// console.log(res);
					if(res.code != 200){
						Toast({
							message: res.sms,
							duration: 1000
						});
					}else{
						Toast({
							message: res.sms,
							duration: 1000
						});
						this.$router.push("/login");
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.register{
		height: 100%;
	}
	.register .top .tip{
		font-size: .3rem;
		margin-top: .4rem;
		margin-left: .4rem;
	}
	.register .top .tip a{
		color: #d4aa6e;
	}
	.register ul{
		margin: 0 .5rem;
		margin-top: 1.2rem;
	}
	.register ul li{
		font-size: .32rem;
		margin-bottom: .4rem;
		padding-bottom: .3rem;
		border-bottom: 1px solid #eee;
	}
	.register ul li p{
		margin-bottom: .3rem;
	}
	.register ul li p i{
		display: inline-block;
		margin-right: .2rem;
		margin-bottom: -.05rem;
	}
	.register ul li p .phone_icon{
		width: .28rem;
		height: .42rem;
		background: url(../../assets/images/login/phone_icon.png) no-repeat left top;
		background-size: 100%;
	}
	.register ul li p .psw_icon{
		width: .28rem;
		height: .37rem;
		background: url(../../assets/images/login/psw_icon.png) no-repeat left top;
		background-size: 100%;
	}
	.register ul li p .code_icon{
		width: .34rem;
		height: .4rem;
		background: url(../../assets/images/login/code_icon.png) no-repeat left top;
		background-size: 100%;
	}
	.register ul li input{
		font-size: .32rem;
	}
	.register ul li>div{
		display: flex;
	}
	.register .btn{
		width: 6.7rem;
		height: .8rem;
		background: #2e323b;
		border-radius: .4rem;
		font-size: .36rem;
		color: #fff;
		text-align: center;
		line-height: .8rem;
		margin: 0 auto;
		margin-top: .6rem;
	}
  .register .remarkTip{
    font-size: .3rem;
    text-align: center;
    margin-top: .2rem;
  }
  .register .remarkTip a{
    color: #ff4c4c;
  }
</style>
