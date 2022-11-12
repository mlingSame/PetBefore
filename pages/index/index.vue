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
				<view>宠物商店</view>
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
								<u-button @click="petInfoAll" >其他</u-button>
							</view>
							<image class="imgcard" src="../../static/img/card/ji.jpg"></image>
						</view>
					</u-col>
				</u-row>
			</view>
			<view  class="card food">
				<u-line color="#e4e7ed" />
				<view>宠物食品</view>
			</view>
			<view 	class="card hospital">
				<u-line color="#e4e7ed" />
				<view>宠物医院</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "petStore",
		data() {
			return {
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
		methods:{
			petInfoAll(){
				uni.redirectTo({
					url:'/pages/index/petInfoAll'
				})
			}
		}
	}
</script>

<style>
	.swiper {
		height: 400upx;
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
	.titleCard{
		font-size: 40upx;
		color: red;
	}
</style>
