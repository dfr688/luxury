<template>
    <div class="header">
       <i @click="goBack"></i>
	    <p>城市</p>
    </div>
</template>

<script>
	import HeaderTop from "../public/HeaderTop"
	
export default {
    components: {
		HeaderTop
    },
    methods: {
        // 返回
		goBack() {
            // this.$router.go(-1);
            this.$router.push("/home");
		}
    },
    beforeRouteEnter(to,from,next){
        console.log(from.name);
        console.log(1);
    }
}
</script>

<style scoped>
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