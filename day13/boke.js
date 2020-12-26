/*
1.变量提升：
    function fn = 0x111
                = 0x222
                = 0x333
                = 0x444
2.代码从上到下执行
 */
fn();
function fn() {
    console.log(1);
}
function fn() {
    console.log(2);
}
fn();
function fn() {
    console.log(3);
}
// fn=100 给fn重新赋值
fn = 100;
function fn() {
    console.log(4);
}
// function 声明和定义早已完成， 100()则会报错
fn();
// 4
// 4
// TypeError: fn is not a function