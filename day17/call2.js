Function.prototype.myCall = function (obj, ...arg) {
    obj = obj || Window;
    // this(); // 让 fn() 执行
    // 如何更改 this (fn)里的 this 指向
    obj.$ = this;
    var res = obj.$(...arg);
    delete $;
    return res;
};

function fn(x, y) {
    return x + y;
}
var obj = { name: "lion" };
console.log(fn.myCall(obj, 1, 2));

/*
1.让 fn 这个函数执行
2.改变 fn 这个函数里面的 this 指向 obj
*/
