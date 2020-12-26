function fn() {
    this.x = 100;
}
fn.prototype.getX = function () {
    return this.x;
};
var f1 = new fn();

fn.prototype = {
    getY: function () {
        return "getY";
    },
};
var f2 = new fn();

console.log(f1.constructor); // [Function: fn]
console.log(f2.constructor); // [Function: Object]
console.log(f1.getY()); // TypeError: f1.getY is not a function
console.log(f2.getY()); // getY
console.log(f1.getX()); // 100
console.log(f2.getX()); // TypeError: f2.getX is not a function