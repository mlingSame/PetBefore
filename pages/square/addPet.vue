<template>
	<view>
		<u-upload :fileList="fileList1" @afterRead="afterRead" @oversize="oversize" @delete="deletePic" name="1"
			multiple :maxCount="5" :previewFullImage="true" maxSize="5024000"></u-upload>
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="宠物名字" prop="petInfo.petname" borderBottom ref="item1">
				<u--input v-model="model1.petInfo.petname" border="none"></u--input>
			</u-form-item>
			<u-form-item label="性别" prop="petInfo.sex" borderBottom @click="showSex = true;" ref="item1">
				<u--input v-model="model1.petInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
					border="none"></u--input>
				<u-icon slot="right" petname="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="描述信息" prop="petInfo.deccribpet" borderBottom ref="item1">
				<u--textarea v-model="model1.petInfo.deccribpet"></u--textarea>
			</u-form-item>
			<u-form-item label="价格" prop="petInfo.price" borderBottom ref="item1">
				<u--input>
					v-model="model1.petInfo.price"
					></u--input>
			</u-form-item>
			<u-form-item label="类别" prop="catag" borderBottom @click="showcatag= true;">
				<u--input v-model="catag" disabled disabledColor="#ffffff" placeholder="请选择类别" border="none"></u--input>
				<u-icon slot="right" petname="arrow-right"></u-icon>
			</u-form-item>
		</u--form>
		<u-button @click="submit()">确定</u-button>
		<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="" @close="showSex = false"
			@select="sexSelect">
		</u-action-sheet>

		<u-action-sheet :show="showcatag" :actions="actions1" title="请选择类别" description="" @close="showcatag = false"
			@select="catagsexSelect">
		</u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSex: false,
				showcatag: false,
				model1: {
					petInfo: {
						petname: '',
						sex: '',
						deccribpet: '',
						price: '0.0',
					},
				},
				pet: {},
				actions: [{
						name: '公',
					},
					{
						name: '母',
					},
					{
						name: '保密',
					},
				],
				actions1: [{
						name: 'cat',
					},
					{
						name: 'dog',
					},
					{
						name: 'rat',
					},
					{
						name: 'rabbit',
					}, {
						name: 'pig',
					}, {
						name: 'frog',
					}, {
						name: 'other',
					}
				],
				rules: {
					'petInfo.petname': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'petInfo.deccribpet': {
						type: 'string',
						required: true,
						message: '请填写描述',
						trigger: ['blur', 'change']
					},
					'petInfo.price': {
						type: 'string',
						required: true,
						message: '请填写价格',
						trigger: ['blur', 'change']
					},
					'catag': {
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					},
					'petInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择公或母',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false,
				fileList1: [],
				utl: '',
				addPetid: '',
				catag: 'cat',
				catagId: ''
			};
		},
		methods: {
			sexSelect(e) {
				this.model1.petInfo.sex = e.name
				this.$refs.form1.validateField('petInfo.sex')
			},
			catagsexSelect(e) {
				this.catag = e.name;
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
					let urlFaceupFile = this.$H.baseUrl + '/pet/addPetImg';
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
			submit() {
				let url = this.utl;
				this.pet = this.model1.petInfo;
				this.pet.img = url;
				this.listByname(this.catag);
				this.$H.post("/pet/addPet", this.pet).then(res => {
					this.addpetByUid(res.obj.id, uni.getStorageSync("userInfo").uid);
					this.addCataPet(res.obj.id, this.catagId)
					uni.redirectTo({
						url: '../user/petInfo'
					})
				})
			},
			addpetByUid(pid, uid) {
				this.$H.get('/user-pet/addPetByUid?uid=' + uid + '&pid=' + pid).then(res => {
					uni.$u.toast("添加成功");
				})
			},
			listByname(param) {
				this.$H.get('/catagory/listByname?cataName=' + param).then(res => {
					this.catagId = res;
				})
			},
			addCataPet(pid, cid) {
				this.$H.get('/cata-pet/addCataPetByPage?pid=' + pid + '&cid=' + cid).then(res => {

				})
			}
		},
		onReady() {
			this.$refs.form1.setRules(this.rules)
		},
	};
</script>
