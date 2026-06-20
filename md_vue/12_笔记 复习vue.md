[toc]



# 12_笔记


## DOM


### 事件委托


+ 事件委托是利用事件冒泡原理，让节点的父级代为执行事件。而不需要循环遍历元素的子节点，大大减少dom操作



```javascript
ul.addEventListener("click", function(e) {
    let el = e.target;
    // ul-li-span
    let p = el.parentNode;
    if (p.contains(e.target)) {
        console.log("点击了li");
    }
    if (el.tagName === "LI") {
        console.log("点击了li");
    }
});
```



+ on 方法



```javascript
function delegate(element, eventType, selector, fn) {
    element.addEventListener(eventType, (e) => {
        let el = e.target;
        while (!el.matches(selector)) {
            if (element === el) {
                el = null;
                break;
            }
            el = el.parentNode;
        }
        el && fn.call(el, e, el);
    });
    return element;
}
```



### 用 mouse 事件写一个可拖拽的 div


```javascript
let dragging = false;
let position = [0, 0];
box.addEventListener("mousedown", function(e) {
    dragging = true;
    position = [e.clientX, e.clientY];
});
document.addEventListener("mousemove", function(e) {
    if (!dragging) return;
    let boxL = parseInt(box.style.left) || 0;
    let boxT = parseInt(box.style.top) || 0;
    let left = e.clientX - position[0] + boxL;
    let top = e.clientY - position[1] + boxT;
    box.style.left = left + "px";
    box.style.top = top + "px";
    position = [e.clientX, e.clientY];
});
document.addEventListener("mouseup", function() {
    dragging = false;
});
```



## Vue


### watch 和 computed 区别


**computed**



+ computed 是计算值
+ 具有缓存性（页面重新渲染值不变化，计算属性会立即返回之前的计算结果，而不再执行函数）



**watch**



+ watch 是观察的动作
+ 无缓存性（页面重新渲染时值不变化也不会执行）



### Vue 如何实现组件间通信


+ 父子组件传参 $emit()
+ 爷孙组件、兄弟组件 eventBus
+ vuex 状态管理工具



### Vue 数据响应式是怎么做到的


> 双向绑定 v-model
>



Vue 会遍历 `data` 中所有属性，并使用 `Object.defineProperty` 把这些属性全部转换为 `getter/setter`



+ 注意：受 `Object.defineProperty` 限制，Vue **不能检测到对象属性的添加或删除**。
+ 解决方法：使用 `Vue.set(object, key, value)` 、 `vm.$set(object, key, value)`



### Vuex


状态管理工具



+ state
+ getter
+ mutation
+ action
+ module



### Vue Router


路由管理工具



+ 动态路由匹配
+ 重命名和别名
+ History 模式
+ 导航守卫
+ 懒加载 `import("./Foo.vue")`



## WebPack


```bash
# 安装webpack
yarn add webpack webpack-cli webpack-dev-server -D
npm i webpack webpack-cli webpack-dev-server --save-dev

# 执行webpack
npx webpack # 找到node_modules/.bin/webpack.cmd
npx webpack --config webpack.config.development.js

# 执行webpack-dev-server
npx webpack-dev-server
```



### loader 和 plugin


Loader



+  CSS  
postcss-loader scss-loader less-loader style-loader 
+  JS  
babel-loader eslint-loader 
+  图片  
image-loader 



Plugin



+  HTML  
html-webpack-plugin 
+  CSS  
extract-text-plugin 
+  JS 



### 如何提高构建速度


happypack



+ 用多线程进行打包提高构建速度，js默认是单核，webpack默认是单核



dllPlugin



### 转义出的文件过大


1. 提取通用模块文件 commonsChunkPlugin
2. 压缩 js css 图片
3. import("") 按需加载

