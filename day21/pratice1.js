var str = "abbc";
var reg = /^[a-z]([a-z])\1[a-z]$/;
console.log(reg.test(str)); // true

var str = "abab";
var reg = /^([a-z]{2})\1$/;
var reg = /^([a-z](a-z))\1\2$/;
console.log(reg.test(str)); // true

var str = "acca";
var reg = /^([a-z]([a-z])\2\1]$)/;
console.log(reg.test(str)); // true

// []中不允许出现多位数
var reg = /^[1-23]$/; // 1-2或3出现1次
/^(0[1-9])|(1[0-2])$/;
//匹配日期
// 01-09 10-19 20-29 30-31

var reg = /bird(?=lion)/;
var str = "birdlionsss";
console.log(reg.test(str));

/*
匹配有效数字
0 -1 -1.2 3 4.6
开头可以是+-（0到1次）
整数：个位数 多位数 ()|()
小数：可有可无（0到1次）
*/

var reg = /^[+-]?((\d)|([1-9]\d+))(\.\d+)?$/;

/*
匹配密码
1.6到16位
2.有数字、字母、下划线组成
*/
var reg = /^\w{6,16}/;

function Password(code) {
    let str = "0123";
    if (code.length >= 6 && code.length <= 16) {
    } else {
        console.log("密码位数不足");
    }
}
Password("fsdffsdf");

/*
匹配中文名
[\u4E00-\u9FA5]
*/

var reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;

/*
匹配身份证
1.18位
2.1-6位
3.7-14位年年月日
4.15-18位
    1-2
    3
    4可能死数字可能是X
*/
var str = "130000202010101010";
var reg = /(?:\d{6})([1-2]\d{3})(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{2}(\d)(?:X|\d)/;
var res = reg.exec(str);
console.log(`生日：${res[1]}年${res[2]}月${res[3]}日`);
console.log(`性别：${res[4]==0?"女生":"男生"}`);