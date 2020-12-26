var name = "lion";
function fn() {
    console.log(this.name);
}
var obj = {
    name: "bird",
    fn: fn,
};
obj.fn(); // bird
fn(); // lion
(function () {
    this.fn(); // lion
})();

let obj = {
    name: "li",
    fn: (function (n) {
        console.log(this); // window
        return function () {
            console.log(this); // obj
        };
    })(10),
};
obj.fn();

var num = 10;
var obj = { num: 20 };
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num);
    };
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num);

/*
var fn = obj.fn
    形参赋值：[私有]num=20
    [window]]num=20*3=60
    [私有]num++=21
fn(5)
    形参赋值：[私有]n=5
    [window]num=60+6=65
    [私有]num++=22
obj.fn(10)
    形参赋值：[私有]n=10
    [obj]num=20+10=30
    [私有]num++=23
num=65 30
*/