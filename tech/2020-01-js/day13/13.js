/* 
全局作用域：
变量提升：
1 fn=AAAFFF111
2 var f = 小f1

fn(2)====私有作用域
形参赋值：
  i=2
执行代码：  小f1

*/
function fn(i){
    return function (n){
       console.log(n+(++i));
    }
}
var f=fn(2);// 形成了不销毁的作用域，i=4
f(3);// f1(3)==n=3;  3+ 3=6
fn(5)(6);// i=6 n=6  6+6=12
fn(7)(8);// i=8 n=8  8+8=16
f(4);// n=4; 4+4=8;



function fn(i){
   return function (n){
       console.log(n+(++i));
    }
}
var f=fn(2);
f(3);
fn(5)(6);
fn(7)(8);
f(4)