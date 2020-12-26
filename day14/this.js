"use strict";
function fn() {
    console.log(this);
}
var obj = {
    fn: fn,
};
fn.call(obj); // {fn: ƒ}

var a = "lalala";
var obj = {
    a: "java",
    prop: {
        fn: function () {
            return this.a;
        },
    },
};
console.log(obj.prop.fn());
var res = obj.prop.fn;
console.log(res());
