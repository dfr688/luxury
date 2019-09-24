<template>
  <div class="release">
		<Swiper>
			<HeaderTop title="发布"/>
			<div class="wrap">
				<div class="part_one">
					<div class="title">
						<p class="tit">标题</p>
						<div>
							<input type="text" placeholder="如：欧米茄机械男表" v-model="title"/>
						</div>
					</div>
					<div class="text">
						<textarea name="" id="" placeholder="请添加你的宝贝相关备注信息，让大家更加了解它" v-model="description"></textarea>
					</div>
					<div class="upload">
						<div v-if="showImg" class="uploadImg">
							<img :src="item" v-for="(item,index) in imageArr" itemprop="thumbnail"/>
						</div>
						<Upload v-if="!showImg" @giveData="giveData"/>
					</div>
				</div>
				<div class="part_two">
					<ul>
						<li>
							<p class="left">价格</p>
							<div class="right">
								<input type="number" pattern="[0-9]*" placeholder="¥ 0.00" v-model="newPrice"/>
							</div>
						</li>
						<li>
							<p class="left">购买价</p>
							<div class="right">
								<input type="number" pattern="[0-9]*" placeholder="¥ 0.00" v-model="price"/>
							</div>
						</li>
						<li class="type" @click="appearPopup">
							<p class="left">分类</p>
							<div class="right">
								<input type="text" placeholder="请选择分类" readonly onfocus="this.blur()" v-model="kind"/><i></i>
							</div>
						</li>
						<li>
							<p class="left">型号</p>
							<div class="right">
								<input type="text" placeholder="请填写官方规格型号" v-model="model"/>
							</div>
						</li>
						<li>
							<p class="left">尺寸</p>
							<div class="right">
								<input type="text" placeholder="填写长*宽*高尺寸（cm或mm)" v-model="size"/>
							</div>
						</li>
						<li>
							<p class="left">颜色</p>
							<div class="right">
								<input type="text" placeholder="请填写商品颜色" v-model="color"/>
							</div>
						</li>
						<li>
							<p class="left">成色</p>
							<div class="right">
								<input type="number" pattern="[0-9]*" placeholder="新旧程度，如：95新" v-model="quality"/>
							</div>
						</li>
						<li>
							<p class="left">产地</p>
							<div class="right">
								<input type="text" placeholder="生产产地，如：法国" v-model="place"/>
							</div>
						</li>
						<li class="people">
							<p class="left">适用人群</p>
							<div class="right">
								<!-- <input id="man" ref="man" name="sex" type="radio"/><label for="man">男士</label><input id="woman" ref="woman" name="sex" type="radio"/><label for="woman">女士</label><input id="nolimit" ref="nolimit" name="sex" type="radio"/><label for="nolimit">不限</label> -->
								<label :for="item.id" v-for="(item,index) in keyValues"><input v-model="checkedValue" class="border_w" type="radio" name="Q3"  :value="index" :id="item.id"/><label for=""></label>{{ item.text }}</label>
							</div>
						</li>
						<li>
							<p class="left">附件</p>
							<div class="right">
								<input type="text" placeholder="如：包装袋、鉴定证书等" v-model="annex"/>
							</div>
						</li>
						<li class="buy_time">
							<p class="left">购买时间</p>
							<div class="right">
								<input type="text" placeholder="请选择购买时间" readonly onfocus="this.blur()" @click="openPicker" v-model="buyTime"/><i></i>
							</div>
						</li>
						<li>
							<p class="left">购买渠道</p>
							<div class="right">
								<input type="text" placeholder="如免税店、代购等" v-model="buyType"/>
							</div>
						</li>
						<li class="place" @click="goCity">
							<p class="left">交易地点</p>
							<div class="right">
								<input type="text" placeholder="请选择交易地点" readonly onfocus="this.blur()" v-model="address"/><i></i>
							</div>
						</li>
						<li class="tag">
							<p class="left">标签</p>
							<div class="right">
								<span :class="{active:item.selected}" v-for="(item,index) in tags" :key="index" @click="chooseTag(index)">{{ item.tag }}</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="btn" @click="goRealse">发布</div>
				<!-- 温馨提示 -->
				<div class="prompt">
					<div>温馨提示</div>
					<p>1.请上传清晰的商品实拍图</p>
					<p>2.为确保商品早日售出，请上传商品各个细节图及相关附件图。</p>
					<p>3.二手奢侈品仅支持线下交易。</p>
				</div>
			</div>
		</Swiper>
		<!-- 分类弹框 -->
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="types">
			  <div>
				  <p v-for="(type,index) in types" :key="index" @click="chooseItem(index)">
					  {{ type }}
				  </p>
			  </div>
		  </div>
		</mt-popup>
		<!-- 时间弹框 -->
		<mt-datetime-picker
			v-model="pickerVisible"
			ref="picker"
			type="date"
			year-format="{value} "
			month-format="{value} "
			date-format="{value} "
			@confirm="handleConfirm">
		</mt-datetime-picker>
  </div>
