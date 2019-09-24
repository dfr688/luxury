<template>
  <div class="sort">
		<!-- <Swiper> -->
			<ul class="link_list">
				<li :class="{active:isTrue}" @click="goBrand">
					品牌
				</li>
				<li :class="{active:!isTrue}" @click="goType">
					分类
				</li>
			</ul>
			<router-view></router-view>
		<!-- </Swiper> -->
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	
export default {
  name: '',
  data () {
    return {
      isTrue: true
    }
  },
	components: {
		Swiper
	},
	methods: {
		// 品牌
		goBrand() {
			this.isTrue = true;
			this.$router.push("/sort/brand");
		},
		// 分类
		goType() {
			this.isTrue = false;
			this.$router.push("/sort/type");
		}
	},
	watch: {
		$route(to,from) {
			if(to.name === 'brand'){
				this.isTrue = true;
			}else if(to.name === 'type'){
				this.isTrue = false;
			}
		}
	},
	created() {
		if(this.$route.name ==="brand"){
			this.isTrue = true;
		}else if(this.$route.name ==="type"){
			this.isTrue = false;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.sort{
		height: 100%;
    width: 100%;
    padding-bottom: 1.2rem;
    box-sizing: border-box;
	}
	.sort .link_list{
		display: flex;
		padding-top: 1rem;
		padding-left: .4rem;
	}
	.sort .link_list li{
		font-size: .36rem;
		margin-right: .5rem;
		height: .7rem;
		line-height: .7rem;
		color: #999;
	}
	.sort .link_list li.active{
		font-size: .52rem;
		color: #333;
	}
</style>
