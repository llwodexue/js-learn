

var a=4;
/* 
x=1
y=2;
a=3;===>10

*/
function b(x,y,a){
  console.log(a);//3
  arguments[2]=10;
  console.log(a);//10
}
a=b(1,2,3);// 函数执行的结果return 多少就是多少，没有return 就是undefined
console.log(a)// undefined