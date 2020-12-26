function getParm(url) {
    var obj = {};
    // var res = url.slice(url.indexOf("?")).substr(1);
    var res = url.split("?")[1];
    if (res) {
        var gets = res.split("&");
        for (var i = 0; i < gets.length; i++) {
            var item = gets[i].split("=");
            console.log(item);
            // if (!isNaN(item[1])) {
            //     item[1] = Number(item[1]);
            // }
            obj[item[0]] = item[1];
        }
    }
    return obj;
}
var str = "https://www.baidu.com?name=lion&age=12&id=14";
console.log(getParm(str));
