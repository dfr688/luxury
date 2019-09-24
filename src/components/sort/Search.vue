<template>
  <div class="search">
		<!-- <Swiper> -->
			<div class="back">
				<i @click="goBack"></i>
			</div>
			<mt-search v-model="value" ref="mtSearch">
				<mt-cell @click.native="goBrandList(item)" v-for="(item,index) in filterResult" :key="index" :title="item">
				</mt-cell>
			</mt-search>
		<!-- </Swiper> -->
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'

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
		const a= this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
	  const noContent = ["对不起，没有符合的品牌"];
	  return (a.length === 0) ? noContent : a
    }
  },
	components: {
		Swiper
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		goBrandList(name){
			let fromRoute = localStorage.getItem('backName');
			// console.log(fromRoute);
			let id = this.getIdByName(name);
			if(fromRoute == 'searchlist'){
				this.$router.push({name:'searchlist',params:{brandId:id,name:name}});
			}else{
				this.$router.push({name:'brandlist',params:{id:id}});
			}
		},
		getIdByName(name){
			for(let i=0;i<this.res.length;i++){
				if(this.res[i].englishName+"/"+this.res[i].chineseName === name){
					return this.res[i].id;
				}
			}
		}
	},
 created() {
	 let token = localStorage.getItem("token");
	 this.baseJs.ajaxReq("/luxury/api/brand",{},"get",token)
	 .then(res => {
	 	// console.log(res);
	 	let arr = res.data;
		for(let i=0;i<arr.length;i++){
			let value = arr[i].value;
			for(let j = 0;j<value.length;j++){
				this.defaultResult.push(value[j].englishName+"/"+value[j].chineseName);
				this.res.push(value[j]);
			}
		}
	 })
	 .catch(err => {
	 	console.log(err);
	 })
 },
mounted(){
    this.$nextTick(()=>{
        let cancel = this.$refs.mtSearch.$el.querySelectorAll('.mint-searchbar-cancel')[0];
        cancel.onclick=()=>{
          this.$router.go(-1);
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
