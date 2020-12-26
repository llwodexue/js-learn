function Fn() {
    let a = 1;
    this.a = a;
}
Fn.prototype.say = function () {
    this.a = 2;
};
Fn.prototype = new Fn();
let f1 = new Fn();

Fn.prototype.b = function () {
    this.a = 3;
};
console.log(f1.a); // 1
console.log(f1.prototype); // undefined
console.log(f1.b); // f
console.log(f1.hasOwnProperty("b")); // false
console.log("b" in f1); // true
console.log(f1.constructor == Fn); // true