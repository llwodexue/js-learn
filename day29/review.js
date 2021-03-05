/* promise 三种状态，promise实例默认是pending
pending -> fulfilled
pending -> rejected
当new promise时传递一个回调函数，这个回调函数里有两个形参resolve,reject
当resolve函数执行时，promise实例状态会变为成功态
当reject函数执行时，promise实例状态会变为失败态

then是当前promise原型上的方法，可以传递两个回调函数，分别对应实例的成功态执行的函数和失败态执行的函数
下一个then的回调函数怎么执行，要看上一个then中回调函数执行时有没有返回新的promise实例，如果返回了，那么下一个then中的回调函数的执行就受当前promise实例状态的管控
如果没有返回promise实例，下一个then中回调函数就会默认执行第一个 */

// let p = new Promise((resolve, reject) => {
//     console.log(1);
// });
// p.then(() => {
//     console.log(2);
// }, () => {
//     console.log(3);
// })
// console.log(4);

