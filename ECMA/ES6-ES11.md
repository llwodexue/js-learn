> [尚硅谷Web前端ES6教程，涵盖ES6-ES11](https://www.bilibili.com/video/BV1uK411H7on?p=1)
>
> 推荐结合： [《ECMAScript 6 入门教程》](https://es6.ruanyifeng.com/) 学习，查漏补缺

## ECMAScript 相关介绍

**ECMA**（European Computer Manufacturers Association）欧洲计算机制造商协会，这个组织的目标是评估、开发和认可电信和计算机标准。1994 年后该组织改名为 Ecma 国际

![](https://gitee.com/lilyn/pic/raw/master/js-img/ecma-logo.jpg)



**ECMAScript** 是由 Ecma 国际通过 ECMA-262 标准化的脚本程序设计语言

- Ecma 国际制定了许多标准，而 ECMA-262 只是其中的一个，所有标准列表查看：[Standard](http://www.ecma-international.org/publications/standards/Standard.htm)

**ECMA-262 历史** 版本查看网址：[ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm)

- 从 ES6 开始，每年发布一个版本，版本号比年份最后一位大 1

| **版本**    | **时间**    | **概述**                                                     |
| ----------- | ----------- | ------------------------------------------------------------ |
| 第 1 版     | 1997 年     | 制定了语言的基本语法                                         |
| 第 2 版     | 1998 年     | 较小改动                                                     |
| 第 3 版     | 1999 年     | 引入正则、异常处理、格式化输出等。IE 开始支持                |
| 第 4 版     | 2007 年     | 过于激进，未发布                                             |
| 第 5 版     | 2009 年     | 引入严格模式、JSON，扩展对象、数组、原型、字符串、日期方法   |
| **第 6 版** | **2015 年** | 模块化、面向对象语法、Promise、箭头函数、let、const、数组解构赋值等等 |
| 第 7 版     | 2016 年     | 幂运算符、数组扩展、Async/await 关键字                       |
| 第 8 版     | 2017 年     | Async/await、字符串扩展                                      |
| 第 9 版     | 2018 年     | 对象解构赋值、正则扩展                                       |
| 第 10 版    | 2019 年     | 扩展对象、数组方法                                           |
| 第 11 版    | 2020 年     | 链式操作、动态导入等                                         |
| ES.next     | 2020 +      | 动态指向下一个版本                                           |

**谁在维护 ECMA-262**

- TC39（Technical Committee 39）是推进ECMAScript 发展的委员会。其会员都是公司（其中主要是浏览器厂商，有苹果、谷歌、微软、因特尔等）。TC39 定期召开会议，会议由会员公司的代表与特邀专家出席

**ES6 兼容性**

[compat-table es6/](http://kangax.github.io/compat-table/es6/)

![](https://gitee.com/lilyn/pic/raw/master/js-img/ES 兼容性.png)

## ECMAScript 6 新特性

### 1. let 关键字

`let` 关键字用来声明变量，有以下几个特点：

1. 不允许重复声明
2. 块级作用域
3. 不存在变量提升
4. 暂存性死区
5. 不影响作用域链

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
} // 66666
```

- 方法1：将 `var` 改为 `let`

  ```js
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      console.log(i)
    }, 1000)
  } // 12345
  ```

- 方法2：使用匿名函数形成自己的块级作用域

  ```js
  for (var i = 1; i <= 5; i++) {
    ;(function (i) {
      setTimeout(() => {
        console.log(i)
      }, 1000)
    })(i)
  } // 12345
  ```

### 2. const  关键字

`const` 关键字用来声明常量，有以下特点：

1. 声明必须赋值初始值
2. 标识符一般为大写（潜规则）
3. 不允许重复声明
4. 值不允许修改
5. 块级作用域

注意：对数组元素的修改和对象内部的修改是可以的（数组和对象存的是引用地址）

```js
const arr = [1, 2, 3, 4]
arr.push(5, 6)
console.log(arr) // [ 1, 2, 3, 4, 5, 6 ]
arr = 1 // TypeError: Assignment to constant variable
```

### 3. 变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为 **解构赋值**

- 可以连续进行解构赋值

```js
let res = {
  code: 200,
  msg: 'success',
  data: ['red', 'green', 'blue'],
}

let {
  code,
  data: [r, g, b],
} = res
console.log(code, r, g, b) // 200 red green blue
```

### 4. 模板字符串

模板字符串（template string）是增强版的字符串，用反引号 ` 标识，特点：

- 字符串中可以出现换行符
- 可以使用 `${xxx}` 形式输出变量

```js
let animals = ['bird', 'dog', 'cat']

let ul = `<ul>
  <li>${animals[0]}</li>
  <li>${animals[1]}</li>
  <li>${animals[2]}</li>
</ul>`
console.log(ul)
/*
<ul>
  <li>bird</li>
  <li>dog</li>
  <li>cat</li>
</ul>
*/
```

### 5. 简化对象写法

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁

```js
let animal = 'dog'
let obj = {
  // 完整写法
  // animal: animal,
  // 简化写法
  animal,
  bark() {
    console.log('wang')
  },
}

console.log(obj) // { dog: 'dog', bark: [Function: bark] }
```

### 6. 箭头函数

ES6 允许使用箭头 `=>` 定义函数，箭头函数提供了一种更加简洁的函数书写方式，箭头函数多用于匿名函数的定义

**箭头函数的注意点：**

1. 如果形参只有一个，则小括号可以省略

2. 函数体如果只有一条语句，则花括号可以省略，函数的返回值为该条语句的执行结果

3. 箭头函数 `this` 指向声明时所在作用域下 `this` 的值，且无法使用 `call` 等方法改变其指向

4. 箭头函数不能作为构造函数实例化
5.  不能使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替

```js
// 形参只有1个，只有1条语句
let hello = name => 'hello ' + name
console.log(hello('world')) // hello world

// call对箭头函数无效
let obj = {
  name: 'bird',
}
let foo = () => {
  console.log(this)
}
let bar = function () {
  console.log(this)
}
foo.call(obj) // Window
bar.call(obj) // { name: 'bird' }

// 不能作为构造函数实例化对象
let Person = (name, age) => {
  this.name = name
  this.age = age
}
let m = new Person('man', 24) // TypeError: Person is not a constructor

// 不能使用arguments
let func = () => {
  console.log([].slice.call(arguments))
}
func(1, 2, 3) // Uncaught ReferenceError: arguments is not defined
```

案例：点击 `div` 1s 后变成粉色

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>点击div更改颜色</title>
    <link
      href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <style>
      .item {
        width: 100px;
        height: 50px;
        border: solid 1px rgb(42, 156, 156);
        float: left;
        margin-right: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2 class="page-header">点击div更改颜色</h2>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <script>
      let items = document.getElementsByClassName('item')
      // 方法1：
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
          let _this = this
          setTimeout(function () {
            _this.style.backgroundColor = 'pink'
          }, 1000)
        })
      }

      // 方法2：
      for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
          setTimeout(() => {
            this.style.backgroundColor = 'pink'
          }, 2000)
        })
      }
    </script>
  </body>
