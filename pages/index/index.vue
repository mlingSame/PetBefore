<template>
	<view class="wrap">
		<u-search class="search":clearabled="true"></u-search>	
		<swiper class="swiper" 
				indicator-dots="true" 
				autoplay="true" 
				interval="5000" 
				duration="1500"	>
				<swiper-item v-for="(item , index) in list" :key="index">
					<image :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
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
			}
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		height: 400upx;
	}
	
	// swiper-item 里面的图片高度
	swiper-item image{
		width: 100%;
		height: 400rpx;
	}
	.search{
		margin-bottom: 50rpx;
	}

</style>