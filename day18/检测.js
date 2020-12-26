var arr = [1, 2, 3];
arr instanceof Array;
arr instanceof Object;
null instanceof Object;

var a = {};
a.constructor; // Object()
a.constructor = 3;
a.constructor; // 3

Object.prototype.toString.call(null); // "[object Null]"
var obj = {};
obj.toString.call(null);
global.toString.call(null)
console.log(toString.call(null))