[toc]



# 01_笔记


## review webpack


```javascript
module.exports = {
    entry: "", // 打包入口
    output: "", // 打包出口
    devServer: "", // 起服务器（起一个node服务）
    module: {
        // 配置解析器 loader
        rules: [],
        // 解析样式css里@import css-loader
        // 解析样式css加前缀 post-loader
        // 解析样式css到内嵌 style-loader
        // 解析样式css到外链 mini-css-extract-plugin
        // 解析样式less less-loader

        // 解析图片 file-loader
        // 解析图片至base64 url-loader

        // es6转es5 babel-loader

        // 代码规范 eslint-loader
    },
};
```



## 框架和类库


1. 类库

> jQuery（操作DOM）、Zepto（适配移动端）...
>

  
类库提供的是真实项目中常用的方法，它是一个工具包，基于这个工具包可以快速开发任何项目

2. 插件

> swiper 轮播图插件、jQuery插件...
>

  
插件是把项目中某一个具体的功能进行封装

3. UI组件库

> bootstrap、elementUI、Ant Desigin...
>

  
UI组件库一般是多个插件的集合体，不仅提供了JS对应的功能，而且把结构、样式等也都实现了

4. 框架

> Vue、React、Uni-app、React-native、Flutter、Angular...
>

  
一般来说，框架是类库和组件的综合体，里面提供了大量供我们操作的方法，也有配套的UI组件库供我们快速开发：框架是具有独立编程思想



APP框架：uni-app、react native、flutter



## vue


### 渐进式开发框架


> 渐进式：类库或者框架都是重量级的，里面包含很多方法，但是实际项目开发中，我们用不到这么多东西，所以在开发他们的时候，会把功能按照模块进行单独开发，使用者可根据自身情况选择一个模块一个模块的导入使用
>



+ vue：基础模块（基础语法、核心实现、组件开发、相关指令...）
+ vue-router：构建SPA(single page web application)单页应用的路由
+ vuex：公共状态管理
+ vue-cli：vue脚手架
+ components：Element、iView、vux、vant...
+ ...



### 双向数据绑定


+ 视图层：标签、结构
+ 数据层：数据



**双向数据绑定**：在单向绑定的基础上给可输入的元素（input、textarea等）添加change(input)事件，来动态修改model和view



v-model就是：value和@input的语法糖



+ 当input框的内容发生改变，就会触发input事件，那对应的fn就会执行，在fn里只需要得到最新的内容然后赋值给msg即可
+ msg数据一旦更新，那视图上用到msg的地方都得更新



v-model是vue内置的行间指令，可以让表单元素实现双向数据绑定



```html
<div id="app">
    <!-- @是v-on的简写，绑定事件 -->
    输入的数额：<input type="text" :value="msg" @input="fn">
    对应的美元：<span>{{msg/6.5}}</span>
</div>

<script>
    let vm = new Vue({
        el: "#app",
        data: {
            msg: 100
        },
        methods: {
            fn(e) {
                this.msg = e.target.value;
            }
        }
    })
</script>
```



## vue细节知识点


### el


Vue获取元素是通过 `querySelector`



```javascript
function query(el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
            warn(
                'Cannot find element: ' + el
            );
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}
```



### data


<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/js-img/vue%20data%E9%97%AE%E9%A2%98.jpg)



1. vue的data中的值如果是null或undefined，在视图中都是空 `val==null -> ""`
2. 其余数据类型显示在视图中都是字符串类型的 `JSON.stringify(val, null, 2) String(val)`
3. 如果只是对象的话，它会先用JSON.stringify转一下 `JSON数据类型有 object array`
4. **注意：**data中不是所有的数据都是响应式的  
普通对象在初始化的时候没有某个属性，在视图上使用了，以后更新这个属性值的时候，视图不会刷新  
解决办法：
    - 在vue中的初始化data的时候，给当前的属性赋一个默认值
    - 直接把obj对象进行替换（把堆内存换了）
    - 利用vue实例内置的方法进行设置 `vm.$set(obj, key, value)`

