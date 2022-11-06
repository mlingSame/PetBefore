
const baseUrl = 'http://192.168.0.102:8080' 
const imgUrl='http://192.168.0.102:8080/img/pet/'
export default {
	baseUrl: baseUrl,
	imgUrl:imgUrl,
	request(options = {}) {
		return new Promise((resolve, reject) => {
			let url = options.url;
			if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
				options.url = baseUrl+url;
			}
		
			options.header['Authorization'] = uni.getStorageSync("token");
			options.complete = (response) => {
				if (response.statusCode == 200 || response.statusCode == 0) {
					if (response.data.code == 401 || response.data.code == 420) {
						// #ifdef 
						uni.navigateTo({
							url: "/pages/user/login"
						})
						// #endif
					}

					if (response.data.code == 500) {
						uni.showToast({
							title: response.data.msg,
							icon: "none",
							duration: 2000
						});
					}
					resolve(response.data)
				} else {
					uni.showToast({
						title: '请求异常！',
						icon: "none"
					});
				}
			}

			uni.request(options)
		})
	},

	post(url, data = {}, header = {}) {

		let options = {
			url: url,
			data: data,
			header: header,
			method: "POST",
			sslVerify:false
		}

		return this.request(options);
	},
	get(url, data = {}, header = {}) {
		let options = {
			url: url,
			data: data,
			header: header,
			method: "GET",
			sslVerify:false,
		}

		return this.request(options);
	}
	
};

