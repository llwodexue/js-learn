[toc]

# 02\_笔记

## js 页面加载

节选至：[JavaScript高级程序设计（第3版）](https://www.ituring.com.cn/book/946) 第2章第12页

> 带有 src 属性的 `<script>` 元素不应该在其  `<script>` 和  `</script>` 标签之间再包含额外的JavaScript代码

```html
<script src="1.js"> var a=1; </script>
```

> 无论如何包含代码，只要不存在 defer 和 async 属性，浏览器都会按照  `<script>` 元素在页面中出现的先后顺序依次对它们进行解析

```html
<script>
    // 当页面中所有的资源都加载完毕之后再加载
    window.onload = function () {
        var box = document.getElementById("box");
        console.log(box);
    };
</script>
<div id="box"></div>
```

## 调试方法

- `alert` 弹出
- `console.log` 打印简略信息
- `console.dir` 打印详细信息
- `confirm` 提示框
- `prompt` 带输入框的提示框

```js
var hi = {name: "world"}
// 在页面弹出（弹框会把数据转换为字符串）
alert(hi)
// 在控制台打印
console.log(hi)
// 详细输出
console.dir(hi)
// 提示框，如果点击的是确定，返回值就是 true，如果点击的是取消，返回值就是 false
var res = confirm("ready?")
console.log(res)
// 带输入框的提示框，如果点击的是确定，返回的是输入的内容，如果点击的是取消，返回的是 null
var res2 = prompt("ready?")
console.log(res2)
```

## Object 对象数据类型

获取属性名对应的属性值，方法：

1. `对象.属性名`

2. `对象["属性名"]`

   注意：如果属性名是数字的话，不能用第一种

> 纯数字属性的使用比较特殊，可以通过对象字面量和 obj[number] 的形式为对象添加数字属性，解析器会自动将数字转换为数字字符串
>
> ```js
> // 以下三种是等效的
> var obj = {1:"first"}
> obj[2]="second";
> obj["3"]="third";
> ```

 注意：如果对象里面没有这个属性名，得到的就是 `undefined`

```js
var obj = { name: "lion", 91: 19 };
var name = "bird";
console.log(obj.name);    // lion
console.log(obj["name"]); // lion
console.log(obj[name]);   // undefined
console.log(obj[91]);     // 19
```

基本操作：增、删、改、查

- 如果里面没有该属性，赋值就是添加属性；如果里面有该属性，赋值就是更改属性

```js
var obj = { name: "lion", tel: 123};
// 增加
obj.age = 18;
// 修改
obj.name = "bird";
// 彻底删除
delete obj.age
// 删除，属性名还在
obj.tel = null
// 查找
console.log(obj["tel"]);
```

## JS运行机制

- js 变量都存放在内存中，而内存给变量开辟了两个区域：栈 和 堆

栈内存：

- **存放基本数据类型的值**，栈遵循后进先出：声明一个变量，多次赋值取最后一个
- 所有 js 代码运行，都需要放入栈中

堆内存：

- 主要用来**存放引用数据类型**：

  如果是对象，存的就是属性名和属性值

  如果是函数，把函数当成字符串存起来

1. 当声明一个基本变量时，首先在栈内存中创建变量，之后在存值
2. 如果数据是引用数据类型则需要存放在堆内存中，存储完成后，返回给变量一个内存地址

```js
var a = 12;
var b = a;
console.log(b); // 12
var obj1 = { name: "lili", age: 12 };
var obj2 = obj1;
obj2.age = 18;
console.log(obj1.age); // 18
```

基本数据类型和引用数据类型的区别：

- 基本数据类型是按值操作
- 引用数据类型是按空间地址操作

```js
var obj = {
    n: 10,
    b: obj.n * 10,
};
console.log(obj.b);
// TypeError: Cannot read property 'n' of undefined
```

![引用数据类型存储存储在堆内存中可能出现的问题](https://gitee.com/lilyn/pic/raw/master/js-img/%E5%BC%95%E7%94%A8%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%AD%98%E5%82%A8%E5%AD%98%E5%82%A8%E5%9C%A8%E5%A0%86%E5%86%85%E5%AD%98%E4%B8%AD%E5%8F%AF%E8%83%BD%E5%87%BA%E7%8E%B0%E7%9A%84%E9%97%AE%E9%A2%98.jpg)

## 判断语句

### if/else

- 只要满足其中一个条件，后面的条件就不再执行

```js
var num = 5;
if (num > 0) {
    console.log("正数");
} else if (num == 0) {
    console.log("零");
} else {
    console.log("负数");
}
```

### 判断条件

- && 表示并且，左右两边的条件必须同时满足
- || 表示或，左右两边的条件只要满足其一即可
- 如果是单独一个值，会把它转换成布尔类型。如果真，条件成立；如果假，条件不成立

> 其它值转换为布尔值，只有以下情况会是 false
>
> - 0
> - NaN
> - null
> - ""
> - undefined

```js
var flag = [];
if (flag) {
    console.log("真");
} else {
    console.log("假");
}
```

### 三元运算符

- `条件?成立的执行语句:另外一个执行语句`
- 注意：如果执行体里面有多条语句，用小括号包起来，并且语句和语句之间用逗号隔开

```js
var flag = 0;
flag?console.log("真"):console.log("假");
```

- 如果你只有一个 if 判断，改写三元运算符的时候，需要加一个占位符

```js
flag ? num++ : void 0;
flag ? num++ : null;
flag ? num++ : undefined;
```

### switch case

- 把表达式的值与每个 case 的值进行对比
- 如果存在匹配，则执行关联代码
- switch case 条件判断其实是 `===` （绝对等于），不仅要值相同，类型也要相同
- break 表示条件终止，如果不加 break 的时候，会继续往下进行

```js
var num = 6;
switch (num) {
    case 5:
        num++;
        break;
    case 6:
        num--;
        break;
    default:
        num = 0;
}
console.log(num);
```

> 给 switch 语句传递表达式 true： `switch(true){}` ，就可以达到 `if(){}else if(){}` 的效果。因为每个 case 值都可以返回一个布尔值，这样，每个case按照顺序被求值，直到找到匹配的值或遇到 default 语句为止

## js 中检测数据类型的四种方式

- `typeof`
  - `typeof` 检测数组、普通对象等，返回的都是`"object"`，不能细分
  - `typeof null` 返回的是`"object"`
- `instanceof`
- `constructor`
- `Object.prototype.toString.call()`

```js
typeof ""           // "string"
typeof 0            // "number"
typeof false        // "boolean"
typeof undefined    // "undefined"
typeof {}           // "object"
typeof []           // "object"
typeof typeof []    // "string"
typeof null         // "object"
typeof NaN          // "number"
typeof function(){} // "function"
```



## 参考

[js中switch/case分支的值可以是变量或表达式](https://www.cnblogs.com/yaotome/p/7222018.html)

[javascript对象属性的命名规则](https://www.cnblogs.com/canger/p/6382944.html)