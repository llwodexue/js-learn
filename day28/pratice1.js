// promise的实例有三个状态：pending（等待态）、fulfilled（成功态）、rejected（失败态）
var p = new Promise((resolve, reject) => {
    // resolve执行会把当前promise变成成功态
    // reject执行会把当前promise变成失败态
    setTimeout(() => {
        // resolve()
        console.log("hello");
        reject()
    }, 1000)
})
console.log(p);
// then中的回调函数执行是异步的
p.then(() => {
    return new Promise((resolve, reject) => {
        console.log("1");
        setTimeout(() => {
            res()
        })
    }, () => {
        console.log("第一次成功");
    })
}, () => {
    console.log("第一次失败");
}).then(() => {
    console.log("第二次成功");
}, () => {
    console.log("第二次失败");
}).then(() => {
    console.log("第三次成功");
}, () => {
    console.log("第三次失败");
});
// 如果这里不返回一个新的promise实例（默认返回一个成功状态的promise实例），下一个then就会默认执行

// setTimeout((meg) => {
//     console.log(meg);
// }, 1000, "hello")