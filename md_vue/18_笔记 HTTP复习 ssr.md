[toc]



# 18_笔记


## HTTP


### 状态码


+  消息  
100 continue 
+  成功  
200 OK  
201 Created 
+  重定向（进一步操作）  
301 Moved Permanently 永久重定向  
302 Move Temporarily 临时重定向  
304 Not Modified 没有修改 
+  客户端请求错误  
400 Bad Request  
403 Forbidden  
404 Not Found 网址错误  
405 Method Not Allowed get/post请求错误  
414 请求过长 
+  服务器错误  
500 Internal Server Error  
502 Bad Gateway 



### 缓存


+ eTag：MD5
+ expire：日期
+ cache-control：max-age=600



expire 和 cache-control区别：



+  expire 是在某个事件点过期  
Bug **本地时间**会被修改 
+  cache-control 是在经过一段时间后过期 



eTag 和 cache-control 区别：



+ eTag **有请求** 有缓存 http status code 是304
+ cache-control **无请求** 是从浏览器文件缓存读缓存



### get post 区别


1.  安全性  
post 安全get 不安全 
2.  长度限制  
get url有长度限制（1024个字节） post 没有 
3.  get 参数是放在url post 是放在消息体里 
4.  get 只需要一个报文 post 需要两个以上 
5.  get 幂等 post 不幂等 
6.  语义  
get 是获取数据 post 提交数据 



### cookie LocalStorage SessionStorage Session


Cookie：服务器发给浏览器的一段字符串



Session：会话，服务器与浏览器一段时间的会话



+ Cookie V.S. LocalStorage 
    1. 主要区别是 Cookie 会被发送到服务器，而 LocalStorage 不会
    2. Cookie 一般最大 4k，LocalStorage 可以用 5Mb 甚至 10Mb（各浏览器不同）
+ LocalStorage V.S. SessionStorage 
    1. LocalStorage 一般不会自动过期（除非用户手动清除），而 SessionStorage 在会话结束时过期（如关闭浏览器）
+ Cookie V.S. Session 
    1. Cookie 存在浏览器的文件里，Session 存在服务器的文件里
    2. Session 是基于 Cookie 实现的，具体做法就是把 SessionID 存在 Cookie 里



## 输入URL到看到页面，中间经历环节


### 第一步：URL解析


<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/js-img/URL%E8%A7%A3%E6%9E%90.jpg)



URI：统一资源标识符



+ URL：统一资源定位符
+ URN：统一资源名称



传输协议：用什么样的协议负责客户端和服务端的信息传输



+ HTTP：最常用的 超文本传输协议
+ HTTPS：HTTP+SSL（TLS）比HTTP更加安全
+ FTP：文件的上传下载



域名：对服务器外网IP的一个重命名



+ 顶级域名/一级域名/二级域名



端口号：区分同一台服务器上不同的服务的



+  0~65535 
+  默认端口号：浏览器会根据输入的协议，给与默认端口号  
HTTP -> 80  
HTTPS -> 443  
FTP -> 21 
+  动态网址，页面中的内容是无法被搜索引擎收录的（不利于SEO优化）  
动态网址，静态化机制 `https://item.jd.com/....`，通过URL重写 `https://item.jd.com/detail.jsp?id=...`  
前后端开发不分离，页面基于服务器渲染，并且想做SEO优化 



前后端分离



+  不分离的时候 `http://www.xxx.com/index.jsp` 后缀 jsp/php/aspx  
优点：源代码中是可以看到动态绑定的数据 
    -  有利于SEO优化 
    -  搜索引擎能够抓取和收录这些信息 
    -  如果服务器处理的性能比较快，则页面渲染也很快  
SSR服务器渲染 -> 服务器骨架屏 

缺点：服务器压力过大，团队协作困难，不能局部刷新（全局刷新） 

+  Web服务器（资源文件的请求处理） 数据服务器（业务逻辑和数据处理）  可能产生跨域  
优点： 
    - 团队配合容易很多
    - 服务器压力减小
    - 可以实现局部刷新

缺点： 

    - 基于JS（Vue/React）渲染的数据，在源代码中是看不到的，这样不利于SEO优化



请求资源的文件路径



+ URL重写



问号传参



+ 客户端把信息传递给服务器
+ A页面把信息传递给B页面
+ A组件把信息传递给B组件



Hash值



+ 锚点定位
+ HASH路由



编码问题：处理：中文、特殊符号....



+ encodeURI / decodeURI 对整个URL编码，处理中文
+ encodeURIComponent / decodeURIComponent 对传递的参数单独编码，处理中文以及特殊符号
+ escape / unescape 客户端对中文进行编码解码，例如：cookie
+ 也可以基于自己设定的加密机制规则处理（对称加密）
+ 对于某些数据，需要采用不可逆的哈希/摘要算法，例如：md5



### 第二步：缓存检查


缓存一般指的都是静态资源文件的缓存，这个一般是客户端和服务器根据一些协商规则，自动去完成缓存策略（不用我们自己编写代码去处理）



只有API接口数据缓存，是需要前端自己去完成的



**缓存位置：**



