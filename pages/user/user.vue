<template>
	<view>
		user
		<button @click="submit1">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			submit1(){
				uni.redirectTo({
					url:'/pages/login/login',
					fail: (res) => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>

</style>
