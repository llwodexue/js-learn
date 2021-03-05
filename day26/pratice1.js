function fn(a, b, c, d) {
    console.log(this); // obj
    console.log(a, b, c, d); // 1 2 3
    return 100;
}
let obj = { name: 100 };
// this->fn context->obj
// obj.$fn = fn;
// obj.$fn();
// delete obj.fn;

// Function.prototype.myCall = function (context, ...arg) {
//     // 当 call 执行的时候如果用户不传参，或传null、undefined
//     // fn函数中的this指向都是window
//     context = context || window;
//     context.$fn = this;
//     var res = context.$fn(...arg);
//     delete context.$fn;
//     return res;
// };
// console.log(fn.myCall(obj, 1, 2, 3));

// bind 是预处理函数的 this 指向，并不会让 fn 函数立马执行，而是返回一个新的函数
// 当这个新的函数执行的时候会让 fn 执行，并且把 fn 的 this 指向之前传递的第一个实参
// Function.prototype.myBind = function (context, ...arg1) {
//     // bind函数执行形成不销毁的作用域们可以保存里面的变量不受外界干扰，还可以让变量一直存在，这样fn和context就一直被保存下来
//     let _this = this;
//     return function (...arg2) {
//         return _this.call(context, ...arg1, ...arg2);
//     };
// };
// bind 执行会返回一个新的函数，以后执行这个新函数，在新函数内部执行fn
Function.prototype.myBind = function (context, ...arg1) {
    // bind函数执行形成不销毁的作用域们可以保存里面的变量不受外界干扰，还可以让变量一直存在，这样fn和context就一直被保存下来
    context = context || window;
    let _this = this;
    return function (...arg2) {
        context.$fn = _this;
        let res = context.$fn(...arg1, ...arg2);
        delete context.$fn;
        return res;
        // return _this.call(context, ...arg1, ...arg2);
    };
};

let res = fn.myBind(obj, 1, 2);
console.log(res(3, 4));
// 利用闭包机制编程的思想：柯里化函数编程
