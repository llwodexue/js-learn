// let a=10,b=10;
// let fn=function(){
//     //console.log(a);
//     let a=b=20;
//     console.log(a,b);
// };
// fn();
// console.log(a,b)

/* 
  全局作用域中：
  1变量提升：
  var a =12
  var b =13
  var c =14  ===20
  function fn=AAAFFF111
  fn(a); fn(12)

  私有作用域 AAAFFF222 fn(12)
  1、形参赋值 a=12; a 是私有的 a=20
  2、变量提升：
     var b=20
  3、 代码自上而下执行:
     console.log(a,b,c);// 12   undefined  14
     b=c=a=20;// b 和a 都是私有的，改值的时候改的就是自己私有的，c是window全局作用域的，改的是全局的c=20
*/
var a=12,b=13,c=14;
function fn(a){
   console.log(a,b,c); 
   var b=c=a=20;
   console.log(a,b,c);//20 20 20
}
fn(a);
console.log(a,b,c);