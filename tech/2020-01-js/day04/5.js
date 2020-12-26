/* 
 箭头函数
*/
var res=function(x,y){
   return x+y;
}
res(1,2);
/* 
 可以省去function
*/
var res=(x,y)=>{
    return x+y;
}
console.log(res(1,2));
// 如果说形参只有一个，小括号也可以省去
var res=x=>{
    return x+1;
}
//如果执行体里面只return 了一句代码 函数体的{}也可以省去
var res=x=>x+1;
var res=(x,y)=>x+y;



var a=2;
function fn(){
    var a=3;
    console.log(a);
}
console.log(a);