+ Memory Cache : 内存缓存（一般用于，页面没有关闭，只是刷新）
+ Disk Cache：硬盘缓存（页面关闭后重新打开）



打开网页：查找 disk cache 中是否有匹配，如有则使用，如没有则发送网络请求



普通刷新（F5）：因TAB没关闭，因此 memory cache 是可用的，会被优先使用，其次才是 disk cache



强制刷新（Ctrl + F5）：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control: no-cache，服务器直接返回 200 和最新内容



缓存处理：



**强缓存**



+ 如果获取的是强缓存信息，HTTP状态码也是200
+ 如果是从服务器成功重新获取，HTTP状态码也是200



强缓存不适合于静态页面的缓存？



+ 如果页面都缓存了，以后服务器更新了产品，我们访问也是走的缓存数据，这样就看不到更新的内容了（强缓存模式下，其他资源信息的缓存和部署以及更新）
+ 项目资源更新，每一次部署的时候，在html中 
    - 所有请求的资源文件（css / js / 图片）后面都带一个时间戳
    - 每一次资源的更新，基于webpack生成不同的资源名称（HASH戳）



强缓存 Expires [HTTP1.0] / Cache-Control [HTTP1.1]



浏览器对于强缓存的处理：根据第一次请求资源时返回的响应头来确定的



+ Expires：缓存过期时间，用来指定资源到期的时间（HTTP/1.0）
+ Cache-Control：cache-control: max-age=2592000第一次拿到资源后的2592000秒内（30天），再次发送请求，读取缓存中的信息（HTTP/1.1）
+ 两者同时存在的话，Cache-Control优先级高于Expires



**协商缓存**



+ 检测缓存 -> 先看是否存在强缓存（强缓存存在走强缓存） -> 强缓存不存在，再看是否有协商缓存（协商缓存，还是走缓存） -> 协商也不存在，则直接从服务器获取最新内容 -> 缓存起来...
+ 静态页面可以使用协商缓存处理
+ 对于其余的资源文件，使用 强缓存+协商缓存



协商缓存 Last-Modified / ETag



协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程



**数据缓存**



本地存储 cookie / localStorage / sessionStorage



+ cookie：存储内容很少4KB，cookie信息自己会默认在客户端和服务端传来传去（内容信息多会影响前后端通信的速度）、不稳定（基于安全卫士等可以把其清除掉）、用户可以禁用cookie...
+ localStorage：存储5MB、持久保存、稳定、和服务器也没有关系
+ sessionStorage：页面关闭则消失
+ vuex+redux：类似全局变量，页面刷新就没有了



想要基于ajax获取数据，必须要保证当前页面的运行是在 http/https协议下，file文件协议不行



```javascript
function getData() {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', './data.json')
    xhr.onreadystatechange = () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        resolve(JSON.parse(xhr.responseText))
      }
    }
    xhr.send()
  })
}
;(async function () {
  let cache_data = localStorage.getItem('cache-data')
  if (cache_data) {
    cache_data = JSON.parse(cache_data)
    if (+new Date() - cache_data.time <= 10000) {
      return
    }
  }
  let result = await getData()
  localStorage.setItem(
    'cache-data',
    JSON.stringify({
      time: +new Date(),
      data: result,
    })
  )
})()
```



### 第三步：DNS解析


+ 递归查询
+ 迭代查询



## 其它知识


### SSR


（server side renderer）服务器端渲染



优点：



1. 提高首页加载速度（因为模板渲染的动作由后端完成，前端直接能拿到后端替换好的html页面）
2. 利于SEO优化



应用场景：只有访问频率比较高的页面才有必要进行优化，其他页面可以用传统方式开发



[vue-ssr服务端渲染简单例子](https://www.jianshu.com/p/17bc00fc6993)



```javascript
npm install vue vue-server-renderer --save
npm install express --save
```



后端渲染的框架：Nuxt.js



`index.html`



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
        {{{meta}}}
</head>
<body>
    <!--vue-ssr-outlet-->
</body>
</html>
```



`index.js`



```javascript
const Vue = require("vue");
const express = require("express");
const fs = require("fs");

const server = express();

// 读取模版
const renderer = require("vue-server-renderer").createRenderer({
  template: fs.readFileSync("./index.html", "utf-8"),
});

// 此参数是vue 生成Dom之外位置的数据  如vue生成的dom一般位于body中的某个元素容器中，
//此数据可在header标签等位置渲染，是renderer.renderToString()的第二个参数，
//第一个参数是vue实例，第三个参数是一个回调函数。
const context = {
  title: "Vue-ssr",
  meta: ` <meta name="viewport" content="width=device-width, initial-scale=1" /> `,
};

server.get("*", (req, res) => {
  // 和 index.html中 <!-- vue-ssr-outlet --> 对应
  const app = new Vue({
    data: {
      url: req.url,
      data: ["dog", "bird"],
      title: "Vue-ssr服务器渲染",
    },
    // template中的文本最外层一定要有容器包裹，和vue的组件是一样的
    template: `
      <div>
          <div>url : {{url}}</div>
          <p>{{title}}</p>
          <p v-for='item in data'>{{item}}</p>
      </div>
    `,
  });
  // 将Vue实例渲染为字符串
  // 1.vue实例对象
  // 2.给模板传入的数据
  // 3.渲染结束的回调，可以拿到最终渲染的html字符
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end("err:" + err);
      return;
    }
    //将模版发送给浏览器
    res.end(html);
  });
});

