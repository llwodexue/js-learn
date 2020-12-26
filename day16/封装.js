// function Fn() {
//     this.age = 14;
//     this.name = "lion";
// }
// Fn.prototype.category = "animal";
// var f = new Fn();
var obj = {
    age: 13,
};
obj.prototype.name = "lion";

Object.prototype.category = "animal";
Object.prototype.category = "lion";
var f = new Object();
f.age = 18;
Object.prototype.hasPublic = function (attr) {
    return attr in this && !this.hasOwnProperty(attr) ? true : false;
};
console.log(f.hasPublic("age"));
console.log(f.hasPublic("category"));

// 所有函数都有 prototype，Object 是函数的基类