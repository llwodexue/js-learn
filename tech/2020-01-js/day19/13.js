
/* 
  箭头函数
  1) 没有this,如果用了this，就会按照作用域链向上查找
  2) 箭头函数中没有arguments
  3) 箭头函数不能当成类去使用

*/
var fn=x=>x;

var fn=function (a){
   return function(b){
        return function(c){
            return a+b+c;
        }
   }
}

var fn=a=>b=>c=>a+b+c
var res=fn(1)(2)(3);
console.log(res);