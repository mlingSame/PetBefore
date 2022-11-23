<template>
	<view style="background-color: #ffeacc;margin-top: 15px;">
		<h1 style="text-align: center;">个人信息</h1>
		<u-form :model="userInfo">
			<u-form-item label="uid" prop="uid">
				<u--input border="surround" disabled v-model="userInfo.uid"></u--input>
			</u-form-item>
			<u-form-item label="name" prop="username">
				<u-input v-model="userInfo.username" disabled border="none" style="width: 200upx;"></u-input>
			</u-form-item>
			<u-form-item label="sex" prop="sex">
				<u-input v-model="userInfo.sex" border="none"></u-input>
			</u-form-item>
			<u-form-item label="addr" prop="addr">
				<u-input v-model="userInfo.addr" border="none"></u-input>
			</u-form-item>
		</u-form>
		<u-button @click="updateUser()">修改</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					id: '',
					username: ''
				},
			}
		},
		created() {
			this.userInfoALL()
		},
		methods: {
			userInfoALL() {
				let uid = uni.getStorageSync("userInfo").uid;
				this.$H.get('/user/selectByUid?uid=' + uid).then(res => {
					this.userInfo = res.obj;
				})
			},
			updateUser() {
				let user = this.userInfo;
				this.$H.post('/user/updateUser', user).then(res => {
					uni.showToast({
						title: "修改成功"
					})

				})
			}
		}
	}
</script>

<style>

</style>
