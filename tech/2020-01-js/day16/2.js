// 想要实现一个需求：
// var ary=[5,8,2,1,10];想要让这个数组先升序，然后再倒序，然后再往里面添加一个10，然后再删除第一项；

// var ary=[5,8,2,1,10];
// ary.sort(function(a,b){
//   return a-b;
// });
// ary.reverse();
// ary.push(10);
// ary.shift();

var ary=[5,8,2,1,10];
/* 
链式调用：
*/
ary.sort(function(a,b){
    return a-b;
}).reverse().push(10);

ary.shift();