server.listen(9999, () => {
  console.log("server running http://127.0.0.1:9999");
});
```



### Vue国际化


```bash
npm install vue-i18n
```



+ 引入组件



```javascript
import vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
```



+ 注册组件



```javascript
const i18n = new VueI18n({
  locale: "zh",
  messages: {
    en: {
      loginText: "login",
      change: "change",
    },
    zh: {
      loginText: "登录",
      change: "切换",
    },
  },
});

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount("#app");
```



+ 使用



```html
<button>{{ $t("loginText")}} </button>
```



+ 切换语言



```javascript
export default {
  methods: {
    handleChange() {
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "zh";
      } else {
        this.$i18n.locale = "en";
      }
    },
  },
};
```



### 跨域


**1.jsonp**



原理：动态生成script标签，通过src属性加载



缺点：不支持POST



应用场景：有些第三方数据接口可能使用jsonp解决跨域问题



**2.中间服务器代理**



前端部署地址：`127.0.0.1:8000`



中间服务器：`127.0.0.1:8000`



目标服务器地址：`127.0.0.1:8888`



**3.CORS跨域资源共享，服务器端进行配置，加一个响应头**



```javascript
var express = require('express')
var app = express()

// 设置跨域和相应数据格式
app.all('/api/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
})
```



**4.Vue反向代理**



```javascript
module.exports = {
  lintOnSave: false,
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8888/api/private/v1/", // 域名
        ws: true, // 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}

// /api/login
// http://127.0.0.1:8888/api/private/v1/login
```



### ESLint


+ JS的字符串使用单引号包裹



```json
// 单引号替换双引号
"prettier.singleQuote": true,
```



+ 代码结尾不能跟分号



```json
// 去掉代码结尾的分号
"prettier.semi": false,
```



+ 声明的变量和方法必须被调用
+ 代码的最后一行要加换行
+ tab 键用多个空格代替，一个 tab 键等于2个空格



```json
// 一个tab键等于2个空格
"editor.tabSize": 2,
```



+ 声明的方法名和圆括号之间加空格



```javascript
// 让函数(名)和后面的括号之间加个空格
"javascript.format.insertSpaceBeforeFunctionParenthesis": true,
```



总配置



```javascript
{
   // 一个tab键等于2个空格
   "editor.tabSize": 2,
   // 保存的时候自动格式化 
   "editor.formatOnSave": true,
   // 去掉代码结尾的分号 
   "prettier.semi": false,
   // 单引号替换双引号 
   "prettier.singleQuote": true,
   // 让函数(名)和后面的括号之间加个空格
   "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
}
```



`.prettierrc`



```javascript
{
   "semi": false,
   "singleQuote": true,
}
```



`.eslintrc.js`



```javascript
module.exports = {
  env: {
    node: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```



`process.env.NODE_ENV`



+ **development**
+ **production**
+ **test**



```javascript
// vue.config.js
module.exports = {
  lintOnSave: false,
}
```



### Webpack


webpack是前端的打包工具，它能对代码进行合并、压缩、混淆的处理，还可以处理各个各样的依赖关系，有一些高级语法也能帮我们做一些转换



webpack 可以配置入口（entry）、出口（output）、加载器（loader）、插件（plugins）



工作中用的脚手架，脚手架默认已经配置好webpack



**插件：**



+  `webpack-dev-server` ：实现自动打包效果，自动启动一个8080端口的服务器 
+  `html-webpack-plugin` ：在内存中生成一个`index.html` 文件，然后从网站根目录访问 
+  `clean-webpack-plugin` ：清除之前的打包内容 
+  `optimize-css-assets-webpack-plugin` ：压缩CSS 
+  `terser-webpack-plugin` ：压缩JS 
+  `mini-css-extract-plugin` ：将CSS提取成独立的文件 



**加载器：**



默认情况下，只能通过 import 导入 js 模块，但是如果有了加载器的加持，就可以使用 import 导入 css、less、vue、sass、图片资源等各种文件



+ `css-loader`
+ `less-loader`
+ `sass-loader`
+ `postcss-loader` ：给css样式自动添加兼容性前缀（在根目录创建并配置`postcss.config.js`）
+ `url-loader` ：加载图片（base64）、字体文件
+ `babel-loader` ：ES6->ES5（在根目录创建并配置`babel.config.js`）
+ `vue-loader`



`package.json`



+ vue 把 webpack 要干的事都封装到 `@vue/cli-service`
+ react 把 webpack 要干的事都封装到 `react-scripts`



[https://www.zhihu.com/question/23150301](https://www.zhihu.com/question/23150301)



[https://www.cnblogs.com/itlkNote/p/6831115.html](https://www.cnblogs.com/itlkNote/p/6831115.html)

