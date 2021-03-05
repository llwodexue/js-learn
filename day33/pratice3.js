function fn() {
    // 方案1：把类数组转换为数组
    // let arr = [...arguments];
    // let arr = Array.from(arguments);
    // 让类数组借用数组原型上的方法，实现类数组转换为数组
    let arr = [].slice.call(arguments);
    return arr.reduce((total, item) => total + item);

    // 方案二：直接借用
    // return [].reduce.call(arguments, (total, item) => total + item);

    // 方案三：改变原型指向
    // arguments.__proto__ = Array.prototype;
    // return arguments.reduce((total, item) => total + item);
}
let res = fn(10, 20, 30, 40);
console.log(res);