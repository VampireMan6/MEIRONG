const BASE_URL = 'https://www.novel888.com'
//封装接口请求
const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			header: options.header || {},
			data: options.data || {},
			success: (res) => {
				// if (res.data.code !== 1) {
				// 	return uni.showToast({
				// 		title: res.data.msg,
				// 		duration: 2000,
				// 		icon: "none"
				// 	})
				// }
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '网络连接失败',
					duration: 2000,
					icon: "none"
				})
				reject(err)
			}
		})
	})
}
export default myRequest


// async huandengpian() {
// 	let res = await this.$myRequest({
// 		url: '/api/index/slide',
// 		method: "POST",
// 	});
// 	console.log(res.data.data)
// },
