<template>
	<view>
		<u-form :model="form">
			<u-form-item label="姓名" prop="username">
				<u-input v-model="form.username" />
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<u-input v-model="form.password" />
			</u-form-item>
			<u-form-item label="密码" prop="comfirmPassword">
				<u-input v-model="form.comfirmPassword" />
			</u-form-item>
		</u-form>
		<u-button @click="submit()">注册</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					comfirmPassword: ''
				},
			}
		},
		methods: {
			submit() {
				this.$H.post('/admin/register', this.form).then(res => {
					uni.switchTab({
						url: '/pages/index/index',
					});
					uni.showToast({
						title: '注册成功',
						duration: 1000
					});
				})
			}
		}
	}
</script>

<style>

</style>