</html>

```

### 7. 函数参数默认设置

ES6 允许给函数参数设置默认值，当调用函数时不给实参，则使用参数默认值

- 具有默认值的形参，一般要靠后

```js
let add = (a, b, c = 10) => a + b + c

let result = add(1, 2)
console.log(result) // 13
```

可与解构赋值结合：

```js
function connect({ host = '127.0.0.1', username, password, port }) {
  console.log(host)
  console.log(username)
  console.log(password)
  console.log(port)
}

connect({
  username: 'root',
  password: 'root',
  port: 3306,
})
/*
127.0.0.1
root
root
3306
*/
```

### 8. rest 参数

ES6 引入 rest 参数，用于获取函数的实参，用来代替 `arguments`，作用与 `arguments` 类似。将接收的参数序列转换为一个数组对象

语法格式：`fn(a, b, ...aegs)`，必须要放到参数最后

```js
let fn = (a, b, ...args) => {
  console.log(a)
  console.log(b)
  console.log(args)
}

fn(1, 2, 3, 4, 5) // 1 2 [3, 4, 5]
```

### 9. spread 扩展运算符

扩展运算符（`spread`）也是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列，对数组进行解包。可用在调用函数时，传递的实参，将一个数组转换为参数序列

数组合并：

- 类似 `Array.concat()`

```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let array1 = [...arr1, ...arr2]
let array2 = arr1.concat(arr2)
console.log(array1) // [1, 2, 3, 4, 5, 6]
console.log(array2) // [1, 2, 3, 4, 5, 6]
```

数组克隆：

- 浅克隆

```js
let clone1 = ['a', 'b', 'c']
let clone2 = [...clone1]
console.log(clone2) // ['a', 'b', 'c']
```

将伪数组转换为真实数组：

- 类似 `[].slice.call()`
- 类似 `Array.from()`

```js
function func() {
  console.log([...arguments]) // [ 1, 2, 3 ]
  console.log([].slice.call(arguments)) // [ 1, 2, 3 ]
  console.log(Array.from(arguments)) // [ 1, 2, 3 ]
}
func(1, 2, 3)
```

对象合并：

- 类似 `Object.assign()`

```js
let obj1 = {
  a: 123,
}
let obj2 = {
  b: 456,
}
let object1 = { ...obj1, ...obj2 }
let object2 = Object.assign(obj1, obj2)
console.log(object1) // { a: 123, b: 456 }
console.log(object2) // { a: 123, b: 456 }
```

### 10. Symbol

> [ECMAScript 6 Symbol](https://es6.ruanyifeng.com/#docs/symbol)

#### Symbol 基本介绍与使用

ES6 引入了一种新的原始数据类型 `Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型

Symbol 的特点：

- Symbol 的值是唯一的，用来解决命名冲突的问题

- Symbol 值不能与其他数据进行运算

  不能进行数字计算（不能转换为数字）、字符串拼接（隐式转换不可以，显示转换可以 `Symbol('bird').toString()`）、模板字符串

- Symbol 定义的对象属性不能使用 `for...in` 循环遍历，但是可以使用 `Reflect.ownKeys` 或 `Object.getOwnPropertySymbols()` 来获取对象的所有键名

Symbol 的创建：

- 输出 `Symbol` 变量的描述，使用 `description` 属性
- 输出 `Symbol` 变量在 `symbol` 注册表中注册过的描述

```js
let s1 = Symbol('bird')
let s2 = Symbol('bird')
console.log(s1 === s2) // false
console.log(s2.description) // bird
console.log(Symbol.keyFor(s2)) // undefined
```

使用 `Symbol.for()` 方法创建，名字相同的 `Symbol` 具有相同的实体：

- `Symbol.for` 方法创建的 `Symbol` 会被放入一个全局 `symbol` 注册表中
- `Symbol` 定义的值不放入全局 `symbol` 注册表中，每次都是新建

```js
let s3 = Symbol.for('dog')
let s4 = Symbol.for('dog')
console.log(s3 === s4) // true
console.log(s4.description) // dog
console.log(Symbol.keyFor(s4)) // dog
```

#### 对象添加 Symbol 类型的属性

如果直接向对象中添加属性或方法，则原来对象中可能已经存在了同名属性或方法，会覆盖掉原来的。所以使用 `Symbol` 生成唯一的属性或方法名，可以更加安全的添加

```js
let game = {
  name: 'FlyBird',
  up() {},
  down() {},
  [Symbol('say')]() {
    console.log('say')
  },
}
let methods = {
  up: Symbol(),
  down: Symbol(),
}

game[methods.up] = () => console.log('上移')
game[methods.down] = () => console.log('下移')
console.log(game)
/* 
{
  name: 'FlyBird',
  up: [Function: up],
  down: [Function: down],
  [Symbol(say)]: [Function: [say]],
  [Symbol()]: [Function],
  [Symbol()]: [Function]
}
*/
```

#### Symbol 内置值

除了定义自己使用的 Symbol 值以外，ES6 还提供了11 个内置的 Symbol 值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为它们会在特定的场景下自动执行

