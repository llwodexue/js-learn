let p1 = new Promise((resolve, reject) => {
    reject(1);
})
let p2 = new Promise((resolve, reject) => {
    resolve(3);
})
let p3 = new Promise((resolve, reject) => {
    reject(5);
})
let p = Promise.race([p1, p2, p3]);
p.then((res) => {
    console.log(res, "success");
}).catch(() => {
    console.log("fail");
})

// // 返回值就是一个已经成功的promise实例
// let pr1 = Promise.resolve(100);
// let pr2 = new Promise((resolve, reject) => {
//     resolve(100);
// })

// let pr3 = Promise.reject(200);
// let pr4 = new Promise((resolve, reject) => {
//     reject(200);
// })