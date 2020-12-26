function A(){
    this.a="a"
}
A.prototype.getA=function(){}

function B(){
    A.call(this);
    this.b="b"
}
B.prototype=Object.create(A.prototype)
var b=new B();
console.log(b.getA);