## JS 中的异步任务

JS 是单线程的：大部分代码都是同步的，但是也有少部分代码是异步编程的

**异步宏任务**

- 定时器
- ajax：一般都是异步的（单独开一个线程，http 宏任务）
- 事件绑定（DOM 事件监听线程）

**异步微任务**

- promise
- async await
- generator
- window.requestAnimationFrame
- ...

## 事件循环机制

浏览器加载页面的时候会形成一个事件队列（Event Queue），它是一个优先级队列，分为微任务（microtask）和宏任务（macrotask）

现在不执行，未来要执行的任务放在事件队列中

主线程把同步任务都执行完，主线程闲下来，开始到事件队列中，找所有的异步任务

- 先找异步微任务中的事件，如果有需要执行的拿出来执行，直到微任务中没有需要执行的，则去异步宏任务去找
- 如果有多个任务都符合了可执行的条件，则谁先到达执行阶段的，就把谁先执行
- 把需要执行的异步任务拿到执行环境栈中，让主线程去执行

定时器事件到时间不一定被执行，因为 JS 是单线程，必须等待主线程空闲才有时间执行异步任务，所以定时器的时间是不准确的。（动画能有 CSS3 实现就尽量用 CSS3 实现，如果实现不了再用 requestAnimationFrame）

setTimeout(()=>{},0) 写零也不是立即执行，是浏览器最快的反应时间，谷歌 5~6ms IE 10~17ms（预估）

