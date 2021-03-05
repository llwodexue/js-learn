// promise的实例有三个状态：pending（等待态）、fulfilled（成功态）、rejected（失败态）
var p = new Promise((resolve, reject) => {
    reject()
})
p.then(() => {
    console.log("第一次成功");
}, () => {
    console.log("第一次失败");
    return new Promise((resolve, reject) => {
        reject()
    })
}).then(() => {
    console.log("第二次成功");
}, () => {
    console.log("第二次失败");
}).then(() => {
    console.log("第三次成功");
}, () => {
    console.log("第三次失败");
});
// 第一次失败 第二次失败 第三次成功
// 如果这里不返回一个新的promise实例（默认返回一个成功状态的promise实例），下一个then就会默认执行