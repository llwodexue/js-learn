var str = "{0}年{1}月{2}日";
var reg = /\{(\d+)\}/g;
console.log(str.match(reg)); // ["{0}", "{1}", "{2}"]
function myExec(str) {
    let res = this.exec(str);
    if (!this.global) {
        return res;
    }
    let ary = [];
    while (res) {
        ary.push(res);
        res = this.exec(str);
    }
    return ary.length ? ary : null;
}
RegExp.prototype.myExec = myExec;
console.log(reg.myExec(str)); // [Array(2), Array(2), Array(2)]

var Iterator = str.matchAll(reg);
var ary = [];
for (let item of Iterator) {
    ary.push(item[1]);
}
console.log(ary);

// 迭代器方法
function myMatch1(reg) {
    if (!reg.global) {
        return reg.exec(this);
    }
    let obj = {
        big: [],
        small: [],
    };
    let Iterator = this.matchAll(reg);
    for (const item of Iterator) {
        obj.big.push(item[0]);
        obj.small.push(item[1]);
    }
    return obj.big.length ? obj : null;
}
String.prototype.myMatch1 = myMatch1;
console.log(str.myMatch1(reg));

// while 方法
function myMatch2(reg) {
    let res = reg.exec(this);
    if (!reg.global) {
        return res;
    }
    let obj = {
        big: [],
        small: [],
    };
    while (res) {
        // let [$1, $2] = res;
        // obj.big.push($1);
        // obj.small.push($2);
        obj.big.push(res[0]);
        obj.small.push(res[1]);
        res = reg.exec(this);
    }
    return obj.big.length ? obj : null;
}
String.prototype.myMatch2 = myMatch2;
console.log(str.myMatch2(reg));
// 返回结果
{
    big: ["{0}", "{1}", "{2}"];
    small: ["0", "1", "2"];
}
