console.dir(axios);

axios.defaults.baseURL = "./json/"
axios.defaults.transformRequest = function (data, headers) {
    // 当前函数会在请求发送出去之后就执行
    console.log(data, headers);
    // 如果想处理对象
    // let str = "";
    // for (const key in data) {
    //     str += `${key}=${data[key]}&`
    // }
    // str = str.slice(0, str.length - 1);
    // console.log(str); // name=1&age=2

    // 如果想处理json
    headers.post["Content-Type"] = "application/json";
    let str = JSON.stringify(data);
    console.log(str); // {"name":1,"age":2}
    return str;
}
// axios.get("1.json").then((res) => {
//     // 请求成功之后就会把当前promise的实例置为成功态，然后走then里的回调
//     console.log(res);
// }).catch((res) => {
//     // 请求失败之后就会把当前promise的实例置为失败态，然后走catch里的回调
// })
axios.post("1.json", {
    name: 1,
    age: 2
})


// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])

// axios.get('/json', {
//     params: {
//         name: 1,
//         age: 2
//     },
//     timeout: 2000
// })
// axios.post('/json', {
//     name: 1,
//     age: 2,
// }, {
//     timeout: 2000
// })

let obj = {
    // 是用于请求的服务器 URL
    url: '/user',

    // 是创建请求时使用的方法
    method: 'get', // default

    // 基础的url路径
    baseURL: 'https://xxx.com/api',

    // 允许在向服务器发送前，修改请求数据(仅仅是在POST系列请求中有效)
    transformRequest: [function (data, headers) {
        // 如果想处理对象
        // let str = "";
        // for (const key in data) {
        //     str += `${key}=${data[key]}&`
        // }
        // str = str.slice(0, str.length - 1);
        // console.log(str); // name=1&age=2

        // 如果想处理json
        headers.post["Content-Type"] = "application/json";
        let str = JSON.stringify(data);
        console.log(str); // {"name":1,"age":2}
        return str;
    }],
}