function Fn() {
    this.x = 100;
}
Fn.prototype.getX = function () {
    //this f1
    // f1.x
    return this.x;
}
var f1 = new Fn();
// 原型的指针发生改变
Fn.prototype = {
    getY: function () {
        return this.x
    }
};
var f2 = new Fn();
console.log(f1.getX());//100
console.log(f2.getX());//报错
console.log(f1.constructor);//Fn
console.log(f2.constructor);//Object 