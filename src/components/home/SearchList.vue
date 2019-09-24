<template>
  <div class="searchList">
		<div class="back" @click="goBack"></div>
		<div class="search" @click="goSearch">
			<input type="text" placeholder="输入品牌或关键词搜索" readonly onfocus="this.blur()"/>
			<i></i>
		</div>
		<div class="screen">
			<ul>
				<li @click="popPlace">
					<input type="text" v-model="place" readonly onfocus="this.blur()"/><i></i>
				</li>
				<li @click="popBrand">
					<input type="text" v-model="brand" readonly onfocus="this.blur()"/><i></i>
				</li>
				<li @click="popType">
					<input type="text" v-model="type" readonly onfocus="this.blur()"/><i></i>
				</li>
				<li @click="popSort">
					<input type="text" v-model="sort" readonly onfocus="this.blur()"/><i></i>
				</li>
			</ul>
			<div class="popup" v-show="popUp">
				<ul>
					<li v-for="(item,index) in popList.list" @click="selectPop(item,index,popList.type)" :key="index">{{item}}</li>
				</ul>
			</div>
		</div>
		<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
			<ComDiff :lists="searchList"/>
			<div v-if="allLoaded" class="data-none">没有更多数据了</div>
			<div slot="top" class="mint-loadmore-top" style="text-align:center">
				<span class="release" v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">释放加载</span>
				<span class="release" v-show="topStatus === 'loading'">加载中...</span>
			</div>
		</mt-loadmore>
		<div class="noProduct" v-if="searchList.length === 0">暂无商品</div>
  </div>
</template>

<script>
	import ComDiff from '../public/ComDiff'
	import axios from 'axios'

