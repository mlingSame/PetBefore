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
				<u-row gutter="12">
					<u-col span="4" >
						<view class="demo-layout" @click="publishpet()">
							<view class="iconView">
								<uni-icons custom-prefix="iconfont" type="icon-paizhao" size="50">发布宠物</uni-icons>
							</view>
							<view class="publishCss">发布宠物</view>
						</view>
					</u-col>
					<u-col span="4">
						<view class="demo-layout " @click="publishAcTive">
							<view lass="iconView">
								<uni-icons custom-prefix="iconfont" type="icon-bianji" size="50"></uni-icons>
							</view>
							<view class="publishCss">发布动态</view>
						</view>
					</u-col>
					<u-col span="4" @click="publishFood()">
						<view class="demo-layout">
							<view class="iconView">
								<uni-icons custom-prefix="iconfont" type="icon-shangpin" size="50"></uni-icons>
							</view>
							<view class="publishCss">发布商品</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</u-popup>
		<!-- 主页 -->
		<view>
			<u-search :clearabled="true" style="margin:8px" border-color="f5f5dc" v-model="keyword" focus
				@search='searchClick' @custom='searchClick' @clear="clear"></u-search>
			<view v-for="(item,index) in blogAllList" :key="index">
				<view style="background-color: azure;width: 100%;height: 70upx;">
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="5" class="imgUsernaem">
							<u-image :src="item.user.userFace" width="70upx" height="70upx" shape="circle" radius="50%"
								class="faceImg">
							</u-image>
							<span class="facename">{{item.user.username}}:</span>
						</u-col>
						<u-col span="7">
							<span style="margin-top: 10upx;color: firebrick;font-size: 30upx;">{{item.title}}</span>
						</u-col>
					</u-row>

				</view>
				<view class="contenDes">
					{{item.content}}
				</view>
				<view class="createDateBlog">发表时间:{{item.createdate}}</view>
				<button @click="retureComment(item)">查看发表评论</button>
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
				keyword: 'enter content'
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
			retureComment(param) {
				uni.navigateTo({
					url: '../square/commentInfo?param=' + param.blogId
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
			searchClick(value) {
				this.$H.get('/blog/getByUsernameBlog?name=' + value).then(res => {
					this.blogAllList = res;
					this.blogAllList.forEach((item) => {
						item.user.userFace = this.$H.imgUrl + item.user.userFace;
					})
				})
			},
			clear() {
				this.keyword = ''
			},
			publishFood() {
				uni.navigateTo({
					url: '../square/addFood'
				})
			},
			publishpet() {
				uni.navigateTo({
					url: '../square/addPet'
				})
			},
			publishAcTive(){
				
			}
		}
	}
</script>

<style lang="scss">
	.cellgroup {
		position: relative;
	}

	uni-icons {
		margin-left: 40upx;
	}

	.cellpublish {
		position: fixed;
		top: 200px;
		right: 0;
		background-color: #daffa9;
	}



	.imgUsernaem {
		position: relative;
	}

	.faceImg {
		position: absolute;
		top: -25upx;
		left: 5upx;
	}

	.createDateBlog {
		text-align: right;
		margin: 5upx;
	}

	.facename {
		position: absolute;
		left: 80upx;
		font-size: 20upx;
		margin-bottom: 100upx;
	}

	.contenDes {
		text-indent: 50px;
		background-color: #f5f5dc;
		height: 300upx;
		text-align: justify;
		letter-spacing: 1spx;
		tab-size: 20upx;
		margin: 5upx;
	}

	.u-popup-slot {
		width: 100%;
	}

	.publishCss {
		background-color: #f5f5dc;
		text-align: center;
		margin: 10upx;
	}

	.iconView {
		text-align: center;
	}
</style>
