
const baseUrl = 'http://172.20.10.2:8080' 
function req(method,url, data) {
	// const name = uni.getStorageSync('name');
	// const toker = uni.getStorageSync('toker');
	
	return new Promise((resolve, reject) => {
		uni.request({
			method: method,
			url: baseUrl+url,
			// url: urls+url+"?name="+name+"&toker="+toker,
			data: data,
			sslVerify:false,
			success: (res) => {
				if(res){
					resolve(res);
				}
			},
			fail: (err) => {
				console.log(err);
				reject(err);
			}	
		})
	})
}
module.exports = {
	req
}

