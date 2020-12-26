/* 
寄生组合继承

*/

function A(){
    this.a="a";
    this.x=100;
}
A.prototype.getA=function(){
    console.log("A")
}

function B(){
    A.call(this);
    this.b=200;
    this.y=300;
}

// var obj={};
// obj.__proto__=A.prototype
// B.prototype=A.prototype;
B.prototype=Object.create(A.prototype);
B.prototype.getA=100;


var b=new B();
