/* 
全局：
var a=9===》0===>1===>0===>1===>2
function fn
var f

*/

var a=9;
function fn(){
  a=0;// 不是私有，把全局的a改成了0 // 把全局的a又改成了0
  return function(b){
     /* 
      b=5;// 私有的
     
     */  
     return b+a++; // 5+0=5  // 5+0=5 // 5+1=6
  }
}
var f=fn();// 小函数b给f
console.log(f(5)); //5
console.log(fn()(5));// 5
console.log(f(5)); //6
console.log(a);//2