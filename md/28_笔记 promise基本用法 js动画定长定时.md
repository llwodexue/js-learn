[toc]

# 28\_笔记

## 跑马灯

- 原理：list(ul)设置 `absolute` ，控制其 `left` 即可

```js
function move() {
    let curLeft = parseFloat(list.style.left);
    curLeft -= 5;
    if (curLeft <= -900) {
        curLeft = 0;
    }
    list.style.left = curLeft + "px";
}
let timer = setInterval(move, 20);

// 触发的很频繁，可以加个防抖/节流
box.onmouseover = function () {
    clearInterval(timer);
};
box.onmouseout = function () {
    timer = setInterval(move, 20)
}
```

## Promise

> 既想以同步的方式写代码，还想得到按顺序请求的异步操作

- promise 的实例有三个状态：
  - pending（等待态）
  - fulfilled（成功态）
  - rejected（失败态）
- 状态一旦发生变化就会凝固，不会改变



### promise 缺点

1. 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
3. 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）



### 基本用法

- resolve 执行会把当前 promise 变成成功态
- reject 执行会把当前 promise 变成失败态

```js
var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
        // reject()
    }, 2000)
})
```

- then 是同步的，then 中的回调函数执行是异步的

```js
p.then(() => {
    // 当前promise是成功态，此函数会执行
}, () => {
    // 当前promise是失败态，此函数会执行
});
```

- 定时器第三个参数是回调函数的实参（最多只能传三个参数，如果回调函数需要传多个参数，可以传一个数组进行解构）

```js
setTimeout((meg) => {
    console.log(meg);
}, 1000, "hello")
```

### 练习题

```js
console.log(1);
let p1 = new Promise((resolve, reject) => {
    console.log(8);
    setTimeout(() => {
        console.log(7);
        resolve()
    });
    reject();
});
console.log(2);
p1.then(() => {
    console.log(3);
}, () => {
    console.log(4);
});
console.log(5);
// 1 8 2 5 4 7
```

### then

- 当前 then 中的回调函数执行的时候如果没有返回 promise 实例，那么下一个 then 中的成功的回调函数会默认执行
- 当前 then 中的回调函数执行的时候如果返回 promise 实例，那么下一个 then 中的回调函数的执行就由当前这个 promise 实例的状态来管控

Promise 最直接的好处就是链式调用（chaining）

```js
var p = new Promise((resolve, reject) => {
    reject()
})
p.then(() => {
    console.log("第一次成功");
}, () => {
    console.log("第一次失败");
    return new Promise((resolve, reject) => {
        reject()
    })
}).then(() => {
    console.log("第二次成功");
}, () => {
    console.log("第二次失败");
}).then(() => {
    console.log("第三次成功");
}, () => {
    console.log("第三次失败");
});
// 第一次失败 第二次失败 第三次成功
```

## JS动画

- stop：停止所有在指定元素上正在运行的动画

- animate：动画

  第一个参数：一个对象，对象里存放的是当前元素某个样式的目标值

  第二个参数：动画运动的总时间

  第三个参数：动画的模式

```html
<div id="box"></div>
<button id="right">往右</button>
<button id="left">往左</button>
```

### 固定步长

jQuery

```js
let maxLeft = document.documentElement.clientWidth - box.offsetWidth
$("#right").click(function () {
    $("#box").stop(true).animate({
        left: maxLeft
    }, 3000, "linear")
})
$("#left").click(function () {
    $("#box").stop(true).animate({
        left: 0
    }, 3000, "linear")
})
```

原生JS

```js
let timer = null
right.onclick = function () {
    clearInterval(timer)
    timer = setInterval(() => {
        let cLeft = parseFloat(window.getComputedStyle(box)["left"])
        cLeft += 10
        if (cLeft >= maxLeft) {
            clearInterval(timer)
            box.style.left = maxLeft + "px"
            return
        }
        box.style.left = cLeft + "px"
    }, 20)
}

left.onclick = function () {
    clearInterval(timer)
    timer = setInterval(() => {
        let cLeft = parseFloat(window.getComputedStyle(box)["left"])
        cLeft -= 10
        if (cLeft <= 0) {
            clearInterval(timer)
            box.style.left = 0 + "px"
            return
        }
        box.style.left = cLeft + "px"
    }, 20)
}
```

### 固定时间

原生JS

```js
let duration = 3000
let time = 0
let timer = null
let begin = parseFloat(getComputedStyle(box).left)
let maxLeft = document.documentElement.clientWidth - box.offsetWidth
right.onclick = function () {
    clearInterval(timer)
    timer = setInterval(() => {
        time += 20
        if (time >= duration) {
            clearInterval(timer)
            box.style.left = maxLeft + "px"
            return
        }
        let left = (maxLeft - begin) / duration * time + begin
        box.style.left = left + "px"
    }, 20);
}
```

### 封装：实现元素多方向变化

```js
function animate(ele, target, duration, callBack) {
    let eTarget = {}
    let suffix = {}
    let cTarget = {}
    for (const key in target) {
        let eKey = window.getComputedStyle(ele)[key]
        eTarget[key] = parseFloat(eKey)
        suffix[key] = eKey.match(/[^0-9.]+/g)[0]
        cTarget[key] = target[key] - eTarget[key]
    }
    let timer = null
    let time = 0
    return function () {
        clearInterval(timer)
        timer = setInterval(() => {
            time += 20
            if (time >= duration) {
                clearInterval(timer)
                for (let key in target) {
                    ele.style[key] = target[key] + suffix[key]
                }
                if (typeof callBack == "function") {
                    callBack()
                }
                return
            }
            for (const key in target) {
                ele.style[key] = time / duration * cTarget[key] + eTarget[key] + suffix[key];
            }
        }, 20)
    }
}
```

### 动画优化

`window.cancelAnimationFrame()` JS中比定时器动画更好的方式（HTML5提供）

```js
function animate(ele, target, duration, callBack) {
    let eTarget = {}
    let suffix = {}
    let cTarget = {}
    for (const key in target) {
        let eKey = window.getComputedStyle(ele)[key]
        eTarget[key] = parseFloat(eKey)
        suffix[key] = eKey.match(/[^\d.-+]+/g))[0]
        cTarget[key] = target[key] - eTarget[key]
    }
    let time = 0
    return function render() {
        time += 20
        window.cancelAnimationFrame(render)
        if (time >= duration) {
            for (let key in target) {
                ele.style[key] = target[key] + suffix[key]
            }
            if (typeof callBack == "function") {
                callBack()
            }
            return
        }
        for (const key in target) {
            ele.style[key] = time / duration * cTarget[key] + eTarget[key] + suffix[key];
        }
        window.requestAnimationFrame(render)
    }
}
```

