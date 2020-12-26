// SyntaxError: Identifier 'fn' has already been declared
{
    function fn() {}
    var fn;
}
// SyntaxError: Identifier 'fn1' has already been declared
if (false) {
    function fn1() {}
    var fn1;
}
// SyntaxError: Identifier 'fn2' has already been declared
for (var i = 0; i < 1; i++) {
    function fn2() {}
    var fn2;
}
// 不报错
{
    function fn3() {}
    function fn3() {}
}
// 不报错
function fn4() {}
var fn4;
// 不报错
(function () {
    function fn5() {}
    var fn5;
})();
// 不报错
function f() {
    function fn6() {}
    var fn6;
}
