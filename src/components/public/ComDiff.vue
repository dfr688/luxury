<template>
  <div class="com">
		<div class="commend">
			<ul>
				<li v-for="(list,index) in lists" :key="index" @click="goProductDetail(list.id)">
					<div class="image">
						<img :src="list.imgUrl" alt=""/>
					</div>
					<div class="tit"><span>{{ list.quality }}新</span>{{ list.title }}</div>
					<p><span>¥ {{ list.newPrice }}</span></p>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isCollect: []  //存放已经收藏的产品id
    }
  },
  props: [
	  "lists"
  ],
  methods: {
	  // 产品详情
	  goProductDetail(id) {
		  this.$router.push({name:'productdetail',params:{id:id}});
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.com{
		height: 100%;
	}
	.com .commend{
		width: 100%;
		padding: 0 .25rem;
		box-sizing: border-box;
	}
	.com .commend ul{
		display: flex;
		flex-wrap: wrap;
	}
	.com .commend ul li{
		width: 3.2rem;
		margin: 0 .15rem;
		padding-bottom: .3rem;
	}
	.com .commend ul li .image{
		width: 100%;
		height: 2.8rem;
	}
	.com .commend ul li .image img{
		width: 100%;
		height: 2.8rem;
	}
	.com .commend ul li .tit{
		font-size: .28rem;
		margin-top: .2rem;
		width: 3.2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.com .commend ul li .tit span{
		display: inline-block;
		font-size: .18rem;
		width: .6rem;
		height: .32rem;
		text-align: center;
		line-height: .32rem;
		color: #fff;
		background: #d01e07;
		border-radius: .04rem;
		margin-right: .2rem;
	}
	.com .commend ul li p{
		font-size: .24rem;
		margin-top: .1rem;
	}
	.com .commend ul li p span{
		font-size: .32rem;
		font-weight: bold;
	}
</style>
