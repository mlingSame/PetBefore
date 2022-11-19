<template>
	<view>
		<view v-for="(item,index) in comment" :key="index">
			<u-gap></u-gap>
			<view style="background-color: aquamarine; margin-left: 5px?;" >用户{{item.commentId}}:{{item.user.username}}
			<view v-if="item.parentId">回复用户{{item.parentId}}</view></view>
			
			
			<view>{{item.content}}</view>
			<view>{{item.commentdate}}</view>
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

</style>