| 方法                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `Symbol.hasInstance`         | 当其他对象使用 `instanceof` 运算符，判断是否为该对象的实例时，会调用这个方法 |
| `Symbol.isConcatSpreadable ` | 对象的 `Symbol.isConcatSpreadable` 属性等于的是一个布尔值，表示该对象用于`Array.prototype.concat()` 时，是否可以展开 |
| `Symbol.species`             | 创建衍生对象时，会使用该属性                                 |
| `Symbol.match`               | 当执行 `str.match(myObject)` 时，如果该属性存在，会调用它，返回该方法的返回值 |
| `Symbol.replace `            | 当该对象被 `str.replace(myObject)` 方法调用时，会返回该方法的返回值 |
| `Symbol.search `             | 当该对象被 `str.search(myObject)` 方法调用时，会返回该方法的返回值 |
| `Symbol.split `              | 当该对象被 `str.split(myObject)` 方法调用时，会返回该方法的返回值 |
| `Symbol.iterator `           | 对象进行` for...of` 循环时，会调用 `Symbol.iterator` 方法，返回该对象的默认遍历器 |
| `Symbol.toPrimitive `        | 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值 |
| `Symbol.toStringTag `        | 在该对象上面调用 `toString()` 方法时，返回该方法的返回值     |
| `Symbol.unscopables `        | 该对象指定了使用 `with` 关键字时，哪些属性会被 `with` 环境排除 |

当其他对象使用 `instanceof` 运算符，判断是否为该对象的实例时，会调用 `Symbol.hasInstance` 这个方法

```js
class Person {
  static [Symbol.hasInstance](params) {
    console.log(params) // { flag: true }
    return params.flag
  }
}

let o = {
  flag: true,
}
console.log(o instanceof Person) // true
```

数组使用 `concat` 方法时，是否可以展开

```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [4, 5, 6]
arr2[Symbol.isConcatSpreadable] = false
console.log(arr1.concat(arr2))
// [ 1, 2, 3, [ 4, 5, 6, [Symbol(Symbol.isConcatSpreadable)]: false ] ]
console.log(arr1.concat(arr3))
// [ 1, 2, 3, 4, 5, 6 ]
```

该对象被转为原始类型的值时，会调用 `Symbol.toPrimitive` 这个方法，返回该对象对应的原始值类型值

- 当然也可以定义一个 `valueOf` 或 `toString`，数据类型进行转换时，调用优先级最高的还是 `Symbol.toPrimitive`

```js
let a = {
  value: 1,
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return this.value
      case 'string':
        return String(this.value)
      case 'default':
        return ++this.value
    }
  },
}

console.log(+a + 10) // 11
console.log(String(a)) // 1
if (a == 2 && a == 3) {
  console.log('OK') // OK
}
```

在该对象上面调用 `Object.prototype.toString` 方法时，如果这个属性存在，它的返回值会出现在 `toString` 方法返回的字符串之中，表示对象的类型

```js
class Person {
  get [Symbol.toStringTag]() {
    return 'Person'
  }
}
let p1 = new Person()
console.log(Object.prototype.toString.call(p1)) // "[object Person]"
```

### 11. 迭代器 Iterator

#### 定义及原理

遍历器（`Iterator`）就是一种机制。它是一种接口，为各种不同的数据结构提 供统一的访问机制。任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作

- ES6 创造了一种新的遍历命令 `for...of` 循环，`Iterator` 接口主要供 `for...of` 消费。
- 原生具备 Iterator 接口的数据：
  - `Array`
  - `Arguments`
  - `Set`
  - `Map`
  - `String`
  - `TypedArray`
  - `NodeList`

**工作原理**

- 创建一个指针对象，指向当前数据结构的起始位置
- 第一次调用对象的 `next` 方法，指针自动指向数据结构的第一个成员
- 接下来不断调用 `next` 方法，指针一直往后移动，直到指向最后一个成员
- 每调用 `next` 方法返回一个包含 `value` 和 `done` 属性的对象

#### 自定义遍历数据

**应用场景：** 需要自定义遍历数据的时候，要想到迭代器

```js
let arr = ['bird', 'dog', 'lion']
let iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // { value: 'bird', done: false }
console.log(iterator.next()) // { value: 'dog', done: false }
console.log(iterator.next()) // { value: 'lion', done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

我们可以通过给数据结构添加自定义 `[Symbol.iterator]()` 方法来使该数据结构能够直接被遍历，从而使 `for...of` 能够直接遍历指定数据，达到为 `for...of` 服务的功能

- `{}` 对象是无法被 `for..of` 循环的，`[]` 数组是可以的，可以手动添加 `Symbol.iterator` 属性，使其可以被 `for...of` 遍历出

- 这里有缺陷，使用数组原型上的 `Symbol.iterator` ，所以对象必须是个伪数组才能遍历

```js
let obj = {
  0: 'bird',
  1: 21,
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
}
for (let item of obj) {
  console.log(item)
} // bird 21
```

使用迭代器自定义遍历对象：

```js
let obj = {
  name: '动物园',
  animals: ['bird', 'dog', 'lion'],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.animals.length) {
          return {
            value: this.animals[index++],
            done: false,
          }
        } else {
          return {
            value: undefined,
            done: true,
          }
        }
      },
    }
  },
}
for (let item of obj) {
  console.log(item)
} // bird dog lion
```

使用 generator 和 yield：

```js
let obj = {
  name: 'Neo',
  age: 21,
  *[Symbol.iterator](){
    for (let val of Object.values(this)) {
      yield val
    }
  }
}
for (let item of obj) {
  console.log(item)
} // Neo 21
```

### 12. 生成器 Generator

#### 生成器函数声明与调用

生成器函数是 ES6 提供的一种 **异步编程解决方案**，语法行为与传统函数完全不同

- `*` 的位置没有限制
- 使用 `function * gen()` 和 `yield` 可以声明一个生成器函数。生成器函数返回的结果是迭代器对象，调用迭代器对象的 `next()` 方法可以得到 `yield` 语句后面的值
- 每一个 `yield` 相当于函数的暂停标记，也可以认为是一个分割符，每调用一次 `next()` ，生成器函数就往下执行一段
- `next()` 方法可以传递实参，作为 `yield` 语句的返回值

```js
function* generator() {
  console.log('111')
  yield 111
  console.log('222')
  yield 222
  console.log('333')
  yield 333
  console.log('444')
}
let iter = generator()
console.log(iter.next()) // 111 { value: 111, done: false }
console.log(iter.next()) // 222 { value: 222, done: false }
console.log(iter.next()) // 333 { value: 333, done: false }
console.log(iter.next()) // 444 { value: undefined, done: false }
```

#### 生成器函数参数传递

```js
function* generator(arg) {
  console.log(arg)
  let one = yield 111
  console.log(one)
  let two = yield 222
  console.log(two)
  let three = yield 333
  console.log(three)
}

