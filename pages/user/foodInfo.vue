<template>
	<view>
		<view v-for="(item,index) in foodInfo" :key="index" style="width: 100%;">
			<u-line></u-line>
				<view class="foodname">食品名称：{{item.food.foodname}}</view>
				<u-line></u-line>
				<ul class="viewImg">
				<view v-for="(item1,index1) in item.img" :key="index1" >
						<li>
							<u-image class='foodImg' width="180upx" height="200upx" radius='20upx' :src="item1">
							</u-image>
						</li>
				</view>
				</ul>
					<view><span style="margin: 5upx;">描述信息:</span>
						<view class="describfood">{{item.food.describfood}}</view>
					</view>
					<view style="text-align: center; color: darkred;"><span>价格</span>{{item.food.price}}<span>￥</span></view>
					<view style="font-size: 20upx;text-align: right;"><span>生产日期:</span>{{item.food.createTime}}<span>有效期:</span>{{item.food.validTime}}<span>月</span></view>
					<u-button @click="editFood(item)">修改详细信息</u-button>
					<u-gap></u-gap>
			</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				foodInfo: [],
				img: [],
				imgurl: this.$H.imgUrl,
				query: {
					pagesize: 6,
					pageindex: 1,
				},
				 calleft: 0,
			}
		},
		onShow() {
			this.showFoodInfo();
		},
		methods: {
			showFoodInfo() {
				let uid = uni.getStorageSync("userInfo").uid;
				let _this = this;
				this.$H.get('/food-user/selectAllFoodByUID?uid=' + uid + '&currentPage=' + this.query
					.pageindex + '&size=' + this.query.pagesize).then(res => {
					this.foodInfo = res.data;
					this.foodInfo.forEach((item) => {
						let allImg = [];
						item.img = [];
						var b = item.food.img.split(';');
						for (let i = 0; i < b.length; i++) {
							item.img[i] = _this.$H.imgUrl + b[i];
						}

					})
				})

			},
			editFood(param){
				let id=param.food.id;
				uni.redirectTo({
					url:'/pages/square/editFood?foodId='+id
				})
			}
		}
	}
</script>

<style>
	ul {
	  list-style-type: none;
	  width: 100%;
		height: 200upx;
		margin-top: 15upx;
		margin-right: 15upx;
	}
	ul li{
	 float: left;
	 margin-right: 5upx;
	}
	.foodname{
		text-align: center;
		font-size: 40upx;
		color: darkred;
	}
	.describfood{
		text-indent: 50px;
		background-color: #f5f5dc;
		height: 150upx;
		text-align: justify;
		letter-spacing: 1spx;
		tab-size: 20upx;
		margin: 5upx;
	}
</style>
