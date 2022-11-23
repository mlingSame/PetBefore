<template>
	<view>
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
			<u-form-item label="title" prop="title" borderBottom ref="item1">
				<u--input v-model="model1.title" border="none"></u--input>
			</u-form-item>
			<u-form-item label="content" prop="content" borderBottom ref="item1">
				<u--textarea placeholder="不低于3个字" v-model="model1.content" count></u--textarea>
			</u-form-item>
			<u-form-item label="生日" prop="createdate" borderBottom @click="showcreatedate = true; hideKeyboard()"
				ref="item1">
				<u--input v-model="model1.createdate" disabled disabledColor="#ffffff" placeholder="请选择" border="none">
				</u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
		</u--form>
		<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
		<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
		<u-datetime-picker :show="showcreatedate" :value="createdate1" mode="datetime" closeOnClickOverlay
			@confirm="birthdayConfirm" @cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model1: {
					title: '',
					content: '',
					createdate: '',
					userId:''
				},
				createdate1: Number(new Date()),
				showcreatedate: false,
				rules: {
					'title': {
						type: 'string',
						required: true,
						message: '请填写title',
						trigger: ['blur', 'change']
					},
					'content': {
						type: 'string',
						required: true,
						message: '请填写content',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		methods: {
			reset() {
				this.model1 = ''
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					this.model1.userId=uni.getStorageSync("userInfo").uid;
					this.addBlog(this.model1)
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('请填写完整')
				})
			},
			addBlog(blog){
				this.$H.post('/blog/addBlog',blog).then(res=>{
					uni.showToast({
						title: '添加成功',
						duration: 2000
						
					})
					uni.navigateBack(1)
				})
			},
			birthdayClose() {
				this.showcreatedate = false
				this.$refs.form1.validateField('createdate')
			},
			birthdayConfirm(e) {
				this.showcreatedate = false
				this.model1.createdate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				this.$refs.form1.validateField('createdate')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
		}
	}
</script>

<style>

</style>
