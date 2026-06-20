[toc]



# 08_笔记


## SPA MPA


SPA：single page application 单页面应用



+ iframe
+ AMD/CMD + 打包工具
+ 专业的路由管理模块 vue-router / react-router-dom



MPA：multi page application 多页面应用

| | 多页面应用模式MPA | 单页应用模式SPA |
| --- | --- | --- |
| **应用构成** | 由多个完整页面构成 | 一个外壳页面和多个页面片段构成 |
| **跳转方式** | 页面之间的跳转是从一个页面到另一个页面 | 一个页面片段片段删除或隐藏，加载另一个页面片段并显示，片段间的模拟跳转，没有开壳页面 |
| **跳转后公共资源是否重新加载** | 是 | 否 |
| **URL模式** | `http://xxx/page1.html`<br/>`http://xxx/page2.html` | `http://xxx/xxx.html#page1`<br/>`http://xxx/xxx.html#page2` |
| **用户体验** | 页面间切换加载慢，不流畅，用户体验差，尤其在移动端 | 页面片段切换快，用户体验友好，包括移动设备 |
| **能否实现转场动画** | 否 | 容易实现（手机APP动效） |
| **页面间传递数据** | 依赖`URL`<br/>、`cookie`<br/>或者 `localstorage`<br/> ，实现麻烦 | 页面传递数据容易（`Vuex`<br/>或`Vue`<br/>中的父子组件通信`props`<br/>对象） |
| **搜索引擎优化（SEO）** | 可以直接做 | 需要单独方案（SSR） |
| **特别适用的范围** | 需要对搜索引擎友好的网站 | 对体验要求高，特别是移动应用 |
| **开发难度** | 较低，框架选择容易 | 较高，需要专门的框架来降低这种模块的开发难度 |




## AMD CMD


+ 按需引入的模块化思想



AMD：require.js，需要在模块最开始就把当前模块依赖的内容导入进来，然后再开发



CMD：sea.js，比较灵活，在开发过程中需要用到哪些模块，再单独导入即可



+ 基于AMD/CMD实现模块之间的依赖和调用
+ 部署上线的时候再基于部署工具（grunt/gulp/fis...）最后按照模块依赖关系，把所有模块打包到同一个页面中
+ 后期控制的是模块的显示隐藏



问题：把所有模块都放到同一个页面中，模块之间的切换处理起来不是特别方便，最主要的是页面第一次加载的时候，隐藏的模块也需要渲染和解析的，导致第一次加载速度过慢的问题



**更专业的组件化管理框架：** vue/react



**更完善的组件之间渲染和切换的机制（前端路由） ：**vue-router/react-router-dom



**更方便的组件之间通信方法：**vuex/redux/react-redux/dva/redux-saga/mobx...



**更好的部署打包工具**：webpack



## 路由


> 路由表本质就是一个映射表，决定了数据包的指向
>



1.  后端路由：后端处理URL和页面之间的映射的关系 
2.  前后端分离：后端只负责提供数据，不负责任何阶段的内容 



+ 随着Ajax的出现，有了前后端分离的开发模式
+ 后端只提供API来返回数据，前端通过Ajax获取数据，并且可以通过JavaScript将数据渲染到页面中
+ 这样做最大的优点就是前后端责任的清晰，后端专注于数据上，前端专注于交互和可视化上
+ 并且当移动端(iOS/Android)出现后，后端不需要进行任何处理，依然使用之前的一套API即可



3. 单页面富应用阶段



+ 其实SPA最重要的特点就是在前后端分离的基础上加了一层前端路由
+ 也就是前端来维护的一套路由规则



## vue-router 两种模式


在模块化工程中使用它（因为是一个插件，所以可以通过Vue.use()来安装路由功能）



1. 导入路由对象，并调用 Vue.use(VueRouter)
2. 创建路由实例，并且传入路由映射配置
3. 在 Vue实例中挂载创建的路由实例



```javascript
import Vue from "vue";
import VueRouter from "vue-router";
// 1.通过Vue.use(插件) 安装插件
Vue.use(VueRouter);
// 2.创建VueRouter对象
const routes = [];
const router = new VueRouter({
    // 配置路由和组件之间的应用关系
    routes,
});
// 3.将router对象传入到Vue实例
export default router;
```



