<template>
	<view>
		<view v-for="(item,index) in comment" :key="index">
			<u-line></u-line>
			<view  style="color: firebrick; margin-left: 5upx;">评论{{item.commentId}}(用户名：{{item.user.username}}):
			<view v-if="item.parentId" style="text-align: right">回复评论{{item.parentId}}({{item.user.username}})</view></view>
			<view class="contentReply">{{item.content}}</view>
			<view style="text-align: right; margin-right: 8upx;">{{item.commentdate}}</view>
			<u-button>回复</u-button>
			<view v-if="item.child && item.child.length">
				<tree-data :comments="item.child">
				</tree-data>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'treeData',
		data() {
			return {
				comment: ''
			}
		},
		props: {
			comments: Array
		},
		created() {
			this.comment = this.comments
		},
		methods: {},
	}
</script>

<style>
	.contentReply{
		text-indent: 50px;
		background-color: #f5f5dc;
		height: 150upx;
		text-align: justify;
		letter-spacing: 1spx;
		tab-size: 20upx;
		margin: 5upx;
		
	}
</style>
