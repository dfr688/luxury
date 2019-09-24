<template>
  <div class="BrandList">
		<!-- <Swiper> -->
		<HeaderTop title="搜索结果"/>
		<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
			<ComDiff :lists="typeLists"/>
			<div v-if="allLoaded" class="data-none">没有更多数据了</div>
			<div slot="top" class="mint-loadmore-top" style="text-align:center">
				<span class="release" v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">释放加载</span>
				<span class="release" v-show="topStatus === 'loading'">加载中...</span>
			</div>
		</mt-loadmore>
		<div class="noProduct" v-if="typeLists.length === 0">暂无商品</div>
		<!-- </Swiper> -->
  </div>
</template>

<script>
	import ComDiff from '../public/ComDiff'
	import HeaderTop from '../public/HeaderTop'
	import Swiper from '../public/Swiper'
	
	const titles = ["精致箱包","精品鞋履","高级成衣","珍贵珠宝","至臻腕表","时尚配饰"]
export default {
  name: '',
  data () {
    return {
      typeLists: [],
			titles: titles,
			page: 1,
			allLoaded: false,
			topStatus: "",
			brandId: ""
    }
  },
	components: {
		ComDiff,
		HeaderTop,
		Swiper
	},
	methods: {
		getList(page) {
			let token = localStorage.getItem("token");
			this.baseJs.ajaxReq("/luxury/api/luxury",{brandId:this.brandId,pageNum:page,pageSize:10},"get",token)
			.then(res => {
						// console.log(res);
						this.typeLists = res.data.list;
						// console.log(this.typeLists)
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
				if(this.page >= res.data.pages){
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
	created() {
		this.brandId = this.$route.params.id;
		this.getList(1);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.BrandList{
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	.BrandList .noProduct{
		margin-top: 3rem;
		font-size: .3rem;
		text-align: center;
	}
</style>
