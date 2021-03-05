[toc]

# 22\_笔记

## 正则捕获 exec 

正则的捕获：把正则匹配到的内容捕获到

- `RegExp.prototype.exec()`  exec 是正则原型上的一个方法，用来捕获符合规则的内容

**exec 返回值的特点：**

1. 返回值是一个数组，如果捕获不到就是 null
2. 数组正常项（有索引的项）是捕获到的内容
3. index 是第一次捕获内容开始位置的索引
4. input 是原字符串

### 正则的懒惰性

正则在捕获的时候只会捕获第一次符合规则的内容，如果想**取消正则的懒惰性，可以加修饰符 g**

- 正则是一个对象，身上有 `lastIndex` 属性， `lastIndex` 控制的是当前正则捕获开始位置的索引
- 加上 g 之后，每捕获一次， `lastIndex` 就会发生变化，会成为下一次捕获开始位置的索引
- 当正则捕获到末尾捕获不到的东西时，这时 `lastIndex` 会变为 0，从头再开始捕获

```js
var str = "str123str456str";
console.log(str.length);       // 15
var reg = /\d{3}/g;
console.log(reg.lastIndex);    // 0
console.log(reg.exec(str)[0]); // 123
console.log(reg.lastIndex);    // 6
console.log(reg.exec(str)[0]); // 456
console.log(reg.lastIndex);    // 12
console.log(reg.exec(str));    // null
console.log(reg.lastIndex);    // 0
```

### 封装捕获全部内容的方法

封装一个方法，可以把当前字符串所有负责规则的内容全部捕获到，并且以数组的形式返回

- 正则实例上有一个属性：global，如果当前正则有 g，那么 global 值就是 true，反之就是 false

```js
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

var str = "str123str456str";
var reg = /\d{3}/g;
console.log(reg.myExec(str)); // [ '123', '456', '789' ]
console.log(str.match(reg));  // [ '123', '456', '789' ]
```

## 正则捕获 match

### 正则贪婪性

默认情况：正常捕获的时候，是按照当前正则所匹配的最长结果来获取的

- 在量词元字符后面加 ？ 是取消正则的贪婪性
- 在分组前加 ？ 只匹配不捕获
- ?= 正向预查
- ?! 负向预查

```js
// 正则贪婪性
var str = "2019";
var reg = /\d+/g;
console.log(str.match(reg)); // [ '2019' ]

// 取消正则的贪婪性
var str = "2019";
var reg = /\d+?/g;
console.log(str.match(reg)); // [ '2', '0', '1', '9' ]
```

当前正则实例匹配到的内容会放到正则类的私有属性上（$1-$9）

- 正则类上的 $1-$9 存储到的是正则匹配到的分组内容
- $& 是大正则捕获的内容

```js
var str = "s123f456";
var reg = /(\d)(\d)(\d)/g;
reg.test(str);
console.dir(RegExp); // 见下图
```