![定时器谁先到达执行阶段，就把谁先执行](https://gitee.com/lilyn/pic/raw/master/js-img/%E5%AE%9A%E6%97%B6%E5%99%A8%E8%B0%81%E5%85%88%E5%88%B0%E8%BE%BE%E6%89%A7%E8%A1%8C%E9%98%B6%E6%AE%B5%EF%BC%8C%E5%B0%B1%E6%8A%8A%E8%B0%81%E5%85%88%E6%89%A7%E8%A1%8C.jpg)

## promise

承诺模式

ES6 新增的内置类

### Promise 执行

```js
// let p = new Promise(); //Uncaught TypeError: Promise resolver(必须传参)
let p = new Promise([executor])
```

[executor]：可执行函数

- new Promise 的时候，在 Promise 内部会立即把[executor]函数执行
- 函数中一般用来管理一个异步编程代码（不管控异步编程也是可以的）
- 同时给[executor]函数传递两个值（函数类型）：resolve/reject

p 是 Promise 类的实例

- 内置私有属性

  `[[PromiseState]]` 实例状态：pending 准备状态 fulfilled/resolved 成功态 rejected 失败态

  `[[PromiseResult]]` 实例的值

- 公共属性方法

  then

  catch

  finally

  Symbol(Symbol.toStringTag): "Promise"

在[executor]执行 resolve/reject 都是为了改变 promise 实例的状态和值

- 一旦状态被改变成 fulfilled/rejected 则不能再改为其它状态

```js
let p = new Promise((resolve, reject) => {
  resolve('OK') //[[PromiseState]]: "fulfilled" [[PromiseResult]]: "OK"
  reject('NO') // [[PromiseState]]: "rejected" [[PromiseResult]]: "NO"
})
```

- 如果[executor]函数执行报错，则

  Promise 内部做了异常信息捕获（try/catch）

```js
let p = new Promise((resolve, reject) => {
  console.log(a) // [[PromiseState]]: "rejected" [[PromiseResult]]: ReferenceError: a is not defined（报错的原因）
})
p.then(() => {}).catch(() => {})
```

### Promise then

- 实例状态的改变，可以控制，执行 then 方法时，存放的两个方法中的某一个方法执行

```js
p.then(onfulfilledCallback, onrejectedCallback)
// 状态成功执行：onfulfilledCallback
// 状态失败执行：onrejectedCallback
```

执行`p.then(onfulfilledCallback, onrejectedCallback)`

- 首先把传递进来的 onfulfilledCallback 和 onrejectedCallback 存储起来（存储在一个容器中：因为可以基于 then 给其存放好多个回调函数）

- 其次再去验证当前实例的状态

  - 如果实例状态是 pending，则不做任何处理
  - 如果已经变为 fulfilled/rejected，则会通知对应的回调函数执行（但是不是立即执行，而是把放置 EventQueue 中的微任务队列中）

  promise 本身不是异步的，是用来管理异步的，但是 then 方法时异步的（微任务）

```js
let p = new Promise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    resolve('OK') // 同步修改其状态和结果
    // 改变实例的状态和值（同步）
    // 通知之前基于then存放onfulfilledCallback执行（异步的微任务：也是把执行方法的事情放置在EventQueue中的微任务队列中）
    console.log(4)
  }, 1000) // 存储了一个异步宏任务
  console.log(2)
})
console.log(p)
// 此时接受onfulfilledCallback的时候，状态还是pending，只是把方法存起来
p.then(
  result => {
    console.log('success')
  },
  reason => {
    console.log('fail')
  }
)
console.log(3)
// 等1000ms后，执行定时器中的函数（把异步宏任务拿出来执行）

// 1
// 2
// Promise { <pending> }
// 3
// 4
// success
```

> 控制台不展开始当时执行的时候输出的值，展开式后期修改的最新值

执行 then 方法会返回一个全新的 promise 实例

- 不论执行的是基于 p1 存放的 onfulfilledCallback, onrejectedCallback 两个方法中的哪一个
- 只要方法执行不报错
  - 如果方法中返回一个全新的 Promise 实例，则“全新的 Promise 实例”的成功和失败决定 p2 的成功和失败
  - 如果不返回 promise，则 `[[PromiseState]]: "fulfilled" [[PromiseResult]]: 返回值`
- 如果方法执行报错：p2 的 ` [[PromiseState]]: "rejected" [[PromiseResult]]: 报错原因`

```js
let p1 = new Promise(resolve => {
  resolve('OK')
})
let p2 = p1.then(
  result => {
    console.log('success', result)
    // 返回一个成功的Promise实例
    return Promise.resolve('OK')
    // 返回一个失败的Promise实例
    return Promise.reject('NO')
  },
  reason => {
    console.log('fail', reason)
  }
)
console.log(p2)
```

如果 onfulfilledCallback, onrejectedCallback 不传递，则状态和结果都会“顺延/穿透”到下一个同等状态应该执行的回调函数上（内部其实是自己补充了一些实现效果的默认函数 result=>result）

**总结：**

1. 有没有报错
2. 有没有返回新的 Promise 实例

### Promise catch

- 可以不给 then 传递第二个参数，只在最后写一个 catch，因为有顺延机制

```js
// catch只处理状态为失败下做的事情
Promise.prototype.catch = function (onrejectedCallback) {
  return this.then(null, onrejectedCallback)
}
```

### Promise all

`Promise.all( [promise数组:{要求数组中的每一项尽可能都是promise实例}])`

- 返回一个新的 promise 实例 AA，AA 成功还是失败，取决于数组中的每一个 promise 实例是成功还是失败，只要有一个是失败，AA 就是失败的，只有都成功 AA 才是成功的

```js
function fn(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(interval)
    }, interval)
  })
}

let p1 = fn(3000)
let p2 = fn(1000)
let p3 = Promise.resolve(0)
Promise.all([p1, p2, p3])
  .then(results => {
    // 不管谁先知道状态，最后结果的顺序和传递数组的顺序保持一致
    console.log(results)
  })
  .catch(reason => {
    // 处理过程中，遇到一个失败，则ALL立即为失败，结果就是当前实例失败的原因
    console.log(reason)
  })
```

JQ：$.ajax 基于回调函数的方式管理异步编程

- 并行处理

```js
let total = 3,
  i = 0

function complete() {
  i++
  if (i == total) {
  }
}

$.ajax({
  url: 'api1',
  success(result1) {},
})
$.ajax({
  url: 'api2',
  success(result2) {},
})
$.ajax({
  url: 'api3',
  success(result3) {},
})
```

- 串行处理（回调地狱）

```js
// 回调地狱
$.ajax({
  url: 'api1',
  success(result1) {
    $.ajax({
      url: 'api2',
      success(result2) {
        $.ajax({
          url: 'api3',
          success(result3) {},
        })
      },
    })
  },
})
```

- 结合 Promise 处理 ajax 并行串行

```js
const api1 = () => {
  return new Promise(resolve => {
    $.ajax({
      url: 'api1',
      success(result1) {
        resolve()
      },
    })
  })
}
const api2 = () => {
  return new Promise(resolve => {
    $.ajax({
      url: 'api2',
      success(result2) {
        resolve()
      },
    })
  })
}
const api3 = () => {
  return new Promise(resolve => {
    $.ajax({
      url: 'api3',
      success(result3) {
        resolve()
      },
    })
  })
}
// 串行写法
api1()
  .then(result1 => {
    return api2()
  })
  .then(result2 => {
    return api3()
  })
  .then(result3 => {})
// 并行写法
Promise.all([api1(), api2(), api3()]).then(results => {})
```

- 使用 ES7 async+await

```js
;(async function () {
  let result1 = await api1()
  let result2 = await api2()
  let result3 = await api3()
})()
```

### Promise.race

最先知道状态的 promise 实例，是成功还是失败，决定了 AA 是成功还是失败

## Promise 练习题

```js
new Promise(resolve => {
  console.log('promise1')
  resolve()
})
  .then(() => {
    console.log('then11')
    new Promise(resolve => {
      console.log('promise2')
      resolve()
    })
      .then(() => {
        console.log('then21')
      })
      .then(() => {
        console.log('then22')
      })
  })
  .then(() => {
    console.log('then12')
  })

// 微任务1 同步结束
/* then(() => {
    console.log('then11');
    new Promise(resolve => {
        console.log('promise2');
        resolve();
    }).then(() => {
        console.log('then21');
    }).then(() => {
        console.log('then22');
    });
}) */

// 微任务2 微任务1执行结束：代码自上而下执行
/* then(() => {
    console.log('then12');
}) */

// 微任务3 等到主线程一空闲，它就可以执行了
/* then(() => {
    console.log('then21');
}) */

// 微任务4 微任务3执行完才可以知道是否执行
/* then(() => {
    console.log('then22');
}) */
```

```js
new Promise(resolve => {
  console.log('promise1')
  resolve()
})
  .then(() => {
    console.log('then11')
    return new Promise(resolve => {
      console.log('promise2')
      resolve()
    })
      .then(() => {
        console.log('then21')
      })
      .then(() => {
        console.log('then22')
      })
  })
  .then(() => {
    console.log('then12')
  })

// promise1
// then11
// promise2
// then21
// then22
// then12
```

## async

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

async：函数修饰符，控制函数返回 promise 实例

- 函数内部执行报错，则返回失败的 promise 实例，值是失败的原因
- 自己返回一个 promise，以自己返回的为主
- 如果函数内部做了异常捕获，则还是成功态

```js
// ES7: generator + promise 的语法糖 async await
async function fn() {
  try {
    console.log(a)
  } catch {}
  return 10
}
console.log(fn())
fn().then()
```

使用 async 主要目的：为了在函数内部使用 await

```js
function fn() {
  await 1 // SyntaxError: await is only valid in async function
}
```

- awit 是异步微任务
- 函数体重遇到 await，后面代码该怎么执行就怎么执行，但 await 下面的代码会暂停执行（把它们当做一个任务，放置在 EventQueue 的微任务队列中）

```js
function api(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(interval)
    }, interval)
  })
}
// await：后面应该放置一个promise实例（即使我们书写的不是promise实例，浏览器也会把其变为promise实例），await会中断函数体中，其下面的代码执行（await表达式会暂停整个async函数的执行过程并出让其控制权）
// 只有等待await后面的实例是成功态之后，才会把之前暂停的代码继续执行，如果后面的promise实例是失败的，则下面的代码就不再执行了
async function func() {
  await 1
  let result1 = await api(1000)
  console.log(result1)
  let result2 = await api(2000)
  console.log(result2)
}
func()
```

```js
async function foo() {
  await 1
  // return Promise.resolve(1).then(() => undefined)
}
console.log(foo())
```

## async 练习题

```js
var resolveAfter2Seconds = function () {
  console.log('starting slow promise')
  return new Promise(resolve => {
    setTimeout(function () {
      resolve('slow')
      console.log('slow promise is done')
    }, 2000)
  })
}

var resolveAfter1Second = function () {
  console.log('starting fast promise')
  return new Promise(resolve => {
    setTimeout(function () {
      resolve('fast')
      console.log('fast promise is done')
    }, 1000)
  })
}

var sequentialStart = async function () {
  console.log('==SEQUENTIAL START==')

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds()
  console.log(slow) // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second()
  console.log(fast) // 3. this runs 3 seconds after 1.
}
var concurrentStart = async function () {
  console.log('==CONCURRENT START with await==')
  const slow = resolveAfter2Seconds() // starts timer immediately
  const fast = resolveAfter1Second() // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow) // 2. this runs 2 seconds after 1.
  console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}
var concurrentPromise = function () {
  console.log('==CONCURRENT START with Promise.all==')
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(messages => {
    console.log(messages[0]) // slow
    console.log(messages[1]) // fast
  })
}
var parallel = async function () {
  console.log('==PARALLEL with await Promise.all==')

  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([(async () => console.log(await resolveAfter2Seconds()))(), (async () => console.log(await resolveAfter1Second()))()])
}

// This function does not handle errors. See warning below!
var parallelPromise = function () {
  console.log('==PARALLEL with Promise.then==')
  resolveAfter2Seconds().then(message => console.log(message))
  resolveAfter1Second().then(message => console.log(message))
}
// 相继的；前面的完事才走后面的
sequentialStart()
// 同时发生的
concurrentStart()
concurrentPromise()
// 平行的；谁先到先执行谁
parallel()
parallelPromise()
```

## 同步异步编程题

### 1

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')

/*
"async1 start"
"async1 start"
"async2"
"promise1"
"script end"
"async1 end"
"promise2"
"setTimeout"
*/
```

### 2

事件绑定是宏任务

```js
let body = document.documentElement
body.addEventListener('click', function () {
  Promise.resolve().then(() => {
    console.log(1)
  })
  console.log(2)
})
body.addEventListener('click', function () {
  Promise.resolve().then(() => {
    console.log(3)
  })
  console.log(4)
})

/*
2
1
4
3
*/
```

### 3

```js
console.log('start')
let intervalId
Promise.resolve()
  .then(() => {
    console.log('p1')
  })
  .then(() => {
    console.log('p2')
  })
setTimeout(() => {
  Promise.resolve()
    .then(() => {
      console.log('p3')
    })
    .then(() => {
      console.log('p4')
    })
  intervalId = setInterval(() => {
    console.log('interval')
  }, 3000)
  console.log('timeout1')
}, 0)

/*
"start"
"p1"
"p2"
"timeout1"
"p3"
"p4"
"interval"
每到时间救输出interval
*/
```

### 4

```js
setTimeout(() => {
  console.log('a')
})
Promise.resolve()
  .then(() => {
    console.log('b')
  })
  .then(() => {
    return Promise.resolve('c').then(data => {
      setTimeout(() => {
        console.log('d')
      })
      console.log('f')
      return data
    })
  })
  .then(data => {
    console.log(data)
  })

/*
"b"
"f"
"c"
"a"
"d"
*/
```

### 5

```js
function func1() {
  console.log('func1 start')
  return new Promise(resolve => {
    resolve('OK')
  })
}
function func2() {
  console.log('func2 start')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('OK')
    }, 10)
  })
}
console.log(1)
setTimeout(async () => {
  console.log(2)
  await func1()
  console.log(3)
}, 20)
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4)
func1().then(result => {
  console.log(5)
})
func2().then(result => {
  console.log(6)
})
setTimeout(() => {
  console.log(7)
}, 0)
console.log(8)

