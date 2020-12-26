// 自执行函数：一上来就执行

var i=3;
(function(i){
    console.log(1)
})(i);


+function(){
   console.log(1)
}();
-function(){
    console.log(1)
}();
~function(){
    console.log(1)
}();
!function(){
    console.log(1)
}();
