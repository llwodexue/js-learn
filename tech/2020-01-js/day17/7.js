/* 
有A类、B类，想要让B所有的实例继承A类私有的和公有的方法：
原型继承：让B类的原型指向 A类的实例

*/

function A(){
    this.a="a"
}
A.prototype.getA=function(){
    console.log(this.a);
}

function B(){
    this.b="b"
}
B.prototype=new A();

var b=new B();// b要继承A类里面私有的属性 和A类原型上公有的属性
console.log(b)
