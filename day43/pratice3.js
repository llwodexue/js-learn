// 本地存储，就是把数据存储在你电脑上
$.cookie("key", "value", {
    expires: new Date().getTime() + 60 * 1000 * 15,
});
let res = md5(123456);
console.log(res);
