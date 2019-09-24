<template>
  <div class="type">
	 <Swiper>
		<ul>
			<li v-for="(img,index) in imgs" :key="index" @click="goTypeList(index)">
				<img :src="img.img" alt=""/>
			</li>
		</ul>
	</Swiper>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	
	const imgs = [
		{
			img: require("../../assets/images/sort/sort_1.png"),
		},
		{
			img: require("../../assets/images/sort/sort_2.png"),
		},
		{
			img: require("../../assets/images/sort/sort_3.png"),
		},
		{
			img: require("../../assets/images/sort/sort_4.png"),
		},
		{
			img: require("../../assets/images/sort/sort_5.png"),
		},
		{
			img: require("../../assets/images/sort/sort_6.png"),
		}
	]
export default {
  name: '',
  data () {
    return {
      imgs: imgs
    }
  },
  components: {
	  Swiper
  },
  methods: {
	  // 获取列表
	  goTypeList(index) {
		  let typeIndex = index + 1;
		  this.$router.push({name:"typelist",params:{typeIndex:typeIndex}});
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.type{
		height: 87%;
	}
	.type ul{
		display: flex;
		margin: 0 .4rem;
		flex-wrap: wrap;
		margin-top: .6rem;
	}
	.type ul li{
		width: 3.24rem;
		height: 2.6rem;
		margin-bottom: .2rem;
	}
	.type ul li:nth-child(2n-1){
		margin-right: .22rem;
	}
	.type ul li img{
		width: 100%;
		height: 100%;
	}
</style>
