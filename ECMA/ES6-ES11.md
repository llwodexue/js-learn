> [尚硅谷Web前端ES6教程，涵盖ES6-ES11](https://www.bilibili.com/video/BV1uK411H7on?p=1)

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
4. 不影响作用域链

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
5.  不能使用 `arguments`

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

案例：点击 `div` 一秒后变成粉色

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
| `Symbol. toStringTag `       | 在该对象上面调用 `toString()` 方法时，返回该方法的返回值     |
| `Symbol. unscopables `       | 该对象指定了使用 `with` 关键字时，哪些属性会被 `with` 环境排除 |

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

其他 API 可以参考：[ES6-Symbol](https://www.cnblogs.com/ddfe/p/5609733.html)

### 11. 迭代器

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

### 12. 生成器

生成器函数是 ES6 提供的一种 **异步编程解决方案**，语法行为与传统函数完全不同

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



[https://docs.mphy.top/#/ECMAScript6+/ch02](https://docs.mphy.top/#/ECMAScript6+/ch02)

