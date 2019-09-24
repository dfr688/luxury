<template>
  <div class="headerTop">
		<i @click="goBack"></i>
		<p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      
    }
  },
	props: [
		"title"
	],
	methods: {
		// 返回
		goBack() {
			this.$router.go(-1);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.headerTop{
		padding-top: 1rem;
		padding-left: .4rem;
		padding-right: .4rem;
		font-size: .52rem;
	}
	.headerTop i{
		display: inline-block;
		width: .21rem;
		height: .43rem;
		background: url(../../assets/images/public/back.png) no-repeat left top;
		background-size: 100%;
		margin-bottom: .4rem;
	}
	.headerTop p{
		margin-bottom: .3rem;
	}
</style>
