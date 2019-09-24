<template>
  <div id="app">
	  <keep-alive :include="keepAlivePage">
		   <router-view/>
	  </keep-alive>
	<Tabbar v-if="isSee"/>
  </div>
</template>

<script>
	import Tabbar from './components/public/Tabbar'

export default {
  name: 'App',
	data() {
		return {
			isSee: true,
			keepAlivePage: "searchlist,release"
		}
	},
	components: {
		Tabbar
	},
	watch: {
		$route(to,from) {
			// 判断是否显示tabbar
			if(to.name === "home" || to.name === "brand" || to.name === "type" || to.name === "release" || to.name === "my"){
				this.isSee = true;
			}else{
				this.isSee = false;
			}

			if (to.name === 'home' && from.name === 'searchlist'){
			  this.keepAlivePage = 'login,release';
			} else {
			  this.keepAlivePage = 'searchlist,release';
			}
		}
	},
	created() {
		if(this.$route.name === "home" || this.$route.name === "brand" || this.$route.name === "type" || this.$route.name === "release" || this.$route.name === "my"){
			this.isSee = true;
		}else{
			this.isSee = false;
		};
	}
}
</script>

<style>

</style>
