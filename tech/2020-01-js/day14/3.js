var a=10,b=11,c=12;
/* 
1形参赋值 和变量提升
 var a=10 私有
 var b    私有
*/
function text(a){
  a=1;
  var b=2;
  c=3;// 改的是全局的
  
}
text(10);
console.log(a);
console.log(b);
console.log(c);