使用 vue-router 的步骤：



1. 创建路由组件
2. 配置路由映射：组件和路径映射关系
3. 使用路由：通过 `<router-link>` 和 `<router-view>`



### HASH模式


> hash-router
>



+ 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载，根据不同的值，渲染指定 DOM 位置的不同数据



**原理**



```html
<div id="box1" class="box">A</div>
<div id="box2" class="box">B</div>
<button id="submit1">展示A</button>
<button id="submit2">展示B</button>

<script>
    function render() {
        // vue/vue-router：在监听到hash值变化后，根据hash值去路由表中找到对应的规则，然后交给vue渲染对应的组件
        let hash = location.hash;
        if (hash === "#B") {
            box1.style.display = "none";
            box2.style.display = "block";
            return;
        }
        box1.style.display = "block";
        box2.style.display = "none";
    }
    render();
    window.addEventListener("hashchange", render);
    // vue-router还做了一件事情，构建一个历史记录的容器，每一次切换完，都把当前最新的地址存储到容器中（方便实现后退、前进、还可以基于此实现路由的切换...）
    submit1.onclick = function () {
        let index = location.href.length;
        if (location.hash) {
            index = location.href.indexOf("#");
        }
        location.href = location.href.substring(0, index) + "#A";
    };
    submit2.onclick = function () {
        let index = location.href.length;
        if (location.hash) {
            index = location.href.indexOf("#");
        }
        location.href = location.href.substring(0, index) + "#B";
    };
</script>
```



### HISTORY模式


> browser-router
>



+ 利用 H5 的 history API 来实现，这也保证 URL 就像正常的 URL，而不会向 HASH 模式那么丑。**但是这种方式需要服务器请求URL的支持和处理**（防止页面刷新的时候，因地址不存在而引发404错误）



```javascript
// 回退
window.history.back();
window.history.go(-1);
// 前进
window.history.forward();
window.history.go(1);
// 查看历史堆栈中的页面记录数量
window.history.length;

// 添加并激活一个历史记录条目（但是此时没有实现页面的跳转或者说浏览器并未重新加载页面，再次刷新才会加载）
// state状态（对象） title标题 url网址
history.pushState(state, title, url|?xxx=xxx);
// 修改当前激活的历史记录条目
history.replaceState(state, title, url);
window.onpopstate = function(ev) {
    // 监听处于激活状态的历史记录条目发生变化
}
```



**注意：** `pushState()` 绝对不会触发 `hashchange` 事件，即使新的URL与旧的URL仅哈希不同也是如此。`popstate`事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮



```javascript
function render() {
    let pathname = location.pathname;
    if (pathname.includes("/B")) {
        box1.style.display = "none";
        box2.style.display = "block";
        return;
    }
    box1.style.display = "block";
    box2.style.display = "none";
}
render();
submit1.onclick = function () {
    // 向浏览器历史记录中新增一条数据（地址栏会改变），但是页面不会刷新，但是如果我们给定的地址不存在，当我们页面手动刷新的时候，当前地址会报404错误，所以browser-router需要服务器的支持（一般给予的支持，即使请求地址不存在，也是把首页的内容返回给客户端，而不是404）
    history.pushState({ state: "A" }, "title", location.origin + "/A");
    render();
};
submit2.onclick = function () {
    history.pushState({ state: "B" }, "title", location.origin + "/B");
    render();
};
```



## vue-router 细节知识点


### router-link


+ `<router-link>` ：该标签是一个vue-router中内置的组件，它会被渲染成一个 `<a>` 标签
+ `<router-view>` ：该标签会根据当前的路径，动态渲染出不同的组件
+ 在路由切换时，切换的是 `<router-view>` 挂载的组件，其它内容不会发生改变



视图层的 router-link 中的 to 有几种写法：



1. 字符串：path 的简写
2. 对象：`{path: "xxx"}` `{name: "xxx"}`



**redirect 属性**



