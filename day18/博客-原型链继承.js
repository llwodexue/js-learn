function A() {
    this.colors = ["red", "green"];
}
function B() {}
// 继承了 A
B.prototype = new A();
var arr1 = new B();
arr1.colors.push("yellow");
console.log(arr1.colors); // [ 'red', 'green', 'yellow' ]
var arr2 = new B();
console.log(arr2.colors); // [ 'red', 'green', 'yellow' ]

function A() {
    this.a = "a";
    this.x = 100;
}
A.prototype.getA = function () {
    console.log("A");
};
function B() {
    // 获取私有属性
    A.call(this);
    this.b = "b";
    this.y = 200;
}
// 1.可以考虑用普通对象做中间件
var obj = {};
obj.__proto__ = A.prototype;
B.prototype = obj;
// 2.可以考虑用函数做中间件
function F(){}
F.prototype = A.prototype;
B.prototype = new F();
// 3.创建一个空对象，并且让空对象的 __proto__ 指向参数
B.prototype = Object.create(A.prototype);
// 4.使用原型链继承
B.prototype = new A();
B.prototype.constructor = B;
var b = new B();
