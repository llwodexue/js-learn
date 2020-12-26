/*
构造函数（类）
内置类：sNumber String Boolean Symbol Null Undefined Object Function Array RegExp Math Date
自定义类：
*/
function Fn() {
    this.age = 14;
    this.name = "lion";
}
Fn.prototype.category = "animal";
var f = new Fn();
console.log(f.hasOwnProperty("age")); // true
console.log(f.hasOwnProperty("animal")); // false
