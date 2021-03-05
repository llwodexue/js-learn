[toc]

# 37\_笔记

## node

### 全局查看

- 获取全局 `node_modules` 的目录

```bash
npm root -g
```

- 查看当前源

```bash
npm config get registry
# 切换淘宝源
npm config set registry https://registry.npm.taobao.org
```

### 生成和开发

- 如果执行脚本，觉得命令行很长，可以在 `package.json` 中的 scripts 对象中配置一下当前的脚本命令，之后输入`npm run build` 即可

```json
{
  "scripts": {
    "build": "lessc index.less index.css"
  },
}
```

- 安装依赖

```bash
# 和生产环境一样
npm i ...
# 开发依赖
npm i ... --save-dev
# 生产依赖
npm i ... --save
# 全局安装
npm i ... -g
```

- `dependencies` 生产依赖，`devDependencies` 开发依赖

```json
{
  "dependencies": {
    "jquery": "^3.5.1"
  },
  "devDependencies": {
    "less": "^4.0.0"
  }
}
```

## 前后端请求

**客户端做的事情**

1. 发送URL请求

2. DNS域名解析

3. 和服务器建立TCP连接

4. 把客户端信息传递给服务端（发送HTTP请求）

5. 服务器收到并处理（HTTP响应内容）

   **服务端端处理**返回response

6. 和服务器断开TCP连接

7. 客户端渲染服务器返回的内容

**服务端做的事情**

1. 根据端口号找到对应项目
2. 根据请求的资源路径名称找到资源文件
3. 读取资源文件的内容
4. 把内容进行返回（response响应内容）



## URL组成部分

1. 协议：（https://）能够把客户端和服务端通信的信息进行传递的工具

2. 域名：IP太难记了

3. 端口号：0~65535，用端口号来区分同一台服务器上不同的项目

4. 请求资源路径名称

   默认的路径或名称（服务器会默认找的资源名称是 default.html、index.html）

5. 问号传参信息

   请求报文传输(请求头和请求主体)，也可以实现页面之间的信息交互，

6. HASH值:(#index)

   锚点定位，基于HASH实现路由切换(不同的HASH值实现展示不同的组件或者模块)



- URL和URN都是URI的子集。换言之，URL和URN都是URI，但是URI不一定是URL或者URN

![URI](https://gitee.com/lilyn/pic/raw/master/js-img/URI.png)

URI `http://bitpoetry.io/posts/hello.html#intro`

- `http://` ，定义如何访问资源的方式
- `bitpoetry.io/posts/hello.html` ，资源存放的位置
- `\#intro` ，资源

URL是URI的一个子集，告诉我们访问网络位置的方式，类似地址

- `http://bitpoetry.io/posts/hello.html`

URN是URI的子集，包括名字(给定的命名空间内)，但是不包括访问方式

- `bitpoetry.io/posts/hello.html#intro`



**URL转码解码**

```js
encodeURI("你好")
// "%E4%BD%A0%E5%A5%BD"
decodeURI("%E4%BD%A0%E5%A5%BD")
// "你好"
```

## history和location

history是当前页面切换的历史记录，里面有当前切换地址的一些信息和操作方法

- history 中会有一个存储页面信息的池子，只要你打开了某一个页面不关闭它，那当前那个页面的历史记录就会保存在池子里
- history 自己身上的 length 代表了当前历史栈中存储了历史页面的个数
- history 实例所属类的原型上有go、back、forward方法

```js
// 进入指定的页面，可以传递参数。如果传1，那就前进1级，如果传-1，那就后退1级
history.go()
// 前进一级
history.forward()
// 后退一级
history.back()
```



location 对象中存储了一些信息和方法可以让我们来操作和获取url

- hash 哈希值
- host：域名+端口号
- hostname：域名
- href：当前url
- origin：协议+域名+端口号
- pathname：资源路径名称
- port：端口号
- protocol：协议
- search：给后台发送的参数（?传参部分）
- 上面这些属性不仅可以获取还可以设置



- reload()：刷新当前页面
- replace()：把当前历史记录中的页面进行替换，打开一个新的页面

## 参考

[你知道URL、URI和URN三者之间的区别吗？](https://blog.csdn.net/f45056231p/article/details/82530984)

