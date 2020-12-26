function fn(){
    this.x=100
}

fn.prototype={

}
fn.prototype.getX=function(){

}

var f1=new fn();

/* 
 内置类的原型不允许重定向，但是你可以往它的原型上添加或者覆盖原有的方法

*/
Array.prototype=100;
console.log(Array.prototype);// 还是原来的

Array.prototype.push=function(){} //覆盖原来的方法

Object.prototype.hasPublicPro=function(){} //新增原来的方法

Object.prototype.hasPublicPro=function(attr){
   //this
  return  attr in this&&!this.hasOwnProperty(attr)?true:false;
}

[1,2,3].hasPublicPro("hasOwnProperty");


Array.prototype.myPush=function(){
   //arguments
   for(var i=0;i<arguments.length;i++){
       this[this.length] =arguments[i]
   }
   return this.length;
}
var ary=[1,2,3];
ary.myPush(4,5,6);

ary[ary.length]=5;//[1,2,3,5]