+ 默认情况下，进入网页的首页，我们希望 `<router-view>` 渲染首页的内容



```javascript
const routes = [
    {
        path: "/", // 根路径
        redirect: "/home", // 重定向到/home的路径下
    },
];
```



**mode 属性**



如果希望使用 HTML5 的 history模式，可以进行如下配置：



```javascript
const router = new VueRouter({
    routes,
    mode: "history",
});
```



**to 属性：**目标路由的链接（跳转的路径），默认是 `psuhState`



**tag 属性：**可以指定 `<router-link>` 之后渲染成什么组件，默认是a标签，可以渲染成li、button...



```html
<router-link to="/home" tag="button">首页</router-link>
```



**replace 属性：**replace 不会留下 history 记录，所以指定 replace 的情况下，后退键返回不能返回到上一个页面中



```html
<router-link to="/home" replace>首页</router-link>
```



**active-class **



当 `<router-link>` 对应的路由匹配成功时，会自动给当前元素设置一个 router-link-active 的 class，设置 active-class 可以修改默认名称



+ 通常不会修改类的属性，会直接使用默认的 `router-link-active`



```javascript
const router = new VueRouter({
    routes,
    linkActiveClass: "active", // 可以通过router实例的属性进行修改
});
```



### 路由之间跳转


+ 使用 router-link（**声明式导航**）



```html
<router-link to="/home" tag="button">首页</router-link>
<router-link to="/about" tag="button">关于</router-link>
<router-view></router-view>
```



+ 使用代码方式（**编程式导航**）



注意：不要绕过它，使用 history.pushState 操作



```html
<button @click="homeClick">首页</button>
<button @click="aboutClick">关于</button>
<router-view></router-view>

<script>
export default {
  methods: {
    homeClick() {
      // vue-roter源码往所有组件添加了$router属性
      this.$router.push("/home");
    },
    aboutClick() {
      this.$router.push("/about");
    },
  },
};
</script>
```



## 动态路由传参


+  在某些情况下，一个页面的 path 路径可能是不确定的，比如我们进入用户界面时，希望是如下路径：  
`/user/aaa` 或 `/user/bb` 
+  动态路由：可以实现参数传递，当配置路由映射表的时候，写 path 时可以写一个动态的参数，比如 `/user/:userId`，此时 userId 就是动态参数，这时候页面的hash 值只要 `/user/` 对上即可 
+  这种 path 和 component 的匹配关系，称之为动态路由(路由传递数据的一种方式) 



**App.vue**



```html
<router-link :to="'/user/' + userId" tag="button">用户</router-link>
<router-view></router-view>

<script>
export default {
  data() {
    return {
      userId: "aa",
    };
  },
};
</script>
```



**User.vue**



```javascript
computed: {
  userId() {
    // 谁处于活跃状态，拿到的就是这个对象
    return this.$route.params.userId;
  },
},
```



**index.js**



```javascript
const routes = [
    {
        path: "",
        redirect: "/home",
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/user/:userId",
        component: User,
    },
];
const router = new VueRouter({
    routes,
})
```



## 路由懒加载
**打包文件解析**



+ `app.js` 当前应用程序开发的所有代码（业务代码）
+ `manifest.js` 为打包的代码做底层支撑
+ `vendor.js` （提供商/第三方 vue/vue-router/axios）



官方的解释：



+ 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载
+ 如果我们能吧不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更高效了



官方在说什么？



+ 路由通常会定义很多不同的页面
+ 这个页面最后被打包到哪里呢？一般情况下是一个 js 文件中
+ 但是，这么多页面放到一个 js 文件中，必然造成这个页面非常大
+ 如果一次性从服务器请求下来这个页面，可能需要花费一定的时间，甚至用户的电脑还出现短暂空白的情况
+ 如何避免这种情况呢？使用路由懒加载即可



**路由懒加载做了什么：**



+ 路由懒加载主要作用就是将路由对应的组件打包成一个个的 js 代码块
+ 只有在这个路由被访问的时候，才加载对应的组件



**懒加载的方式：**



1.  结合 Vue 的异步组件和 Webpack 的代码分割 

