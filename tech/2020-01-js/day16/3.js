function fn(){
    this.x=100
}

fn.prototype.getX=function(){
    return this.x;
}
var f1=new fn();
console.log(fn.prototype.constructor)

/* 
重定向
手动更改原型的指向，没有constructor,需要手动添加
*/
fn.prototype={
    constructor:fn,
    getY:function(){
        return "getY";
    }
}
var f2=new fn();
console.log(fn.prototype.constructor)
// console.log(f2.getY());