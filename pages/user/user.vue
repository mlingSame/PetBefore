<template>
	<view class="wrap">
		<!-- tou -->
		<view class="header">
			<u-row gutter="12">
				<u-col span="4">
					<u-avatar :src="avatar" class="headImg" mode="square"></u-avatar>
				</u-col>
				<u-col span="4">
					<u-button @click="submitlogin()">登录</u-button>
				</u-col>
				<u-col span="4">
					<u-button @click="regist()">注册</u-button>
				</u-col>
			</u-row>
			<u-subsection :list="list" :current="1"></u-subsection>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '../../static/img/1.png',
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
		methods: {
			submitlogin() {
				uni.navigateTo({
					url:'../user/login',
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
			regist(){
				uni.navigateTo({
					url:'../user/register',
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 150rpx;
		background-color: #F0F8FF;
	}

	.headImg {
		width: 150rpx;
		height: 150rpx;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
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
</style>
