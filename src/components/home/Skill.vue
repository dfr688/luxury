<template>
  <div class="skill">
		<Swiper>
			<HeaderTop title="养护技巧"/>
			<ul>
				<li v-for="(skillList,index) in skillLists" :key="skillList.id" @click="goSkillDetail(skillList.id)">
					<div class="image">
						<img :src="skillList.image" alt=""/>
					</div>
					<div class="info">
						<p class="title">{{ skillList.title }}</p>
						<p class="time">{{ formatDate(skillList.createTime) }}</p>
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
      skillLists: []
    }
  },
	components: {
		Swiper,
		HeaderTop
	},
	methods: {
		// 养护技巧详情
		goSkillDetail(id) {
			this.$router.push({name:"skilldetail",params:{id:id}});
		}
	},
	created() {
		// 获取养护技巧列表
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/luxury/api/raiders",{},"get",token)
		.then(res => {
			// console.log(res);
			this.skillLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.skill{
		height: 100%;
	}
	.skill ul li{
		width: 6.7rem;
		margin: 0 auto;
		margin-top: .5rem;
		margin-bottom: .6rem;
	}
	.skill ul li .image{
		width: 100%;
		height: 3.77rem;
	}
	.skill ul li .image img{
		width: 100%;
		height: 100%;
	}
	.skill ul li .info{
		display: flex;
		margin-top: .3rem;
	}
	.skill ul li .info .title{
		flex: 3;
		font-size: .32rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.skill ul li .info .time{
		flex: 1;
		font-size: .28rem;
		color: #999;
		height: .42rem;
		line-height: .42rem;
		text-align: right;
	}
</style>
