<template>
  <div class="myRelease">
		<Swiper>
			<HeaderTop title="我的发布"/>
			<div class="content">
				<ul>
					<li v-for="(item,index) in list" :key="item.id">
						<div class="left">
							<img :src="item.imgUrl" alt=""/>
						</div>
						<div class="right">
							<p class="title"><span>{{ item.quality }}新</span>{{ item.title }}</p>
							<p class="price">¥ {{ item.newPrice }}</p>
							<div>
								<span @click="goEdit(item.id)">编辑</span><span @click="goDelete(item.id)">删除</span>
							</div>
						</div>
					</li>
				</ul>
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
      list: []
    }
  },
	components: {
		HeaderTop,
		Swiper
	},
	methods: {
		// 编辑
		goEdit(id) {
			this.$router.push({name:'release',query:{luxuryId:id}});
		},
		getData() {
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/luxury/api/user/luxury/publish",{},"get",token)
			.then(res => {
				// console.log(res);
				this.list = res.data;
				// console.log(this.list);
			})
			.catch(err => {
				console.log(err);
			})
		},
		// 删除
		goDelete(id) {
			let token = localStorage.getItem("token");
			this.baseJs.httpReq("/luxury/api/user/luxury/publish",id,{},"delete",token)
			.then(res => {
				// console.log(res);
				if(res.code === 200){
					Toast({
					  message: res.sms,
					  duration: 1000
					});
					this.getData();
				}
			})
			.catch(err => {
				console.log(err);
			})
		}
	},
	created() {
		this.getData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.myRelease{
		height: 100%;
	}
	.myRelease .content ul li{
		display: flex;
		margin: .8rem .4rem;
	}
	.myRelease .content ul li .left{
		 flex: 1;
	}
	.myRelease .content ul li .left img{
		width: 1.6rem;
		height: 1.6rem;
    max-width: 1.6rem;
    max-height: 1.6rem;
	}
	.myRelease .content ul li .right{
		flex: 2.4;
	}
	.myRelease .content ul li .right .title{
		font-size: .28rem;
		width: 4.72rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.myRelease .content ul li .right .title span{
		display: inline-block;
		font-size: .18rem;
		width: .6rem;
		height: .32rem;
		text-align: center;
		line-height: .32rem;
		color: #fff;
		background: #d01e07;
		border-radius: .04rem;
		margin-right: .1rem;
	}
	.myRelease .content ul li .right .price{
		font-size: .32rem;
		font-weight: bold;
		margin: .1rem 0  .24rem 0;
	}
	.myRelease .content ul li .right div{
		font-size: .24rem;
		color: #2e323b;
	}
	.myRelease .content ul li .right div span{
		display: inline-block;
		width: .88rem;
		height: .38rem;
		border-radius: .1rem;
		border: 1px solid #999;
		line-height: .38rem;
		text-align: center;
	}
	.myRelease .content ul li .right div span:last-child{
		margin-left: .2rem;
	}
</style>
