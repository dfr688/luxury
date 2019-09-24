<template>
  <div class="browse">
		<Swiper>
			<HeaderTop title="我的浏览"/>
			<Com :lists="browseLists"/>
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
      browseLists: []
    }
  },
	components: {
		Com,
		Swiper,
		HeaderTop
	},
	created() {
		// 浏览记录
		let token = localStorage.getItem("token");
		this.baseJs.ajaxReq("/luxury/api/user/history",{},"get",token)
		.then(res => {
			// console.log(res);
			this.browseLists = res.data;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.browse{
		height: 100%;
	}
</style>