</template>

<script>
	import Swiper from '../public/Swiper'
	import HeaderTop from '../public/HeaderTop'
	import Upload from '../public/Upload'
	import { Toast } from 'mint-ui';
	import axios from 'axios'
  import bus from '../../assets/js/eventBus.js'
	const types = ["精致箱包","精品鞋履","高级成衣","珍贵珠宝","至臻腕表","时尚配饰"];
	const tags = [
		{
			tag: "限量版",
			selected: false
		},
		{
			tag: "明星同款",
			selected: false
		},
		{
			tag: "抖音同款",
			selected: false
		},
		{
			tag: "可议价",
			selected: false
		},
		{
			tag: "经典款",
			selected: false
		}
		];
	const keyValues = [
		{
			text: "不限",
			id: "nolimit",
		},
		{
			text: "男",
			id: "man",
		},
		{
			text: "女",
			id: "woman",
		},
		];
export default {
  name: 'release',
  data () {
    return {
	  types: types,
	  tags: tags,
	  keyValues: keyValues,
	  popupVisible: false,
      title: "",
	  description: "",
	  imageArr:[],
	  newPrice: "",
	  price: "",
	  kind: "",
	  kindIndex: "",
	  model: "",
	  size: "",
	  color: "",
	  quality: "",
	  place: "",
	  people: "",
	  annex: "",
	  buyTime: "",
	  buyType: "",
	  address: "",
	  pickerVisible: "",
	  checkedValue: "",
	  cities: [],
	  addressCode: "",
	  luxuryId: "",
	  showImg : false,
     keepAliveState: ''
    }
  },
	components: {
		Swiper,
		HeaderTop,
		Upload
	},
	watch: {
		checkedValue: function(newV,oldV){
			this.people = newV;
		}
	},
	computed:{

	},
	methods: {
		giveData(val) {
			this.imageArr = val;
		},
		chooseTag(index) {
			this.tags[index].selected = !this.tags[index].selected;
		},
		// 分类弹框
		appearPopup() {
			this.popupVisible = true;
		},
		// 选择种类
		chooseItem(index) {
			this.kind = types[index];
			this.kindIndex = index + 1;
			this.popupVisible = false;
		},
		// 选择城市
		goCity() {
			this.$router.push("/city");
		},
		// 打开时间选择器
		openPicker() {
			this.$refs.picker.open();
			this.pickerVisible = new Date();
		},
		// 点击日期选择器中的确定按钮 获取当前选择的值
		handleConfirm() {
			this.buyTime = this.format(this.pickerVisible);
			// console.log(this.buyTime);
		},
		// 点击发布按钮
		goRealse() {
			if(this.title ===""){
				Toast({
				  message: '请填写标题！',
				  duration: 1000
				});
			}else if(this.description ===""){
				Toast({
				  message: '请填写描述信息！',
				  duration: 1000
				});
			}else if(this.imageArr.length === 0){
				Toast({
				  message: '请上传图片！',
				  duration: 1000
				});
			}else if(this.newPrice === ""){
				Toast({
				  message: '请填写价格！',
				  duration: 1000
				});
			}else if(!/^[0-9]+.?[0-9]*$/.test(this.newPrice)){
				Toast({
				  message: '请填写数字！',
				  duration: 1000
				});
			}else if(this.price === ""){
				Toast({
				  message: '请填写购买价！',
				  duration: 1000
				});
			}else if(!/^[0-9]+.?[0-9]*$/.test(this.price)){
				Toast({
				  message: '请填写数字！',
				  duration: 1000
				});
			}else if(this.kind === ""){
				Toast({
				  message: '请填写分类！',
				  duration: 1000
				});
			}else if(this.model === ""){
				Toast({
				  message: '请填写型号！',
				  duration: 1000
				});
			}else if(this.size === ""){
				Toast({
				  message: '请填写尺寸！',
				  duration: 1000
				});
			}else if(this.color === ""){
				Toast({
				  message: '请填写颜色！',
				  duration: 1000
				});
			}else if(this.quality === ""){
				Toast({
				  message: '请填写成色！',
				  duration: 1000
				});
			}else if(!/^[0-9]+.?[0-9]*$/.test(this.quality)){
				Toast({
				  message: '请填写数字！',
				  duration: 1000
				});
			}else if(this.place === ""){
				Toast({
				  message: '请填写产地！',
				  duration: 1000
				});
			}else if(this.people === ""){
				Toast({
				  message: '请勾选适用人群！',
				  duration: 1000
				});
			}else if(this.annex === ""){
				Toast({
				  message: '请填写附件！',
				  duration: 1000
				});
			}else if(this.buyTime === ""){
				Toast({
				  message: '请填写购买时间！',
				  duration: 1000
				});
			}else if(this.buyType === ""){
				Toast({
				  message: '请填写购买渠道！',
				  duration: 1000
				});
			}else if(this.address === ""){
				Toast({
				  message: '请填写交易地点！',
				  duration: 1000
				});
			}else{
				// 发送请求
				let token = localStorage.getItem("token");
				if(!this.luxuryId){
					//新增
					let data = {
						title: this.title,
						description: this.description,
						imageList: [],
						newPrice: parseInt(this.newPrice),
						price: parseInt(this.price),
						type: this.kindIndex,
						model: this.model,
						size: this.size,
						color: this.color,
						quality: parseInt(this.quality),
						productionPlace: this.place,
						gender: this.people,
						annex: this.annex,
						buyTime: this.buyTime + " 00:00:00",
						buyType: this.buyType,
						address: this.addressCode,
						labelList: []
					}
					for(let i=0;i<this.imageArr.length;i++){
						data.imageList.push(this.imageArr[i][0]);
					};
					for(let j=0;j<this.tags.length;j++){
						if(this.tags[j].selected){
							data.labelList.push(j+1);
						}
					};
					this.baseJs.ajaxReq("/luxury/api/user/luxury",data,"put",token)
					.then(res => {
						// console.log(res);
						if(res.code ===200){
							Toast({
							  message: res.sms,
							  duration: 1000
							});
							this.$router.push("/home");
						}
					})
					.catch(err => {
						console.log(err);
					})
				}else{
					//更新
					let data = {
						title: this.title,
						description: this.description,
						price: parseInt(this.price),
						newPrice: parseInt(this.newPrice),
						type: this.kindIndex,
						model: this.model,
						gender: this.people,
						buyTime: this.buyTime + " 00:00:00",
						address: this.addressCode,
						size: this.size,
						color: this.color,
						productionPlace: this.place,
						annex: this.annex,
						buyType: this.buyType,
						quality: parseInt(this.quality),
						// labelList: [],
					}
// 					for(let j=0;j<this.tags.length;j++){
// 						if(this.tags[j].selected){
// 							data.labelList.push(j+1);
// 						}
// 					};
					this.baseJs.ajaxReq("/luxury/api/user/luxury/"+this.luxuryId,data,"post",token)
					.then(res => {
						// console.log(res);
						if(res.code ===200){
							Toast({
							  message: res.sms,
							  duration: 1000
							});
							this.$router.push("/home");
						}
					})
					.catch(err => {
						console.log(err);
					})
				}
			}
		},
		getCityInfo () {
		    axios.get('/static/city.json').then(this.getCityInfoSucc)   //请求本地配置的mock数据
		},
		getCityInfoSucc(res){
			 let arr = res.data.city;
			for(let i=0;i<arr.length;i++){
				let list = arr[i].list;
				for(let j = 0;j<list.length;j++){
					this.cities.push(list[j]);
				}
			}
			// console.log(this.cities)
			for(let k = 0;k<this.cities.length;k++){
				if(this.cities[k].name === this.address){
					this.addressCode = this.cities[k].code;
					// console.log(this.addressCode)
				}
			}
		}
	},
	activated() {
    if (!this.keepAliveState) {
      this.title = "",
      this.description = "",
      this.imageArr = [],
      this.newPrice = "",
      this.price = "",
      this.kind = "",
      this.kindIndex = "",
      this.model = "",
      this.size = "",
      this.color = "",
      this.quality = "",
      this.place = "",
      this.people = "",
      this.annex = "",
      this.buyTime = "",
      this.buyType = "",
      this.address = "",
      this.pickerVisible = "",
      this.checkedValue = "",
      this.cities = [],
      this.addressCode = "",
      this.luxuryId = "",
      this.showImg = false;
      for(let i=0;i<this.tags.length;i++){
      		this.tags[i].selected = false;
      }
    }

		this.address = this.$route.params.city;
		this.getCityInfo();

 		//接收luxuryId 如果存在代表更新，不存在代表新增
		this.luxuryId = this.$route.query.luxuryId;

		//如果luxuryId存在，就获取数据
		if(this.luxuryId){
			let token = localStorage.getItem("token");
			this.baseJs.httpReq("/luxury/api/luxury",this.luxuryId,{},"get",token)
			.then(res => {
				this.title = res.data.luxuryInfo.title;
				this.description = res.data.luxuryInfo.description;
				this.imageArr = res.data.luxuryInfo.imageList;
				this.showImg = true;
				this.newPrice = res.data.luxuryInfo.newPrice;
				this.price = res.data.luxuryInfo.price;
				this.kind = types[res.data.luxuryInfo.type - 1];
				this.model = res.data.luxuryInfo.model;
				this.size = res.data.luxuryInfo.size;
				this.color = res.data.luxuryInfo.color;
				this.quality = res.data.luxuryInfo.quality;
				this.place = res.data.luxuryInfo.productionPlace;
				this.checkedValue = res.data.luxuryInfo.gender;
				this.annex = res.data.luxuryInfo.annex;
				this.buyTime = this.formatDate(res.data.luxuryInfo.buyTime);
				this.buyType = res.data.luxuryInfo.buyType;
				this.addressCode = res.data.luxuryInfo.address;
				for(let i=0;i<this.cities.length;i++){
					if(this.cities[i].code == this.addressCode){
						this.address = this.cities[i].name;
						break;
					}
				}

				for(let i=0;i<this.tags.length;i++){
					if(res.data.labelList.indexOf(i+1) > -1){
						this.tags[i].selected = true;
					}
				}
			})
			.catch(err => {
				console.log(err);
			})
		}else if(this.luxuryId == 0){
			this.title = "";
			this.description = "";
			this.imageArr = [];
			this.showImg = false;
			this.newPrice = "";
			this.price = "";
			this.kind = "";
			this.model = "";
			this.size = "";
			this.color = "";
			this.quality = "";
			this.place = "";
			this.checkedValue = "";
			this.annex = "";
			this.buyTime = "";
			this.buyType = "";
			this.addressCode = "";
			this.address = "";
			for(let i=0;i<this.tags.length;i++){
					this.tags[i].selected = false;
			}
		}
	},
  created() {
    bus.$on('passKeepAliveState',(data) => {
      this.keepAliveState = data;
    });
  },
  deactivated() {
    this.keepAliveState = '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import '../../assets/css/release.css';
</style>
