console.log(axios.defaults);
// axios.defaults.transformRequest = function (data, header) {
//     console.log(data);
//     // 会在请求发送出去之前执行，对data进行处理
//     let str = "";
//     for (let key in data) {
//         str += `${key}=${data[key]}&`
//     }
//     str = str.slice(0, str.length - 1)
//     console.log(str);
//     return str;
// }

// 创建一个新的axios实例（可以发送请求。可以给某一组有特殊配置的请求进行参数配置）
// const instance = axios.create({
//     timeout: 1000,
//     baseURL: "./json/"
// })
// instance.defaults.validateStatus = function (status) {
//     // 次函数会在响应成功后，axios调用resolve之前执行
//     console.log(status);
//     // 当前函数的return值，直接影响当前promise的状态
//     return status >= 200 && status < 400
// }
// instance.get("1.json", {
//     params: {
//         name: 1,
//         age: 2
//     }
// })
// 假设项目里有100个请求，90个请求走defaults默认配置
// 但是有10个请求不能走defaults默认配置

axios.defaults.baseURL = "./json/"
let p1 = axios.get("1.json");
let p2 = axios.get("2.json");
axios.all([p1, p2]).then(([res1, res2]) => {
    console.log("p1和p2全部成功");
    console.log(res1, res2);
})
console.dir(axios);