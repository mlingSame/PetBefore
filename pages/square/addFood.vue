<template>
	<view>
		<u-upload :fileList="fileList1" @afterRead="afterRead" @oversize="oversize" @delete="deletePic" name="1"
			multiple :maxCount="5" :previewFullImage="true" maxSize="5024000"></u-upload>
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="商品" prop="foodInfo.foodname" borderBottom ref="item1">
				<u--input v-model="model1.foodInfo.foodname" border="none"></u--input>
			</u-form-item>
			<u-form-item label="描述信息" prop="foodInfo.deccribFood" borderBottom ref="item1">
				<u--textarea v-model="model1.foodInfo.deccribFood"></u--textarea>
			</u-form-item>
			<u-form-item label="价格" prop="foodInfo.price" borderBottom ref="item1">
				<u--input v-model="model1.foodInfo.price">></u--input>
			</u-form-item>
			<u-form-item label="有效期" prop="foodInfo.validTime" borderBottom ref="item1">
				<u--input v-model="model1.foodInfo.validTime">></u--input>
			</u-form-item>
			<u-form-item label="生产日期" prop="foodInfo.createTime" borderBottom
				@click="showcreateTime = true;hideKeyboard()" ref="item1">
				<u--input v-model="model1.foodInfo.createTime" disabled disabledColor="#ffffff" placeholder="请选择生产日期"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
		</u--form>
		</u--form>
		<u-button @click="submit()">确定</u-button>
		<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
		<u-datetime-picker :show="showcreateTime" :value="createTime" mode="datetime" closeOnClickOverlay
			@confirm="createTimeConfirm" @cancel="createTimeClose" @close="createTimeClose"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					foodInfo: {
						foodname: '',
						describfood: '',
						price: '0.0',
						validTime: '0',
						createTime: '',
						img: ''
					},
				},
				createTime: Number(new Date()),
				showcreateTime: false,
				rules: {
					'foodInfo.foodname': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'foodInfo.describfood': {
						type: 'string',
						required: true,
						message: '请填写描述信息',
						trigger: ['blur', 'change']
					},
					'foodInfo.price': {
						type: 'string',
						required: true,
						message: '请填写价格',
						trigger: ['blur', 'change']
					}
				},
				foodUser: {
					id: '',
					fid: '',
					uid: ''
				},
				fileList1: [],
				utl: '',

			};
		},
		methods: {
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			async afterRead(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
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
			oversize(event) {
				if (event.name == '1') {
					uni.$u.toast("上传图片最大不能超过5M");
				}
			},
			uploadFilePromise(url) {
				const _this = this;
				return new Promise((resolve, reject) => {
					let urlFaceupFile = this.$H.baseUrl + '/food/addFoodImg';
					let a = uni.uploadFile({
						url: urlFaceupFile,
						filePath: url,
						name: 'upfile',
						header: {
							'Authorization': uni.getStorageSync("token")
						},
						success: (res) => {
							if (this.utl == '') {
								this.utl = res.data
							} else {
								this.utl = res.data + ';' + this.utl;
							}

							setTimeout(() => {
								resolve(res.data)
							}, 1000)
						}
					});
				})
			},
			createTimeClose() {
				this.showcreateTime = false
				this.$refs.form1.validateField('foodInfo.createTime')
			},
			createTimeConfirm(e) {
				this.showcreateTime = false
				this.model1.foodInfo.createTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				this.$refs.form1.validateField('foodInfo.createTime')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			submit() {
				this.model1.foodInfo.img = this.utl;
				this.foodUser.uid = uni.getStorageSync("userInfo").uid;
				let _this = this;
				this.$H.put("/food/addFood", this.model1.foodInfo).then(res => {
					_this.foodUser.fid = res.obj.id
					this.adduserFood(this.foodUser)
				})
			},
			adduserFood(param) {
				this.$H.post("/food-user/addFood", param).then(res => {
					this.$u.toast('添加成功，可在个人主页中查看');
					uni.switchTab({
						url: '/pages/user/user'
					})
				})
			},
			reset() {
				const validateList = ['foodInfo.foodname', 'foodInfo.describfood', 'foodInfo.price']
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
				}, 10)
			},
		},
		onReady() {
			this.$refs.form1.setRules(this.rules)
		}


	};
</script>