export default {
  name: 'searchlist',
  data () {
    return {
     searchList: [],
		page: 1,
		allLoaded: false,
		topStatus: "",
		place: "地点",
		placeCode: 0,
		brand: "品牌",
		brandId: 0,
		type: "分类",
		typeIndex: false,
		sort: "排序",
		sortIndex: false,
		citys: [],
		popUp: false,
		popList: [],
    flag: 0
    }
  },
	components: {
		ComDiff
	},
	methods: {
    goBack() {
      this.$router.go(-1);
    },
		popPlace(){
			this.popUp = !this.popUp;
      let t = 1;
      if(this.flag != t){
        this.popUp = true;
        this.flag = t;
      }
			this.popList = {
				type: "place",
				list: ["合肥市","深圳市","苏州市","厦门市","三亚市","无锡市","武汉市","更多"],
				codelist:[340100,440300,320500,350200,460200,320200,420100]
			}
		},
		popBrand(){
			// this.$router.push("/sort/brand");
			this.popUp = !this.popUp;
      let t = 2;
      if(this.flag != t){
        this.popUp = true;
        this.flag = t;
      }
			this.popList = {
				type: "brand",
				list: ["朗格","阿玛尼","宝诗龙","百年灵","宝格丽","卡地亚","蔻驰","更多"],
				codelist:[60,12,21,64,29,62,44]
			}
		},
		popType(){
			this.popUp = !this.popUp;
      let t = 3;
      if(this.flag != t){
        this.popUp = true;
        this.flag = t;
      }
			this.popList = {
				type: "type",
				list: ["精致箱包","精品鞋履","高级成衣","珍贵珠宝","至臻腕表","时尚配饰"]
			}
		},
		popSort(){
			this.popUp = !this.popUp;
      let t = 4;
      if(this.flag != t){
        this.popUp = true;
        this.flag = t;
      }
			this.popList = {
				type: "sort",
				list: ["时间升序","时间降序","价格升序","价格降序"]
			}
		},
		selectPop(value,index,type){
			if(type === "sort"){
				this.sort = value;
				this.sortIndex = index + 1;
			}else if(type === "type"){
				this.type = value;
				this.typeIndex = index + 1;
			}else if(type === "place"){
				if(value == "更多"){
					this.$router.push("/city");
				}else{
					this.place = value;
					this.placeCode = this.popList.codelist[index];
				}
			}else if(type === "brand"){
				if(value == "更多"){
					this.$router.push("/brandgo");
				}else{
					this.brand = value;
					this.brandId = this.popList.codelist[index];
				}
			}
			this.sendPost();
			this.popUp = false;
		},
		sendPost(){
			//发送请求
			let token = localStorage.getItem("token");
			let data = {
				pageNum: 1,
				pageSize: 10
			}
			if(this.typeIndex !== false){
				data.type = this.typeIndex;
			}
			if(this.sortIndex !== false){
				data.orderBy = this.sortIndex;
			}
			if(this.placeCode != 0){
				data.address = this.placeCode;
			}
			if(this.brandId != 0){
				data.brandId = this.brandId;
			}
			this.baseJs.ajaxReq("/luxury/api/luxury",data,"get",token).
			then(res => {
				// console.log(res);
				this.searchList = res.data.list;
			})
			.catch(err => {
				console.log(err);
			})
		},
		goSearch() {
			this.$router.push("/search");
		},
		getList(page) {
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/luxury/api/luxury",{type:this.typeIndex,pageNum:page,pageSize:10},"get",token)
			.then(res => {
						// console.log(res);
						this.typeLists = res.data.list;
			})
			.catch(err => {
						console.log(err);
			})
		},
		loadBottom() {
			this.page = this.page + 1;
			// 发送请求
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/luxury/api/luxury",{type:this.typeIndex,pageNum:this.page,pageSize: 10},"get",token)
			.then(res => {
				// console.log(res);
				if(this.page > res.data.pages){
					this.allLoaded = true;
				}else{
					this.typeLists = this.typeLists.concat(res.data.list);
				}
				this.$refs.loadmore.onBottomLoaded();
				// console.log(this.typeLists);
			})
			.catch(err => {
				console.log(err);
			});
		},
		loadTop() {
			this.handleTopChange("loading");//下拉时 改变状态码
			this.getList(1);
			this.allLoaded = false;
			this.page = 1;
			setTimeout(() => {
		            this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
		            this.$refs.loadmore.onTopLoaded();
		        }, 800);
			// console.log(this.topStatus);
		},
		handleTopChange(status) {
		    this.topStatus = status;
		}
	},
	activated() {
		//接收参数
		let code = this.$route.params.code;
		if(code){
			this.placeCode = code;
		}
		let city = this.$route.params.city;
		if(city){
			this.place = city;
			this.sendPost();return;
		}
		let brandId = this.$route.params.brandId;
		if(brandId){
			this.brandId = brandId;
		}
		let brand = this.$route.params.name;
		if(brand){
			this.brand = brand;
			this.sendPost();return;
		}

		let token = localStorage.getItem("token");
		let data = {
			pageNum: 1,
			pageSize: 10,
// 			type: "",
// 			address: "",
// 			brandId: "",
// 			orderBy: "",
		}
		this.baseJs.ajaxReq("/luxury/api/luxury",data,"get",token).
		then(res => {
			// console.log(res);
			this.searchList = res.data.list;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.searchList{
		padding-top: 1rem;
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		box-sizing: border-box;
		position: relative;
	}
	.searchList .noProduct{
		margin-top: 3rem;
		font-size: .3rem;
		text-align: center;
	}
	.searchList .back{
		width: .21rem;
    height: .43rem;
    background: url(../../assets/images/public/back.png) no-repeat left top;
    background-size: 100%;
		margin-left: .4rem;
		margin-bottom: .3rem;
	}
	.searchList .search{
		width: 6.7rem;
		height: .6rem;
		margin: .2rem auto;
		margin-bottom: .3rem;
		background-color: #eee;
		border-radius: .05rem;
		font-size: .26rem;
		position: relative;
	}
	.searchList .search input{
		width: 100%;
		height: 100%;
		font-size: .26rem;
		padding-left: .6rem;
		box-sizing: border-box;
	}
	.searchList .search i{
		width: .28rem;
		height: .28rem;
		background: url(../../assets/images/sort/search.png) no-repeat left top;
		background-size: 100%;
		position: absolute;
		left: .2rem;
		top: .18rem;
	}
	.searchList .screen{
		width: 100%;
		margin-bottom: .2rem;
	}
	.searchList .screen>ul{
		display: flex;
		margin-top: .4rem;
	}
	.searchList .screen>ul li{
		width: 25%;
		text-align: center;
		font-size: .3rem;
	}
	.searchList .screen>ul li input{
		width: 50%;
		font-size: .3rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.searchList .screen>ul li i{
		display: inline-block;
		width: .3rem;
		height: .18rem;
		background: url(../../assets/images/home/down.png) no-repeat left top;
		background-size: 100%;
	}
	.searchList .screen .popup{
		background-color: #fff;
		width: 100%;
		position: absolute;
		top: 3.3rem;
		left: 0;
		z-index: 1;
	}
	.searchList .screen .popup ul{
		display: flex;
		flex-wrap: wrap;
		margin: 0 .1rem;
	}
	.searchList .screen .popup ul li{
		width: 22%;
		text-align: center;
		font-size: .3rem;
		height: .8rem;
		line-height: .8rem;
		background: #f7f9fa;
		border-radius: .4rem;
		margin: .1rem;
	}
</style>