let iter = generator('aaa')
console.log(iter.next())
console.log(iter.next('bbb'))
console.log(iter.next('ccc'))
console.log(iter.next('ddd'))
/* 
aaa
{ value: 111, done: false }
bbb
{ value: 222, done: false }
ccc
{ value: 333, done: false }
ddd
{ value: undefined, done: true }
*/
```

#### 生成器函数案例

案例1：每 1s 输出数字

- 传统方式：嵌套太多，代码复杂，产生 **回调地狱**。

```js
setTimeout(() => {
  console.log(111)
  setTimeout(() => {
    console.log(222)
    setTimeout(() => {
      console.log(333)
    }, 1000)
  }, 1000)
}, 1000)
```

- 生成器实现：

```js
function one() {
  setTimeout(() => {
    console.log(111)
    iter.next()
  }, 1000)
}

function two() {
  setTimeout(() => {
    console.log(222)
    iter.next()
  }, 1000)
}

function three() {
  setTimeout(() => {
    console.log(333)
  }, 3000)
}

function* generator() {
  yield one()
  yield two()
  yield three()
}

let iter = generator()
iter.next()
```

案例2：生成器函数模拟每隔 1s 获取商品数据

```js
function getUsers() {
  setTimeout(() => {
    let data = '用户数据'
    iter.next(data) // 传参给生成器函数的第 2 段，后面类似
  }, 1000)
}

function getOrders() {
  setTimeout(() => {
    let data = '订单数据'
    iter.next(data)
  }, 1000)
}

function getGoods() {
  setTimeout(() => {
    let data = '商品数据'
    iter.next(data)
  }, 1000)
}

function* generator() {
  let users = yield getUsers()
  console.log(users)
  let orders = yield getOrders()
  console.log(orders)
  let goods = yield getGoods()
  console.log(goods)
}

let iter = generator()
iter.next()
```

### 13. Promise

#### Promise 基本使用

`Promise` 是 ES6 引入的 **异步编程的新解决方案**。语法上 `Promise` 是一个 **构造函数**，用来封装异步操作并可以获取其成功或失败的结果

一个 `Promise` 必然处于以下几种状态之一：

- `pending`
- `fulfilled`
- `rejected`

Promise 封装读取文件：

```js
const fs = require('fs')

const p = new Promise((resolve, reject) => {
  fs.readFile('./resources/为学.txt', (err, data) => {
    if (err) reject(err)
    resolve(data)
  })
})

p.then(
  value => console.log(value.toString()),
  reason => console.log('读取失败!!')
)
```

Promise 封装 Ajax 请求：

```js
const p = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://api.apiopen.top/getJoke')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (/^(2|3)\d{2}/.test(xhr.status)) {
        resolve(xhr.response)
      } else {
        reject(xhr.status)
      }
    }
  }
})

p.then(res => {
  console.log(res)
})
```

#### Promise.prototype.then 方法

`Promise.prototype.then` 方法返回的结果依然是 `Promise` 对象，**对象状态由回调函数的执行结果决定**

具体情况如下：

- 若 `then` 方法没有返回值，则 `then` 方法返回的对象的状态值为成功 `fulfilled`，返回结果值为 `undefined`
- 如果回调函数中返回的结果是非 `Promise` 类型的属性，则 `then` 方法返回的对象，其状态为成功（`fulfilled`），返回结果值取决于 `then` 方法所执行的是哪个函数（`resolve` 或 `reject`）
- 如果回调函数中返回的结果是 `Promise` 类型（`return new Promise()`），则 `then` 方法返回的 `Promise` 对象状态与该返回结果的状态相同，返回值也相同
- 如果回调函数中返回的结果是 `throw` 语句抛出异常，则 `then` 方法的对象的状态值为 `rejected`，返回结果值为 `throw` 抛出的字面量或者 `Error` 对象

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ msg: 'user data', code: 0 })
    // reject({ msg: 'error', code: -1 })
  }, 1000)
})

const res = p.then(value => {
  console.log(value)
  return new Promise((resolve, reject) => {
    // 1.没有返回值
    /* return */

    // 2.非Promise类型的属性
    /* return 'bird' */

    // 3.是Promise类型对象
    /* return new Promise((resolve, reject) => {
      resolve('Ok')
      reject('Error')
    }) */

    // 4.抛出异常
    /* throw new Error('error') */
  })
})

console.log(res)
```

`Promise.prototype.then` 方法返回的结果还是 `Promise` 对象，这意味着我们可以继续在该结果上使用 `then` 方法，也就是链式调用

```js
console.log(res)
const p = new Promise(
  resolve => {},
  reject => {}
)
p.then(
  value => {},
  reason => {}
)
  .then(
    value => {},
    reason => {}
  )
  .then(
    value => {},
    reason => {}
  )
```

**Promise.prototype.catch 方法**

`catch()` 方法返回一个 `Promise`，并且处理拒绝的情况。它的行为与调用 `Promise.prototype.then(undefined, onRejected)` 相同

### 14. Set

ES6 提供了新的数据结构 `Set`（集合）。它类似于数组，但 **成员的值都是唯一的**，集合实现了 `iterator` 接口，所以可以使用 扩展运算符 和 `for...of` 进行遍历

**Set 的属性和方法：**

1. `size` ：返回集合的元素个数
2. `add` ：增加一个新元素，返回当前集合
3. `delete` ：删除元素，返回 `boolean` 值
4. `has` ：检测集合中时报包含某个元素，返回 `boolean` 值
5. `clear` ：清空集合，返回 `undefined`

```js
let s = new Set(['一', '二', '三', '二', '四', '三'])

console.log(s) // Set { '一', '二', '三', '四' }
console.log(s.size) // 4
s.add('五')
console.log(s) // Set { '一', '二', '三', '四', '五' }
let result1 = s.delete('三')
console.log(result1) // true
let result2 = s.has('三')
console.log(result2) // false
let result3 = s.clear()
console.log(result3) // undefined
console.log(s) // Set {}
```

**集合案例：**

