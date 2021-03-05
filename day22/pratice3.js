// 正则贪婪性
var str = "2019";
var reg = /\d+/g;
console.log(str.match(reg)); // [ '2019' ]

// 取消正则的贪婪性
var str = "2019";
var reg = /\d+?/g;
console.log(str.match(reg)); // [ '2', '0', '1', '9' ]

var str = "ss123ff456";
var reg = /(\d)(\d)(\d)/g;
console.log(reg.test(str));; // true
console.dir(RegExp);
