[toc]



# 11_笔记


## CRM


**第一级路由**



+ 如果没有指定，默认让其渲染或者跳转到和首页一样的组件  
`/home`  
`/customer`  
**第二级路由**
    - 访问的是 `/customer` 默认让其渲染和 `/customer/list` 相同的组件  
`/customer/add` 新增客户  
`/customer/list` 客户列表

  
`/system`



```bash
|- src
	|- api # 所有和服务器的数据交互
	|- assets # 静态资源：css/img/tool.js
	|- components # 组件：公用的才是组件
	|- pages # 各模块的页面组件，起名routes/containers均可
	|- store # 管理vuex
	|- App.vue # 单页面应用的入口页面或容器
	|- main.js # 入口
	|- router.js # 路由管控
```



### vue-router


**路由组件传参**



基于 path 跳转，传参基于问号传参（会显示在url上）



+ path 方式跳转，不能基于 params 传递，只能基于 query 问号传参



```html
<router-link :to="{ path: '/custom/list' }"></router-link>
<router-link to="/custom/list"></router-link>

<router-link :to="{ path: '/custom/list', query: { lx: 'my' } }"></router-link>
<router-link to="/custom/list?lx=my"></router-link>
```



**命名路由**（不会显示在地址栏中显示）



+ name 方式跳转，可以基于 params 和 query 传递



```html
<router-link :to="{ name: 'customList' }"></router-link>

<router-link :to="{ name: 'customList', params: { lx: 'all' } }"></router-link>
```



**query 和 params 的区别：**



1. query 问号传递的信息会在地址栏中显示
    - 比较丑
    - 基于 router-link 或 `this.$router.push` 跳转的时候，传递的参数可以在渲染组件中获取到
    - 在当前地址下刷新，依然可以基于 `this.$route.query` 获取到
2. params 不会在地址栏中显示
    - 相对美观
    - 基于 router-link 或者 `this.$router.push` 跳转的时候，传递的参数也可以在渲染组件中获取到
    - 在当前地址下刷新，params 中信息就清空了



**动态路由**（路由跳转的地址是动态处理的）



```javascript
// 路由表
{
    path: "/custom/list/:lx"
}
// 跳转
<router-link to="/custom/list/my">
<router-link :to="{ name: 'customList', params: { lx: 'all' } }">
// 获取 this.$route=this.$route
this.$route.params
```



**命名视图**



+ components 可以是一个对象，项目中可能会出现两个 `<router-view>`，此时给其设置 `name="xxx"`，这样在路由表就可以基于不同的名字来渲染多个组件



`props: true` 如果动态路由传递参数，直接把参数信息当做属性传递给组件，例如：`path:'/list/:type'`，组件就可以基于 props:['type'] 获取到参数信息，当前也可以基于 `this.$route.params` 获取传递的信息



```html
<router-view></router-view>
<router-view name="view"></router-view>

<script>
{
    path: "/home", // 路由路径
    name: "home", // 命名路由
    props: true,
    components: {
        default: Home,
        view: System, // 命名视图
    },
},
</script>
```



+ component 可以是一个组件
+ component 可以是一个函数，只有路由匹配成功才引入当前模块，也可以在函数中做权限校验



```javascript
{
    path: "/home",
    name: "home",
    component: () => {
        return import("./pages/Home.vue");
    },
},
```



**路由匹配规则**



```javascript
{
    // 每一次地址改变，都会到路由表自上而下逐一匹配
    // 匹配一级成功再匹配二级，在某级中没有则跳出来继续向下匹配
    // 直到匹配到一个完全匹配的，则渲染对应的组件
    path: "*",
    redirect: "/",
},
```



**导航守卫**（路由权限校验）



+ 每一次路由的跳转和切换，都是把之前渲染的组件销毁（destroyed），重新渲染新的组件（beforeCreate => data）



```javascript
// 全局前置守卫（不管路由匹配哪一个地址，渲染了哪一个组件，都会触发）
router.beforeEach((to, from, next) => {
    // to:即将要进入的路由
    // from:即将要离开的路由
    console.log("全局 beforeEach");
    // 进入下一个钩子函数：不写next当前操作到此结束
    // next(false); 中断当前导航
    // next("/xxx") 当前导航中断，进入下一个导航（和$router.push一样）
    next();
});

// 全局解析守卫（导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就会被调用）
router.beforeResolve((to, from, next) => {
    console.log("全局 beforeResolve");
    next();
});

// 全局后置钩子（没有next）
router.afterEach((to, from) => {
    console.log("全局 afterEach");
});
```



+ 路由独有守卫



```javascript
{
    path: "/home",
    name: "home",
    component: () => {
        return import("./pages/Home.vue");
    },
    // 路由独有守卫
    beforeEnter(to, from, next) {
        console.log("路由独有 beforeEnter");
        next();
    },
},
```



+ 组件独有守卫



```javascript
// 组件独有守卫
beforeRouteEnter(to, from, next) {
  console.log("组件独有 beforeRouteEnter");
  next();
},
beforeRouteUpdate(to, from, next) {
  console.log("组件独有 beforeRouteUpdate");
  next();
},
beforeRouteLeave(to, from, next) {
  console.log("组件独有 beforeRouteLeave");
  next();
},
```



1. 导航被触发（浏览器地址改变）
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入



