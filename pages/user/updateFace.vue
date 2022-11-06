<template>
	<view class="avatar">
	<u-upload :fileList="fileList1" @afterRead="afterRead" @oversize="oversize" @delete="deletePic"
				name="1" multiple :maxCount="1" :previewFullImage="true" maxSize="5024000"
			></u-upload>
			<u-button @click="submit()">确定</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				utl:''
			}
		},
		methods: {
			deletePic(event) {
						this[`fileList${event.name}`].splice(event.index, 1)
					},
			async afterRead(event) {
						console.log("afterRead.event=",event);
						let lists = [].concat(event.file)
						let fileListLen = this[`fileList${event.name}`].length
						lists.map((item) => {
							this[`fileList${event.name}`].push({
								...item, status: 'uploading', message: '上传中'
							})
						})
						for (let i = 0; i < lists.length; i++) {
							const result = await this.uploadFilePromise(lists[i].url);
							let item = this[`fileList${event.name}`][fileListLen]
							this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
								status: 'success',
								message: '',
								url: result,
			 
							}))
							fileListLen++
						}
					},
					oversize(event){
						if(event.name=='1'){ uni.$u.toast("上传图片最大不能超过5M" ) ; }
					},
					uploadFilePromise(url) {
							const _this=this;
								return new Promise((resolve, reject) => {
									let urlFaceupFile=this.$H.baseUrl+'/user/addFaceImg';
									let a = uni.uploadFile({
										url:urlFaceupFile, 
										filePath: url,
										name: 'upfile',
										header:{
											'Authorization':uni.getStorageSync("token")
										},
										success: (res) => {									
											this.utl=res.data;
											setTimeout(() => {
												resolve(res.data)
											}, 1000)
										}
									});
								})
							},
							submit(){
								let url=this.utl;
								let id=uni.getStorageSync("userInfo").uid;
								this.$H.get("/user/updateFaceImgByid?id="+id+"&&url="+url).then(res=>{
									uni.$u.toast("确定更新头像" ) ;
									uni.switchTab({ 
										url:'/pages/user/user'
									})
								})
							}

					
			}
		}
</script>

<style lang="scss">
</style>
