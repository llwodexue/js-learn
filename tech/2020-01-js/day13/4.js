/* 
变量提升：function fn=AAAFFF111
console.log(b);// 没有 报错

*/


// console.log(b);
// function fn(){
//     b=13;
//     console.log(b);
// }

// fn();
// console.log(b);



console.log(a,b);
var a=12,b=12;
function fn(){
    console.log(a,b);
    var a=b=13;
    console.log(a,b);
}
fn();
console.log(a,b);