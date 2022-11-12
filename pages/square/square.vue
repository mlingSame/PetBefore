<template>
	<view>
		<u-cell-group class="cellgroup">
			<u-cell @click="openPopup(popupData)" title="发布" isLink class="cellpublish">
			</u-cell>
		</u-cell-group>
		<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :mode="popupData.mode" :show="show"
			:round="popupData.round" :overlay="popupData.overlay" :borderRadius="popupData.borderRadius"
			:closeable="popupData.closeable" :closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close"
			@open="open">
			<view class="u-popup-slot">
				<u-row gutter="16">
					<u-col span="5" @click="publishpet()">
						<view class="demo-layout bg-purple-dark">
							<uni-icons custom-prefix="iconfont" type="icon-paizhao" size="50"
							 style="margin-left: 28upx;">发布宠物</uni-icons>
							<u-button >发布宠物</u-button>
						</view>
					</u-col>
					<u-col span="5">
						<view class="demo-layout bg-purple-light">
							<uni-icons custom-prefix="iconfont" type="icon-bianji" size="50" 
							style="margin-left: 30upx;"></uni-icons>
							<u-button >发布动态</u-button></view>
					</u-col>
					<u-col span="7" @click="publishFood()">
						<view class="demo-layout bg-purple-light">
							<uni-icons custom-prefix="iconfont" type="icon-shangpin" size="50" ></uni-icons>
							<u-button >发布商品</u-button></view>
					</u-col>
				</u-row>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				popupData: {
					overlay: true,
					mode: 'bottom',
					borderRadius: '',
					closeable: true,
					round: 10,
					closeOnClickOverlay: true
				},
			}
		},
		methods: {
			openPopup(popupData) {
				this.popupData = popupData
				uni.$u.sleep().then(() => {
					this.show = !this.show
				})
			},
			navigateBack() {
				uni.navigateBack()
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
			},
			publishFood(){
				uni.redirectTo({
					url:'../square/addFood',
					complete:function(res){
						console.log(res)
					}
				})
			},
			publishpet(){
				console.log("publishpet")
			}
		}
	}
</script>

<style lang="scss">
	.u-popup-slot {
		height: 150px;
		@include flex;
		justify-content: center;
		align-items: center;
	}
	.cellgroup {
		position: relative;
	}

	.cellpublish {
		position: absolute;
		top: 50px;
		right: 0;
	}

	.u-row {
		margin: 5upx;

	}

	.demo-layout {
		height: 100rpx;
		border-radius: 15rpx;
		width: 150upx;
	}


	.bg-purple-light {
		background: #ffff00;
	}

	.bg-purple-dark {
		background: #00ff00;
	}
</style>
