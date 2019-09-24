<template>
  <div class="search">
		<!-- <Swiper> -->
			<div class="back">
				<i @click="goReturn"></i>
			</div>
			<mt-search v-model="value" ref="mtSearch">
				<mt-cell @click.native="goBack(item)" v-for="(item,index) in filterResult" :key="index" :title="item">
				</mt-cell>
			</mt-search>
		<!-- </Swiper> -->
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import axios from 'axios'

export default {
  name: '',
  data () {
    return {
		defaultResult : [],
		value : "",
		res : [],
    }
  },
  computed: {
    filterResult() {
      const a = this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
		const noCity = ["对不起，没有符合的地址"];
		return (a.length === 0) ? noCity : a
	}
  },
	components: {
		Swiper
	},
	methods: {
		goReturn() {
			this.$router.go(-1);
		},
		goBack(name){
      let backName = localStorage.getItem("backNames");
			this.$router.push({name:backName,params:{city:name}});
		}
	},
 created() {
	 let token = localStorage.getItem("token");
	 axios.get('/static/city.json')
	 .then(res => {
		 let arr = res.data.city;
		for(let i=0;i<arr.length;i++){
			let list = arr[i].list;
			for(let j = 0;j<list.length;j++){
				this.defaultResult.push(list[j].name);
				this.res.push(list[j]);
			}
		}
		// console.log(this.defaultResult);
	 })
	 .catch(err => {
	 	console.log(err);
	 })
 },
mounted(){
    this.$nextTick(()=>{
        let cancel = this.$refs.mtSearch.$el.querySelectorAll('.mint-searchbar-cancel')[0];
        cancel.onclick=()=>{
            this.$router.push("/city");
        }
    })
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.search{
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}
	.search .back{
		padding-top: .3rem;
	}
	.search .back i{
		display: inline-block;
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
		margin-left: .4rem;
	}
</style>
