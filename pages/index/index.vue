<template>
	<view>
		<view class="header">
			<u-search class="search" :clearabled="true"></u-search>
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1500">
				<swiper-item v-for="(item , index) in listSwiper" :key="index">
					<image :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content-class">
			<view class="card">
				<u-line color="#e4e7ed" />
				<view class="Cardtitle">宠物商店<span class="allFood">所有>></span></view>
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout bg-purple">
							<view class="titleCard">猫猫</view>
							<image class="imgcard" src="../../static/img/card/cat.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<view class="titleCard">狗狗</view>
							<image class="imgcard" src="../../static/img/card/dog.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple">
							<view class="titleCard">兔兔</view>
							<image class="imgcard" src="../../static/img/card/tu.jpg"></image>
						</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout bg-purple">
							<view class="titleCard">鼠鼠</view>
							<image class="imgcard" src="../../static/img/card/rat.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<view class="titleCard">鸡鸡</view>
							<image class="imgcard" src="../../static/img/card/ji.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple">
							<view class="titleCard">
								<u-button @click="petInfoAll">其他</u-button>
							</view>
							<image class="imgcard" src="../../static/img/card/ji.jpg"></image>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="card">
				<view class="Cardtitle">宠物食品<span class="allFood" @click="allFood">所有>></span></view>
				 <u-row customStyle="margin-bottom: 10px">
					<view v-for="(item,index) in foodInfo" :key="index" style="width: 100%;">
						 <u-col span="6">
							<view class="demo-layout1 bg-purple-light">
								<view class="foodname">食品名称：{{item.foodname}}</view>
								<u-image :src='item.img' width="80px" height="80px"></u-image>
								<view>
									<span>生产日期</span>{{item.createTime}}<span>有效期</span>{{item.validTime}}<span>月</span>
								</view>
								<view><span>描述信息</span>{{item.describfood}}</view>
								<view><span>价格</span>{{item.price}}<span>￥</span></view>
								<u-gap></u-gap>
							</view>
							 </u-col>
					</view>
					  
					</u-row>
			</view>
			<view class="card hospital">
				<u-line color="#e4e7ed" />
				<view class="Cardtitle">宠物医院<span class="allFood">所有>></span></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "petStore",
		data() {
			return {
				foodInfo: [],
				listSwiper: [{
						image: '../../static/img/1.png',
						title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方'
					},
					{
						image: '../../static/img/2.png',
						title: '溯洄从之，道阻且长。溯游从之，宛在水中央'
					},
					{
						image: '../../static/img/3.png',
						title: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄'
					}
				]
			};
		},
		onShow() {
			this.selectFood();
		},
		methods: {
			petInfoAll() {
				uni.navigateTo({
					url: '/pages/index/petInfoAll'
				})
			},
			allFood(){
				console.log("233443")
				uni.navigateTo({
					url: '/pages/index/foodInfoAll'
				})
			},
			selectFood() {
				this.$H.get('/food/selectRandomFood').then(res => {
					this.foodInfo = res;
					this.foodInfo.forEach((item)=>{
						item.img=this.$H.imgUrl+item.img
					})
					
				})
			}
		}
	}
</script>

<style>
	.allFood{
		margin-left: 550upx;
		color: darkred;
	}
	.swiper {
		height: 400upx;
	}
	.Cardtitle{
		background-color: beige;
	}
	swiper-item image {
		width: 100%;
		height: 400rpx;
	}

	.search {
		margin-bottom: 50rpx;
	}

	.content-class {
		margin-top: 20upx;
	}

	.card {
		height: 550upx;
		background-color: '#e6bab2';
	}

	.wrap {
		padding: 24rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout1 {
		width: 290rpx;
		height: 400rpx;
		border-radius: 5%;
		margin-right: 15upx;
	}

	.demo-layout {
		margin-left: 10upx;
		width: 200rpx;
		height: 200rpx;
		border-radius: 5%;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.imgcard {
		width: 120upx;
		height: 120upx;
		margin-left: 30upx;
		border-radius: 50%;
	}

	.titleCard {
		font-size: 40upx;
		color: red;
	}
</style>
