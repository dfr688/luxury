<template>
  <div class="brandGo">
    <HeaderTop title="品牌"/>
    <div class="search" @click="goSearch">
    	<input type="text" placeholder="输入品牌或关键词搜索" readonly onfocus="this.blur()"/>
    	<i></i>
    </div>
    <mt-index-list>
    	<div class>
    		<ul>
    			<li></li>
    		</ul>
    	</div>
    	<mt-index-section v-for="(item,index) in arr" :index="item.key" :key="index">
    		<mt-cell @click.native="goBrandList(itemList.id,itemList.chineseName)" v-for="(itemList,index) in item.value" :title="itemList.englishName+'/'+itemList.chineseName" :key="itemList.id"></mt-cell>
    	</mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
  import HeaderTop from '../public/HeaderTop'
export default {
  name: 'brandgo',
  data () {
    return {
       arr: []
    }
  },
  components: {
    HeaderTop
  },
  methods: {
      // 搜索
    goSearch() {
    	this.$router.push({name:'search'});
    },
    goBrandList(id,name){
    	let fromRoute = localStorage.getItem('backName');
    	if(fromRoute === 'home'){
    		this.$router.push({name:'brandlist',params:{id:id}});
    	}else{
    		this.$router.push({name:fromRoute,params:{brandId:id,name:name}});
    	}
    }
  },
  created() {
    let token = localStorage.getItem("token");
    this.baseJs.ajaxReq("/luxury/api/brand",{},"get",token)
    .then(res => {
    	// console.log(res);
    	this.arr = res.data;
    	// console.log(this.arr);
    })
    .catch(err => {
    	console.log(err);
    })
  },
  beforeRouteEnter(to,from,next){
  	localStorage.setItem('backName', from.name);
  	next();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .brandGo .search{
  	width: 6.7rem;
  	height: .6rem;
  	margin: .2rem auto;
  	margin-bottom: .3rem;
  	background-color: #eee;
  	border-radius: .05rem;
  	font-size: .26rem;
  	position: relative;
  }
  .brandGo .search input{
  	width: 100%;
  	height: 100%;
  	font-size: .26rem;
  	padding-left: .6rem;
  	box-sizing: border-box;
  }
  .brandGo .search i{
  	width: .28rem;
  	height: .28rem;
  	background: url(../../assets/images/sort/search.png) no-repeat left top;
  	background-size: 100%;
  	position: absolute;
  	left: .2rem;
  	top: .18rem;
  }
</style>
