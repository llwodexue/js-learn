/* 
 检测数据类型的几种方法：
 1 typeof 
   返回值一定是字符串：
   + "string"
   + "number"
   + "boolean"
   + "undefined"
   + "object"
   + "function"
   特殊记忆：typeof null ==>"object"
  2 instanceof
  3 constructor
  4 Object.prototype.toString.call(); 

*/

typeof []

typeof typeof [];//===  "object" ===typeof "object"  =>"string"

typeof typeof typeof typeof typeof []




typeof "ss"
"string"
typeof 1
"number"
typeof NaN
"number"
typeof false
"boolean"
typeof null
"object"
typeof undefined
"undefined"
var obj={}
undefined
typeof obj
"object"
typeof []
"object"
typeof /\d/
"object"
function fn(){}
undefined
typeof fn
"function"