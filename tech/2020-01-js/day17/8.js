/* 
 中间类继承:某些实例并不属于某类，但是想用其原型上的方法，我们可以手动的去更改实例的__proto,让它指向这个类的原型，就可以使用其原型上的方法
*/

function fn(){
    // console.dir(arguments.sort)//undefined
   arguments.__proto__=Array.prototype;
   var res=arguments.sort(function(a,b){
         return a-b;
   });
   console.log(arguments);
}

fn(8,2,10,6)