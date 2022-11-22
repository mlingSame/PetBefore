<template>
	<view>
		<u-search :clearabled="true" style="margin:8px" border-color="red" v-model="keyword" focus @search='searchClick' @custom='searchClick' @clear="clear"></u-search>
		<!-- 左侧 -->
		<view class="choose-tab">
			<view class="choose-item" v-for="(item,index) in list" v-if="index >=1" :key="index"
				:class="chooseTab == index ? 'active' : ''" @click="clickTab(index,item)">
				{{item.categoryName}}
			</view>
		</view>
		<!-- 右侧 -->
		<view class="content">
			<view v-for="(item,index) in petAndCata" :key="index">
				<view v-for="(item1,index1) in item.pet" :key="index1">
					<view class="cardPet" :style="index1%2 == 0 ? 'float:left;':'float:right;' ">
						<view class="petname">{{item1.petname}}</view>
						<view class="descibePet">{{item1.describPet}}</view>
						<u-image class='petImg' width="220upx" height="200upx" radius='20upx' :src="item1.img">
						</u-image>
						<span class="descibePrice">￥ {{item1.price}}</span>
						<u-button  color="linear-gradient(to right, rgb(216, 216, 159), rgb(207, 213, 186))" size="small" @click="specifyPet(item1)" >查看</u-button>
					</view>
				</view>
			</view>
			<u-line color="red" />
			<view class="loadmore">
				<u-loadmore :status="status" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chooseTab: 1, //当前选中的选项卡：默认选中第一个~
				list: [],
				petAndCata: [],
				categoryName: 'cat',
				query: {
					pagesize: 6,
					pageindex: 1,
				},
				total: '',
				status: 'loadmore',
				keyword:'Enter your favorite characteristics'
				
			}
		},
		onPullDownRefresh() {
			this.petAndCata = []
			this.query.pageindex = 1
			this.getListCataPet(this.categoryName);
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			//阻止重复加载
			this.query.pageindex++;
			let timer = setTimeout(() => {
				this.getListCataPet(this.categoryName);
				if (this.total / 6 <= this.query.pageindex) this.status = 'nomore';
				else this.status = 'loading';
			}, 200)
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.getList();
			if(options.param!=undefined){
				this.geIdBycataName(options.param);
				this.getListCataPet(options.param);		
			}else{
				this.getListCataPet('cat');
				this.chooseTab=1
			}
			
		},
		methods: {
			clickTab: function(e, d) { //点击切换
				this.petAndCata = [];
				this.chooseTab = e;
				this.categoryName = d.categoryName;
				this.query.pageindex = 1;
				this.getListCataPet(this.categoryName);
			},
			getList() {
				this.$H.get('/catagory/').then(res => {
					this.list = res;
				})
			},
			geIdBycataName(param) {
				this.$H.get('/catagory/listByname?cataName='+param).then(res => {
					this.chooseTab=res;
				})
			},
			getListCataPet(param) {
				this.$H.get('/cata-pet/getListCataPetByPage?categoryName=' + param + '&currentPage=' + this.query.pageindex + '&size=' + this.query.pagesize).then(res => {
					this.petAndCata = res.data;
					this.petAndCata.forEach((item) => {
						let allImg = [];
						allImg = item.pet[0].img.split(';');
						item.pet[0].img = this.$H.imgUrl + allImg[0];
					
					})
					this.total = res.total

				})
			},
			clear(value){
				this.keyword='';
				this.chooseTab=1;
				this.getListCataPet(this.categoryName);
			},
			searchClick(value){
				this.$H.get('/cata-pet/describPet?describPet='+value).then(res=>{
					this.petAndCata = res;
					this.chooseTab=0;
					this.petAndCata.forEach((item) => {
						let allImg = [];
						allImg = item.pet[0].img.split(';');
						item.pet[0].img = this.$H.imgUrl + allImg[0];
					})
				})
			},
			specifyPet(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	.choose-tab {
		position: absolute;
		width: 10%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
	}

	.choose-item {
		background-color: #c8c4a7;
	}

	.active {
		background-color: white;
	}

	.content {
		margin-left: 15%;
		padding: 15rpx;
		height: 1200upx;
	}

	.loadmore {}

	.cardPet {
		background: #c2c5c8;
		height: 400upx;
		margin-top: 10px;
		margin-right: 18px;
		width: 45%;
		justify-content: center;
	}

	.petImg {
		margin-left: 25upx;
		
	}
	
	.petname {
		background-color: #c8c4a7;
		text-align: center;
		font-style: initial;
		margin-top:8upx;
		color: #37a1aa;
		height: 40upx;
		font-family: "Lucida Console", "Courier New", monospace;
	}

	.descibePet {
		font-size: 18upx;
		color: #17262e;
		height: 30upx;
		width: 95%;
		margin-top: 5upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 10upx;
		margin-left: 5upx;
	}

	.descibePrice {
		text-align: center;
		display: block;
		color: #aa0000;
		margin-top: 10upx;
		margin-bottom: 5px;
	}
</style>
