function Fn(x, y) {
    var total = x + y;
    // this window（普通函数）
    // this f1（类）
    this.a = x;
    this.b = y;
    this.total = total;
}

Fn(1, 2); // 普通函数
var f1 = new Fn(1, 2); // 类
Fn.age = 10; // 对象

var f2 = new Fn(3, 4);
console.log(f2.age); // undefined
console.log(f2.a); // 3