/*
1
4
func1 start
func2 start
8
5
2
func1 start
3
7
6
*/
```

## Promise 源码

基于原生 JS 实现 Promise（遵循的是 Promise A Plus 规范）
[https://promisesaplus.com/](https://promisesaplus.com/)

```js
;(function () {
  'use strict'
  // 工具方法
  var isArray = function isArray(value) {
    var type = Object.prototype.toString.call(value)
    return /^\[object Array\]$/.test(type)
  }
  var isPromise = function isPromise(x) {
    // return x instanceof Promise;
    if (x == null) return false
    if (/^(object|function)$/.test(typeof x)) {
      if (typeof x.then === 'function') {
        return true
      }
    }
    return false
  }
  // 当前then返回promise实例成功失败控制下一个then
  var handle = function handle(promise, x, resolve, reject) {
    if (x === promise) throw new TypeError('Chaining cycle detected for promise #<Promise>')
    if (isPromise(x)) {
      try {
        x.then(resolve, reject)
      } catch (err) {
        reject(err)
      }
      return
    }
    resolve(x)
  }

  // 核心
  function Promise(executor) {
    var self = this,
      change
    // 参数格式处理
    // 只允许new执行，不允许把其当做普通函数执行
    if (typeof self === 'undefined') throw new TypeError('undefined is not a promise')
    // 传递的executor必须是一个函数
    if (typeof executor !== 'function') throw new TypeError('Promise resolver' + executor + 'is not a function')

    // 初始化私有属性
    self.state = 'pending'
    self.result = undefined
    self.onFulfilledCallbacks = []
    self.onRejectedCallbacks = []

    change = function change(state, result) {
      if (self.state !== 'pending') return
      self.state = state
      self.result = result
      // 通知基于then存储的方法执行
      if (self.onFulfilledCallbacks.length === 0 && self.onRejectedCallbacks === 0) return
      setTimeout(function () {
        var i = 0,
          callbacks = self.state === 'fulfilled' ? self.onFulfilledCallbacks : self.onRejectedCallbacks,
          len = callbacks.length,
          item
        for (; i < len; i++) {
          item = callbacks[i]
          typeof item === 'function' ? item(self.result) : null
        }
      })
    }

    // 立即执行executor
    /* var resolve = function resolve(result) {
            change("fulfilled", result)
        };
        var reject = function reject(reason) {
            change("rejected", reason);
        }
        executor(resolve, reject); */
    // 立即执行executor
    try {
      executor(
        function resolve(result) {
          change('fulfilled', result)
        },
        function reject(reason) {
          change('rejected', reason)
        }
      )
    } catch (err) {
      change('rejected', err)
    }
  }
  // 如果想要设为不可枚举的，可以使用 definedProperty
  Promise.prototype = {
    constructor: Promise,
    // 告诉使用者这是自己重构的customize定制
    customer: true,
    then: function (onfulfilled, onrejected) {
      if (typeof onfulfilled !== 'function') {
        onfulfilled = function onfulfilled(result) {
          return result
        }
      }
      if (typeof onrejected !== 'function') {
        onrejected = function onrejected(reason) {
          throw reason
        }
      }
      var self = this,
        promiseNew,
        x
      promiseNew = new Promise(function (resolve, reject) {
        // resolve->promiseNew:fulfilled
        // reject->promiseNew:rejected
        switch (self.state) {
          case 'fulfilled':
            // queueMicrotask(callback) //创建异步微任务（兼容性不好）
            /* queueMicrotask(function () {
                            onfulfilled(self.result)
                        }) */
            setTimeout(function () {
              try {
                x = onfulfilled(self.result)
                handle(promiseNew, x, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
            break
          case 'rejected':
            setTimeout(function () {
              try {
                x = onrejected(self.result)
                handle(promiseNew, x, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
            break
          default:
            // 把传递进来的函数事先存储起来，以后执行resolve/reject的时候通知这些方法执行
            self.onFulfilledCallbacks.push(function (result) {
              try {
                x = onfulfilled(result)
                handle(promiseNew, x, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
            self.onRejectedCallbacks.push(function (reason) {
              try {
                x = onrejected(reason)
                handle(promiseNew, x, resolve, reject)
              } catch (err) {
                reject(err)
              }
            })
        }
      })
      return promiseNew
    },
    catch: function (onrejected) {
      var self = this
      return self.then(null, onrejected)
    },
    // finally: function () {},
  }
  if (typeof Symbol !== 'undefined') {
    Promise.prototype[Symbol.toStringTag] = 'Promise'
  }

  Promise.resolve = function resolve(value) {
    return new Promise(function (resolve) {
      resolve(value)
    })
  }
  Promise.reject = function reject(value) {
    return new Promise(function (_, reject) {
      reject(value)
    })
  }
  Promise.all = function all(promises) {
    // 对象不能迭代
    // 具有[Symbol.iterator]，可被迭代。数组、set、map、节点结合
    var legal = true
    typeof Symbol !== 'undefined'
      ? typeof promises[Symbol.iterator] !== 'function'
        ? (legal = false)
        : null
      : !isArray(promises)
      ? (legal = false)
      : null
    if (legal === false) throw new TypeError(promises + 'is not iterable')
    return new Promise(function (resolve, reject) {
      var i = 0,
        len = promises.length,
        // 计数器
        index = 0,
        result = []
      for (; i < len; i++) {
        // then是异步，循环早已结束
        ;(function (i) {
          item = promises[i]
          if (!isPromise(item)) item = Promise.resolve(item)
          item.then(function (result) {
            index++
            result[i] = result
            if (index >= len) resolve()
          }, reject)
        })(i)
      }
    })
  }

  // 暴露API
  if (typeof window !== 'undefined') {
    window.Promise = Promise
  }
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Promise
  }
})()

// 测试
var p = new Promise(function (resolve, reject) {
  resolve('ok')
  reject('no')
})
var p1 = p
  .then(
    function (result) {
      console.log('success', result)
    },
    function (reason) {
      console.log('fail', reason)
    }
  )
  .then(
    function (result) {
      console.log('success', result)
    },
    function (reason) {
      console.log('fail', reason)
    }
  )
var query = interval => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interval === 1000) reject(interval)
      resolve(interval)
    }, interval)
  })
}
Promise.all([query(1000), query(2000), query(3000)])
console.log('promise实例', p)
console.log('promise.then', p1)
```

## Iterator

遍历器(Iterator)是一种机制(接口)∶ 为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署 Iterator 接口，就可以完成遍历操作，依次处理该数据结构的所有成员

- 拥有 next 方法用于依次遍历数据结构的成员
- 每一次遍历返回的结果是一个对象 `{done:false,value:xxx}`
  - done：记录是否遍历完成
  - value：当前遍历的结果

拥有 Symbol.iterator 属性的数据结构(值)，被称为可被遍历的，可以基于 for of 循环处理

- 数组
- 部分类数组: arguments/NodeList/HTMLCollection. . .
- String
- Set
- Map

* generator object
* ...

对象不具备 Symbol.iterator，属于不可遍历

### 封装 Iterator

```js
class Iterator {
  constructor(assemble) {
    let self = this
    self.assemble = assemble
    self.index = 0
  }
  next() {
    let self = this
    if (self.index > self.assemble.length - 1) {
      return {
        done: true,
        value: undefined,
      }
    }
    return {
      done: false,
      value: self.assemble[self.index++],
    }
  }
}
let itor = new Iterator([10, 20, 30, 40])
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())

// { done: false, value: 10 }
// { done: false, value: 20 }
// { done: false, value: 30 }
// { done: false, value: 40 }
// { done: true, value: undefined }
```

### for of

for of 循环就是按照迭代器的规范去遍历集合中的每一项

- 每一项迭代都会去找集合中的某个属性：Symbol.iterator（具有这个属性的对象属于可以被迭代的对象，才能使用 for of 循环，没有则不能使用这个循环）
- `arr[Symbol.iterator]()`

> for 循环的本质是可以循环多少次，控制循环次数
>
> for of 循环本质是迭代每一项

```js
Array.prototype[Symbol.iterator] = function () {
  // this->arr当前迭代的集合
  let self = this,
    index = 0
  return {
    next() {
      if (index > self.length - 1) {
        return {
          done: true,
          value: undefined,
        }
      }
      return {
        done: false,
        value: self[index++],
      }
    },
  }
}
Array.prototype[Symbol.iterator] = function () {
  return new Iterator(this)
}

let arr = [10, 20, 30, 40]
for (const item of arr) {
  console.log(item)
}
```

- 是否可以基于 for of 直接遍历对象
  - 不能直接遍历
  - 需要手动设置 Symbol.iterator

```js
let obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
  // [Symbol.iterator]: Array.prototype[Symbol.iterator]
  [Symbol.iterator]: function () {
    return new Iterator(this)
  },
}
for (const item of obj) {
  console.log(item)
}
```

### generator 生成器

生成器对象是由一个 generator function 返回的 x 并且它符合可迭代协议和迭代器协议

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

普通函数 vS 生成器函数

- 生成器函数[[IsGenerator] ] :true

- 把它当做一个实例`__proto__`

  普通函数是 Function 的实例，普通函数`__proto__`]===Function.prototype

  生成器函数是 GeneratorFunction 的实例，生成器函数.`__proto__`===GeneratorFunction.prototype ->
  GeneratorFunction.prototype.`__proto__`===Function.prototype

  ({}).toString.call(生成器函数)=>"[object GeneratorFunction]"

- 把它作为一个构造函数 prototype

  普通构造函数.prototype ->原型对象(constructor：构造函数)
  生成器构造函数.prototype ->原型对象(空对象：可以自己设置内容)
  生成器函数.prototype.`__proto__` === Generator.prototype（next/ return/throw/Symbo1.toStringTag/Symbol/iterator...）

- 生成器函数不能被 new 执行
- 当做普通函数执行，返回的结果就是生成器的一个实例
- itor.`__proto__` ->func.prototype[空对象，没有 constructor]->Generator.prototype[constructor:GeneratorFunction]{next/return/throw/Symbol[Symbol.toStringTag]}->一个具备迭代器规范的对象 Symbol[Symbol.iterator]->Object.prototype

```js
function* func() {
  return 2
}
func.prototype.xxx = 'xxx'
let itor = func()
console.log(itor.next())
console.log(itor.next())
// { value: 2, done: true }
// { value: undefined, done: true }
```

- 不用 new 就可以生成实例

  jQuery 中方法：普通函数执行返回一个 new 出来的实例

  生成器函数

每一次执行 next，遇到 yield 会暂停函数的执行

- yield 下面的代码会形成异步微任务
- 下一次再执行 next 才会执行 yiled 下面的代码

```js
function* func() {
  console.log('A')
  yield 1
  console.log('B')
  yield 2
  console.log('C')
  yield 3
  console.log('D')
  // yield改为return
  return 4
}
let itor = func()
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())

// A
// { value: 1, done: false }
// B
// { value: 2, done: false }
// C
// { value: 3, done: false }
// D
// { value: 4, done: true }
// { value: undefined, done: true }
```

- return 把生成器内部的执行直接停止，让 done 变为 true[throw 直接抛异常，下面代码都不执行了]

```js
function* func() {
  console.log('A')
  yield 1
  console.log('B')
  yield 2
  console.log('C')
  yield 3
  console.log('D')
  yield 4
}
let itor = func()
console.log(itor.next())
console.log(itor.next())
console.log(itor.return())
console.log(itor.next())
console.log(itor.next())

// A
// { value: 1, done: false }
// B
// { value: 2, done: false }
// { value: undefined, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true }
```

- 执行 next 还可以传递值（第一次没必要，其余每次传递的值，都是给上一次 yield 的处理结果）

  生成器函数中的 this 不是其实例，而是 window/undefined

```js
function* func() {
  let x1 = yield 1
  console.log(x1)
  let x2 = yield 2
  console.log(x2)
}
let itor = func()
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
// { value: 1, done: false }
// undefined
// { value: 2, done: false }
// undefined
// { value: undefined, done: true }
```

yield 后面跟生成器函数执行`yield func1();`，相当于 value 是生成器函数的实例，并不会进入生成器函数

- 如果想进入函数，需要加* `yield *func1();`

```js
function* func1() {
  yield 1
  yield 2
}
function* func2() {
  yield 3
  yield func1()
  yield* func1()
  yield 4
}
let itor = func2()
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())

// { value: 3, done: false }
// { value: Object [Generator] {}, done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 4, done: false }
// { value: undefined, done: true }
```

- 使用 Promise 处理 then

```js
var query = interval => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interval === 1000) reject(interval)
      resolve(interval)
    }, interval)
  })
}

