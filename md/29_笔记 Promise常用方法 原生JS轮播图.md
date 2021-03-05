[toc]

# 29\_笔记

## Promise



JS是单线程的：大部分代码都是同步的，但是也有少部分代码是异步编程的

**异步宏任务**

- 定时器
- ajax：一般都是异步的（单独开一个线程，http宏任务）
- 事件绑定（DOM事件监听线程）



**异步微任务**

- promise
- async await
- generator
- window.requestAnimationFrame
- ...



### Promise.prototype.catch()

- 如果异步操作抛出错误，状态就会变为 `rejected`，就会调用 `catch()` 方法指定的回调函数，处理这个错误

```js
let p = new Promise((resolve, reject) => {
    // 全局未声明a
    console.log(a);
})
p.then(() => {
    console.log("成功");
}, () => {
    console.log("失败");
    return new Promise((res, rej) => {
        rej("error")
    })
// 这里没有处理失败态，如果处理 catch 捕获不到
}).then(() => {}).catch((res) => {
    console.log(res);
})
// 失败 error
```

### Promise.prototype.finally()

- 不管 Promise 对象最后状态如何，都会指向该操作

```js
let p = new Promise((resolve, reject) => {
    // 全局未声明a
    console.log(a);
})
p.catch(() => {
        console.log("error");
    })
    .finally(() => {
        console.log("最后");
    });
// error 最后
```

### Promise.all()

- p1、p2、p3都是 Promise 实例，如果不是，会先调用 `Promise.resolve()` 方法，将参数转换为 Promise 实例，再进一步处理
- `Promise.all()` 方法参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例

```js
let p = Promise.all([p1, p2, p3]);
```

- 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数
- 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

```js
let p1 = 1,
    p2 = 3,
    p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5);
        }, 500)
    })

let p = Promise.all([p1, p2, p3]);
p.then((res) => {
    console.log(res, "全部成功");
}).catch(() => {
    console.log("有失败的");
})
// [ 1, 3, 5 ] 全部成功

// 如果把resolve(5)->reject(5)
// 有失败的
```

### Promise.race()

- `Promise.race()`方法的参数与`Promise.all()`方法一样，如果不是 Promise 实例，会先调用 `Promise.resolve()` 方法，将参数转换为 Promise 实例，再进一步处理

```js
let p = Promise.race([p1, p2, p3]);
```

- 只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数

```js
let p1 = new Promise((resolve, reject) => {
    resolve(1);
})
let p2 = new Promise((resolve, reject) => {
    resolve(3);
})
let p3 = new Promise((resolve, reject) => {
    reject(5);
})
let p = Promise.race([p1, p2, p3]);
p.then((res) => {
    console.log(res, "success");
}).catch(() => {
    console.log("fail");
})
// 1 success

// 如果把resolve(1)->reject(1)
// fail
```

### Promise.resolve() Promise.reject()

- 将现有对象转为 Promise 对象

```js
// 返回值就是一个成功的promise实例
let pr1 = Promise.resolve(100);
let pr2 = new Promise((resolve, reject) => {
    resolve(100);
})
```

```js
// 返回值就是一个失败的promise实例
let pr3 = Promise.reject(200);
let pr4 = new Promise((resolve, reject) => {
    reject(200);
})
```

## 原生JS实现小米轮播图

