<template>
    <div class="city">
        <!-- <CityHeader></CityHeader> -->
		<div class="header">
			<i @click="goReturn"></i>
			<p>城市</p>
		</div>
		<div class="search" @click="goSearch">
			<input type="text" placeholder="输入城市搜索" readonly onfocus="this.blur()"/>
			<i></i>
		</div>
		<mt-index-list>
			<div class>
				<ul>
					<li></li>
				</ul>
			</div>
			<mt-index-section v-for="(item,index) in cities" :index="item.initial" :key="index">
				<mt-cell @click.native="goBack(itemList.name,itemList.code)" v-for="(itemList,index) in item.list" :title="itemList.name" :key="index"></mt-cell>
			</mt-index-section>
		</mt-index-list>
    </div>
</template>

<script>
	import CityHeader from './CityHeader'
	import axios from 'axios'
  import bus from '../../assets/js/eventBus.js'

export default {
    data () {
        return {
            cities:[], // 城市列表
            hotCity:[], //热门城市
        }
    },
    components: {
        CityHeader,
    },
    methods:{
		goReturn() {
			this.$router.go(-1);
		},
		goSearch(){
			this.$router.push({name:'searchcity'});
		},
		goBack(name,code){
			let fromRoute = localStorage.getItem('backNames');
			this.$router.push({name:fromRoute,params:{city:name,code:code}});
		},
        getCityInfo () {
            axios.get('/static/city.json').then(this.getCityInfoSucc)   //请求本地配置的mock数据
        },
        getCityInfoSucc(res){
			 res = res.data.city;
			this.cities = res;
			// console.log(this.cities)
        }
    },
    mounted () {
        this.getCityInfo ()
    },
	beforeRouteEnter(to,from,next){
		localStorage.setItem('backNames', from.name);
		next();
	},
  beforeDestroy() {
    bus.$emit('passKeepAliveState','keep');
  }
}
</script>

<style scoped>
	.city{
		height: 100%;
	}
	.city .search{
		width: 6.7rem;
		height: .6rem;
		margin: .2rem auto;
		margin-bottom: .3rem;
		background-color: #eee;
		border-radius: .05rem;
		font-size: .26rem;
		position: relative;
	}
	.city .search input{
		width: 100%;
		height: 100%;
		font-size: .26rem;
		padding-left: .6rem;
		box-sizing: border-box;
	}
	.city .search i{
		width: .28rem;
		height: .28rem;
		background: url(../../assets/images/sort/search.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		left: .2rem;
		top: .18rem;
	}
	.header{
		padding-top: 1rem;
		padding-left: .4rem;
		padding-right: .4rem;
		font-size: .52rem;
	}
	.header i{
		display: inline-block;
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
		margin-bottom: .4rem;
	}
	.header p{
		margin-bottom: .3rem;
	}
</style>
