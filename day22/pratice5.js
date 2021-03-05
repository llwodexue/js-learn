var time = "2019-8-3";
// 2019-08-13 变成 2019年08月13日
var reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
var newTime = time.replace(reg, (...arg) => {
    let [, $1, $2, $3] = arg;
    $2 = $2.length < 2 ? "0" + $2 : $2;
    $3 = $3.length < 2 ? "0" + $3 : $3;
    return `${$1}年${$2}月${$3}日`;
});
console.log(newTime);
var a;
console.log(a);

// 单词首字母大写
var str = "good good study，day day up!";
var reg = /\b([a-zA-Z])([a-zA-Z]*)\b/g;
// var reg = /[a-zA-Z][a-zA-Z]*[^a-zA-Z]/g;
console.log(str.match(reg));
var res = str.replace(reg, (...arg) => {
    return arg[1].toUpperCase() + arg[2];
});
console.log(res);

var url = "http://www.baidu.com?name=li&age=18&sex=0#index";
function queryUrlParams() {
    let reg = /([^?=&#]+)=([^?=&#]+)/g;
    let obj = {};
    this.replace(reg, (...arg) => {
        console.log(arg);
        let [, key, val] = arg;
        obj[key] = val;
    });
    this.replace(/#([^?=&#]+)/g, (...arg) => {
        obj["hash"] = arg[1];
    });
    return obj;
}
String.prototype.queryUrlParams = queryUrlParams;
console.log(url.queryUrlParams());
