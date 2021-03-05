[toc]

# 51\_笔记

## fetch

- fetch方法执行结果是一个promise实例（不**管当前请求成功与否，promise状态都是成功**的，**仅当网络故障或请求被阻止（CORS），promise状态才会是失败**的）

  `window.navigator.online`，来网络是否在线

  window的Navigator对象里存储了当前发送请求的浏览器类型，如果是移动端还包括手机的型号

- fetch在**默认情况下是不允许携带cookies**

- fetch中想拿到请求主体，必须`return res.json()`，然后在下一个then中就可以拿到响应体了

```js
fetch("./a.json", {
    method: "get", // 请求方式
    body: JSON.stringify(data), //请求主体
    credentials: "include", //设置当前资源凭证是否携带
    // include: 不管是同域还是跨域，都允许携带资源凭证
    // same-origin: 只有同域才允许携带资源凭证
    // omit: 不允许携带资源凭证
    headers: { "user-agent": "Mozilla" }, // 请求头
})
    .then((res) => {
        console.log(res);
        // res中有一个ok属性，它代表当前请求的状态，如果成功就是true
        return res.json();
    	// 返回值是一个promise实例，当返回文件读取完成，当前promise的状态就会变成功态，并且把读取内容传给resolve做实参
    })
    .then((res) => {
        console.log(res);
    });
```

## 跨域

同域：当前页面的url和页面里请求的url里的**协议、域名、端口号都一致**

跨域：当前页面的url和页面里请求的url里的**协议、域名、端口号有一个不一样**



**跨域使用场景**

1. 当前的web服务器和数据服务器没有部署在一起

2. 当你在本地调试的时候，web服务器和数据服务器也是分开的

   测试的时候会在你电脑上启动一个node服务，open with live server（vscode会在你电脑上启动一个web服务 `http://127.0.0.1:5500/index.html`）

   `$.ajax({url: "http://192.168.0.1:8888/list"})`

   这时候后台人员也会在自己电脑上起一个服务

```js
app.use(express.static("./static")); // 静态服务器
```



## JSONP

### 跨域问题

在客户端，有一些请求是同源策略，就是只能在同域才能请求

- 服务端代码

```js
const express = require("express");
const app = express();
app.get("/list", (req, res, next) => {
    let { callback } = req.query; // 获取get请求的参数
    res.send(`${callback}(123)`);
});
app.listen(8888, () => {
    console.log("启动成功");
});
```

- 客户端代码

  在客户端，有一些请求（ajax, fetch）是同源策略，就是只能在同域才能请求

  在客户端，有一些请求是非同源策略，就是可以在不同域发送请，浏览器本身可以往任何地址发送请、link、script、img、audio、video... 都可以往任何地址发送请求（不受源的限制）

```js
$.ajax({
    url: "http://127.0.0.1:8888/list",
    success: res => {
        console.log(res);
    }
})
// Access to XMLHttpRequest at 'http://127.0.0.1:8888/list' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```



### 封装jsonp

jsonp跨域 实现思路：

1. 在全局定义一个全局的函数
2. 在发送script请求的时候携带一个参数 `callback=fn`
3. 后台接受请求之后，会把当前的参数callback的值解构出来，然后给你返回一个字符串 "fn()"，还会把当前响应内容放到 "fn()"括号内部，给客户端返回
4. 客户端拿到 "fn(...)"，浏览器会把当前字符串解析成js代码执行



特点：

1. 只能发生get请求
2. 这种跨域形式需要后台配合
3. 前端用起来不方便

```js
function jsonp(options) {
    return new Promise((resolve, reject) => {
        let {
            url,
            callback,
            params
        } = options;
        // jsonp必要条件：全局函数、script标签
        let script = null;
        window[callback] = function (res) {
            // 当前函数执行说明请求成功
            resolve(res);
            // 当请求完成，script标签和全局函数删掉
            document.body.removeChild(script);
            delete window[callback];
        };
        // 把当前的params里的参数拼接到url后边再把callback拼接
        script = document.createElement("script");
        url += `${
                url.includes("?") ? "&" : "?"
            }callback=${callback}`;
        script.src = url;
        document.body.appendChild(script);
    });
}
jsonp({
    url: "http://127.0.0.1:8888/list",
    callback: "fn",
    params: {
        name: 1,
        age: 2,
    },
}).then((res) => {
    console.log(res);
});
```

## CROS

Access-Control-Allow-Origin 的选项

1. 某一个源：只允许一个源发生跨域请求
2. `*` 允许全部的源发生请求（如果为`*`，就不允许携带资源凭证）
3. 可以设置一个白名单，允许指定个数的 源可以向我发生跨域请求



- 客户端代码

```js
let xhr = new XMLHttpRequest();
xhr.open("get", "http://127.0.0.1:8888/list");
xhr.withCredentials = true;
xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        console.log(xhr.responseText);
    }
};
xhr.send();
```

- 服务端代码

```js
// 白名单，希望谁可以跨域请求
let arr = ["http://127.0.0.1:5500", "http://127.0.0.1:5501"];

app.use((req, res, next) => {
    let origin = req.headers.origin;
    // 检测一下当前发送请求的源是否在白名单中，如果有那就把当前origin设置到Allow-Origin中
    origin = arr.includes(origin) ? origin : "";
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length,Authorization, Accept,X-Requested-With"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,HEAD"
    );
    req.method === "OPTIONS" ? res.send("server is ok") : next();
});
```



CROS前端不需要做配置，后台设置一些响应头即可

- 前端：`xhr.withCredentials = true;`
- 后端：`res.header("Access-Control-Allow-Credentials", true);`



## Proxy

**服务器与服务器之间是不存在跨域**

需要建一个中间服务器（保证web服务器和中间服务器是一个服务器）



- 服务器代码

```js
const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("./"));
app.get("/asimov/subscriptions/recommended_collections", function (req, res) {
    let url = "https://www.jianshu.com" + req.url;
    req.pipe(request(url)).pipe(res);
});

app.listen(8888, () => {
    console.log("启动成功");
});
```

- 客户端代码

```js
$.ajax({
    url: "/asimov/subscriptions/recommended_collections",
    success:res=>{
        console.log(res);
    }
})
```

- 相当于 vue.config.js

```js
{
    proxy:{
        origin: "https://www.jianshu.com"
    }
}
```



## 同步异步

eventLoop和eventQueue

当前页面代码执行之前，浏览器会分配一个线程来执行主栈中的js代码，还会分配一个任务队列（eventQueue）

先执行微任务再去执行宏任务

```js
setTimeout(() => {
    console.log(1);
}, 40);
console.log(2);
for (let i = 0; i < 1000000000; i++) {};
// 这个要持续70ms左右

setTimeout(() => {
    console.log(3);
}, 20);
console.log(4);


console.log(1);
async function fn1() {
    console.log(2);
    await console.log(300);
    console.log(3);
};
fn1();
console.log(66)
```

```js
function fun1() {
    console.log('func1 start');
    return new Promise(resolve => {
        resolve(); // 微1
    });
};

function fun2() {
    console.log('func2 start');
    return new Promise(resolve => {
        setTimeout(() => { // 宏2
            resolve();
        }, 10);
    })
};

console.log(1);
setTimeout(async () => {
    console.log(2);
    await fun1();
    console.log(3);
}, 20); // 宏1
for (let i = 0; i < 100000000; i++) {};
console.log(4);
fun1().then(() => {
    console.log(5);
});
fun2().then(() => {
    console.log(6);
});
setTimeout(() => {
    console.log(7);
}, 0); // 宏3
console.log(8);

console.log(66)
```

