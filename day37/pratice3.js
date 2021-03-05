/* setTimeout(() => {
    console.log(1);
}, 1000);
console.log(2);

let p = new Promise(); //Uncaught TypeError: Promise resolver undefined is not a function
executor：可执行函数 */


let p = new Promise((resolve, reject) => {
    // console.log(a);
    resolve("OK");
    // reject("NO");
})
console.log(p);
let p1 = p.then();
console.log(p1);


/* let p = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        resolve("OK"); // 同步修改其状态和结果
        // 改变实例的状态和值（同步）
        // 通知之前基于then存放onfulfilledCallback执行（异步的微任务：也是把执行方法的事情放置在EventQueue中的微任务队列中）
        console.log(4);
    }, 1000); // 存储了一个异步宏任务
    console.log(2);
})
console.log(p);
// 此时接受onfulfilledCallback的时候，状态还是pending，只是把方法存起来
p.then(result => {
    console.log("success");
}, reason => {
    console.log("fail");
})
console.log(3);
// 等1000ms后，执行定时器中的函数（把异步宏任务拿出来执行）
*/

/*
let p1 = new Promise(resolve => {
    resolve("OK");
})
let p2 = p1.then(result => {
    console.log("success", result);
}, reason => {
    console.log("fail", reason);
})
// 执行then方法会返回一个全新的promise实例
// 不论执行的是基于p1存放的onfulfilledCallback, onrejectedCallback两个方法中的哪一个
// 只要方法执行不报错
// 如果方法执行报错：p2的// [[PromiseState]]: "rejected" [[PromiseResult]]: 报错的原因
console.log(p2); */