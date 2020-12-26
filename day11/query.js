function fn(num) {
    var obj = {};
    var res = num.split("?")[1].split(/&|=/g);
    console.log(res);
    for (var i = 0; i < res.length; i++) {
        if (i % 2 == 0) {
            obj[res[i]] = res[i + 1];
        }
    }
    return obj;
}
var str = "https://www.baidu.com?name=lion&age=12&id=14";
console.log(fn(str));