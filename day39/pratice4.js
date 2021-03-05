// JQ：$.ajax 基于回调函数的方式管理异步编程
let total = 3,
    i = 0;

function complete() {
    i++;
    if (i == total) {

    }
}

const api1 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: "api1",
            success(result1) {
                resolve();
            }
        })
    })
}
const api2 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: "api2",
            success(result2) {
                resolve();
            }
        })
    })
}
const api3 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: "api3",
            success(result3) {
                resolve();
            }
        })
    })
}
// 串行写法
api1().then(result1 => {
    return api2();
}).then(result2 => {
    return api3();
}).then(result3 => {});
// 并行写法
Promise.all([api1(), api2(), api3()]).then(results => {});


(async function(){
    let result1 = await api1();
    let result2 = await api2();
    let result3 = await api3();
})();