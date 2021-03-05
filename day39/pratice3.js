function fn(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(interval);
        }, interval)
    });
}

let p1 = fn(3000);
let p2 = fn(1000);
let p3 = Promise.resolve(0);
Promise.all([p1, p2, p3]).then(results => {
    // 不管谁先知道状态，最后结果的顺序和传递数组的顺序保持一致
    console.log(results);
}).catch(reason => {
    // 处理过程中，遇到一个失败，则ALL立即为失败，结果就是当前实例失败的原因
    console.log(reason);
})