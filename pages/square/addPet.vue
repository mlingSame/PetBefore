<template>
	<view>
		<u-upload :fileList="fileList1" @afterRead="afterRead" @oversize="oversize" @delete="deletePic"
					name="1" multiple :maxCount="5" :previewFullImage="true" maxSize="5024000"
				></u-upload>
		<u--form
				labelPosition="left"
				:model="model1"
				:rules="rules"
				ref="form1"
		>
			<u-form-item
					label="宠物名字"
					prop="petInfo.petname"
					borderBottom
					ref="item1"
			>
				<u--input
						v-model="model1.petInfo.petname"
						border="none"
				></u--input>
			</u-form-item>
			<u-form-item
					label="性别"
					prop="petInfo.sex"
					borderBottom
					@click="showSex = true;"
					ref="item1"
			>
				<u--input
						v-model="model1.petInfo.sex"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择性别"
						border="none"
				></u--input>
				<u-icon
						slot="right"
						petname="arrow-right"
				></u-icon>
			</u-form-item>
			<u-form-item
					label="描述信息"
					prop="petInfo.deccribpet"
					borderBottom
					ref="item1"
			>
				<u--textarea
				v-model="model1.petInfo.deccribpet"
				></u--textarea>
			</u-form-item>
			<u-form-item
					label="价格"
					prop="petInfo.price"
					borderBottom
					ref="item1"
			>
				<u--input>
				v-model="model1.petInfo.price"
				></u--input>
			</u-form-item>
		</u--form>
		<u-button @click="submit()">确定</u-button>
		<u-action-sheet
				:show="showSex"
				:actions="actions"
				title="请选择性别"
				description="如果选择保密会报错"
				@close="showSex = false"
				@select="sexSelect"
		>
		</u-action-sheet>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showSex: false,
			model1: {
				petInfo: {
					petname: 'uView UI',
					sex: '',
					deccribpet:'',
					price:''
				},
			},
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
			rules: {
				'petInfo.petname': {
					type: 'string',
					required: true,
					message: '请填写姓名',
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
			utl:''
		};
	},
	methods: {
		sexSelect(e) {
			this.model1.petInfo.sex = e.name
			this.$refs.form1.validateField('petInfo.sex')
		},
		deletePic(event) {
					this[`fileList${event.name}`].splice(event.index, 1)
				},
		async afterRead(event) {
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
										if(this.utl==''){
											this.utl=res.data
										}else{
											this.utl=res.data+';'+this.utl;
										}
										
										setTimeout(() => {
											resolve(res.data)
										}, 1000)
									}
								});
							})
						},
						submit(){
							let url=this.utl;
							console.log(url)
							console.log(this.model1.petInfo)
							// let id=uni.getStorageSync("petInfo").uid;
							// this.$H.get("/user/updateFaceImgByid?id="+id+"&&url="+url).then(res=>{
							// 	uni.$u.toast("确定更新头像" ) ;
							// 	uni.switchTab({ 
							// 		url:'/pages/user/user'
							// 	})
							// })
						}
	},
	onReady() {
    	this.$refs.form1.setRules(this.rules)
    },
};
</script>