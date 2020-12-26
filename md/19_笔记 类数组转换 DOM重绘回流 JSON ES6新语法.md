[toc]

# 19\_笔记

## 求数组中最大一项

1. 使用数组方法 sort

```js
var arr = [2, 5, 14, 7, 3];
// 升序取最后一个
arr.sort(function (a, b) {
    return a - b;
})[arr.length - 1];
// 降序取第一个
arr.sort(function (a, b) {
    return b - a;
})[0];
```

2. ES6 展开运算符（等价于 apply 方式）

```js
var arr = [2, 5, 14, 7, 3];
Math.max(...arr);
Math.max.apply(null, arr);
```

3. for 循环

```js
var arr = [2, 5, 14, 7, 3];
// 直接比价取最大值
var max = arr[0];
for (var i = 1; i < arr.length; i++) {
    if (max < arr[i]) {
        max = arr[i];
    }
}

// 冒泡取最大值
for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }
}
var max = arr[arr.length - 1];
```

## 类数组转换成数组

1. for 循环

```js
function toArr(cArr) {
    var arr = [];
    for (var i = 0; i < cArr.length; i++) {
        arr.push(cArr[i]);
    }
    return arr;
}

function fn() {
    var res = toArr(arguments);
    console.log(res);
}
fn(1, 3, 5);
```

2. slice

```js
function toArr(cArr) {
    return [].slice.call(cArr);
}
function fn() {
    var res = toArr(arguments);
    console.log(res);
}
fn(1, 3, 5);
```

- `arr.slice(start, end)` ：提取索引 start 复制到索引 end 的部分（不包括 end）

  `Array.prototype.slice.call(arguments, 0)`，就是把 `arguments` 当做

3. Array.from()

```js
function fn() {
    var res = Array.from(arguments);
    console.log(res);
}
fn(1, 3, 5);
```

## 求平均数

- 需要去掉最高分和最低分

1. 使用数组方法 + for循环

```js
function average(...arg) {
    var arr = arg.sort(function (a, b) {
        return a - b;
    });
    arr.pop();
    arr.shift();
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total / arr.length;
}
var res = average(2, 5, 3, 8, 4);
console.log(res);
```

2. 使用数组方法 + eval

```js
function average(...arg) {
    var arr = arg.sort(function (a, b) {
        return a - b;
    });
    arr.pop();
    arr.shift();
    return eval(arr.join("+")) / arr.length;
}
var res = average(2, 5, 3, 8, 4);
console.log(res);
```

3. 使用Math方法 + eval

```js
function average() {
    var max = Math.max(...arguments);
    var min = Math.min(...arguments);
    return (eval([...arguments].join("+")) - max - min) / (arguments.length - 2);
}
var res = average(2, 5, 3, 8, 4);
console.log(res);
```

## Dom 映射、回流和重绘

```html
<ul>
    <li>1</li>
    <li>3</li>
    <li>5</li>
    <li>2</li>
    <li>4</li>
</ul>
<button>倒序</button>
<script>
    var lis = document.querySelectorAll("li");
    var btn = document.querySelector("button");
    var ul = document.querySelector("ul");
    var lisArr = [].slice.call(lis);
    var flag = 0;
</script>
```

- Dom 映射：页面中的元素通过 Dom 方法来获取回来的元素，这个集合仍然和页面中的元素存在这种一一对应的关系

- Dom 回流：页面中元素的改变或增加或删除（元素的位置、大小、结构、定位发送改变），都会引起浏览器对当前页面结构进行重新计算，比重绘耗费性能

  appendChild 在追加元素对象的时候，如果这个元素在容器中已经存在，此时**并不是克隆一份新的追加到末尾，而是把原有的元素移动到末尾**

  ```js
  btn.onclick = function () {
      var oArr = lisArr.sort(function (a, b) {
          return (b.innerText - a.innerText) * flag;
      });
      flag *= -1;
      for (let i = 0; i < lis.length; i++) {
          ul.appendChild(oArr[i]);
      }
  };
  ```

- Dom 重绘：元素样式的改变会引起重绘

## Json

> 属性名必须得用双引号引起来，属性值可以是任意数据类型

Json 常用的两种转换方法：

```js
var obj = { name: "lion", age: 9 };
// 转成 JSON 格式字符串
var res = JSON.stringify(obj);
// 转成 JSON 格式对象
var re = JSON.parse(res);
```

- 使用 `for...in...` 只能取到键（key）,并通过键取到值，如果这个值是引用数据类型，拿到的就是空间地址

```js
var obj = { name: "lion", age: { con: 6 } };
// 浅拷贝
var obj2 = {};
for (var key in obj) {
    obj2[key] = obj[key];
}
// 深拷贝
var obj3 = JSON.parse(JSON.stringify(obj));
obj2.age.con = 3;
console.log(obj);  // { name: 'lion', age: { con: 3 } }
console.log(obj2); // { name: 'lion', age: { con: 3 } }
console.log(obj3); // { name: 'lion', age: { con: 6 } }
```

## ES6新增语法

### let 

1. let 不存在变量提升机制

   ES6 中提供了创建变量的新语法标准（let），创建函数还是沿用 ES5 中的 function （还会存在变量提升），如果想让函数也不存在变量提升，可以使用函数表达式的方式操作：`let fn=function(){}`

2. 使用 let 定义的变量不允许在同一个作用域中重复声明

   let 不允许重复被声明（不管使用什么方式在当前作用域中声明），但是允许重复赋值

