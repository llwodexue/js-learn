/* 
变量提升：
var n
function fn=AAAfff111
自执行函数在当前作用域中不进行变量提升
*/


var n=3;
function fn(){

}

(function(){
    var x=3;
    function f1(){};
})();




