[toc]

# 39\_笔记

## keep-alive

**保持长久链接**。在http请求头中加入`Connection: keep-alive`来告诉对方这个请求响应完成后不要关闭

![keep-alive](https://gitee.com/lilyn/pic/raw/master/js-img/keep-alive.jpg)

## 前端优化汇总

1. 减少HTTP请求次数和传输报文的大小

   CSS SPRITE（雪碧图）

   iconfont（字体图标）或使用SVG矢量图

   - 减少请求次数，或减少请求的质量
   - 渲染时按照代码进行渲染，要更快（位图jpg/png...需要先把图片进行编码再去渲染）
   - 图片不容易失真

2. 懒加载

   - 图片懒加载

     当前的页面加载完，下边的页面用户看不见的地方的数据可以先不加载(节约流量，减轻服务器的压力)

   - 取消音视频的预加载(一个是不加载 `preload = 'none '` ，还有一个就是分段加载)

   - 客户端与服务端的数据传输尽可能拿JSON格式完成，XML格式要比JSON格式大

   - 把页面中的css文件和js文件等进行合并压缩(后期webpack，会帮咱们处理)

   - 做CDN(地域分布式服务器)上、加服务器

   - 图片做base64转码(把图片转化成base64编码，可以减少图片的请求次数，提高页面的渲染速度，但是不利于开发和维护，用webpack可以实现图片的批量base64转化，这个过程也是webpack去做)

3. 代码方面的优化

   - 减少闭包的应用（因为闭包会产生不销毁的作用域，占用内容。如果写出了死递归，会导致堆栈溢出）

   - 避免过多的循环和嵌套的循环

   - 对于动画来说，能用css解决的就不用js

     能用transform就不用别的

     能用requestAnimationFrame，就不用定时器

     - requestAnimationFrame还有一个优势，当前页面处于休眠状态的时候，可以停止动画的运行，当你在结束休眠的时候再开始动画

   - 减少对DOM的操作(用框架)

   - 尽可能使用事件委托

   - 函数的防抖和节流

   - 在项目中尽可能的使用异步，来模拟出多线程的执行机制，避免主线程阻塞

   - 堆栈内存手动释放（赋值为null）

   - 对于数据的请求加载尽可能的分批请求（分页）

   - 尽可能的减少css样式层级（选择器从右往左解析）

动画时间间隔设置为1000/60，可以让动画看起啦更加丝滑，这是因为大多数屏幕渲染的时间间隔是每秒60帧

## ajax

- async JavaScript and xml

  async （异步）可以实现局部刷新，之前的服务器渲染只能全局刷新



- HTML：超文本标记语言

- XML：可扩展的超文本标记语言

  用自定义的标签来存储数据(在早期ajax和服务器交互都是以XML格式的数据为主，因为他能够清晰的展示出对应的数据和结构的层级，但是随着时代的发展，开始流行起了一种新的数据格式JSON，他不仅能够更加清晰的展示数据内容和层级，而且质量更小，所以现在的前后端交互都是以JsON格式的数据为主)



### readyState 

readyState 属性描述了document的加载状态

![xhr.readystatus](https://gitee.com/lilyn/pic/raw/master/js-img/xhr.readystatus.png)

- `readyState：0`，刚刚创建一个ajax
- `readyState：1`，已经打开了一个请求(配置好了请求)
- `readyState：2`，说明：已经把响应头接受完毕了
- `readyState：3`，说明：客户端已经开始接受响应体（如果在状态码是3的时候就获取响应体，可能获取不完全）
- `readyState：4`，说明：客户端已经把响应体接受完毕

```js
// 创建一个ajax
let xhr = new XMLHttpRequest;
// readyState：0，刚刚创建一个ajax
console.log(xhr.readyState);
// params1：请求方式，params2请求路径，params3同异步,默认是true异步
xhr.open("get", "data.json");
// readyState：1，已经打开了一个请求(配置好了请求)
console.log(xhr.readyState);
// 监听当前请求的状态
xhr.onreadystatechange = function () {
    // readyState：2，说明：已经把响应头接受完毕了
    // readyState：3，说明：客户端已经开始接受响应体（如果在状态码是3的时候就获取响应体，可能获取不完全）
    // readyState：4，说明：客户端已经把响应体接受完毕
    console.log(xhr.readyState);
    console.log(xhr);
}
// 发送一个请求
xhr.send();
```

### Ajax 常用的方法和属性

```js
xhr.onreadystatechange; //监听当前请求的步骤改变，只有xhr.send()之后才会继续发生2/3/4步骤改变，执行三次 
xhr.getAllResponseHeaders() // 获取当前的响应头
xhr.getResponseHeader("...") // 获取指定的响应头对应的信息(获取单个)
xhr.setRequestHeader("...", value); // 设置请求头，value会自动转换成字符串（必须要在send执行之前设置请求头）
xhr.responseURL // 当前请求的url
xhr.responseText // 当前请求回来的字符串版的肢体内容
xhr.responseXML // 存储的是请求回来的XML格式数据
xhr.response // 当前请求回来的主体内容
xhr.status // 当前的Http状态码
xhr.statusText // 当前Http状态的描述
xhr.timeout // 请求超时的时间
xhr.ontimeout = function () {} // 当请求超时了，此函数就会执行
xhr.withCredentials = true // 在跨域请求中是否允许携带资源，默认是false


xhr.open() // 打开一个请求（配置一个请求）
xhr.send() // 发送一个请求
xhr.abort() // 终止当前的请求
```



### GET和POST区别

**GET系列**

- GET
- DELETE：一般用于告诉服务器删除某些信息
- HEAD：只获取响应头的内容。响应的主体内容不想要
- OPTIONS：试探性请求，给服务器发送请求，看看服务器能不能接收到，如果接收到能不能正常的返回

**POST系列**

- POST
- PUT 和DELETE是相对应的，告诉服务器要存储某些东西



**GET和POST区别**

1. get传递给服务器的参数要比post少

   因为浏览器对url的长度有限制（IE一般是2kb左右，谷歌浏览器的限制一般是6-7kb）

   - get是在url后问号传参 `xhr.open("get","/json/json?name=1age=2",true)`
   - post是在send()中进行传参，而且只有在send中的数据才叫请求体 `send({name:1,age:2})`

2. GET相对于POST来说不安全

   get是基于问号传参，有一种技术是URL劫持，这样别人就可以拿到你的参数或者篡改你的参数

   post是基于请求体传参，相对来说安全

3. get请求会产生缓存，如果每一次请求地址一模一样，这样它就会走缓存

   如果不想走缓存，只要保证每一次请求的地址都有不一样的地方（一般都是参数）

   ```js
   // 获取时间戳方法1
   let flag = Date.now()
   // 获取时间戳方法2
   // let falg = (new Date).getTime()
   `http://www.baidu.com:8080/index.html?name=9&age=2&flag=${flag}`
   
   // 利用随机数(0-1之间的随机小数)
   let num = Math.random()
   `http://www.baidu.com:8080/index.html?name=9&age=2&num=${num}`
   ```



## 参考

[requestAnimationFrame详解](https://www.jianshu.com/p/fa5512dfb4f5)

