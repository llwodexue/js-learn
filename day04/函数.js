// function fn() {
//     console.log(arguments[0]);
//     console.log(arguments.length);
//     console.log(arguments.callee);
// }
// fn("a", "b", "c", "d");

// function add(x, y) {
//     var sum = x + y;
// }
// console.log(sum);

(function(){
    console.log("hello world");
})
()(function(){
    console.log("hello world");
})()

// var f = function fn(){}

// var add = function(x,y){
//     return x+y
// }
// var res = (x,y) => {return x+y}