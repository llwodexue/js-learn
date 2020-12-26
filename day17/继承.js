function A() {
    this.a = "a";
}
A.prototype.getA = function () {
    console.log(this.a);
};

function B() {
    this.b = "b";
}
B.prototype = new A();
var b = new B();

function fn() {
    arguments.__proto__ = Array.prototype;
    // arguments 是一个对象
    return arguments.sort(function (a, b) {
        return a - b;
    });
}
console.log(fn(5, 3, 6, 4)); // Array { '0': 3, '1': 4, '2': 5, '3': 6 }

function fn() {
    //console.dir(arguments.sort);//undefined
    arguments.__proto__ = Array.prototype;
    var res = arguments.sort(function (a, b) { return a - b; });
    console.log(res);
}

fn(8, 2, 10, 6)

function A() {
    this.a = "a";
    this.x = 100;
}
A.prototype.getA = function () {
    console.log("A");
};
function B() {
    // 实例 b this
    // A();去执行 A()，但A里this和B里this不是一个，需要用call绑定下this
    A.call(this);
    this.b = "b";
    this.y = 200;
}
// 耦合，A、B类的原型指向同一个堆内存地址，修改时相互影响
B.prototype = A.prototype;
B.prototype.getB = function () {
    console.log("B");
};
// 可以考虑找个中间件
var obj = {};
obj.__proto__ = A.prototype;
B.prototype = obj;
// 简洁写法
// 创建一个空对象，并且让空对象的 __proto__ 指向参数
B.prototype = Object.create(A.prototype);
var b = new B();
// 弊端：如果B原型有方法会被覆盖


