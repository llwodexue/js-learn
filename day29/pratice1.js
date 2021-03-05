// catch是原型上的一个方法， 任何一个promise的实例是失败态的时候会执行catch函数
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 1000)
// })
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject(2);
//     }, 1000)
// })
// let p3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(3);
//     }, 1000)
// })


let p1 = 1,
    p2 = 3,
    p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5);
        }, 500)
    })
// all方法在promise类自己的实例上
let p = Promise.all([p1, p2, p3]);
p.then((res) => {
    console.log(res, "全部成功");
}).catch(() => {
    console.log("有失败的");
})
// all会返回一个新的 promise 实例，这个实例状态会等到上面三个 promise 实例全部成功后，才会成功
// error 最后