/* 
原型继承
 */

 function A(){
     this.a="a"
 }
 A.prototype.getX=function(){
     return this.a;
 }
 var a=new A();//

 function B(){
     this.b="b"
 }

 B.prototype=new A();//
 var b=new B();//

/* 
中间类继承
*/

 function fn(){
    arguments.__proto__=Array.prototype;
    arguments.sort(function(a,b){
        return a-b;
    })
 }

 fn(1,2,3)


 /* 
 call 继承
 
 */

function A(){
    // b
    // b.a="a"
    this.a="a"
}
A.prototype.getX=function(){
    return this.a;
}

function B(){
    A.call(this)
    this.b="b";
}

var b=new B();//{"b":"b","a":"a"}

/* 
寄生组合式继承
*/

function A(){
    this.a="a"
}
A.prototype.getX=function(){
    return this.a;
}

function B(){
    A.call(this)
    this.b="b";
}

// var obj={};
// obj.__proto__=A.prototype
B.prototype=Object.create(A.prototype);


var b=new B();//{"b":"b","a":"a"}

