// Function.prototype.bind = function bind(context, ...params) {
//     if (context == null) context = window;
//     let self = this;
//     return function proxy(...args) {
//         params = params.concat(args);
//         self.call(context, ...params);
//     }
// }
// Function.prototype.bind = function bind(context) {
//     if (context == null) context = window;
//     var params = [].slice.call(arguments, 1),
//         self = this;
//     return function proxy() {
//         var args = [].slice.call(arguments, 1);
//         params = params.concat(args);
//         self.apply(context, params);
//     }
// }

// function fn(x, y, ev) {
//     console.log(this, x, y, ev);
//     return x + y;
// }
// document.onclick = fn.bind({}, 10, 20)

Function.prototype.call = function call(context, ...params) {
    context == null ? context = window : null;
    if (!/^(object|function)$/i.test(typeof context)) context = Object(context);
    let self = this,
        key = Symbol("key"),
        result;
    context[key] = self;
    result = context[key](...params);
    delete context[key];
    return result;
}

function fn(x, y, ev) {
    console.log(this, x, y, ev);
    return x + y;
}
console.log(fn.call({}, 10, 20));