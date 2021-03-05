axios.defaults.baseURL = 'http://127.0.0.1:8888';
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
	if (!data) return data;
	let result = ``;
	for (let attr in data) {
		if (!data.hasOwnProperty(attr)) break;
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
axios.interceptors.response.use(function onFulfilled(response) {
	console.log(100);
	return response.data;
	
}, function onRejected(res) {
	let status = res.response.status
	if(status == 404){
		alert('您当前的请求路径不正确，请修改路径');
	}
	if(status == 503){
		alert('当前服务器繁忙，请稍后重试');
	}
	return Promise.reject(res);
	// return 100
});
axios.defaults.validateStatus = function (status) {
	return /^(2|3)\d{2}$/.test(status);
}


