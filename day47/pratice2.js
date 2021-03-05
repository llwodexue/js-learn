let A = require("./pratice1");
let B = require("./pratice1");
// 当导入A模块的时候，会让A模块里的代码从头到尾执行一遍
// 导入的过程是同步的，导入没完成，下边的代码不执行
// 如果同一个模块导入多长，只允许一次
console.log(A);
console.log(B);
