<template>
	<view>
		<view>
			<view style="background-color: azure;width: 100%;height: 70upx;">
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="5" class="imgUsernaem">
						<u-image :src="blog.user.userFace" width="70upx" height="70upx" shape="circle" radius="50%"
							class="faceImg">
						</u-image>
						<span class="facename">{{blog.user.username}}:</span>
					</u-col>
					<u-col span="7">
						<span style="margin-top: 10upx;color: firebrick;font-size: 30upx;">{{blog.title}}</span>
					</u-col>
				</u-row>
			</view>
			<view class="contenDes">
				{{blog.content}}
			</view>
			<view style="text-align: right;margin-left: 5upx;">{{blog.createdate}}</view>
		</view>
		<u-button @click="publishCommentByid(blog.blogId)">发表评论</u-button>
		<u-popup  :safeAreaInsetTop="true" :mode="popupData.mode" :show="CommentShow"
			:round="popupData.round" :overlay="popupData.overlay" :borderRadius="popupData.borderRadius"
			:closeable="popupData.closeable" :closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close"
			@open="open">
			<h4>请评论:</h4>
			<view style="background-color: #f5f5dc;">
				<u-input v-model="commentRely" :type="type" border=true border-color="red"  :height="height"
					:auto-height="autoHeight" />
			</view>
			<u-button @click="RelyCommentByid(blog.blogId)">评论</u-button>
		</u-popup>
		<!-- 评论 -->
		<view v-if="onshow">
			<tree-data :comments="comment"></tree-data>
		</view>
	</view>
</template>

<script>
	import treeData from "@/components/treeData.vue"
	export default {
		data() {
			return {
				onshow: false,
				CommentShow: false,
				blog: {
					user: {
						userFace: ''
					}
				},
				type: 'text',
				height: 200,
				autoHeight: true,
				blogId: '',
				comment: [],
				commentRely: '',
				popupData: {
					overlay: true,
					mode: 'top',
					borderRadius: '',
					closeable: true,
					round: 10,
					closeOnClickOverlay: true
				},
				commentInfo:{
					blogId:'',
					content:'',
					userId:''
				}
			}
		},


		onLoad(options) {
			this.blogId = options.param;
		},
		mounted() {
			this.getByIdBlog(this.blogId);
			this.getComments(this.blogId);
		},
		methods: {
			getByIdBlog(param) {
				this.$H.get('/blog/getByIdBlog?blogId=' + param).then(res => {
					this.blog = res
					this.blog.user.userFace = this.$H.imgUrl + res.user.userFace;
				})
			},
			getComments(param) {
				this.$H.get('/comment/?useTree=true&&blogId=' + param).then(res => {
					this.comment = res
					this.onshow = true
				})
			},
			publishCommentByid(param) {
				this.CommentShow = true;
			},
			RelyCommentByid(param) {
				let _this=this;
				this.commentInfo.blogId=param;
				this.commentInfo.content=this.commentRely;
				this.commentInfo.userId=uni.getStorageSync("userInfo").uid;
				let comment=this.commentInfo;
				this.$H.post("/comment/addComment",comment).then(res=>{
					uni.showToast({
						title: '评论成功',
						duration: 2000
					});
					_this.CommentShow = false
					_this.getComments(this.blogId);
				})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.CommentShow = false
			},
		},
		components: {
			treeData: treeData
		},
	}
</script>

<style>
	.imgUsernaem {
		position: relative;
	}

	.faceImg {
		position: absolute;
		top: -25upx;
		left: 5upx;
	}

	.facename {
		position: absolute;
		left: 80upx;
		font-size: 20upx;
		margin-bottom: 100upx;
	}

	.contenDes {
		text-indent: 50px;
		background-color: #f5f5dc;
		height: 250upx;
		text-align: justify;
		letter-spacing: 1spx;
		tab-size: 20upx;
		margin: 5upx;
		width: 100%;
	}
</style>
