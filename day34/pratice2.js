/* // 原型继承
function A() {
    this.x = 100;
}
A.prototype.getX = function () {}

function B() {
    this.y = 200;
}
B.prototype.getY = function () {}
// 把类A的实例赋值给类B的原型
B.prototype = new A;
let f1 = new B;
// 继承了公有和私有属性，但自己原型丢了 */

/* // call继承
// 继承私有属性
function A() {
    this.x = 100;
}

function B() {
    // this->当前实例f1
    this.y = 200;
    A.call(this);
}
let f1 = new B;
 */

// 寄生组合继承（继承私有和公有）
// Object.create(); // 创建一个对象，并且把当前对象的 __proto__ 指向传递的第一个实参
// let obj = {
//     a: 100
// }
// let res = Object.create(obj);
// console.log(res);

/* function A() {
    this.x = 100;
}
A.prototype.getX = function () {}

function B() {
    this.y = 200;
    A.call(this); // 继承A的私有
}
// 创建一个空对象，并且把对象的__proto__指向类A的原型，最后把这个对象赋值给类B的原型
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
let f1 = new B;
f1.__proto__.ss = function () {} */

/* class A {
    constructor(a) {
        this.x = a;
    }
    getX() {}
}
// extends继承公有
class B extends A {
    constructor() {
        super(100);
        // A.call(this)<==>super()，执行constructor(a)，继承私有
        this.y = 200;
    }
    getY() {}
}
let f1 = new B; */

// 中间类继承
// arguments.__proto__ = Array.prototype