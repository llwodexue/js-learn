/* 
 第一个值如果是true,那a 就是第一个值，
 如果第一个值是false，就是第二个值

*/
var a=1||2;// 1
var a=null||1; //1

/* 
如果第一个值为假，那a的值就是第一个
如果第一个值为真，那a的值就是第二个

*/
var a=null&&1;// null
var a=1&&2; // 2




var foo="hello";

/* 
1形参赋值 foo="hello"


*/
(function(foo){
  console.log(foo);//"hello"
  var foo=foo||"word"; //foo="hello"||"word"  foo="hello"
  console.log(foo);//"hello"
})(foo);
console.log(foo);// 全局下的也是"hello"