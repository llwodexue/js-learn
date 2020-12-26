function fun() {
    this.a = 0;
    this.b = function () {
        console.log(this.a);
    };
}
fun.prototype = {
    b: function () {
        this.a = 20;
        console.log(this.a);
    },
    c: function () {
        this.a = 30;
        a = 20;
        console.log(this.a);
    },
};
var my_fun = new fun();
my_fun.b(); // 0
my_fun.c(); // 30

setTimeout(function () {
    console.log(this);
}, 100); // Window

("use strict");
setTimeout(function () {
    console.log(this);
}, 100); // Window

