<template>
	<view>
		<u-form :model="form">
			<u-form-item label="姓名" prop="username">
				<u-input v-model="form.username" />
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<u-input v-model="form.password" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>

	export default {
		data() {
			return {

				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					password: [{
						min: 2,
						message: '简介不能少于5个字',
						trigger: 'change'
					}]
				}
			};
		},
		methods: {
			submit(){
				this.api.req("POST",'/admin/login',this.form).then(res=>{
					if(res.data.code==200){
						console.log(res)
						uni.switchTab({
						url: '/pages/index/index'
						});
					}else{
						uni.showToast({
						title: '密码错误',
						duration: 2000
						});
					}
				});
				
			}
		}
	}
</script>
<style lang="scss">
	.code {
		width: 150px;
		height: 35px;
	}

	.imagecode {
		width: 20px;
		height: 25px;
		margin-right: 5px;
	}
</style>
