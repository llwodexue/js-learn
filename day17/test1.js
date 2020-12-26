function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
fn1.call(fn2); // 1
fn1.call.call(fn2); // 2
Function.prototype.call(fn1); // 没有输出
Function.prototype.call.call(fn1); // 1
// Function.prototype 空函数

// fn1.call.call(fn2);
Function.prototype.myCall = function (obj) {
    // 核心代码
    obj.$ = this;
    obj.$();
    /*
    A.call(fn2)
    1.形参赋值 obj=fn2
    2.执行核心代码
        fn2.$=fn1.call //将call方法作为属性添加到fn2
        fn2.$() //执行fn2.call()
    fn2.call()
    1.形参赋值 obj=window
    2.执行核心代码
        window.$=fn2
        window.$() //执行window.fn()
    */
};
// Function.prototype.call.call(fn1);
Function.prototype.myCall = function (obj) {
    obj.$fn = this;
    obj.$fn();
    // obj=fn1; this=Function.prototype.call;//call
    // fn1.$fn();//call()
    // 执行第二遍
    // obj=window; this=fn1
    // window.$fn=fn1
    // window.$fn();//fn1();
};
