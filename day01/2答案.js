Number("123");//123
Number("");//0
Number("12px");//NaN
Number(true);//1
Number(false);//0
Number(null);//0
Number(undefined);//NaN
Number({"name":"lili"});//'[object,object]'==>NaN
Number([1,2]);//'1,2'==>NaN
Number([1]);//1
parseInt("12.5");//12
parseInt("12px");//12
parseInt("wid12.5px");//NaN
parseFloat("12.5");//12.5
parseInt("12.5px");//12
parseInt("wid12.5px");//NaN
parseFloat("12.5");//12.5
parseInt("12.5px");//12
parseInt("wid12.5px");//NaN
isNaN(1);//false
isNaN("2");//false
isNaN(true);//false
isNaN(false);//false
isNaN(null);//false
isNaN(undefined);//true
isNaN({'name':'lili'});//true
isNaN([1,2]);//true
isNaN([1]);//false
//获取字符串的长度
//var cc='123456';
//console.log(cc.length);
//获取最后一个
//console.log(cc.length-1);
var a="zhufeng";
console.log(a+null);//'zhufengnull'
console.log("6"*"3");//18
console.log("6"/2);//3
console.log("6"-2);//4
Boolean("16px");//true
Boolean("0");//false
Boolean("null");//true    因为是字符串null所以为true
console.log(Number('1'));//1
console.log(Number('1PX'));//NaN
console.log(Number(null));//0
console.log(Number(undefined));//NaN
console.log(Number(true));//1
console.log(Number(false));//0
console.log(Number(''));//0
console.log(Number([]));//0
console.log(Number({}));//NaN
console.log(Number(function(){}));//NaN
console.log(parseInt('1.5px'));//1
console.log(parseInt(''));//NaN
console.log(parseInt([]));//NaN
console.log(parseInt(undefined));//NaN
console.log(parseInt(null));//NaN
console.log(parseInt({}));//NaN
console.log(parseInt('1.5px'));//1
console.log(parseInt(''));//NaN
console.log(parseInt([]));//NaN
console.log(parseInt(undefined));//NaN
console.log(parseInt(null));//NaN
console.log(parseInt({}));//NaN
console.log('6'/'2');//3
console.log('6'/3);//2
console.log('6'+2);//'62'
console.log('6'*'2');//3
console.log('6'-'2');//4
console.log('6'/undefined);//NaN
var i=1;
i++;
console.log(i);//i
console.log(!![]);//true
console.log(!!{});//true
console.log(!!undefined);//false
console.log(!!null);//false
console.log(!!'');//false
console.log(!!NaN);//false
console.log(!!0);//false
//创建变量的六种方式
// var let const class function  import

//js命名规范
//1.不以可用保留字和关键字 2.数字不可开头 3.区分大小写 

//两种简单的调试方式
// console.log()   alert(); 

//js的数据类型
//基本数据类型: Number String Boolean  null undefined  Symbol 
//引用数据类型:function object=>1.数组[]  2.数学 Math 3.正则 / /  4.日期Data

//把其他数据类型转换为Number数据类型的方法
// Number([value]);   parseInt([value]); parseFloat([value]);

//判断是否为有效数字的方法
// isNaN([value]); 是为false  不是为true  

//转换为布尔的方法
// Boolean([value]);  ![value];  !![value];
// 0 '' NaN undefined null 为false，其他都为true