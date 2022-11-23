<template>
	<view>
		<view v-for="(item,index) in PetInfo" :key="index" style="width: 100%;">
			<u-line></u-line>
			<view class="Petname">petname：{{item.pet.petname}}</view>
			<view><ul class="viewImg">
				<view v-for="(item1,index1) in item.img" :key="index1">
					<li>
						<u-image class='PetImg' width="180upx" height="200upx" radius='20upx' :src="item1">
						</u-image>
					</li>
				</view>
			</ul></view>
			<view><span style="margin: 5upx;">描述信息:</span>
				<view style="text-align: center;background-color: cornsilk;">
					sex:{{item.pet.sex}}--age:{{item.pet.age}}岁
				</view>
				<view style="text-align: center;">
					haircolor:{{item.pet.haircolor}}--weight：{{item.pet.weight}}
				</view>
				<view style="text-align: center; color: cornsilk;"><span>价格</span>{{item.pet.price}}<span>￥</span></view>
				<view class="describPet">{{item.pet.describPet}}</view>
			</view>
			<ul style="width: 100%;height: 100upx;">
				<li><u-button @click="deletePet(item)">删除宠物信息</u-button></li>
			</ul>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PetInfo: [],
				img: [],
				imgurl: this.$H.imgUrl,
				calleft: 0,
			}
		},
		onShow() {
			this.showPetInfo();
		},
		methods: {
			showPetInfo() {
				let uid = uni.getStorageSync("userInfo").uid;
				let _this = this;
				this.$H.get('/user-pet/getAllPetByUid?uid=' + uid).then(res => {
					this.PetInfo = res;
					this.PetInfo.forEach((item) => {
						let allImg = [];
						item.img = [];
						var b = item.pet.img.split(';');
						for (let i = 0; i < b.length; i++) {
							item.img[i] = _this.$H.imgUrl + b[i];
						}

					})
				})

			},

			deletePet(param){
				this.$H.delete('/cata-pet/delCataPetByPage?pid='+param.id).then(res=>{
					this.showPetInfo();
					uni.showToast({
						title:"删除成功",

					})
					
				})
			}
		}
	}
</script>

<style>
	ul {
		list-style-type: none;
		width: 100%;
		height: 200upx;
		margin-top: 15upx;
		margin-right: 15upx;
	}

	ul li {
		float: left;
		margin-right: 5upx;
	}

	.Petname {
		text-align: center;
		font-size: 40upx;
		color: darkred;
	}

	.describPet {
		text-indent: 50px;
		background-color: #f5f5dc;
		height: 80upx;
		text-align: justify;
		letter-spacing: 1spx;
		tab-size: 20upx;
		margin: 5upx;
	}
</style>
