<template>
  <div class="collection">
		<Swiper>
			<HeaderTop title="我的收藏"/>
			<Com :lists="collectLists"/>
		</Swiper>
  </div>
</template>

<script>
	import Com from '../public/Com'
	import Swiper from '../public/Swiper'
	import HeaderTop from '../public/HeaderTop'
	
export default {
  name: '',
  data () {
    return {
	  collectLists: [],
    }
  },
	components: {
		Com,
		Swiper,
		HeaderTop
	},
	methods: {
		
	},
	created() {
		// 收藏列表
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/luxury/api/user/collection",{},"get",token)
		.then(res => {
			// console.log(res);
			this.collectLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.collection{
		height: 100%;
	}
</style>
