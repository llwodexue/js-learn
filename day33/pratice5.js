// class Fn {
//     // 基于ES6 class方式构建Symbol.hasInstance才会生效
//     static[Symbol.hasInstance]() {
//         console.log("OK");
//         return false;
//     }
// }

// function Fn() {};
// let f = new Fn;
// console.log(f instanceof Fn);


// function Fn(){}
// Fn.prototype = Array.prototype;
// let f = new Fn;
// console.log(f instanceof Array); // true

// 检测target是否为ctor的实例
function instance_of(target, ctor) {
    let tType = typeof target,
        cType = typeof ctor;
    // 保证ctor是一个构造函数
    if(typeof ctor )
    // if(!/^(o)$/)
}