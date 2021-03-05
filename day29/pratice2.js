let p = new Promise((resolve, reject) => {
    // 全局未声明a
    console.log(a);
})
p.then(() => {
    console.log("成功");
}, () => {
    console.log("失败");
    return new Promise((res, rej) => {
        rej("error")
    })
}).then(() => {}).catch((res) => {
    console.log(res, "catch");
})
// 失败 error