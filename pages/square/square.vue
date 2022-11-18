<template>
	<view>
		<!-- 发布 -->
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
							<u-button>发布宠物</u-button>
						</view>
					</u-col>
					<u-col span="5">
						<view class="demo-layout bg-purple-light">
							<uni-icons custom-prefix="iconfont" type="icon-bianji" size="50"
								style="margin-left: 30upx;"></uni-icons>
							<u-button>发布动态</u-button>
						</view>
					</u-col>
					<u-col span="7" @click="publishFood()">
						<view class="demo-layout bg-purple-light">
							<uni-icons custom-prefix="iconfont" type="icon-shangpin" size="50"></uni-icons>
							<u-button>发布商品</u-button>
						</view>
					</u-col>
				</u-row>
			</view>
		</u-popup>
		<!-- 主页 -->
		<view>
			<view v-for="(item,index) in blogAllList" :key="index">
				<view style="background-color: azure;width: 100%;height: 70upx;">
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="6" class="imgUsernaem">
							<u-image :src="item.user.userFace" width="70upx" height="70upx" shape="circle" radius="50%"
								class="faceImg">
							</u-image>
							<span class="facename">{{item.user.username}}:</span>
						</u-col>
						<u-col span="6">
							<span>{{item.title}}</span>
						</u-col>
					</u-row>
					
				</view>
				<view style="width: 100%;height: 300upx;background-color: aqua;">
					{{item.content}}{{item.createdate}}
				</view>
				<button @click="retureComment(item)">查看评论</button>
				<u-gap></u-gap>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				blogAllList: [],
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
		onShow() {
			this.blogAll();
		},
		methods: {
			blogAll() {
				this.$H.get('/blog/listAllBlog').then(res => {
					this.blogAllList = res;
					this.blogAllList.forEach((item) => {
						item.user.userFace = this.$H.imgUrl + item.user.userFace;
					})
				})
			},
			retureComment(param){
				uni.navigateTo({
					url:'../square/commentInfo?param='+param.blogId
				})
			},
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
			publishFood() {
				uni.redirectTo({
					url: '../square/addFood'
				})
			},
			publishpet() {
				console.log("publishpet")
			}
		}
	}
</script>

<style lang="scss">
	.cellgroup {
		position: relative;
	}

	.cellpublish {
		position: fixed;
		top: 50px;
		right: 0;
		background-color: #55ff00;
	}

	.bg-purple-dark {
		background: #00ff00;
	}

	.imgUsernaem{
		position: relative;
	}
	.faceImg {
		 position: absolute; 
		top: -25upx;
		left: 5upx;
	}

	.facename {
		position: absolute;
		left: 80upx;
		font-size: 20upx;
		margin-bottom: 100upx;
		color: #aa0000;
	}
</style>
