<template>
		<view>
			<u-button @click="hello()">测试</u-button>
		</view>
</template>
<script>
	export default {
		methods: {
			hello(){
				
				console.log(uni.getStorageSync("userInfo"));
			}

		}
	}
</script>