```js
let arr = [1, 2, 2, 3, 2, 3, 4, 1, 4]

// 数组去重
let result1 = [...new Set(arr)]
console.log(result1) // [ 1, 2, 3, 4 ]

// 交集
let arr2 = [4, 5, 6, 4, 5]
let result2 = [...new Set(arr)].filter(item => new Set(arr2).has(item))
console.log(result2) // [ 4 ]

// 并集
let result3 = [...new Set([...arr, ...arr2])]
console.log(result3) // [ 1, 2, 3, 4, 5, 6 ]

// 差集
let result4 = [...new Set(arr)].filter(item => !new Set(arr2).has(item))
console.log(result4) // [ 1, 2, 3 ]
```

### 15. Map

ES6 提供了 `Map` 数据结构。它类似于对象，也是键值对的集合。但是 “键” 的范围不限于字符串，各种类型的值（包括对象）都可以当作键。`Map` 也实现了 `iterator` 接口，所以可以使用『扩展运算符』和 `for...of `进行遍历

**Map 的属性和方法：**

1. `size` ：返回 `Map` 的元素个数
2. `set` ：增加一个新元素，返回当前 `Map`
3. `get` ：返回键名对象的键值
4. `has` ：检测 `Map` 中是否包含某个元素，返回 `boolean` 值
5. `clear` ：清空集合，返回 `undefined`

```js
let m1 = new Map()
m1.set('aaa', 111)
m1.set('bbb', 222)
m1.set('ccc', 333)

let m2 = new Map([
  ['aaa', 111],
  ['bbb', 222],
  ['ccc', 333],
])

console.log(m1, m2) // Map(3) {'aaa' => 111, 'bbb' => 222, 'ccc' => 333}
console.log(m1.get('aaa')) // 111
console.log(m1.has('aaa')) // true
m1.clear()
console.log(m1) // Map {}
```

### 16. class

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

#### 寄生组合式继承

- `call`  继承 + 原型继承

