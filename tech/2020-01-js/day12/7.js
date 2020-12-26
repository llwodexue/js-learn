/* 变量提升的特殊性：
   判断语句：不论条件是否成立，都会进行变量提升
   var 还是之前理解：只声明不定义
   function 在老版本浏览器中：声明+定义
            在新版本浏览器中：只声明不定义

*/


/* 
在变量提升阶段：声明变量 a
代码自上而下执行：
*/
console.log(a); // undefined
if(1==2){
  var a=12;
}
console.log(a);//undfined


/* 
 在新版本浏览器中：变量提升阶段 声明了fn
 代码自上而下执行：


*/
//console.log(fn());//fn is not a function
console.log(fn); // undefined
if(1==2){
   function fn(){
       console.log(1)
   }
}
console.log(fn);// undefined

/* 
变量提升: var a
执行代码：

*/

console.log(a);  // undefined
if("a" in window){
    var a=100;
}
console.log(a); //100




f=function(){
    return true;
};
g=function(){
    return false;
};
~function(){
/* 
 g();//true
 []==false //  true
*/
 if(g()&&[]==![]){

     f=function(){return false;};
     function g(){
         return true;
     }
 }


}();
console.log(f());
console.log(g());


// function fn  只声明

/* 
 在全局作用域下有一个变量提升：
 var a
*/
var a=0;
if(true){
   console.log(a); // function fn
   a=1;
   console.log(a);//1
   function a(){};
   a=21;// 特殊记忆：在判断语句中，如果出现function，在function 后面再对此变量进行改值，改变的是私有的
   console.log(a);//21
}
console.log(a);









