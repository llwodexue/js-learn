var str = "str123str456str";
var reg = /\d{3}/g;
// lastIndex控制的是当前正则捕获开始位置的索引
console.log(reg.lastIndex); // 0
console.log(reg.exec(str)[0]); // 123
console.log(reg.lastIndex); // 6
console.log(reg.exec(str)[0]); // 456
console.log(reg.lastIndex); // 12
console.log(reg.exec(str)); // null
console.log(reg.lastIndex); // 0

var str = "str123str456str789";
var reg = /\d{3}/g;
function myExec(str) {
    let res = this.exec(str);
    if (!this.global) {
        return res;
    }
    let ary = [];
    while (res) {
        ary.push(res[0]);
        res = this.exec(str);
    }
    return ary.length ? ary : null;
}
RegExp.prototype.myExec = myExec;
console.log(reg.myExec(str));

console.log(str.match(reg));