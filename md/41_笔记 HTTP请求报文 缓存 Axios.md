[toc]

# 41\_笔记

## HTTP请求报文

HTTP请求报文由3部分组成（**请求行+请求头+请求体**）：

![HTTP请求报文](https://gitee.com/lilyn/pic/raw/master/js-img/http%E8%AF%B7%E6%B1%82%E6%8A%A5%E6%96%87.png)

**请求行**：

①是 请求方法，GET和POST是最常见的HTTP方法，除此以外还包括DELETE、HEAD、OPTIONS、PUT、TRACE。

②为请求对应的URL地址，它和报文头的Host属性组成完整的请求URL。

③是协议名称及版本号。

**请求头：**

④是HTTP的报文头，报文头包含若干个属性，格式为“属性名:属性值”，服务端据此获取客户端的信息。

与缓存相关的规则信息，均包含在header中

**请求体：**

⑤是报文体，它将一个页面表单中的组件值通过param1=value1&param2=value2的键值对形式编码成一个格式化串，它承载多个请求参数的数据。不但报文体可以传递请求参数，请求URL也可以通过类似于“/chapter15/user.html? param1=value1&param2=value2”的方式传递请求参数。



1. 在 HTTP/1.0 中，一个服务器在发送完一个 HTTP 响应后，会断开 TCP 链接。但是这样每次请求都会重新建立和断开 TCP 连接，代价过大。所以虽然标准中没有设定，某些服务器对 Connection: keep-alive 的 Header 进行了支持
2. 如果维持连接，一个 TCP 连接是可以发送多个 HTTP 请求的
3. HTTP/1.1 存在一个问题，单个 TCP 连接在同一时刻只能处理一个请求，意思是说：两个请求的生命周期不能重叠，任意两个 HTTP 请求从开始到结束的时间在同一个 TCP 连接里不能重叠



请求头中Content-type指定了请求的内容，若类型是 `application/x-www-form-urlencoded`，就可以调用reqeust的获取参数方法取到内容，若是其它都需要调用获取流的方 法获取

## Contnet-Type

**application/x-www-form-urlencoded**

最常见的 POST 提交数据的方式，原生Form表单，如果不设置 enctype属性，默认为`application/x-www-form-urlencoded`方式提交数据

- 首先，Content-Type 被指定为`application/x-www-form-urlencoded`；其次，提交的表单数据会转换为键值对并按照 `key1=val1&key2=val2 `的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持

```http
Content-Type: application/x-www-form-urlencoded;

key1=val1&key2=val2
```

**multipart/form-data**

另一个常见的 POST 数据提交的方式，Form 表单的 enctype 设置为`multipart/form-data`

```http
Content-Type:multipart/form-data;
```

**application/json**

实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是**序列化后的 JSON 字符串**，其中一个好处就是JSON 格式支持比键值对复杂得多的结构化数据

```http
Content-Type: application/json;
```

![Contnet-Type](https://gitee.com/lilyn/pic/raw/master/js-img/content-type.png)

## 缓存

### 强缓存

![cache-control](https://gitee.com/lilyn/pic/raw/master/js-img/cache-control.png)

1. cache-control: max-age=xxxx，public
   客户端和代理服务器都可以缓存该资源；
   客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存,statu code:200 ，如果用户做了刷新操作，就向服务器发起http请求
2. cache-control: max-age=xxxx，private
   只让客户端可以缓存该资源；代理服务器不缓存
   客户端在xxx秒内直接读取缓存,statu code:200
3. cache-control: max-age=xxxx，immutable
   客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存,statu code:200 ，即使用户做了刷新操作，也不向服务器发起http请求
4. cache-control: no-cache
   跳过设置强缓存，但是不妨碍设置协商缓存；一般如果你做了强缓存，只有在强缓存失效了才走协商缓存的，设置了no-cache就不会走强缓存了，每次请求都回询问服务端
5. cache-control: no-store
   不缓存，这个会让客户端、服务器都不缓存，也就没有所谓的强缓存、协商缓存了



### 协商缓存

![cache-control-etag](https://gitee.com/lilyn/pic/raw/master/js-img/cache-control-etag.jpg)

1. etag（HTTP1.1）：每个文件有一个，改动文件了就变了，就是个文件hash，每个文件唯一，就像用webpack打包的时候，每个资源都会有这个东西，如： app.js打包后变为 app.c20abbde.js，加个唯一hash，也是为了解决缓存问题
2. last-modified（HTTP1.0）：文件的修改时间，精确到秒



如果资源没有变（etag、last-modified不变），每次请求都是要进行协商缓存了，会走如下流程：

> 发请求-->看资源是否过期（强缓存）-->过期-->请求服务器-->服务器对比资源是否真的过期（etag、last-modified）-->没过期-->返回304状态码-->客户端用自己或者服务器缓存的老资源

当服务端发现资源真的过期的时候，会走如下流程：

> 发请求-->看资源是否过期-->过期-->请求服务器-->服务器对比资源是否真的过期-->过期-->返回200状态码和最新的资源-->客户端如第一次接收该资源一样，记下它的cache-control中的max-age、etag、last-modified等

 

### 三级缓存

WebKit派生资源包含的类型主要如下：

- Javascript脚本（CachedScript）
- CSS样式文本（CachedCSSStyleSheet）
- 图片（CachedImage）
- 字体（CachedFont）
- XSL样式表（CachedXSLStyleSheet）

WebKit在加载主资源后，主资源会被解码，然后进行解析，生成DOM树。在解析的过程中，如果遇到派生资源的标签，会创建相应的HTMLElement类



**200 from memory cache**

- 不访问服务器，直接读缓存，从内存中读取缓存。此时的数据时缓存到内存中的，当kill进程后，也就是浏览器关闭以后，数据将不存在。但是这种方式只能缓存派生资源

**200 from disk cache**

- 不访问服务器，直接读缓存，从磁盘中读取缓存，当kill进程时，数据还是存在。这种方式也只能缓存派生资源

**304 Not Modified**

- 访问服务器，发现数据没有更新，服务器返回此状态码。然后从缓存中读取数据

1. 先去内存看，如果有，直接加载

2. 如果内存没有，择取硬盘获取，如果有直接加载

3. 如果硬盘也没有，那么就进行网络请求

4. 加载到的资源缓存到硬盘和内存

## Ajax的串行和并行

### Ajax串行

页面有两个ajax请求，我要等到页面一请求完毕再去请求页面二

```js
// ajax的串行
$.ajax({
    url: "./json/1.json",
    success: () => {
        $.ajax({
            url: "./json/2.json",
            success: () => {
                console.log("ajax串行结束");
            },
        });
    },
});
```

```js
// promise串行
function send(url, method = "get") {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            type: method,
            success: (res) => {
                resolve();
            },
        });
    });
}
let res1 = send("./json/1.json", "get");
res1.then((res) => {
    send("./json/2.json", "get");
    console.log("promise串行结束");
}).catch(() => {});
```



### Ajax并行

页面有两个ajax请求，我要等到页面的所有请求，请求完成以后，通知用户当前的页面已经渲染完毕

```js
// ajax的并行
let flag = 0;
$.ajax({
    url: "./json/1.json",
    success: () => {
        flag++;
        notice();
    },
});
$.ajax({
    url: "./json/2.json",
    success: () => {
        flag++;
        notice();
    },
});
function notice() {
    if (flag >= 2) {
        console.log("ajax并行结束");
    }
}
```

```js
// promise并行
function send(url, method = "get") {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            type: method,
            success: (res) => {
                resolve();
            },
        });
    });
}
let res2 = Promise.all([
    send("./json/1.json", "get"),
    send("./json/2.json", "get"),
]);
res2.then(() => {
    console.log("promise并行结束");
}).catch(() => {});

```



## Axios

[http://www.axios-js.com/zh-cn/docs/](http://www.axios-js.com/zh-cn/docs/)

axios是第三方基于promise封装的ajax库（jQuery版本的ajax没有基于promise去封装）

- axios上请求的方法的返回值都是Promise实例

```js
axios.get("./json/1.json").then((res) => {
    // 请求成功之后就会把当前promise的实例置为成功态，然后走then里的回调
    console.log(res);
}).catch((res) => {
    // 请求失败之后就会把当前promise的实例置为失败态，然后走catch里的回调
})
```

### 响应结构

- config：当前请求的配置信息
- data：响应体
- headers：响应头
- request：当前ajax实例
- status：HTTP状态码
- statusText：HTTP状态信息

![axios info](https://gitee.com/lilyn/pic/raw/master/js-img/axios%20info.jpg)

### 请求配置

```js
let obj = {
    // 是用于请求的服务器 URL
    url: '/user',

    // 是创建请求时使用的方法
    method: 'get', // default

    // 基础的url路径
    baseURL: 'https://xxx.com/api',

    // 允许在向服务器发送前，修改请求数据(仅仅是在POST系列请求中有效)
    transformRequest: [function (data, headers) {
        // 如果想处理对象
        // let str = "";
        // for (const key in data) {
        //     str += `${key}=${data[key]}&`
        // }
        // str = str.slice(0, str.length - 1);
        // console.log(str); // name=1&age=2

        // 如果想处理json
        headers.post["Content-Type"] = "application/json";
        let str = JSON.stringify(data);
        console.log(str); // {"name":1,"age":2}
        return str;
    }],
}
```



## 参考

[POST的Content-Type引发的HTTP相关知识思考](https://blog.csdn.net/woaixiaoyu520/article/details/76690686)

[HTTP请求报文（请求行、请求头、请求体）](https://blog.csdn.net/heyue_99/article/details/74689057)

[彻底弄懂强缓存与协商缓存](https://www.jianshu.com/p/9c95db596df5)

[webkit的主资源与派生资源](https://www.cnblogs.com/susan-home/p/9117783.html)

[RFC](https://zh.wikipedia.org/wiki/RFC)