```javascript
vm.obj.name = 200 // 视图不会刷新
vm.obj = { name: 300 } // 视图会刷新
vm.$set(obj, "name", 400) // 视图会刷新
```

  
如果data的值是一个数组，那通过length或原生的方法给它进行增删改（arr[3] = 4），视图是不刷新的  
解决办法：

    - vue对数组的原型进行重定向，对数组的pop、push、reverse、shift、sort、splice、unshift进行重新封装，通过这几个方法去改变数组是具有响应式的

  
![](https://gitee.com/lilyn/pic/raw/master/js-img/console.dir(vue.arr).jpg)

```javascript
vm.arr.length-- // 视图不会刷新
vm.arr[3] = 300 // 视图不会刷新
vm.arr.push(400) // 视图会刷新
```



## vue中的指令


+ 都是按照v-xxx处理的，它是vue中规定给元素设置的自定义属性



在指令中的值如果是一个js基本数据类型的值，就直接渲染；如果不是一个js基本数据类型的值，那就去下边data或methods中寻找属性，如果找不到就报错



**v-html/v-text**



【v-html/v-text】：把指定的内容放入元素中，v-html是可以识别字符串标签的



```html
<!-- 在指令中的值如果是一个js数据类型的值，就直接渲染，如果不是一个js数据类型的值，那就去下边data或methods中寻找属性，如果找不到就报错 -->
<div v-text="msg"></div>
<div>{{msg}}</div>

<div v-html="msg"></div>
```



使用`{{}}`会使页面闪一下，但使用`v-text/v-html`进行渲染，页面不会闪



**v-bind**



【v-bind】：可以使用当前元素中普通的行间属性进行动态取值



简写：`:`



```html
<span v-bind:ss="msg"></span>
<span :ss="msg"></span>
```



**v-on**



【v-on】：给当前元素绑定事件



简写：`@`



```html
<button v-on:click="fn">按钮</button>
```



**v-once**



【v-once】：用v-once获取的值只能刷新一次，以后就算数据更新，视图也不变了



```html
<div v-once>{{msg}}</div>
```



**v-if/v-else**



【v-if/v-else/v-else-if】：可以对当前视图层的元素进行显示/隐藏的判断（对dom的卸载和加载）



```html
<div v-if="flag">111</div>
<div v-else>222</div>
<div>{{flag?333:444}}</div>
```



**v-show**



【v-show】：判断元素显示/隐藏，它控制的是元素的样式（控制css的display），dom结构永远存在



```html
<div v-show="!flag">hello</div>
<div v-show="flag">world</div>
```



v-if和v-show可以实现相同的功能：



+ v-show适用元素频繁显示和隐藏的场合
+ v-if用于初次加载的时候就判断显示和不显示的场合



**v-model**



【v-model】：实现双向数据绑定，适用于表单元素，就是：value和@input的语法糖



1. 先把数据绑定给表单元素，一般把数据赋值给表单元素的value
2. 监听表单元素的内容变化
3. 内容改变后，会把相应的数据改变
4. 对应的数据改变，视图中所有数据的地方都会重新渲染



**v-for**



【v-for】：在vue中循环渲染数据



+ 可以循环数组，item是数组的每一项，index是每一项的索引
+ 可以循环对象，item是属性值，index是属性名
+ 可以循环数字，数字是几就可以循环几次，item是数字从1开始累积的值，index是每一项的索引
+ 可以循环字符串，item就是每一个字符，index是每一项的索引
+ 剩下的js值就不会循环了



## v-bind 细节知识点


绑定方式：对象语法



```html
<!-- 用法一：直接通过{}绑定一个类 -->
<h2 :class="{'active': isActive}">Hello World</h2>

<!-- 用法二：也可以通过判断，传入多个值 -->
<h2 :class="{'active': isActive, 'line': isLine}">Hello World</h2>

<!-- 用法三：和普通的类同时存在，并不冲突 -->
<!-- 注：如果isActive和isLine都为true，那么会有title/active/line三个类 -->
<h2 class="title" :class="{'active': isActive, 'line': isLine}">Hello World</h2>

<!-- 用法四：如果过于复杂，可以放在一个methods或者computed中 -->
<!-- 注：classes是一个计算属性 -->
<h2 class="title" :class="classes">Hello World</h2>
```



绑定方式：数组语法



```html
<!-- 用法一：直接通过{}绑定一个类 -->
<h2 :class="['active']">Hello World</h2>

<!-- 用法二：也可以传入多个值 -->
<h2 :class="['active', 'line']">Hello World</h2>

<!-- 用法三：和普通的类同时存在，并不冲突 -->
<!-- 注：会有title/active/line三个类 -->
<h2 class="title" :class="['active', 'line']">Hello World</h2>

<!-- 用法四：如果过于复杂，可以放在一个methods或者computed中 -->
<!-- 注：classes是一个计算属性 -->
<h2 class="title" :class="classes">Hello World</h2>
```



## v-model 细节知识点


**结合radio使用**



```html
<label for="male">
    <input type="radio" id="male" value="男" v-model="sex" />男
</label>
<label for="female">
    <input type="radio" id="female" value="女" v-model="sex" />女
</label>
<script>
    const app = new Vue({
        el: "#app",
        data: {
            sex: "女",
        },
    });
</script>
```



**结合checkbox使用**



+ 单个复选框：v-model为布尔值
+ 多个复选框：对应data中属性是一个数组，选中一个，就会将 input 的 value 添加到数组中



```html
<!-- 单选框 -->
<input type="checkbox" id="agree" v-model="isAgree">同意协议

<!-- 多选框 -->
<label v-for="item in originHobbies" :for="item">
  <input type="checkbox" :value="item" :id="item" v-model="hobbies" />{{item}}
</label>

<script>
  const app = new Vue({
    el: "#app",
    data: {
      isAgree: false, // 单选框
      hobbies: [], // 多选框,
      originHobbies: [ "篮球", "足球", "台球" ],
    },
  });
</script>
```



**结合select使用**



+ 单选：当我们选中 option 中的一个时，会将它对应的 value 赋值到 mySelect 中
+ 多选：当选中多个值时，就会将选中的 option 对应的 value 添加到数组 mySelect 中



```html
<!-- 1.选择一个 -->
<select v-model="fruit">
  <option value="苹果">苹果</option>
  <option value="香蕉">香蕉</option>
  <option value="榴莲">榴莲</option>
  <option value="葡萄">葡萄</option>
</select>

<!-- 2.选择多个(按住ctrl) -->
<select v-model="fruits" multiple>
  <option value="苹果">苹果</option>
  <option value="香蕉">香蕉</option>
  <option value="榴莲">榴莲</option>
  <option value="葡萄">葡萄</option>
</select>

<script>
  const app = new Vue({
    el: '#app',
    data: {
      fruit: '香蕉',
      fruits: []
    }
  })
</script>
```



## v-if 小问题


+ 如果在有输入内容的情况下，切换了类型，会发现文字依然显示之前的输入内容，但是已经切换到另一个input元素中了



```html
<div id="app">
    <span v-if="isUser">
        <label for="username">用户账户</label>
        <input type="text" id="username" placeholder="用户账户" />
    </span>
    <span v-else>
        <label for="email">用户邮箱</label>
        <input type="text" id="email" placeholder="用户邮箱" />
    </span>
    <button @click="isUser=!isUser">切换类型</button>
</div>
```



+ 因为Vue在进行DOM渲染时，出于性能考虑，会极可能复用已经存在的元素，而不是重新创建新的元素
+ Vue内部会发现原来的input元素不再使用，直接作为else中的input来使用



解决方法：



+ 如果不希望Vue中出现类似重复利用的问题，可以给对应的input添加key，需要保证key的不同

