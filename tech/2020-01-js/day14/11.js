//  "use strict"

/* 
 1) 在全局作用域下 this 指的就是window
*/

// console.log(this);

/* 
 2) 函数执行的时候，看前面有没有点，如果有点，前面是谁，函数执行的时候，里面this就是谁，如果没有点，
 里面的this就是window（非严格模式），在严格模式下（undefined）
*/

// function fn(){
//    console.log(this);
// }
// var obj={
//     "name":"li",
//     fn:fn
// }
// //obj.fn();
// fn();

/* 
3)给元素绑定事件的时候，当事件触发，函数执行的时候，里面的this就是当前绑定的元素

*/
// ele.onclick=function(){
//     console.log(this);
// }

/* 
4) 自执行函数中的this
   非严格模式下：window
   严格模式下：undefined
*/
// ;(function(){
//     console.log(this);
// })();

/* 
5）回调函数里面的this是window

*/

// setTimeout(function() {
//     console.log(this);
// }, 1000);

// setInterval(function(){
//     console.log(this);
// },1000)

/* 
6) 构造函数(类)中的this指的就是当前的实例

*/

// function fn(){
//     this.x=100;
//     this.name="li";
// }

// var f1=new fn();
// var f2=new fn();

/* 
7)通过call、apply、bind可以更改this的指向
*/
function fn(){
    console.log(this);
}

var obj={
    name:"li",
    fn:fn
}

//fn();

fn.call(obj)

/* 
 8) 箭头函数中没有this，也没有arguments,但是在箭头函数中用this,会向上级作用域去找（作用域链）


*/