![](https://gitee.com/lilyn/pic/raw/master/js-img/原型链继承示例图.png)

```js
function Parent() {
  this.x = 100
}
Parent.prototype.getX = function getX() {
  return this.x
}

function Child() {
  Parent.call(this)
  this.y = 200
}
// Child.prototype.__proto__ = Parent.prototype
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
Child.prototype.getY = function getY() {
  return this.y
}

let c1 = new Child()
console.log(c1)
```

#### 类继承

ES6 中直接使用 `extends` 语法糖（更简洁高级的实现方式）来实现继承，同时可以重写父类的方法，直接在子类中重新写一次要重写的方法即可覆盖父类方法

![](https://gitee.com/lilyn/pic/raw/master/js-img/类继承示例.png)

- 给 `Parent` 添加 `static` 静态成员，会在 `constructor: class Parent` 里添加成员，这个成员只能由该类调用

```js
class Parent {
  constructor() {
    this.x = 100
  }
  // Parent.prototype.getX=function...
  getX() {
    return this.x
  }
}

// 注意：继承后一定要在constructor加上super
class Child extends Parent {
  constructor() {
    super() // 类似call继承
    this.y = 200
  }
  getY() {
    return this.y
  }
}
// Child() // TypeError: Class constructor Child cannot be invoked without 'new ES6中创建的就是类，不能当做普通函数执行，只能new执行

let c1 = new Child()
console.log(c1)
```

#### getter 和 setter

当属性拥有 `get`/`set` 特性时，属性就是访问器属性。代表着在访问属性或者写入属性值时，对返回值做附加的操作

案例：每次新增 `log` 都会给出提示

```js
class Test {
  constructor(log) {
    this.log = log
  }
  get pushLog() {
    console.log('获取 log')
    return this.log
  }
  set pushLog(e) {
    console.log('新增 log')
    this.log.push(e)
  }
}

let test = new Test(['a', 'b', 'c'])
test.pushLog = 'd' // 新增 log
console.log(test.pushLog) // 获取 log [ 'a', 'b', 'c', 'd' ]
```

### 17. 数值扩展

> [ECMAScript 6 数值的扩展](https://es6.ruanyifeng.com/#docs/number)

`Number.EPSILON` ：是 JavaScript 表示的最小精度，一般用来处理浮点数运算

- `EPSILON` 属性的值接近于 `2.2204460492503130808472633361816E-16`

```js
let equal = (x, y) => Math.abs(x - y) < Number.EPSILON

console.log(0.1 + 0.2 === 0.3) // false
console.log(equal(0.1 + 0.2, 0.3)) // true
```

ES6 提供了二进制和八进制数值的新的写法，分别用前缀 0b 和 0o 表示

```js
let b = 0b1010 // 二进制
let o = 0o777  // 八进制
let d = 100    // 十进制
let x = 0xff   // 十六进制
console.log(b) // 10
console.log(o) // 511
console.log(d) // 100
console.log(x) // 255
```

`Number.isNaN` ：用来检查一个值是否为 `NaN`

```js
Number.isNaN(NaN)        // true
Number.isNaN(9/NaN)      // true
Number.isNaN('true' / 0) // true
```

`Number.isFinite` ：检测一个数值是否为有限数

```js
console.log(Number.isFinite(100))      // true
console.log(Number.isFinite(100 / 0))  // false
console.log(Number.isFinite(Infinity)) // false
```

`Number.parseInt` 和 `Number.parseFloat`

- ES6 给 `Number` 添加了 `parseInt` 方法，`Number.parseInt` 完全等同于 `parseInt`

  将字符串转为整数，或者进行进制转换。`Number.parseFloat` 则等同于 `parseFloat()`

- `Number.parseInt(s, base)` ：`s` 待转换的字符串，`base` 进位制的基数

```js
console.log(Number.parseInt === parseInt)     // true
console.log(Number.parseFloat === parseFloat) // true
```

`Number.isInteger` ：判断一个数是否为整数

```js
console.log(Number.isInteger(5))   // true
console.log(Number.isInteger(2.5)) // false
```

`Math.trunc` ：将数字的小数部分抹掉

```js
console.log(Math.trunc(3.5)) // 3
```

`Math.sign` ：判断一个数到底为正数、负数还是零

```js
console.log(Math.sign(100))  // 1
console.log(Math.sign(0))    // 0
console.log(Math.sign(-100)) // -1
```

### 18. 对象方法扩展

> [ECMAScript 6 对象的扩展](https://es6.ruanyifeng.com/#docs/object)

`Object.is` 比较两个值是否严格相等，与 `===` 行为 **基本一致**

- `===` 运算符将数字 `-0` 和 `+0` 视为相等

  `Object.is` 中 `+0` 和 `-0` 是不相等的，但是 `+0` 和 `0` 是相等的

- `Object.is` 可以检测 NaN

```js
console.log(Object.is(NaN, NaN)) // true
console.log(NaN === NaN) // false

console.log(Object.is(-0, +0)) // false
console.log(-0 === +0) // true

console.log(Object.is(0, +0)) // true
console.log(Object.is(0, -0)) // false
```

`Object.assign` 对象的合并，将源对象的所有可枚举属性，复制到目标对象

```js
let a = { name: 'bird', age: 23 }
let b = { name: 'dog', addr: 'ground' }
console.log(Object.assign({}, a, b)) // { name: 'dog', age: 23, addr: 'ground' }
```

`__proto__`、`setPrototypeOf` 可以直接设置对象的原型

- 最好还是通过 `Object.create` 在创建的时候就把原型链指向对应对象

```js
const animals = {
  name: 'bird',
}
const cities = {
  migration: ['北京', '上海', '深圳'],
}
Object.setPrototypeOf(animals, cities)
console.log(Object.getPrototypeOf(animals))// { migration: [ '北京', '上海', '深圳' ] }
console.log(animals) // { name: 'bird' }
```

ES5 引入了 `Object.keys` 方法，ES2017 引入了跟 `Object.keys` 配套的 `Object.values` 和`Object.entries`

### 19. 数组方法扩展

> [ECMAScript 6 数组的扩展](https://es6.ruanyifeng.com/#docs/array)

`Array.from` ：用于将两类对象转为真正的数组

`Array.of` ：用于将一组值，转换为数组，基本上可以用来替代 `Array()` 或 `new Array()`

`Array.find` ：用于找出第一个符合条件的数组成员

`Array.findIndex`：用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回 `-1`

`Array.fill` ：使用给定值填充数组

`Array.entries()`、`Array.keys()`、`Array.values()` ：用于遍历数组

### 20. 模块化

[ECMAScript 6 模块化](https://es6.ruanyifeng.com/#docs/module)

模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小文件组合起来

模块化的优势有以下几点：

- 防止命名冲突
- 代码复用
- 高维护性

ES6 之前的模块化规范有：

- `CommonJS` => `NodeJS`、`Browserify`
- `AMD` => `requireJS`
- `CMD` => `seaJS`

模块功能主要由两个命令构成：`export` 和 `import`

- `export` 命令用于规定模块的对外接口
- `import` 命令用于输入其他模块提供的功能

模块导出数据语法：

```js
// 单个导出
export let name = 'bird'
export const say = () => console.log('whisper')


// 合并导出
let name = 'dog'
let play = function () {
  console.log('ground')
}
export { name, play }

// 默认导出
export default {
  name: 'cat',
  hobby() {
    console.log('sleep')
  },
}
```

模块导入数据语法：

```html
<script type="module">
  // 通用导入方式
  import * as m1 from './js/m1.js'

  // 解构赋值导入：有重复名可以设置别名
  import { name as name2, say } from './js/m1.js'

  // 针对默认暴露
  import m1 from "./js/m1.js"
</script>
```

### 21.babel

Babel 是一个 JavaScript 编译器

- 能够将新的 ES 规范语法转换成 ES5 的语法
- 因为不是所有的浏览器都支持最新的 ES 规范，所以，一般项目中都需要使用 Babel 进行转换

步骤：

1. 初始化项目

   ```bash
   npm init -y
   ```

2. 安装工具 `babel-cli`（命令行工具）、`babel-preset-env`（ES 转换工具）、`browserify`（打包工具，项目中使用的是 `webpack`）

   ```bash
   npm i babel-cli babel-preset-env browserify -D
   ```

3. 使用 `babel` 转换

   ```bash
   npx babel src/js -d dist/js --presets=babel-preset-env
   ```

4. 打包

   ```bash
   npx browserify dist/js/app.js -o dist/bundle.js
   ```

5. 在浏览器引入即可

   ```html
   <script src="/dist/bundle.js"></script>
   ```

### final. 补充

声明变量的方法：

- ES5 只有两种声明变量的方法：`var` 和 `function`
- ES6 中添加了 `let` 、`const`、`import`、`class` 声明变量的方法



定义字面量：

- ES5 只能直接用标识符作为属性名 `obj.foo = true;`
- ES6 允许字面量定义对象时，用表达式作为属性名。即把表达式放在方括号内 `obj['a' + 'bc'] = 123`



ES6 一共有 5 种方法可以遍历对象的属性：

- `for...in` 循环遍历对象自身的和继承的可枚举属性（不含 `Symbol` 属性）
- `Object.keys(obj)` 返回一个数组，包括对自身的（不包含继承的）所有可枚举属性（不含 `Symbol` 属性）的键名
- `Object.getOwnPropertyNames(obj)` 返回一个数组，包含对象自身的所有属性（不含 `Symbol` 属性）的键名
- `Object.getOwnPropertySymbols(obj)` 返回一个数组，包含对象自身的所有 `Symbol` 属性的键名
- `Reflect.ownKeys(obj)` 返回一个数组，包含对象自身（不含继承的）所有键名，不管键名是 `Symbol` 或字符串，也不管是否可枚举

以上 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则

- 首先遍历所有数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有 Symbol 键，按照加入时间升序排列



以下例子都是调用了遍历器接口（`Symbol.iterator`）：

- `for...of`
- `Array.from()`
- `Map()`、`Set()`、`WeakMap()`、`WeakSet()`
- `Promise.all()`
- `Promise.race()`

## ECMAScript 7 新特性

### includes

includes 方法用来检测数组中是否包含某个元素，返回布尔类型值

- 判断数组中是否包含某元素，语法：`arr.includes(元素值)`

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.includes(1)) // true
```

### 指数操作符

在 ES7 中引入指数运算符 `**`，用来实现幂运算，功能与 `Math.pow` 结果相同

```js
console.log(Math.pow(2, 10)) // 1024
console.log(2**10) // 1024
```

## ECMAScript 8 新特性

### async **和** await

`async` 和 `await` 两种语法结合可以让异步代码看起来像同步代码一样

**async 函数**

- `async` 函数的返回值为 `promise` 对象
- `promise` 对象的结果由 `async` 函数执行的返回值决定

**await 表达式**

- `await` 必须写在 `async` 函数中
- `await` 右侧的表达式一般为 `promsie` 对象
- `await` 返回的是 `promise` 成功的值
- `await` 的 `promise` 失败了，就会抛出异常，需要通过 `try...catch` 捕获处理

```js
let p = new Promise((resolve, reject) => {
  // resolve('success')
  reject('error')
})

async function main() {
  let result
  try {
    result = await p
  } catch (e) {
    result = e
  }
  console.log(result)
}
console.log(main()) // Promise
```

`async` `await` 封装 AJAX 请求

```js
function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (/^(2|3)\d{2}/.test(xhr.status)) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
  })
}

/* sendAJAX('https://api.apiopen.top/getJoke').then(value => {
  console.log(value)
})
 */

async function main() {
  let result = await sendAJAX('https://api.apiopen.top/getJoke')
  console.log(result)
}
main()
```

### Object.values Object.entries

- `Object.values()` 方法：返回一个给定对象的所有可枚举属性值的数组
- `Object.entries()` 方法：返回一个给定对象自身可遍历属性 [key,value] 的数组

```js
let obj = { name: 'Lee', age: 21, sex: 'man' }
console.log(Object.keys(obj)) // [ 'name', 'age', 'sex' ]
console.log(Object.values(obj)) // [ 'Lee', 21, 'man' ]
console.log(Object.entries(obj)) // [ [ 'name', 'Lee' ], [ 'age', 21 ], [ 'sex', 'man' ] ]
```

### Object.getOwnPropertyDescriptors

```js
let obj = Object.create(null, {
  name: {
    value: 'dog',
    writable: true,
    configurable: true,
    enumerable: true,
  },
  age: {
    value: 12
  }
})
console.log(Object.getOwnPropertyDescriptors(obj)) // 如下图
console.log(Object.keys(obj)) // ['name']

console.log(Object.getOwnPropertyDescriptor([], 'length').enumerable) // false
```

![](https://gitee.com/lilyn/pic/raw/master/js-img/getOwnPropertyDescriptors1.png)

描述对象的 `enumerable` 属性，有四个操作会忽略 `enumerable` 为 `false` 的属性

- `for...in` 循环：只遍历对象自身和继承的可枚举的属性
- `Object.keys()` ：返回对象自身的所有可枚举的属性的键名
- `JSON.stringify()` ：只串行化对象自身的可枚举的属性
- `Object.assign()` ：只拷贝对象自身的可枚举属性

## ECMAScript 9 新特性

### 对象的 rest 与 spread

`rest` 参数与 `spread` 扩展运算符在 ES6 中已经引入，不过在 ES6 中只针对数组，在 ES9 中为对象提供了像数组一样的 `rest` 参数和扩展运算符

```js
function connect({ host, port, ...user }) {
  console.log(host) // 127.0.0.1
  console.log(port) // 3306
  console.log(user) // { username: 'root', password: 'root' }
}

connect({
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
})

let skillOne = { q: '天音波;回音击' }
let skillTwo = { w: '金钟罩;铁布衫' }
let skillThree = { w: '天雷破;催筋断骨' }
let skillFour = { r: '猛龙摆尾' }
let ms = { ...skillOne, ...skillTwo, ...skillThree, ...skillFour }
console.log(ms) // {q: '天音波;回音击', w: '天雷破;催筋断骨', r: '猛龙摆尾'}
```

### 正则扩展：命名捕获分组

ES9 允许命名捕获分组使用符号 `?` ，这样获取捕获结果可读性更强

```js
let str1 = '<a href="http://www.baidu.com">内容</a>'
let reg1 = /<a href="(.*)">(.*)<\/a>/
let result1 = reg1.exec(str1)
console.log(result1[1]) // http://www.baidu.com
console.log(result1[2]) // 内容

let str2 = '<a href="http://www.baidu.com">内容</a>'
let reg2 = /<a href="(?<url>.*)">(?<text>.*)<\/a>/
let result2 = reg2.exec(str2)
console.log(result2.groups.url) // http://www.baidu.com
console.log(result2.groups.text) // 内容
```

###  正则扩展：后行断言

ES9 支持反向断言，通过匹配结果前面的内容进行判断，对匹配进行筛选

```js
let str = 'Lorem999ipsum555sit'
// 正向断言
let reg1 = /\d+(?=sit)/
let result1 = reg1.exec(str)
console.log(result1[0]) // 555

// 反向断言
let reg2 = /(?<=ipsum)\d+/
let result2 = reg2.exec(str)
console.log(result2[0]) // 555
```

### 正则扩展：dotAll 模式

正则表达式中 ，点 `.` 匹配除换行符以外的任意单个字符

- ES9 引入修正符 `s` ，`.` 可以匹配任意字符，包括换行符

```js
let str = `
<ul>
  <li>
    <a>肖生克的救赎</a>
    <p>上映日期: 1994-09-10</p>
  </li>
  <li>
    <a>阿甘正传</a>
    <p>上映日期: 1994-07-06</p>
  </li>
</ul>
`
let reg1 = /<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/g
let result1
let data1 = []
while ((result1 = reg1.exec(str))) {
  data1.push({ title: result1[1], time: result1[2] })
}
console.log(data1)

let reg2 = /<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
let result2
let data2 = []
while ((result2 = reg2.exec(str))) {
  data2.push({ title: result2[1], time: result2[2] })
}
console.log(data2)
/*
[
  { title: '肖生克的救赎', time: '上映日期: 1994-09-10' },
  { title: '阿甘正传', time: '上映日期: 1994-07-06' }
]
[
  { title: '肖生克的救赎', time: '上映日期: 1994-09-10' },
  { title: '阿甘正传', time: '上映日期: 1994-07-06' }
]
*/
```

## ECMAScript 10 新特性

### Object.fromEntries

`Object.fromEntries` 将二维数组或者 Map 转换成对象

- `Object.entries` 是将对象转换成二维数组

```js
let result1 = Object.fromEntries([
  ['name', 'bird'],
  ['age', 23],
])
console.log(result1) // {name: 'bird', age: 23}

let m = new Map()
m.set('name', 'dog')
m.set('age', 17)
let result2 = Object.fromEntries(m)
console.log(result2) // {name: 'dog', age: 17}

let arr = Object.entries({
  name: 'cat',
  age: 18,
})
console.log(arr) // [ [ 'name', 'cat' ], [ 'age', 18 ] ]
```

### trimStart 和 trimEnd

`trimStart` 消除字符串头部的空格

`trimEnd` 消除字符串尾部的空格

```js
const s = '  abc  '

console.log(s.trim()) // "abc"
console.log(s.trimStart()) // "abc  "
console.log(s.trimEnd()) // "  abc
```

### flat 和 flatMap

`Array.prototype.flat()` 用于将嵌套的数组“拉平”，变成一维的数组

- 如果不管有多少层嵌套，都要转成一维数组，可以用 `Infinity` 关键字作为参数

`Array.prototype.flatMap()` 只能展开一层数组

```js
console.log([1, [2, [3]]].flat(Infinity)) // [ 1, 2, 3 ]

console.log([1, 2, 3, 4].map(item => [item * 10])) // [ [ 10 ], [ 20 ], [ 30 ], [ 40 ] ]
console.log([1, 2, 3, 4].flatMap(item => [item * 10])) // [ 10, 20, 30, 40 ]
```

### Symbol.prototype.description

ES10 提供了一个实例属性 `description`，直接返回 `Symbol` 的描述

**Symbol 的创建：**

- 输出 `Symbol` 变量的描述，使用 `description` 属性
- 输出 `Symbol` 变量在 `symbol` 注册表中注册过的描述

```js
let s1 = Symbol('bird')
let s2 = Symbol('bird')
console.log(s1 === s2) // false
console.log(s2.description) // bird
console.log(Symbol.keyFor(s2)) // undefined
```

使用 `Symbol.for()` 方法创建，名字相同的 `Symbol` 具有相同的实体：

- `Symbol.for` 方法创建的 `Symbol` 会被放入一个全局 `symbol` 注册表中
- `Symbol` 定义的值不放入全局 `symbol` 注册表中，每次都是新建

```js
let s3 = Symbol.for('dog')
let s4 = Symbol.for('dog')
console.log(s3 === s4) // true
console.log(s4.description) // dog
console.log(Symbol.keyFor(s4)) // dog
```

## ECMAScript 11 新特性

### 私有属性

为 `class` 加私有属性，使用 `#` 表示

- Ruby 语言使用 `@` 表示私有属性，ES6 没有用这个符号而使用 `#`，是因为 `@` 已经被留给了 Decorator

```js
class Animal {
  // 公有属性
  name
  // 私有属性
  #age
  #addr
  constructor(name, age, addr) {
    this.name = name
    this.age = age
    this.#addr = addr
  }

  say(){
    console.log(this.#addr)
  }
}

let cat = new Animal('cat', 4, 'beijing')
cat.say() // 'beijing'
console.log(cat['#addr']) // undefined
console.log(cat.#addr) // 报错
```

### Promise.allSettled

`Promise.all()` 需要所有请求都成功了才算成功，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束

为了解决这个问题，ES11 引入了 `Promise.allSettled` 方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫 "Settled"，包含了 "fulfilled" 和 "rejected" 两种情况

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('one')
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('two')
  }, 1000)
})

