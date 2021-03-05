// function Fn(obj, extend) {
//     if (extend) {
//         for (let key in obj) {
//             this[key] = obj[key];
//         }
//         return;
//     }
//     this.a = 100;
//     this.b = function () {};
// }
// Fn.prototype.c = function () {}
// Fn.prototype = new Fn({
//     x: 100,
//     getX: function () {}
// }, true);
// let f = new Fn;

Object.prototype.xx = "xx";
let obj = {
    name: "lion",
    age: 12,
    3: 200,
    0: 100,
    [Symbol("a")]: function () {}
}
for (const key in obj) {
    console.log(key, obj[key]);
}
// 0 100
// 3 200
// name lion
// age 12
// xx xx

