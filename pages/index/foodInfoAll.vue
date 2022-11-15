<template>
	<view>
		<view v-for="(item,index) in foodInfo" :key="index" style="width: 100%;">
			<u-line></u-line>
			<view class="foodname">食品名称：{{item.foodname}}</view>
			<u-line></u-line>
			<ul class="viewImg">
				<view v-for="(item1,index1) in item.img" :key="index1">
					<li>
						<u-image class='foodImg' width="180upx" height="200upx" radius='20upx' :src="item1">
						</u-image>
					</li>
				</view>
			</ul>
			<view><span>生产日期</span>{{item.createTime}}<span>有效期</span>{{item.validTime}}<span>月</span></view>
			<view><span>描述信息</span>{{item.describfood}}</view>
			<view><span>价格</span>{{item.price}}<span>￥</span></view>
			<u-button>查看</u-button>
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
				let _this = this;
				this.$H.get('/food/selectAllFood?currentPage=' + this.query
					.pageindex + '&size=' + this.query.pagesize).then(res => {
					this.foodInfo = res.data;
					this.foodInfo.forEach((item) => {
						let allImg = [];
						allImg = item.img.split(';');
						item.img = [];
						for (let i = 0; i < allImg.length; i++) {
							item.img[i] = _this.$H.imgUrl + allImg[i];
						}

					})
				})

			},
			editFood(param) {
				let id = param.food.id;
				uni.redirectTo({
					url: '/pages/square/editFood?foodId=' + id
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

	ul li {
		float: left;
		margin-right: 5upx;
	}

	.foodname {
		text-align: center;
		font-size: 40upx;
		color: darkred;
	}
</style>
