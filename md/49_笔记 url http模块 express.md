[toc]

# 49\_笔记

## Url

```js
let url = require("url");
// url.parse() 传递的第二个参数是true，它可以把query里的参数转换成对象
let res = url.parse(
    "http://www.baidu.com:8080/user/list/?name=1&age=2#index",
    true
);
console.log(res);
/*
Url {
    protocol: 'http:', // 协议
    slashes: true, // 协议后边的斜杠
    auth: null,
    host: 'www.baidu.com:8080', // 域名+端口号
    port: '8080', // 端口号
    hostname: 'www.baidu.com', // 域名
    hash: '#index', // 哈希值
    search: ?name=1&age=2, // 问号传参部分
    query: [Object: null prototype] { name: '1', age: '2' }, // 传参部分
    pathname: '/user/list/', // 资源路径
    path: '/user/list/?name=1&age=2', // 资源路径+参数
    href: 'http://www.baidu.com:8080/user/list/?name=1&age=2#index'
}
*/
```



## http/https

服务端做的事：

1. 后端代码（上传到服务器）
2. 启动一个服务（IIS，Apache，Nginx，Node）
3. 接受客户端的请求
4. 处理请求
5. 响应给客户端内容

```js
let http = require("http");
let url = require("url");
let fs = require("./promiseFs");
let mime = require("mime");

let server = http.createServer((req, res) => {
    // console.log(req.url); // 客户端发送的资源路径和参数
    // write就是响应体的内容，write可以执行多次
    // res.write("1");
    let { pathname, query } = url.parse(req.url, true);
    let suffixReg = /\.([a-zA-Z0-9]+)$/;
    let suffix = suffixReg.exec(pathname) && suffixReg.exec(pathname)[1];
    // 客户端的请求：1.数据请求（数据服务器） 2.静态文件请求（web服务器）
    let encoding = "charset=utf8";
    // 如果当前客户端请求的资源是富媒体资源，那就不需要utf8格式转码
    /^(jpg|jpeg|png|gif|mp3|mp4)$/i.test(suffix) ? (encoding = "") : null;
    // 如果当前的suffix的值为null，说明这次发送的是数据请求
    if (suffix) {
        suffix = mime.getType(suffix);
        fs.readFile(`./static/${pathname}`)
            .then((result) => {
                // 不传第一个参数 Invalid status code: { 'content-type': 'text/html' }
                res.writeHead(200, {
                    // 服务端返回的content-type类型叫mime类型
                    "content-type": `${suffix};${encoding}`,
                });
                // 服务端给客户端返回的数据一般都是字符串或者buffer流
                res.end(result);
            })
            .catch((err) => {
                res.writeHead(404, {
                    "content-type": `application/json`,
                });
                res.end(JSON.stringify(err));
            });
    }
});

// 端口号 0-65535
server.listen(8888, () => {});
// 当前同一个端口的服务同时只能启动一次，如果启动了两次就会报错
// Error: listen EADDRINUSE: address already in use :::8888
```



### mime

> npm install mime

- 第三方模块，它可以通过文件名的后缀名获取到对应的mime格式内容

```js
const mime = require("mime");
// 通过后缀名找到指定的mime类型
console.log(mime.getType("js")); // application/javascript
// 通过指定mime类型返回指定的后缀名
console.log(mime.getExtension("application/javascript")); // js
```



### express qs

- 第三方模块，它让node写起来更加方便

> npm install express 
>
> npm install qs

```js
const express = require("express");
const qs = require("qs");

const app = express(); // 相当于http.createServer() 中间件

// 当前的静态资源的请求就会自动的往对应的static里去查找
app.use(express.static("./static"));

// app.use此方法就是使用中间件，中间件里边传递的函数会在创建完服务之后，处理请求之前执行
app.use((req, res, next) => {
    // ...
    next(); // next控制的是请求继续往下执行，如果不写next()的话，那代码走到这就不会往下走了
});

// get请求
app.get("...", (req, res) => {})
// post请求
app.post("...", (req, res) => {})

// 错误的请求
app.use((req, res, next) => {
    res.status(404);
    // res.type('application/json')
    res.send("not fount");
});

// 和原生listen一样
app.listen(8888, () => {
    console.log("启动成功");
});
```

`app.use((req, res, next)`

**request 身上的属性和方法**

- req.path：存储请求地址的路径名称（请求的路径）
- req.query：存储问号传参的相关信息（对象）
- req.body：在配合body-parser中间件的情况下，req.body存储的是请求主体传递过来的信息
- req.method：请求方式
- req.get：获取请求头信息

```js
// 当get请求发送过来之后，如果他携带的参数lx是dev的话我就给你返回data.json中的dev属性值，如果lx的值是pro的话，我就给你返回data.json中的pro的属性值
app.get("/list", (req, res) => {
    // http://127.0.0.1:8888/list?lx=pro&name=1&age=2
    let { lx = "pro" } = req.query;
    fs.readFile("./data.json").then((result) => {
        result = JSON.parse(result); // 把当前读取的数据转换成对象
        let data = result[lx];
        res.status(200);
        res.send(data);
    });
});
```

**response身上的属性和方法**

- res.end：类似原生end的方法，结束当前的响应
- res.send：最常用的给客户端返回信息（可以传递对象/path/buffer/txt等），基于send是通过响应主体返回给客户信息
- res.json：返回给客户端内容，只不过传递的数据可以是JSON对象
- res.type：返回content-type的类型值
- res.set：设置响应头 `res.set("content-type": "text/html") <==> res.type = "text/html"`（可以传递一个对象）
- res.status：返回状态码

```js
app.use((req, res, next) => {
	// http://127.0.0.1:8888/add
    // x-wwww-form-urlencoded name:1 age:2
    let data = ``;
    req.on("data", (result) => {
        data += result;
    });
    req.on("end", () => {
        data = qs.parse(data);
        req.body = data;
        fs.writeFile("./da.json", data)
            .then((result) => {
                res.status(200);
                res.send({
                    code: 0,
                    codeText: "OK",
                });
            })
            .catch(() => {
                res.status(200);
                res.send({
                    code: 1,
                    codeText: "NO",
                });
            });
        
        next();
    });
})

app.post("/add", (req, res) => {
    console.log(req.body)
});
```

### body-parser

> npm install body-parser

```js
app.use((req, res, next) => {
    let data = "";
    req.on("data", (result) => {
        data += result;
    });
    req.on("end", () => {
        console.log(data);
        data = qs.parse(data);
        req.body = data;
        next();
    });
});

// bodyParser这个里功能逻辑和上方代码一致
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
```

