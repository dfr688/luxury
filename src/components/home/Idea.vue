<template>
  <div class="idea">
		<Swiper>
			<HeaderTop title="鉴定妙招"/>
			<ul>
				<li v-for="(ideaList,index) in ideaLists" :key="ideaList.id" @click="goIdeaDetail(ideaList.id)">
					<div class="image">
						<img :src="ideaList.image" alt=""/>
					</div>
					<div class="info">
						<p class="title">{{ ideaList.title }}</p>
						<p class="time">{{ formatDate(ideaList.createTime) }}</p>
					</div>
				</li>
			</ul>
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
      ideaLists: []
    }
  },
	components: {
		Swiper,
		HeaderTop
	},
	methods: {
		// 妙招详情
		goIdeaDetail(id) {
			this.$router.push({name:"ideadetail",params:{id:id}});
		}
	},
	created() {
		// 获取鉴定妙招列表
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/luxury/api/article",{},"get",token)
		.then(res => {
			// console.log(res);
			this.ideaLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.idea{
		height: 100%;
	}
	.idea ul li{
		width: 6.7rem;
		margin: 0 auto;
		margin-top: .5rem;
		margin-bottom: .6rem;
	}
	.idea ul li .image{
		width: 100%;
		height: 3.77rem;
	}
	.idea ul li .image img{
		width: 100%;
		height: 100%;
	}
	.idea ul li .info{
		display: flex;
		margin-top: .3rem;
	}
	.idea ul li .info .title{
		flex: 3;
		font-size: .32rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.idea ul li .info .time{
		flex: 1;
		font-size: .28rem;
		color: #999;
		height: .42rem;
		line-height: .42rem;
		text-align: right;
	}
</style>
