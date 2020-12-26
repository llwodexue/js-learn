/* 
es6语法：
1、let 和const
   + 没有变量提升
   + 在同一个块级作用域内不能被重复声明
   + 也有作用域链的，里层的可以访问外层的，外层的访问到里层的
   + for 循环 结合 let 使用，会有一个父作用域控制轮数，循环几次就再生成几个块级作用域
   + 暂时性死区
   + const 定义一个常量，必须有初始值

*/
// let a=3;
// if(true){
//     // 这一个块级作用域；
//   let a = 1;
//   console.log(a);
// }
// console.log(a);


// {
//     let a=3;
//     {
//         console.log(a)
//     }
    
// }

var lis=document.querySelectorAll("li");
for(let i=0;i<lis.length;i++){
    lis[i].onclick=function(){
        alert(i)
    }
}


console.log(typeof a);

console.log(typeof da);
const a=3;

