


/* 
 全局：
 变量提升： var foo  function bar==AAAFFF111
 执行代码：

*/
var foo=1;
function bar(){
  if(!foo){
    var foo=10;
  }
  console.log(foo);
}
bar();
console.log(foo)
/* 
 bar ()
 私有作用域形成：
 1、形参赋值：无
 2、变量提升：var foo（私有变量）
 3、代码自上而下执行：foo=undefined  !foo==>true 条件成立 foo=10
 console.log(foo);//10

*/


