function Fn() {
    this.age = 14;
    this[A] = 100;
    this.name = "lion";
}
let A = Symbol("a");
Fn.prototype.name = "bird";
Fn.prototype[A] = 200;
let f = new Fn();

// Object.prototype.hasPubProperty = function (attr) {
//     var self = this,
//         prototype = Object.getPrototypeOf(self);
//     while (prototype) {
//         // 检测是否存在attr这个属性
//         var keys = Object.keys(prototype);
//         if (typeof Symbol !== "undefined") {
//             keys = keys.concat(Object.getOwnPropertySymbols(prototype));
//         }
//         if (keys.indexOf(attr) > -1) return true
//         // 一直按照原型链查找
//         prototype = Object.getPrototypeOf(prototype);
//     }
//     return false
// }
Object.prototype.hasPubProperty = function (attr) {
    let self = this,
        prototype = Object.getPrototypeOf(self);
    while (prototype) {
        // 检测是否存在attr这个属性
        if (prototype.hasOwnProperty(attr)) return true;
        // 一直按照原型链查找
        prototype = Object.getPrototypeOf(prototype);
    }
    return false
}

console.log(f.hasPubProperty("age")); // false
console.log(f.hasPubProperty("name")); // true
console.log(f.hasPubProperty(A)); // true
console.log(f.hasPubProperty("toString")); // true