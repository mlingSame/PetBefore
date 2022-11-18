<template>
	<view>

		<view>
			<view style="background-color: azure;width: 100%;height: 70upx;">
				<u-row customStyle="margin-bottom: 10px">
					<u-col span="6" class="imgUsernaem">
						<u-image :src="blog.user.userFace" width="70upx" height="70upx" shape="circle" radius="50%"
							class="faceImg">
						</u-image>
						<span class="facename">{{blog.user.username}}:</span>
					</u-col>
					<u-col span="6">
						<span>{{blog.title}}</span>
					</u-col>
				</u-row>
			</view>
			<view style="width: 100%;height: 300upx;background-color: aqua;">
				{{blog.content}}{{blog.createdate}}
			</view>
			<u-gap></u-gap>
		</view>
		<!-- 评论 -->

		<view v-if="comment!=''">
			<view v-for="(item,index) in comment" :key="index">
				<view>{{item.content}}</view>
				<view>{{item.user.username}}</view>
				<view>{{item.commentdate}}</view>
				<view v-if="item.child!=null" v-for="(item1,index1) in item.child" :key="index1">
					<view>{{item1.content}}</view>
					<view>{{item1.user.username}}</view>
					<view>{{item1.commentdate}}</view>
					<u-line></u-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blog:{
					user:{
						userFace:''
					}
				},
				comment:''
			}
		},
		onLoad(options) {
			this.getByIdBlog(options.param);
			this.getComments(options.param);
		},
		methods: {
			getByIdBlog(param){
				this.$H.get('/blog/getByIdBlog?blogId='+param).then(res=>{
					this.blog=res
					this.blog.user.userFace = this.$H.imgUrl + res.user.userFace;
				})
			},
			getComments(param){
				this.$H.get('/comment/?useTree=true&&blogId='+param).then(res=>{
					this.comment=res
				})
			}
		}
	}
</script>

<style>
.imgUsernaem{
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
		color: #aa0000;
	}
</style>
