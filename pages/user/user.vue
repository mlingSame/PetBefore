<template>
	<view class="wrap">
		<!-- tou -->
		<view class="header">
			<block v-if="hasLogin">
				<view class="userinfo">
					<u-row gutter="12">
						<u-col span="4">
							<u-avatar :src="avatar" @click="updateFace()"></u-avatar>
						</u-col>
						<u-col span="4">
							<view>{{ userBase.username }}</view>
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

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: '',
				userBase:'',
				hasLogin: false,
				avatar: '',
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
			if (uni.getStorageSync('hasLogin')) {
				this.hasLogin = true;
				this.userBase=uni.getStorageSync("userBase");
				this.hasLogin = true;
				
			} else {
				this.hasLogin = false;
			}
		},
		mounted() {
			if (uni.getStorageSync('hasLogin')) {
				this.initUser();
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
				uni.removeStorageSync("hasLogin");
				uni.removeStorageSync("token");
				uni.removeStorageSync("userInfo");
				this.avatar='';
				uni.switchTab({
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
			initUser(){
				this.$H.post('/user/selectByUsername',this.userBase.username).then(res => {
					uni.setStorageSync("userInfo",res);
					this.userInfo=res;
					let faceAvatar=this.$H.imgUrl+res.userFace;
					this.avatar=faceAvatar;
				})
			}

		}
	}
</script>

<style lang="scss" scoped>

</style>
