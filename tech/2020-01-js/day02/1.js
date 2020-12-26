Number("12px"); //NaN
Number("");//0
Number(false);//0
Number(null)
Number(undefined);
Number({name:"li"})
Number([]);
Number([1,2,3]);
Number([1]);

/* 
{name:"li"}.toString();

*/

parseInt("12.5px");
parseInt("w12");
parseFloat("12.5px");

// NaN
// isNaN 来判断一个数字是否是有效的，返回结果布尔值：true 非有效数字，false 有效数字

// 
var str="abc";
console.log(str.length);
// 最后一个字符对应的索引
str.length-1;
// 第一个字符
str[0]
// 最后
str[str.length-1]
// 布尔：true/false

