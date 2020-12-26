var ary=[1,2,3];
var a=1;
var b=2;
var c=3;

var [a,b,c]=[1,2,3];
console.log(a,b,c);

// 用逗号进行占位
var [a,,,,,,,c]=[1,2,3,4,5,6,7,8];
console.log(a,c);

//如果右边没有对应的值那项，获取的时候就是undefined
var [a,b,c]=[1,2];
console.log(c); //undefined


// 结构左右一一对应
var [,[,a]]=[1,[2,3],4];
console.log(a);

//默认值：如果那个值绝对等于undefined，那就走默认值
var [a,b,c=10]=[1,2,null];
console.log(c);