query(1000)
  .then(res1 => {
    return query(2000)
  })
  .then(res2 => {
    return query(3000)
  })
  .then(res3 => {
    console.log(res3)
  })
```

- 使用 async+await 处理 then

```js
var query = interval => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interval === 1000) reject(interval)
      resolve(interval)
    }, interval)
  })
}

;(async () => {
  let res1 = await query(1000)
  console.log(res1)

  let res2 = await query(2000)
  console.log(res2)

  let res3 = await query(3000)
  console.log(res3)
})()
```

- 使用 generator 处理 then（回调地狱）

```js
var query = interval => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interval === 1000) reject(interval)
      resolve(interval)
    }, interval)
  })
}

function* gen() {
  let res1 = yield query(1000)
  console.log(res1)

  let res2 = yield query(2000)
  console.log(res2)

  let res3 = yield query(3000)
  console.log(res3)
}
let itor = gen()
itor.next().value.then(res1 => {
  itor.next(res1).value.then(res2 => {
    itor.next(res2).value.then(res3 => {
      itor.next(res3) // 此时{done:true,value:undefined}
    })
  })
})
```

- 封装 AsyncFunction（解决回调地狱）

```js
var query = interval => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (interval === 1000) reject(interval)
      resolve(interval)
    }, interval)
  })
}

var isPromise = function isPromise(x) {
  // return x instanceof Promise;
  if (x == null) return false
  if (/^(object|function)$/.test(typeof x)) {
    if (typeof x.then === 'function') {
      return true
    }
  }
  return false
}

// async await处理的事情：构建generator执行器
function AsyncFunction(generator) {
  let itor = generator()
  const next = x => {
    let { value, done } = itor.next(x)
    if (done) {
      resolve(value)
      return
    }
    if (!isPromise(value)) value = Promise.resolve(value)
    /* value.then(result => {
            next(result);
        }); */
    value.then(next).catch(reason => {
      // 如果返回的实例是失败态，跑出异常信息
      itor.throw(reason)
    })
  }
  next()
}
AsyncFunction(function* gen() {
  let res1 = yield query(1000)
  console.log(res1)

  let res2 = yield query(2000)
  console.log(res2)

  let res3 = yield query(3000)
  console.log(res3)
})
```
