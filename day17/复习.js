// 基类原型添加方法
Object.prototype.hasPublic = function (attr) {
    return attr in this && !this.hasOwnProperty(attr) ? true : false;
};
console.log([1, 2, 3].hasPublic("hasOwnProperty"));

// myPush
Array.prototype.myPush = function () {
    for (var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
};
var arr = [1, 2, 3];
arr.myPush(4, 5, 6);
console.log(arr);

function Fn() {
    var a = 3;
}
Fn(); // 普通函数
var f1 = new Fn(); // 构造函数
// 如果没有构造器属性，其实例为一个空属性对象
console.log(f1);