<template>
	<view>
		<view class="header">
			<u-notice-bar :text="text1" class="noticeBar" color="red"></u-notice-bar>
			<u-swiper :list="listSwiper" keyName="image" showTitle :autoplay="true" circular interval="5000" indicator
				indicatorMode="line" height="400upx"></u-swiper>
		</view>
		<view class="content-class">
			<view class="card">
				<u-line color="#e4e7ed" />
				<view class="Cardtitle">宠物商店<span class="allFood" @click="petInfoAll">所有>></span></view>
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout bg-purple">
							<view class="titleCard" @click="clickpetName('cat')">cat</view>
							<image class="imgcard" src="../../static/img/card/cat.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<view class="titleCard" @click="clickpetName('dog')">dog</view>
							<image class="imgcard" src="../../static/img/card/dog.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple">
							<view class="titleCard" @click="clickpetName('rabbit')">rabbit</view>
							<image class="imgcard" src="../../static/img/card/tu.jpg"></image>
						</view>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						<view class="demo-layout bg-purple">
							<view class="titleCard" @click="clickpetName('rat')">rat</view>
							<image class="imgcard" src="../../static/img/card/rat.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple-light">
							<view class="titleCard" @click="clickpetName('chick')">chick</view>
							<image class="imgcard" src="../../static/img/card/ji.jpg"></image>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout bg-purple" @click="petInfoAll">
							<view class="titleCard" >petAll</view>
							<image class="imgcard" src="../../static/img/card/pet.jpg"></image>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="card">
				<view class="Cardtitle">宠物食品<span class="allFood" @click="allFood">所有>></span></view>
				<u-row customStyle="margin-bottom: 10px">
					<view v-for="(item,index) in foodInfo" :key="index" style="width: 100%;" class="foodACss">
						<u-col span="6">
							<view class="demo-layout1 bg-purple-light" @click="redictFood(item)">
								<view class="titleCard">{{item.foodname}}</view>
								<image :src='item.img'  class="foodImgcard" width="80px" height="80px"></image>
								
								<view><span>描述信息:</span><view class="describfood">{{item.describfood}}</view></view>
								<view><span class="foodspan">￥{{item.price}}</span></view>
								<view>
									<span >生产日期{{item.createTime}}</span>
								</view>
								
								<u-gap></u-gap>
							</view>
						</u-col>
					</view>

				</u-row>
			</view>
			<view class="card hospital">
				<u-line color="#e4e7ed" />
				<view class="Cardtitle">宠物医院<span class="allFood" @click="allHospital">所有>></span></view>
				<u-collapse>
					<u-collapse-item :title="item.name" v-for="(item, index) in hospitalInfo" :key="index">
						{{item.decribHospital}}地址：{{item.province}}-{{item.city}}-{{item.address}} <span>
							联系方式：</span>{{item.phone}}
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "petStore",
		data() {
			return {
				text1: 'WELCOME TO THE PET COMMUNITY,IF YOU HAVE ANY QUESTIONS ,PLEASE CONTACT US ',
				foodInfo: [],
				hospitalInfo: [],
				listSwiper: [{
						image: '../../static/img/1.png',
						title: 'In the pet shop, you can buy pets'
					},
					{
						image: '../../static/img/food.png',
						title: 'At the food store, you can buy food for your pet'
					},
					{
						image: '../../static/img/hospital.png',
						title: 'In the pet hospital shop, you can see a doctor for your pet'
					}
				]
			};
		},
		onShow() {
			this.selectFood();
			this.getListHospital();
		},
		methods: {
			petInfoAll() {
				uni.navigateTo({
					url: '/pages/index/petInfoAll'
				})
			},
			allFood() {
				uni.navigateTo({
					url: '/pages/index/foodInfoAll'
				})
			},
			clickpetName(item) {
				uni.navigateTo({
					url: '/pages/index/petInfoAll?param=' + item
				})
			},
			allHospital() {
				uni.navigateTo({
					url: '/pages/index/hospitalInfoAll'
				})
			},
			selectFood() {
				this.$H.get('/food/selectRandomFood').then(res => {
					this.foodInfo = res;
					this.foodInfo.forEach((item) => {
						item.img = this.$H.imgUrl + item.img
					})

				})
			},
			redictFood(param){
				// console.log(param)
				uni.navigateTo({
					url: '/pages/index/foodInfoAll'
				})
			},
			getListHospital() {
				this.$H.get('/hospital/selectAllHospital?currentPage=' + 1 + '&size=6').then(res => {
					this.hospitalInfo = res.data;
				})
			},

		}
	}
</script>

<style>
	.noticeBar {
		margin-top: 5upx;
		margin-bottom: 5upx;
	}

	.allFood {
		margin-left: 550upx;
		color: darkred;
	}


	.Cardtitle {
		background-color: beige;
	}

	swiper-item image {
		width: 100%;
		height: 400rpx;
	}

	.describfood{
		width: 100%;
		height: 70upx;
		font-size: 18upx;
		background-color: #c8c4a7;
		margin-top: 5upx;
		overflow: hidden;
		text-overflow: ellipsis;
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
		height: 450rpx;
		border-radius: 5%;
		margin-left: 25upx;
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
	.foodImgcard{
		width: 120upx;
		height: 180upx;
		margin-left: 73upx;
		border-radius: 5%;
	}
	.foodACss{
		font-size: 20upx;
	}
	.foodspan{
		display: block;
		margin-left: 60upx;
		color: red;
		font-size: 30upx;
	}
	.titleCard {
		font-size: 50upx;
		color: #c8c4a7;
		text-align: center;
		font-weight: bold;	
	}
</style>
