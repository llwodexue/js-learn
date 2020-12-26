/* 
函数参数的解构赋值

*/

function fn (x,y){
   console.log(a);
}
var ary=[1,2];
var a=ary[0];
var b=ary[1];
fn(a,b)



function fn ([x,y]){
   console.log(x,y)
 }
 var ary=[1,2];
 fn(ary)


// 设置参数的默认值
function fn (x=20,y=10){

    console.log(x,y)
}
  
fn()


function fn ({age:a}){

    console.log(a)
}
  
fn({name:"li",age:10})