```javascript
const Home = (resolve) => {
    require.ensure(["../components/Home.vue"], () => {
        resolve(require("../components/Home.vue"));
    });
};
```

 

2.  AMD写法 

```javascript
const About = (resolve) => require(["../components/About.vue"], resolve);
```

 

3.  在ES6中，我们可以有更加简单的写法来组织 Vue 异步组件和 Webpack 的代码分割 

```javascript
const Home = () => import("../components/Home.vue");
```

 



**代码改写：**



```javascript
// import Home from "../components/Home.vue";
// import About from "../components/About.vue";

const Home = () => import("../components/Home.vue");
const About = () => import("../components/About.vue");

const routes = [
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
];
```



## 嵌套路由


+ 比如在home页面中，我们希望通过 `/home/news` 和 `/home/message` 访问一些内容
+ 一个路径映射一个组件，访问这两个路径也会分别渲染两个组件



<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/js-img/%E8%B7%AF%E5%BE%84%E5%92%8C%E7%BB%84%E4%BB%B6%E7%9A%84%E5%85%B3%E7%B3%BB.jpg)



**实现路由嵌套的步骤：**



1. 创建对应的子组件，并且在路由映射中配置对应的子路由
2. 在组件内部使用 `<router-view>` 标签



**嵌套路由默认路径（redirect）**



**注意，以 **`**/**`** 开头的嵌套路径会被当作根路径**



+ 一个被渲染组件同样可以包含自己的嵌套 `<router-view>`



```html
<router-link to="/home/news">新闻</router-link>
<router-link to="/home/message">消息</router-link>
<router-view></router-view>
```



+ 要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置



```javascript
const routes = [
    {
        path: "",
        redirect: "/home",
    },
    {
        path: "/home",
        component: Home,
        children: [
            {
                path: "",
                redirect: "news",
            },
            {
                path: "news",
                component: HomeNews,
            },
            {
                path: "message",
                component: HomeMessage,
            },
        ],
    },
    {
        path: "/about",
        component: About,
    },
];
```



## 路由组件传参


传递参数主要有两种类型：params 和 query



**params 的类型**



+ 配置路由格式：`/router/:id`
+ 传递的方式：在 path 后面跟上对应的值
+ 传递后形成的路径：`/router/abc`



**query 的类型**



+ 普通配置格式：`/router`
+ 传递的方式：对象中使用 query的 key 作为传递方式
+ 传递后形成的路径：`/router?id=abc`



```html
<!-- <router-link> -->
<router-link :to="{ path: '/profile', query: { name: 'why' } }" tag="button">档案</router-link>

<!-- js代码 -->
<script>
export default {
	const Profile = () => import("../components/Profile.vue");
	const routes = [
        {
            path: "/profile",
            component: Profile,
        },
	]
};
</script>
```



**编程式导航**



```html
<!-- <router-link :to="/user/ + userId" tag="button">用户</router-link> -->
<!-- <router-link :to="{ path: '/profile', query: { name: 'why' } }" tag="button">档案</router-link> -->
<button @click="userClick">用户</button>
<button @click="profileClick">档案</button>

<script>
export default {
    methods: {
        userClick() {
            this.$router.push(`/user/${this.userId}`);
        },
        profileClick() {
            this.$router.push({
                path: "/profile",
                query: {
                    name: "abc",
                },
            });
        },
    },
</script>
```



## $route 和 $router区别


在 vue 根实例里注入  router，不仅能够用让 router 正常使用，还会给每一个组件实例增加 $route 和 $router 属性（所有组件都继承自Vue类的原型）



+ $router 为VueRouter实例，想要导航到不同URL，则使用 $router.push 方法
+ $route 为当前 router 跳转对象里面可以获取 name、path、query、params等



每一个组件身上都有一个 $router 属性，里面有几个切换路由的方法：



1. `this.$router.push("path")`
2. `this.$router.replace("path")`
3. `this.$router.go(num)`
4. `this.$router.forward()`
5. `this.$router.back()`



## vue-router 源码分析


+  实现 install  
vue-router 利用 Vue.mixin 方式，来混入了生命周期钩子 beforeCreate 



