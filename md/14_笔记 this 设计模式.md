[toc]

# 14\_笔记

## 逻辑与 `&&` 和逻辑或`||`

逻辑或`||` 

- 第一个值是 true，就返回第一个值
- 第一个值是 false，就返回第二个值

```js
var a = 1 || 2;     // 1
var a = null || 1;  // 1
```

逻辑与`&&`

- 第一个值为 false，就返回第一个值
- 第一个值为 true，就返回第二个值

```js
var a = 1 && 2;     // 2
var a = null && 1;  // null
```

## this 关键字

### 在全局作用域中的 this

全局作用域中的 this 指的就是 Window

```js
console.log(this); // Window 

"use strict"
console.log(this); // Window 
```

### 函数执行时候的 this

函数执行的时候，看前面有没有点

- 如果有，点前面是谁，this就是谁
- 如果没有
  - 浏览器环境 Window
  - 严格模式 undefined

```js
function fn() {
    console.log(this);
}
var obj = {
    fn: fn,
};

obj.fn(); // obj
fn(); // Window

"use strict"
obj.fn(); // obj
fn(); // undefined
```

### 元素绑定事件中的 this

给元素绑定事件，当事件触发，函数执行的时候，里面的 this 就是当前绑定的元素

- 浏览器环境：当前绑定事件的元素
- 严格模式：当前绑定事件的元素

```js
el.onclick = function () {
    console.log(this);
}; // el

"use strict";
el.onclick = function () {
    console.log(this);
}; // el
```

### 自执行函数中的 this

- 浏览器环境：Window
- 严格模式：undefined

```js
~(function () {
    console.log(this);
})(); // Window

"use strict";
~(function () {
    console.log(this);
})(); // undefined
```

### 回调函数中的 this

回调函数：一个函数作为参数传递给另一函数

- 浏览器环境：Window
- 严格模式：Window

```js
setTimeout(function () {
    console.log(this);
}, 100); // Window

"use strict";
setTimeout(function () {
    console.log(this);
}, 100); // Window
```

### 箭头函数中的 this

箭头函数中没有 this，也没有 arguments，但是在箭头函数中用 this，会向上级作用域去找（作用域链）

### 构造函数中的 this

通过构造函数创建的实例，构造函数中的 this 指的就是当前类的实例

```js
function fn() {
    this.name = "lion";
    this.age = 13;
    console.log(this); // fn
}
var f = new fn();

"use strict";
function fn() {
    this.name = "lion";
    this.age = 13;
    console.log(this); // fn
}
var f = new fn();
```

### 更改 this 的指向

可以通过 call、apply、bind，更改 this 的指向

```js
var name = "lion";
function fn() {
    console.log(this.name);
}
var obj = {
    name: "bird",
    fn: fn,
};
obj.fn(); // bird
fn(); // lion
(function () {
    this.fn(); // lion
})();
```

## this 练习题

### 练习一

```js
var name = "lion";
function fn() {
    console.log(this.name);
}
var obj = {
    name: "bird",
    fn: fn,
};
obj.fn();
fn();
```

### 练习二

```js
let obj = {
    name: "li",
    fn: (function (n) {
        console.log(this); // window
        return function () {
            console.log(this); // obj
        };
    })(10),
};
obj.fn();
```

### 练习三

```js
var num = 10;
var obj = { num: 20 };
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num);
    };
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num);
```

答案：

```js
// 22
// 23
// 60 30

/*
var fn = obj.fn
    形参赋值：[私有]num=20
    [window]]num=20*3=60
    [私有]num++=21
fn(5)
    形参赋值：[私有]n=5
    [window]num=60+6=65
    [私有]num++=22
obj.fn(10)
    形参赋值：[私有]n=10
    [obj]num=20+10=30
    [私有]num++=23
num=60 obj.num=30
*/
```

## 面向对象编程

### 单例设计模式

把描述同一个事物的所有属性放到一个对象中，这样可以避免之间的相互冲突，这种模式就叫单例设计模式

- 简单说，单例模式就一个对象

```js
var utils = (function () {
    var num = 3;
    function fn() {}
    return {
        num: num,
        fn: fn,
    };
})();
utils.fn()
```

### 工厂设计模式（函数封装）

把实现相同功能的代码进行封装，后期在使用的时候，只用调用这个函数即可，方便后期的“批量生产”。减少了页面中冗余的代码，实现了“高耦合低内聚”

```js
function person(name, age) {
    return {
        name: name,
        age: age,
        des: "hello",
    };
}
var p = person("lion", 13)
```

### 构造函数模式

当函数执行的时候，前面一旦加了 new，就变成了构造函数

- 如果构造函数在执行的时候没有形参，在调用的时候可以直接省去`var f=new Fn`
- 类名一般会大写

构造函数（类）

- 内置类：sNumber String Boolean Symbol Null Undefined Object Function Array RegExp Math Date
- 自定义类：

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var f1 = new Person("cat", 17); // f1就是实例
```

创建数组的两种方式：

```js
// 构造函数（类）创建
var arr1 = new Array(1, 2);
// 通过此方式创建的时候
//     如果参数为1个，代表数组的长度
//     如果参数>1个，代表数组的每项
var arr3 = new Array(5);
// 字面量创建
var arr2 = [3, 4]
```

## 参考

[js--this，严格模式下的this](https://www.jianshu.com/p/8bd83b33686e)