3. 暂时性死区：typeof

   使用 typeof 检测一个未被声明的变量

   - ES5 中返回的结果是 undefined 但是不报错
   - ES6 中直接报错

   ```js
   console.log(typeof num) // undefined
   
   console.log(typeof num) // Uncaught
   let num
   ```

4. ES6 语法创建的变量（let）存在块级作用域，ES5 语法创建变量(var / function)没有块级作用域

   ```js
   // 变量泄露
   for (var i = 0; i < 5; i++) {}
   console.log(i) // 5
   
   for (let i = 0; i < 5; i++) {}
   console.log(i) // Uncaught
   ```

   ES5

   - window 全局作用域
   - 函数执行形成的私有作用域

   ES6

   - 除了 ES5 中的两个作用域，ES6中新增块级作用域
   - ES6 语法中把大部分用大括号包起来都称之为块级作用域

### const 

细节知识点和 let 一样，和 let 的主要区别： let 是创建变量， const 是创建常量

- 变量：值时可以修改的
- 常量：值不能修改

### 解构赋值

- 按照原有值的解构，把原有值的某一部分内容快速获取到（快速赋值给一个变量）

**数组解构赋值**

- 解构赋值本身是 ES6 的语法规范，与使用什么关键字来声明无关

```js
var [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// 用逗号进行占位
var [a, , , c] = [1, 2, 3, 4];
console.log(a, c); // 1 4

// 如果右边没有对应的那项，获取的就是 undefined
var [a, b, c] = [1, 2];
console.log(c); // undefined

// 默认值：如果那个值是绝对等于undefined，就返回默认值
var [a, b, c = 10] = [1, 2];
console.log(c); // 10
```

- 可以解构数组解构，需一 一对应

```js
var [, [, a]] = [1, [2, 3]];
console.log(a); // 3
```

- 扩展运算符（...）只能出现在解构赋值的末尾

```js
var [a, ...arr] = [1, 2, 3, 4];
console.log(a, arr); // 1 [ 2, 3, 4 ]
// 数组克隆
var [...arr] = [1, 2, 3, 4];
console.log(arr); // [ 1, 2, 3, 4 ]
```

**对象解构赋值**

- 对象解构赋值跟属性名有关（跟顺序无关）

```js
var { age, name } = { name: "lion", age: 6 };
console.log(name, age); // lion 6

//如果没有对应的项，值就是 undefined
var { age, name } = { name: "bird" };
console.log(name, age); // bird undefined

// 默认值：如果那个值是绝对等于undefined，就返回默认值
var { age = 100, name } = { name: "cat" };
console.log(name, age); // cat 100
```

- 可以起别名

```js
var { age: a, name } = { name: "dog", age: 7 };
console.log(name, a); // dog 7
```

**函数解构赋值**

- 函数实参为数组

```js
function fArr([x, y]) {
    console.log(x, y);
}
var arr = [1, 2];
fArr(arr); // 1 2
```

- 函数实参为对象

```js
function fObj({ age: a }) {
    console.log(a);
}
var obj = { name: "dog", age: 7 };
fObj(obj); // 7
```

### 展开运算符

- 拼接数组

```js
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = arr1.concat(arr2);
var arr4 = [...arr1, ...arr2];
console.log(arr3, arr4); // 都是 [ 1, 2, 3, 4, 5, 6 ]
```

- 拼接对象

```js
var obj1 = { name: "lion" };
var obj2 = { age: 10 };
var obj3 = Object.assign(obj1, obj2);
var obj4 = { ...obj1, ...obj2 };
console.log(obj3, obj4); // 都是 { name: 'lion', age: 10 }
```

- 剩余运算符

```js
// 剩余运算符，把剩余的项装到一个数组汇总
function fn(x, y, ...arg) {
    console.log(arg);
}
fn(1, 2, 3, 4, 5); // [ 3, 4, 5 ]

var [a, ...arg] = [1, 2, 3, 4, 5];
console.log(a, arg); // 1 [ 2, 3, 4, 5 ]
```

### 箭头函数

- 箭头函数没有 this，如果用了 this 会按照作用域链进行查找
- 箭头函数没有 arguments，不过可以使用剩余运算符

```js
var f1 = function (a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
};
// 等价写法
var f2 = (a) => (b) => (c) => a + b + c;

```

- 如果返回值是一个对象，简写时，需要加一个小括号，不然返回 undefined

```js
var fn = (x) => ({ name: "lion" });
```

### 类

- 箭头函数不能当成构造函数

```js
let A = (x) => x;
let f = new B(); // TypeError: B is not a constructor
```

- 类的继承

```js
// 这个{}既不是对象也不是作用域
class A {
    constructor(name) {
        this.x = 10;
        this.y = 20;
    }
    // 只针对原型的方法
    getC() {
        console.log("getC");
    }
    // 给实例添加私有属性
    a = 30;
    // 把 A 这个类当成对象，给它添加静态属性
    static b = 40;
}
A.prototype.f = 30;
var b = new A();
b.getC();

class B extends A {
    constructor(name) {
        // 必须在 this 之前调用，用来访问父对象函数
        super(); // 相当于 call 继承
        this.z = 30;
    }
    getB() {
        console.log("getB");
    }
    fn() {
        // 通过 super 可以调用 A 类型原型上方法
        super.getC();
    }
}
```

## 参考

[你遇到过[ ].slice.call()吗？](https://www.jianshu.com/p/ae57baecc57d)

[DOM映射、JSON、ajax基础知识](https://www.jianshu.com/p/c524b52e11f4)

[DOM的映射机制](https://blog.csdn.net/destinytaoer/article/details/81612348)