![RegExp类](https://gitee.com/lilyn/pic/raw/master/js-img/RegExp%E7%B1%BB.jpg)

### 字符串 match 方法

match 是字符串的方法

- 如果当前正则不加 g，返回值与 exec 一致
- 如果正则匹配不到返回 null
- 正常情况下返回的是一个数组，数组里面存放的是捕获到的每一项内容

**注意：**match 只能把大正则匹配到的内容获取到，小分组匹配的信息无法获取，这时可以使用 matchAll 方法

```js
var str = "{0}年{1}月{2}日";
var reg = /\{(\d+)\}/g;
console.log(str.match(reg)); // ["{0}", "{1}", "{2}"]
console.log(reg.myExec(str)); // [Array(2), Array(2), Array(2)]
```

### 字符串 matchAll 方法

`String.prototype.matchAll` 是一个字符串方法，它的返回值是一个迭代器

```js
var str = "{0}年{1}月{2}日";
var reg = /\{(\d+)\}/g;
var Iterator = str.matchAll(reg);
var ary = [];
for (let item of Iterator) {
    ary.push(item[1]);
}
console.log(ary); // ["0", "1", "2"]
```

### 封装捕获全部内容的方法（包含分组捕获）

封装一个方法，既可以得到大正则捕获的内容，还可以得到每一次分组捕获的内容

- 迭代器方法

```js
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

var str = "{0}年{1}月{2}日";
var reg = /\{(\d+)\}/g;
console.log(str.myMatch1(reg)); // { big: [ '{0}', '{1}', '{2}' ], small: [ '0', '1', '2' ] }
```

- while 方法

```js
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
        obj.big.push(res[0]);
        obj.small.push(res[1]);
        res = reg.exec(this);
    }
    return obj.big.length ? obj : null;
}
String.prototype.myMatch2 = myMatch2;

var str = "{0}年{1}月{2}日";
var reg = /\{(\d+)\}/g;
console.log(str.myMatch2(reg)); // { big: [ '{0}', '{1}', '{2}' ], small: [ '0', '1', '2' ] }
```

### 字符串 replace 方法

`String.prototype.replace`

replace 方法的传参是多样的

1. 'old', 'new'
2. reg, 'new'
3. reg, function

```js
// 需求：把 lion 替换成 lions
var str = "lion2019|lion2020";
str = str.replace("lion", "lions").replace("lion", "lions");
// 这个方法没办法实现
console.log(str); // lionss2019|lion2020

var str = "lion2019|lion2020";
str = str.replace(/lion/g, "lions");
// 全局匹配 lion，并根据指定内容进行修改
console.log(str); // lions2019|lions2020

var str = "lion2019|lion2020";
str = str.replace(/lion/g, (...ary) => {
    return "lions";
});
// 全局匹配 lion，并根据函数返回值进行修改
console.log(str); // lions2019|lions2020
```

replace 第二个参数传递一个回调函数，执行机制与 map 类型，正则匹配几次，当前回调函数就执行几次，而且每一次捕获时会把当前捕获的内容传递给回调函数

- 当前 replace 会返回一个新的字符串，回调函数每一次 return 的结果会把捕获到的位置的内容进行替换

```js
var str = "dd123ff456";
var reg = /\d{3}/g;
var res = str.replace(reg, function (...ary) {
    console.log(arguments); // Arguments(3)
    console.log(ary); // (3) ["123", 2, "dd123ff456"] (3) ["456", 7, "dd123ff456"]
    return "$";
});
console.log(res); // dd$ff$
```

### replace 案例

**把时间字符串进行处理**

```js
var time = "2019-8-3";
var reg = /(\d{4})-(\d{1,2})-(\d{1,2})/;
var newTime = time.replace(reg, (...arg) => {
    let [, $1, $2, $3] = arg;
    $2 = $2.length < 2 ? "0" + $2 : $2;
    $3 = $3.length < 2 ? "0" + $3 : $3;
    return `${$1}年${$2}月${$3}日`;
});
console.log(newTime); // 2019年08月03日
```

**单词首字母大写**

```js
var str = "good good study，day day up!";
var reg = /\b([a-zA-Z])([a-zA-Z]*)\b/g;
var res = str.replace(reg, (...arg) => {
    return arg[1].toUpperCase() + arg[2];
});
console.log(res); // Good Good Study，Day Day Up!
```

**queryUrlParams 方法封装**

```js
var url = "http://www.baidu.com?name=li&age=18&sex=0#index";
function queryUrlParams() {
    let reg = /([^?=&#]+)=([^?=&#]+)/g;
    let obj = {};
    this.replace(reg, (...arg) => {
        let [, key, val] = arg;
        obj[key] = val;
    });
    this.replace(/#([^?=&#]+)/g, (...arg) => {
        obj["hash"] = arg[1];
    });
    return obj;
}
String.prototype.queryUrlParams = queryUrlParams;
console.log(url.queryUrlParams()); // { name: 'li', age: '18', sex: '0', hash: 'index' }
```

**timeFormat 方法封装**

```js
var time = "2020-3-10 20:3";
function formatTime(template = "{0}年{1}月{2}日 {3}时{4}分{5}秒") {
    let timeArr = this.match(/\d+/g);
    let res = template.replace(/\{(\d)\}/g, function (...arg) {
        let [, index] = arg;
        let newTime = timeArr[index] || "00";
        return newTime.length < 2 ? "0" + newTime : newTime;
    });
    return res;
}
String.prototype.formatTime = formatTime;
console.log(time.formatTime()); // 2020年03月10日 20时03分00秒
```

