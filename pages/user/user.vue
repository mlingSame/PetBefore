<template>
	<view class="wrap">
		<view class="header">
			<block v-if="hasLogin">
				<view class="userinfo">
					<u-row gutter="12">
						<u-col span="4">
							<u-avatar :src="avatar" @click="updateFace()"></u-avatar>
						</u-col>
						<u-col span="4">
							<view>{{userBase.username}}</view>
						</u-col>
						<u-col span="4">
							<u-button @click="logout()">登出</u-button>
						</u-col>
					</u-row>
				</view>
			</block>
			<block v-else>
				<view>
					<u-row gutter="12">
						<u-col span="4">
							<u-avatar :src="avatar" class="headImg"></u-avatar>
						</u-col>
						<u-col span="4">
							<u-button @click="submitlogin()">登录</u-button>
						</u-col>
						<u-col span="4">
							<u-button @click="regist()">注册</u-button>
						</u-col>
					</u-row>
				</view>
			</block>
			<u-subsection :list="list" :current="1"></u-subsection>
			<!-- 个人信息 -->
			<view class="u-page__item">
				<text class="u-page__item__title">个人信息</text>
				<u-line></u-line>
				<view class="rowStyle">
					<u-row justify="space-between" gutter="16">
						<u-col span="1">
							<view class="demo-layout ">
								<uni-icons custom-prefix="iconfont" type="icon-wode" style="margin: 10upx;" size="23">
								</uni-icons>
							</view>
						</u-col>
						<u-col span="15">
							<view class="demo-layout">用户信息</view>
						</u-col>
					</u-row>
					<u-line></u-line>
				</view>
				<view class="rowStyle">
					<u-row justify="space-between" gutter="16">
						<u-col span="1">
							<view class="demo-layout ">
								<uni-icons custom-prefix="iconfont" type="icon-shouhuodizhi" style="margin: 10upx;"
									size="23"></uni-icons>
							</view>
						</u-col>
						<u-col span="15">
							<view class="demo-layout">收货地址</view>
						</u-col>
					</u-row>
					<u-line></u-line>
				</view>
			</view>
			<view class="u-page__item">
				<text class="u-page__item__title">app信息</text>
				<u-line></u-line>
				<view class="rowStyle">
					<u-row justify="space-between" gutter="16">
						<u-col span="1">
							<view class="demo-layout ">
								<uni-icons custom-prefix="iconfont" type="icon-kefu" style="margin: 10upx;" size="23">
								</uni-icons>
							</view>
						</u-col>
						<u-col span="15">
							<view class="demo-layout">联系客服</view>
						</u-col>
					</u-row>
					<u-line></u-line>
				</view>
				<view class="rowStyle">
					<u-row justify="space-between" gutter="16">
						<u-col span="1">
							<view class="demo-layout ">
								<uni-icons custom-prefix="iconfont" type="icon-fenxiang" style="margin: 10upx;"
									size="23"></uni-icons>
							</view>
						</u-col>
						<u-col span="15">
							<view class="demo-layout">用户分享</view>
						</u-col>
					</u-row>
					<u-line></u-line>
				</view>
			</view>
			<view class="u-page__item">
				<text class="u-page__item__title">个人商城</text>
				<u-line></u-line>
				<view class="rowStyle">
					<u-row justify="space-between" gutter="16">
						<u-col span="1">
							<view class="demo-layout ">
								<uni-icons custom-prefix="iconfont" type="icon-dongwuyuan" style="margin: 10upx;"
									size="23"></uni-icons>
							</view>
						</u-col>
						<u-col span="15">
							<view class="demo-layout">个人宠物商城</view>
						</u-col>
					</u-row>
					<u-line></u-line>
				</view>
				<view class="rowStyle" @click="foodInfo">
					<u-row justify="space-between" gutter="16">
						<u-col span="1">
							<view class="demo-layout ">
								<uni-icons custom-prefix="iconfont" type="icon-shangpin" style="margin: 10upx;"
									size="23"></uni-icons>
							</view>
						</u-col>
						<u-col span="15">
							<view class="demo-layout">个人食品商城</view>
						</u-col>
					</u-row>
					<u-line></u-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: '',
				userBase: '',
				hasLogin: false,
				avatar: '',
				avato: '',
				list: [{
						name: '待发货'
					},
					{
						name: '待付款'
					},
					{
						name: '待评价'
					}
				],
				current: 1
			}
		},
		onShow() {
			if (uni.getStorageSync('hasLogin') == true) {
				this.hasLogin = true;
				this.userBase = uni.getStorageSync("userBase");
				this.initUser();
				this.avatar = this.avato;
			} else {
				this.hasLogin = false;
			}
		},
		methods: {
			submitlogin() {
				uni.navigateTo({
					url: '../user/login',
					fail: (res) => {
						console.log(res);
					},
					success: (res) => {
						uni.showToast({
							title: '请登录',
							duration: 2000
						});
					}
				});
			},
			logout() {
				uni.removeStorageSync("token");
				uni.removeStorageSync("userBase");
				// uni.setStorageSync("hasLogin",false);
				this.hasLogin = false;
				this.avatar = '';
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			regist() {
				uni.navigateTo({
					url: '../user/register',
					fail: (res) => {
						console.log(res);
					},
					success: (res) => {
						uni.showToast({
							title: '请注册',
							duration: 2000
						});
					}
				});
			},
			updateFace() {
				uni.navigateTo({
					url: '../user/updateFace',
					fail: (res) => {
						console.log(res);
					},
					success: (res) => {
						uni.showToast({
							title: '请上传头像',
							duration: 2000
						});
					}
				});
			},
			foodInfo() {
				uni.redirectTo({
					url: '../user/foodInfo'
				})
			},
			initUser() {
				this.$H.post('/user/selectByUsername', this.userBase.username).then(res => {
					uni.setStorageSync("userInfo", res);
					this.userInfo = res;
					this.avato = this.$H.imgUrl + res.userFace;
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.u-page__item {
		margin-top: 10upx;
	}

	.userinfo {
		height: 80upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}

	.u-page__item__title {
		font-size: 30upx;
	}

	.rowStyle {
		background-color: #fafafa;
		margin: 5upx;
	}

	.demo-layout {
		height: 35px;
		border-radius: 4px;
		justify-content: center;
		margin-top: 7upx;
		font-size: 25upx;
	}
</style>
