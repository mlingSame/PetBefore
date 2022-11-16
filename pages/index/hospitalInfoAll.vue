<template>
	<view>
		<u-search :clearabled="true" style="margin:8px" border-color="red"></u-search>
		<!-- 右侧 -->
		<view class="content">
			<view v-for="(item,index) in hospitalInfo" :key="index" class="cardHospital">
				<u-line></u-line>
				<view class="hospitalname"><span>医院名字</span>{{item.name}}</view>
				<u-line></u-line>
				<view class="decribHospital">{{item.decribHospital}}</view>
				<view class="majorName"><span>所属人：</span> {{item.majorName}}<span> 联系方式：</span>{{item.phone}}</view>
				<view><span class="add">所在地址:</span>{{item.province}}-{{item.city}}-{{item.address}}</view>
				<u-button type="primary" size="small" @click="specifyPet(item)">查看</u-button>
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
				query: {
					pagesize: 6,
					pageindex: 1,
				},
				total: '',
				hospitalInfo: [],
				status: 'loadmore',
			}
		},
		onPullDownRefresh() {
			this.hospitalInfo = []
			this.query.pageindex = 1
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			//阻止重复加载
			this.query.pageindex++;
			let timer = setTimeout(() => {
				if (this.total / 6 <= this.query.pageindex) this.status = 'nomore';
				else this.status = 'loading';
			}, 200)
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.getListHospital();
		},
		methods: {
			clickTab: function(e, d) { //点击切换
				this.specifyPet = [];
				this.chooseTab = e;
				this.query.pageindex = 1;
				this.getListHospital();
			},
			getListHospital(param) {
				if (param == '' || param == undefined) {
					this.$H.get('/hospital/selectAllHospital?currentPage=' + this.query
						.pageindex + '&size=' + this.query.pagesize).then(res => {
						this.hospitalInfo = res.data;
						this.total = res.total

					})
				} else {
					this.$H.get('hospital/selectAllHospital?name=' + param + '&currentPage=' + this.query
						.pageindex + '&size=' + this.query.pagesize).then(res => {
						this.hospitalInfo = res.data;
						this.total = res.total

					})
				}

			},
			specifyPet(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	.cardHospital {
		background-color: azure;
		margin-top: 15px;
	}

	.hospitalname {
		text-align: center;
		color: darkred;

	}

	.content {
		padding: 15rpx;
		height: 1200upx;
	}
	.majorName{
		font-size: 20upx;
	}
	.decribHospital {
		height: 200upx;
		text-indent: 50px;
		background-color: antiquewhite;
		border-style: dotted;
		border-width: thick;
		border-color: #c0c8c8;
	}
</style>