**完整的生命周期**



<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/js-img/%E8%B7%AF%E7%94%B1%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB%E5%AE%8C%E6%95%B4%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.jpg)



+ 在新组件即将渲染之前，先把之前组件销毁，再渲染新的组件



可以在 created 或 beforeRouteLeave 中拿到 this



### vue-cli


**pages**



在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件



```javascript
pages: {
    login: {
        entry: "src/login.js", // page 的入口
        template: "public/login.html", // 模板来源
    },
    index: {
        entry: "src/main.js",
        template: "public/index.html",
    },
},
```



### 登录界面


1. 表单校验（防止SQL或者特殊字符的注入：防XSS攻击）
2. 密码的MD5加密（POST请求）
3. 向服务器发送请求
4. 接收服务器返回的结果  
失败：直接做一个提示即可  
成功：可以把成功态或者权限信息存储到本地（不能存储到Vuex，页面刷新就没了。可以存储到localStorage），直接跳转到首页（服务器端已经在session或者其它地方把登录态、权限存储起来）



```javascript
// 注意：要携带资源凭证，把cookie种到浏览器中
axios.defaults.withCredentials = true;
```



**常用正则**



```javascript
// 验证是否为有效数字
/^[+-]?(\d|([1-9]\d+))(\.\d+)?$/

// 验证密码
/^\w{6,16}$/

// 验证真实姓名
/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/

// 验证用户名
/^(\w{2,20})|[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/

// 验证邮箱
/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    
// 验证身份证号码
/^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/
```



常用axios默认配置



```javascript
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:9999';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
	if (!data) return data;
	let result = ``;
	for (let attr in data) {
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
axios.interceptors.response.use(function onFulfilled(response) {
	return response.data;
}, function onRejected(reason) {
	return Promise.reject(reason);
});
axios.defaults.validateStatus = function (status) {
	return /^(2|3)\d{2}$/.test(status);
}

export default axios;
```



### 首页


App.vue（vue-router 实现SPA）



1. 从服务器重新获取登录态和权限  
未登录：给予提示，然后跳转到登录页  
已经登录：把登录态和权限存储到vuex中（一般会用vuex代替一些本地存储的内容）
2. 各个板块渲染，首先从vuex中获取权限信息，根据获取的结果做权限校验



注意：不能在重定向中直接在url后面拼接参数，会超出栈内存



```javascript
children: [
    {
        path: "/",
        // Maximum call stack size exceeded
       	// redirect: "/custom/list?type=my"
        redirect: { path: "/custom/list", query: { type: "my" } },
    },
],
```



多页面 login.html / index.html



+ 登录只要负责跟服务器校验账号密码是否匹配即可
+ 进入到首页后，首先从服务器获取是否登录，登录再渲染，不登录直接跳回去  
把登录态存储到 vuex 中 同步  
把权限存储到 vuex 中 异步  
开始渲染
+ 页面刷新，上面操作重新操作一遍



登录成功：



+ 把登录态存储到本地（还可以把权限存储到本地）
+ 进入到首页，登录态和权限校验都从本地获取即可  
减少和服务器交互频率  
不能及时和服务器同步（当前也可以每次刷新页面，都从服务器获取一份放到本地）  
本地信息容易被修改，不安全不稳定



单页面应用 index.html（包含登录模块）



+ vuex 给一点初始状态  
isLogin: false  
power: ""
+ 刷新页面的第一件事情，从服务器获取登录态和权限，存储到vuex中（异步）
+ 每当进入到组件的时候，都去从vuex中获取登录态，从而让其显示某个组件



权限校验可能出现的情况



1. 点击某一个按钮实现路由跳转，此时需要我们校验是否有权限访问当前组件，如果没有权限，提示或禁止跳转  
beforeEach，每一次路由跳转必然会执行它，所以我们需要判断，只有访问某个地址，我们做对应的权限校验  
beforeEnter
2. 点击某个按钮实现某个功能，如果不管权限是否有，都可以点击，我们可以在点击的时候验证权限有无，从而给予相关的提示
3. 没有权限，让东西消失，自定义指令来完成



### Custom


```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```



1. 自定义指令里写的都是响应式的状态，不是自己写的字符串
2. 在创建自定义指令（把当前元素从页面中移除），在页面中移除需要保证元素已经插入到页面中 `inserted`



**Vuex 作用：**



1. 组件之间的共同状态管理
2. 路由频繁切换的时候，减少对服务器的请求次数，事先把数据存储到vuex中



每一次加载 customList 组件的时候



1. 获取问号传参的信息值
2. 到vuex中找对应的第一页数据  
有：从vuex中把数据获取到，赋值给组件的 computed**（组件不销毁，data只执行一次，vuex中数据改变，视图组件不跟着渲染。当后续通过其它操作，想让 computed 改变，但是并不想改 vuex，可以用 watch 监听 data 值的改变）**  
没有：派发一个 action 任务，从服务器重新获取
3. 视图中进行数据绑定
4. 当我们点击分页或筛选时候，随时从服务器获取最新的信息，直接呈现在视图中即可



**keep-alive：** Vue 内置组件



+ `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们



**Props**：



+ `include` 字符串或正则表达式。只有名称匹配的组件会被缓存
+ `exclude` 字符串或正则表达式。任何名称匹配的组件都不会被缓存

