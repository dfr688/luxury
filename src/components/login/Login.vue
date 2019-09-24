<template>
  <div class="login">
		 <div class="top"> 
			 <HeaderTop title="登录"/>
			 <div class="tip">还没有账号，<router-link to="/register">立即注册</router-link></div>
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
		 </ul>
		 <div class="btn" @click="goToLogin">
			登录
		 </div>
  </div>
</template>

<script>
	import Vcode from '../public/Vcode'
	import HeaderTop from '../public/HeaderTop'
	import { Toast } from 'mint-ui';
	
export default {
  name: 'login',
  data () {
    return {
      phone: "",
	  psw: ""
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
		// 登录按钮
		goToLogin() {
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
			}else{
				this.baseJs.ajaxReq("/luxury/api/signIn",{phone:this.phone,password:this.psw},'post',"")
				.then(res => {
					// console.log(res);
					if(res.code != 200){
						Toast({
							message: res.sms,
							duration: 1000
						});
						this.$router.push("/my");
					}else{
						// 缓存token
						localStorage.setItem("token",res.data);
						// 缓存手机号
						localStorage.setItem("phone",this.phone);
						Toast({
							message: res.sms,
							duration: 1000
						});
						let signRoute = localStorage.getItem("signRoute");
						let detailId = localStorage.getItem("detailId");
						if(signRoute === "productdetail"){
							this.$router.push({name:signRoute,params:{id:detailId}})
						}else{
							this.$router.push({name: signRoute});
						}	
					}
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	},
	beforeRouteEnter(to, from, next) {
		localStorage.setItem("signRoute",from.name);
		localStorage.setItem("detailId",from.params.id);
		next();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login{
		height: 100%;
	}
	.login .top .tip{
		font-size: .3rem;
		margin-top: .4rem;
		margin-left: .4rem;
	}
	.login .top .tip a{
		color: #d4aa6e;
	}
	.login ul{
		margin: 0 .5rem;
		margin-top: 1.2rem;
	}
	.login ul li{
		font-size: .32rem;
		margin-bottom: .4rem;
		padding-bottom: .3rem;
		border-bottom: 1px solid #eee;
	}
	.login ul li p{
		margin-bottom: .3rem;
	}
	.login ul li p i{
		display: inline-block;
		margin-right: .2rem;
		margin-bottom: -.05rem;
	}
	.login ul li p .phone_icon{
		width: .28rem;
		height: .42rem;
		background: url(../../assets/images/login/phone_icon.png) no-repeat left top;
		background-size: 100%;
	}
	.login ul li p .psw_icon{
		width: .28rem;
		height: .37rem;
		background: url(../../assets/images/login/psw_icon.png) no-repeat left top;
		background-size: 100%;
	}
	.login ul li input{
		font-size: .32rem;
	}
	.login .btn{
		width: 6.7rem;
		height: .8rem;
		background: #2e323b;
		border-radius: .4rem;
		font-size: .36rem;
		color: #fff;
		text-align: center;
		line-height: .8rem;
		margin: 0 auto;
		margin-top: 1.2rem;
	}
</style>