```javascript
VueRouter.install = install

export function install (Vue) {
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        // 如果子组件没有router去父级找有没有router
        // 需要排除根实例
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
    },
  })
}
```



+ 实现两个组件 `router-link` `router-view`



```javascript
var View = {
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var children = ref.children;
    var data = ref.data;
    var h = ref.parent.$createElement;
    var component;
    return h(component, data, children)
  }
}

// 注册全局组件 h=>createElement 将虚拟DOM转换为真实DOM
// 第一个参数：标签名，第二个参数：标签挂载的属性，第三个参数：当前标签的子元素
// View里主要用 render(h) { return h("a", { attrs: {href: "#" + this.to }, this.$slots.default}) }
Vue.component('RouterView', View)
Vue.component('RouterLink', Link)
```



+ 给 Vue 原型添加方法



```javascript
// 给Vue原型添加$router $route方法
Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
})
Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
})
```



## 导航守卫


在一个SPA应用中，如何改变网页的标题



+ 网页标题是通过 `<title>` 来显示的，但是 SPA 只有一个固定的 HTML，切换不同的页面时，标题并不会改变
+ 我们可以通过JavaScript来修改 `<title>` 的内容，`window.document.title = "新的标题"`



普通的修改方式：



+ 在每一个路由对应的组件 .vue 文件中，通过 mounted 生命周期函数，执行对应的代码进行修改即可
+ 但是页面比较多时，这种方式不容易维护



导航守卫修改：



+ vue-router 提供的导航守卫主要用来监听路由的进入和离开
+ vue-router 提供了 beforeEach 和 afterEach 的钩子函数，它们会在路由即将改变前和改变后触发



### 全局守卫


**前置钩子 **`**beforeEach**` ，需要注意调用 `next()` 函数



```javascript
const routes = [
    {
        path: "",
        redirect: "/home",
    },
    {
        path: "/home",
        component: Home,
        meta: { title: "首页" },
        children: [
            {
                path: "",
                redirect: "news",
            },
            {
                path: "news",
                component: HomeNews,
            },
            {
                path: "message",
                component: HomeMessage,
            },
        ],
    },
    {
        path: "/about",
        component: About,
        meta: { title: "关于" },
    },
    {
        path: "/user/:userId",
        component: User,
        meta: { title: "用户" },
    },
];

router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title;
    next();
});
```



导航钩子的三个参数解析：



+ to：即将要进入的目标的路由对象
+ from：当前导航即将要离开的路由对象
+ next：调用该方法后, 才能进入下一个钩子



**后置钩子 **`**afterEach**` ，不需要注意调用 `next()` 函数



```javascript
router.afterEach((to,from)=>{

})
```



### 路由独享守卫


```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```



### 组件内的守卫


+ `beforeRouteEnter`
+ `beforeRouteUpdate`
+ `beforeRouteLeave`



### 关闭 eslint 检查


```javascript
module.exports = {
    lintOnSave: false,
};
```



关闭 eslint `console.log` 报红



```javascript
// package.json
"rules": {
		"no-console":"off"
},
```



## keep-alive


keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或者避免重新渲染



router-view 也是一个组件，如果直接被包在 keep-alive 里面，所有路径匹配到的视图组件都会被缓存



+ 首页中使用 path 属性，记录离开时的路径，在 `beforeRouteLeave` 中记录



```html
<!-- App.vue -->
<keep-alive>
  <router-view />
</keep-alive>

<!-- Home.vue -->
<script>
data() {
  return {
    path: "/home/news",
  };
},
// 这两个函数，只有该组件保持状态使用 keep-alive 时，才是有效的
activated() {
  console.log("activated");
  this.$router.push(this.path);
},
deactivated() {
  console.log("deactivated");
},
beforeRouteLeave(to, from, next) {
  this.path = this.$route.path;
  next();
},
</script>
```



keep-alive 有两个重要的属性：



+ include 字符串或正则表达，只有匹配的组件会被缓存
+ exclude 字符串或正则表达式，任何匹配的组件都不会被缓存



```html
<keep-alive exclude="Profile,User">
  <router-view />
</keep-alive>
```

