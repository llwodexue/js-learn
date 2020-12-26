/* 
全局作用域：
变量提升：
var n=0
function a
var c=a()返回值 c 等于小函数b
形成私有作用域：
1、形参赋值：无
2、变量提升：
var n=10
function b


b();私有作用域形成： n++



*/

var n=0;
function a(){
    var n=10;// n=11 ==>12
    function b(){
        // n 不是私有的，
        n++;
        console.log(n);//11 12
    }
    b();
    return b;
}
var c=a(); // 此步骤其实就是让 c=小函数b
c();//
console.log(n);//0
