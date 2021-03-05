// let p = Promise.all([1, 2, 3]);
// // Promise.resolve(1); // 快速创建一个成功的Promise实例
// // p会等待所有的promise实例成功以后才会改变状态
// // 如果三个实例有一个失败了，p的状态就是失败态
// p.then((res) => {
//     console.log(res, 100);
// }).catch(() => {
//     console.log(res, 100);
// })
// console.log(300);


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1);
    }, 2000)
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(2);
    }, 1000)
})
let s = Promise.race([p1, p2]);
