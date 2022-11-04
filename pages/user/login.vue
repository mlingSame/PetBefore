<template>
	<view>
		<u-form :model="form">
			<u-form-item label="姓名" prop="username">
				<u-input v-model="form.username" />
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<u-input v-model="form.password" />
			</u-form-item>
			<u-form-item prop="code" label="验证码">
				<u-input v-model="form.code" />
			</u-form-item>
			<image :src="captchaUrl" style="width: 450upx;height: 90upx;;margin-right: 5upx;" @click="updateCaptcha()">
			</image>
		</u-form>
		<u-button @click="submit()">登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: 'manager',
					password: '123',  
					code: ''
				},
				captchaUrl: 'http://192.168.0.102:8080/kaptcha?time=' + new Date(),
			}
		},
		methods: {
			updateCaptcha() {
				this.captchaUrl = 'http://192.168.0.102:8080/kaptcha?time=' + new Date();
			},
			submit() {
				this.$H.post('/admin/login', this.form).then(res => {
					if (res.code == 200) {
						const token = res.obj.tokenHead + res.obj.token;
						uni.setStorageSync("hasLogin", true);
						uni.setStorageSync("token", token);
						uni.setStorageSync("userInfo",this.form);
						uni.switchTab({
							url: '/pages/user/user',
						});
						uni.showToast({
							title: '登录成功',
							duration: 100
						});
					} else {
						uni.showToast({
							title: '密码错误',
							duration: 2000
						});
					}
				})
			},
			hello() {
					console.log(uni.stora)
				this.$H.post('/user/hello').then(res=>{
					
					console.log("111")
					console.log(res)
				})
				}
		}
	}
</script>

<style>

</style>