![轮播图切换](https://img-blog.csdnimg.cn/20201219104627257.gif)

### 实现效果

- 多张图片自动轮播展示，对应分页器（小圆点）高亮显示
- 点击分页器（小圆点）切换对应图片
- 点击前进/后退按钮切换当前图片的前一张/后一张图片
- 图片无缝切换，第一张图片和最后一张图片无缝切换
- 鼠标滑入停止图片切换，鼠标移出开始图片切换
- 前进后退按钮防抖

### index.html（html+css）

- 创建 `index.html` 文件，粘贴如下代码

```html
<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>轮播图</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        ul {
            list-style: none;
        }
        a {
            text-decoration: none;
        }
        #banner {
            width: 1226px;
            height: 460px;
            margin: 100px auto;
            overflow: hidden;
            position: relative;
            cursor: pointer;
        }
        #wrapper {
            display: flex;
            position: absolute;
            left: 0;
        }
        #wrapper li {
            width: 1226px;
            height: 460px;
        }
        #wrapper li img {
            display: block;
            width: 100%;
            height: 100%;
        }
        #list {
            position: absolute;
            left: 50%;
            display: flex;
            align-items: center;
            transform: translate(-50%, -50%);
            bottom: 10px;
        }
        #list li {
            width: 10px;
            height: 10px;
            background: rgba(0, 0, 0, 0.4);
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            margin: 0 5px;
        }
        #list li.active {
            background: rgba(255, 255, 255, 0.3);
        }
        #left, #right {
            background: url("https://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat;
            width: 41px;
            height: 69px;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
        }
        #left {
            left: 0;
            background-position: -84px 0;
        }
        #right {
            right: 0;
            background-position: -125px 0;
        }
        #left:hover {
            background-position: 0 0;
        }
        #right:hover {
            background-position: -42px 0;
        }
    </style>
</head>

<body>
    <div id="banner">
        <!-- 图片 -->
        <ul id="wrapper">
            <li><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ebff5f5c1f52f2dbdd611897adbefd4.jpg?thumb=1&w=1226&h=460&f=webp&q=90" alt=""></li>
        </ul>
        <!-- 分页器（小圆点） -->
        <ul id="list">
            <li class="active"></li>
        </ul>
        <!-- 前进按钮 -->
        <a href="javascript:;" id="left"></a>
        <!-- 后退按钮 -->
        <a href="javascript:;" id="right"></a>
    </div>
    <script src="index.js"></script>
</body>

</html>
```

不加 JS，静态界面应该是下图这样的

- 如果图片没有请求到，可以换一个图片链接

![轮播图-mi-静态界面](https://gitee.com/lilyn/pic/raw/master/js-img/%E8%BD%AE%E6%92%AD%E5%9B%BE-mi-%E9%9D%99%E6%80%81%E7%95%8C%E9%9D%A2.jpg)

### banner.json

- 这里需要用 Ajax 请求一下如下 json 数据
- 创建 `banner.json` ，粘贴如下数据

```json
[
    {
        "id": 1,
        "img": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ebff5f5c1f52f2dbdd611897adbefd4.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
        "desc": "banner1"
    },
    {
        "id": 2,
        "img": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ef4160c861b998239bce9adb82341e7.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
        "desc": "banner2"
    },
    {
        "id": 3,
        "img": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0e4acf11840c1d9600c34c46ffa73ec8.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
        "desc": "banner3"
    },
    {
        "id": 4,
        "img": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d65e7bc110ca74b9d7fa7ce53a841971.jpg?w=2452&h=920",
        "desc": "banner4"
    }
]
```

### index.js （原生jS ）

- 原理：图片平铺在一行，然后利用定时器计算偏移量实现定时轮播
- **注意：**需要使用 live-server 启动

```js
// 获取页面元素
let banner = document.getElementById("banner");
let wrapper = document.getElementById("wrapper");
let list = document.getElementById("list");
let lis = list.getElementsByTagName("li");
// Ajax 请求数据
let data = null;
// 接收定时器的返回值
let timer = null;
// 当前展示图片的索引
let step = 0;

// 0.切换动画效果（简单实现jQuery animate切换效果）
function animate(ele, target, duration) {
    let begin = {}
    let change = {}
    for (const key in target) {
        begin[key] = parseFloat(window.getComputedStyle(ele)[key])
        change[key] = target[key] - begin[key]
    }
    let time = 0
    let timers = setInterval(() => {
        time += 20
        for (const key in target) {
            ele.style[key] = time / duration * change[key] + begin[key] + "px";
        }
        if (time >= duration) {
            clearInterval(timers);
        }
    }, 20)
}

// 1.数据请求 Ajax四部曲
function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            renderHtml(data);
        }
    };
    xhr.send();
}
getData("./banner.json");

// 2.渲染图片
function renderHtml(data) {
    let imgs = "";
    let lis = "";
    data.forEach((item, index) => {
        imgs += `<li><img src="${item.img}" alt=""></li>`;
        lis += "<li></li>";
    });
    // 要实现无缝滚动，需要克隆第一张图片，放到最后一张的后面
    imgs += `<li><img src="${data[0].img}" alt=""></li>`;
    wrapper.innerHTML = imgs;
    list.innerHTML = lis;
}

// 3.实现自动轮播，每隔2000ms执行一次
function autoMove(index) {
    // 图片索引自增（切换下一张图片）
    step++;
    // 如果当前函数执行时没有传形参index，那就什么都不做，如果形参index有值，就把index赋值给step即可
    typeof index == "undefined" ? null : step = index;
    // 如果当前的step>=5说明已经运动到最后一张图片了，这时候需要马上把wrapper的left值改为0
    if (step >= data.length + 1) {
        wrapper.style.left = 0;
        // 这时step改为1，可以正常显示第二张
        step = 1;
    }
    animate(wrapper, {
        left: -1226 * step
    }, 500);
    changeFocus();
}
timer = setInterval(autoMove, 2000);

// 4.鼠标划上图片停止轮播 鼠标离开继续轮播
banner.onmouseover = function () {
    clearInterval(timer);
}
banner.onmouseout = function () {
    clearInterval(timer);
    timer = setInterval(autoMove, 2000);
}

// 5.实现焦点跟随，显示哪一张图片，就给对应的焦点li加上类名active
function changeFocus() {
    // 循环所有的焦点，判断一下当前的step和哪个焦点的索引相等，和谁相等就给谁加上active类名，其余的清除active类名
    for (let i = 0; i < lis.length; i++) {
        if (i == step) {
            lis[i].classList.add("active");
        } else {
            lis[i].classList.remove("active");
        }
    }
    // 如果当前的step是data.length，说明当前页面显示的是最后一张图片，它和第一张图公用一个焦点，这时让第一个焦点高亮即可
    if (step == data.length) {
        lis[0].classList.add("active");
    }
}
changeFocus();

// 6.点击分页器（小圆点），实现切换对应图片
function bindClick() {
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            autoMove(i);
        }
    }
}
bindClick();

// 7.控制前进/后退按钮
right.onclick = debounce(autoMove, 300);
function lClick() {
    if (step == 0) {
        step = data.length;
        wrapper.style.left = (data.length) * -1226 + "px";
    }
    step--;
    autoMove(step)
}
left.onclick = debounce(lClick, 300)

// 8.防抖
function debounce(fn, wait) {
    let timers = null;
    let result = null;
    return function (...args) {
        if (timers) clearTimeout(timers);
        timers = setTimeout(() => {
            result = fn.apply(this, ...args);
        }, wait)
        return result;
    }
}
```

### jQuery版本

- 只需替换JS部分即可

```html
<script src="https://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
<script>
    let timer = null;
    let url = "./banner.json";
    let step = 0;
    let lens = 0;
    // 1.数据请求
    $.ajax({
        url: url,
        async: false,
        success: (res) => {
            bindHtml(res);
            lens = res.length;
            timer = setInterval(autoMove, 2000);
        }
    })
    // 2.渲染图片
    function bindHtml(data) {
        let imgs = "";
        let lis = "";
        $.each(data, (index, item) => {
            imgs += `<li><img src="${item.img}" alt=""></li>`;
            lis += "<li></li>";
        });
        imgs += `<li><img src="${data[0].img}" alt=""></li>`;
        $("#wrapper").html(imgs);
        $("#list").html(lis);
    }
    // 3.实现自动轮播，每隔1000ms执行一次
    function autoMove(index) {
        step++;
        typeof index == "undefined" ? null : step = index;
        if (step >= 5) {
            step = 1;
            $("#wrapper").animate({
                left: "0px"
            }, 0)
        }
        $("#wrapper").animate({
            left: -$("#outer").width() * step + "px",
        }, 1000)
        changeFocus();
    }
    // 4.鼠标划上图片停止轮播 鼠标离开继续轮播
    $("#outer").hover(() => {
        clearInterval(timer);
    }, () => {
        timer = setInterval(autoMove, 2000);
    })
    // 5.实现焦点跟随，显示哪一张图片，就给对应的焦点li加上类名active
    function changeFocus() {
        $("#list li").eq(step).addClass("active").siblings().removeClass("active");
        if (step == lens) {
            $("#list li").eq(0).addClass("active").siblings().removeClass("active");
        }
    }
    changeFocus();
    // 6.点击焦点，实现切换对应图片
    function bindClick() {
        $("#list li").click(function () {
            autoMove($(this).index());
        })
    }
    bindClick();
    // 7.控制箭头
    $("#right").click(function () {
        autoMove();
    })
    $("#left").click(function () {
        if (step == 0) {
            step = lens;
            $("#wrapper").animate({
                left: lens * -800 + "px"
            }, 0)
        }
        step--;
        autoMove(step);
    })
</script>
```

