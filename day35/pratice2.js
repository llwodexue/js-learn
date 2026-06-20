let obj1 = {
    n: 10,
    m: 20,
    header: {
        a: 100
    }
}
let obj2 = {
    x: 10,
    m: 30,
    header: {
        b: 200
    }
}
// obj2覆盖obj1 只实现浅合并（浅拷贝）：只对第一级合并
let obj = Object.assign(obj1, obj2);
console.log(obj);
console.log(obj1);
// 返回的不是新对象，而是原始的obj1对象
console.log(obj === obj1);
// 返回的是第一个参数（全新的一个对象）
let Obj = Object.assign({}, obj1, obj2);
console.log(Obj);