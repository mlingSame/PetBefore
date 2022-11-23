<template>
	<view>
		<view v-for="(item,index) in comment" :key="index">
			<u-line></u-line>
			<view style="color: firebrick; margin-left: 5upx;">用户：{{item.commentId}}{{item.user.username}}:
				<view v-if="item.parentId" style="text-align: right">回复({{item.parentId}}{{item.user.username}}:)的评论
				</view>
			</view>
			<view class="contentReply">{{item.content}}</view>
			<view style="text-align: right; margin-right: 8upx;">{{item.commentdate}}</view>
			<u-button @click="replyChild(item)">回复</u-button>
			<view v-if="item.child && item.child.length">
				<tree-data :comments="item.child">
				</tree-data>
			</view>
		</view>
		<view>
			<u-popup :safeAreaInsetTop="true" :mode="popupData.mode" :show="CommentShow" :round="popupData.round"
				:overlay="popupData.overlay" :borderRadius="popupData.borderRadius" :closeable="popupData.closeable"
				:closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close" @open="open">
				<h4>请评论:</h4>
				<view style="background-color: #f5f5dc;">
					<u-input v-model="commentRely" type="Text" border=true border-color="red" />
				</view>
				<u-button @click="replyComment()">评论</u-button>
			</u-popup>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'treeData',
		data() {
			return {
				comment: '',
				commentInfo: {
					blogId: '',
					content: '',
					userId: '',
					parentId: ''
				},
				commentRely: '',
				CommentShow: false,
				popupData: {
					overlay: true,
					mode: 'center',
					borderRadius: '',
					closeable: true,
					round: 10,
					closeOnClickOverlay: true
				},
			}
		},
		props: {
			comments: Array
		},
		created() {
			this.comment = this.comments
		},
		methods: {
			replyChild(param) {
				this.CommentShow = true
				this.commentInfo.blogId = param.blogId;
				this.commentInfo.parentId = param.commentId;
			},
			replyComment() {
				let _this = this
				this.commentInfo.content = this.commentRely;
				this.commentInfo.userId = uni.getStorageSync("userInfo").uid;
				let comment = this.commentInfo;
				this.$H.post("/comment/addComment", comment).then(res => {
					uni.showToast({
						title: '评论成功',
						duration: 2000
					});
					_this.CommentShow = false;
				})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.CommentShow = false
			},
		},
	}
</script>

<style>
	.contentReply {
		text-indent: 50px;
		background-color: #f5f5dc;
		height: 150upx;
		text-align: justify;
		letter-spacing: 1spx;
		tab-size: 20upx;
		margin: 5upx;

	}
</style>