Promise.allSettled([p1, p2]).then(res => console.log(res))
/* 
[
  { status: 'fulfilled', value: 'one' },
  { status: 'rejected', reason: 'two' }
]
*/
Promise.all([p1, p2])
  .then(res => console.log(res))
  .catch(err => console.log(err))
// two
```

### String.prototype.matchAll

```js
let str = `
<ul>
  <li>
    <a>肖生克的救赎</a>
    <p>上映日期: 1994-09-10</p>
  </li>
  <li>
    <a>阿甘正传</a>
    <p>上映日期: 1994-07-06</p>
  </li>
</ul>
`
let reg = /<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
let result = str.matchAll(reg)
let data = []
for (let v of result) {
  data.push({ title: v[1], time: v[2] })
}
console.log(data)
/* 
[
  { title: '肖生克的救赎', time: '上映日期: 1994-09-10' },
  { title: '阿甘正传', time: '上映日期: 1994-07-06' }
]
*/
```

### 链判断操作符

ES11 引入了 “链判断运算符”（optional chaining operator）`?.`，简化了 `&&` 的写法

```js
function main(config) {
  // let dbHost = config && config.db && config.db.host
  let dbHost = config?.db?.host
  console.log(dbHost) // 192.168.1.100
}

main(
  {
    db: {
      host: '192.168.1.100',
      username: 'root',
    }
)
```

### 动态 import

- `index.html`

```html
<div id="btn">click</div>
<script src="/src/js/app.js" type="module"></script>
```

- `src/js/hello.js`

```js
export function hello() {
  alert('hello')
}
```

- `src/js/app.js`

```js
let btn = document.getElementById('btn')
btn.onclick = function () {
  import('./m1.js').then(module => {
    module.hello()
  })
}
```

### BigInt 类型

JavaScript 所有数字都存成 64 位浮点数，这给数值的表示带来了两大限制

- 数值的精度只能到 53 个二进制位（相当于 16 个十进制位），与这个范围的整数，JavaScript 无法精确表示
- BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示
- BigInt 可以使用负号（`-`），但是不能使用正号（`+`）

```js
let max = Number.MAX_SAFE_INTEGER
console.log(max) // 9007199254740991
console.log(max + 1) // 9007199254740992
console.log(max + 2) // 9007199254740992

console.log(BigInt(max)) // 9007199254740991n
console.log(BigInt(max) + BigInt(1)) // 9007199254740992n
console.log(BigInt(max) + BigInt(2)) // 9007199254740993n

-42n // 正确
+42n // 报错
```

### globalThis

ES11 中引入 `globalThis` 作为顶层对象，也就是说在任何环境下 `globalThis` 都是存在的，都可以从它拿到顶层对象，指向全局环境的 `this`

- 浏览器里面，顶层对象是 `window`，但 Node 和 Web Worker 没有 `window`。
- 浏览器和 Web Worker 里面，`self` 也指向顶层对象，但是 Node 没有 `self`。
- Node 里面，顶层对象是 `global`，但其他环境都不支持

