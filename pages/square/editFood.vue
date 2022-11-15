<template>
	<view>
		<u-upload :fileList="fileList1" @afterRead="afterRead" @oversize="oversize" @delete="deletePic" name="1"
			multiple :maxCount="5" :previewFullImage="true" maxSize="5024000"></u-upload>
		<u--form labelPosition="left" :model="food" :rules="rules" ref="form1">
			<u-form-item label="商品" prop="food.foodname" borderBottom ref="item1">
				<u--input v-model="food.foodname" border="none"></u--input>
			</u-form-item>
			<u-form-item label="描述信息" prop="food.describfood" borderBottom ref="item1">
				<u--textarea v-model="food.describfood"></u--textarea>
			</u-form-item>
			<u-form-item label="价格" prop="food.price" borderBottom ref="item1">
				<u--input v-model="food.price">></u--input>
			</u-form-item>
			<u-form-item label="有效期" prop="food.validTime" borderBottom ref="item1">
				<u--input v-model="food.validTime">></u--input>
			</u-form-item>
			<u-form-item label="生产日期" prop="food.createTime" borderBottom
				@click="showcreateTime = true;hideKeyboard()" ref="item1">
				<u--input v-model="food.createTime" disabled disabledColor="#ffffff" placeholder="请选择生产日期"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
		</u--form>
		</u--form>
		<u-button @click="submit()">修改</u-button>
		<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
		<u-datetime-picker :show="showcreateTime" :value="createTime" mode="datetime" closeOnClickOverlay
			@confirm="createTimeConfirm" @cancel="createTimeClose" @close="createTimeClose"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					food: {
						id:'',
						foodname: '',
						describfood: '',
						price: '0.0',
						validTime: '0',
						createTime: '',
						img: ''
					},
				createTime: Number(new Date()),
				showcreateTime: false,
				rules: {
					'food.foodname': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'food.describfood': {
						type: 'string',
						required: true,
						message: '请填写描述信息',
						trigger: ['blur', 'change']
					},
					'food.price': {
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
		onLoad: function (option) {
				this.selectFoodById(option.foodId);
			},
		
		methods: {
			selectFoodById(param){
				this.$H.get("/food/selectFoodById?id="+param).then(res=>{
					this.food=res
				})
			},
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
				this.$refs.form1.validateField('food.createTime')
			},
			createTimeConfirm(e) {
				this.showcreateTime = false
				this.food.createTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				this.$refs.form1.validateField('food.createTime')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			submit() {
				this.food.img = this.utl;
				let _this = this;
				this.$H.put("/food/editFood", this.food).then(res => {
					uni.redirectTo({
						url:'/pages/user/foodInfo'
					})
					
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
				const validateList = ['food.foodname', 'food.describfood', 'food.price']
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
