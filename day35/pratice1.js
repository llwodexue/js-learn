// 发布订阅
let box = document.getElementById("box");
// 就是给当前box的点击事件对应的事件池子里订阅方法
box.addEventListener("click", fn);

let box = {};
// 订阅的方法
function on(ele, type, fn) {
    // box.out=[] ele[type]=[]
    // 当on执行的时候先看看有没有当前事件类型的池子，如果没有就重新创建，如果有就不需要创建
    // 如果当前类型对应的池子存在就不会再重新创建了，如果当前类型对应的池子不存在就不重新创建
    if (!ele[type]) ele[type] = []
    // 在给当前池子订阅方法之前，先判断一下将要订阅的方法在池子里是不是已经存在，如果存在，就不需要再订阅了，如果不存在继续订阅
    let res = ele[type].some(item => {
        return item === fn
    });
    // 如果res是true说明当前订阅的方法在池子里已经有了，既不需要再订阅了
    if (res) return
    ele[type].push(fn)
}
// 发布的方法
function emit(ele, type) {
    let pool = ele[type]
    // 如果当前的池子存在则继续发布
    pool && pool.forEach(item => {
        // 判断一下，如果当前的item是函数再让它执行
        if (typeof item === "function") item()
    });
}
// 移除绑定的方法
function off(ele, type, fn) {
    // 在发布之前把对应的事件池子里的方法移除
    let pool = ele[type];
    pool && pool.forEach((item, index) => {
        if (item === fn) {
            // 会出现数组的塌陷
            // pool.splice(index, 1);
            // pool[index] = null;
            item = null;
        }
    });
    // pool && (ele[type] = pool.filter((item) => {
    //     return item !== fn
    // }))
}

function fn1() {
    console.log("吃饭");
}

function fn2() {
    console.log("睡觉");
}

function fn3() {
    console.log("豆豆");
}
on(box, "out", fn1)
on(box, "out", fn1)
on(box, "out", fn2)
on(box, "out", fn3)
console.log(box);
setTimeout(() => {
    emit(box, "out")
}, 2000)
off(box, "out", fn1);
console.log(box);