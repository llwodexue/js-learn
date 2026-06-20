[toc]



# 05_笔记


## Vue 组件通信
[面试官：Vue组件之间的通信方式都有哪些？](https://vue3js.cn/interview/vue/communication.html#%E4%B8%80%E3%80%81%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1%E7%9A%84%E6%A6%82%E5%BF%B5)



+ <font style="color:rgb(44, 62, 80);">通过 </font>`props` <font style="color:rgb(44, 62, 80);">传递</font>
+ 通过 `$emit $on` <font style="color:rgb(44, 62, 80);"> 触发自定义事件</font>
+ `<font style="color:rgb(44, 62, 80);">attrs</font>`<font style="color:rgb(44, 62, 80);">、</font>`<font style="color:rgb(44, 62, 80);">listeners</font>`
+ `provide`、`inject`
+ `$parent`、`$children`、`$refs`
+ `EventBus`
+ `Vuex`



### `$parent`/`$children`


+ 在父组件里可以通过 `this.$children` 来获取子组件，所有子组件存放在数组里  
父组件获取`$children`，在 mounted 里才能拿到
+ 在子组件中可以通过 `this.$parent` 获取父组件，是一个对象  
子组件的任何地方都可以拿到 parent



注意事项：



+ 尽管在 Vue 开发中，我们允许通过$parent 来访问父组件，但是在真实开发中尽量不要这样做
+ 子组件应该尽量避免直接访问父组件的数据，因为这样耦合度太高了
+ 如果我们将子组件放在另外一个组件之内，很可能该父组件没有对应的属性，往往会引起问题



### `$refs`


`**$children**`** 的缺陷：**



+ 通过 `$children` 访问子组件时，是一个数组类型，访问其中的子组件必须通过索引值
+ 但是当子组件过多，我们需要拿到其中一个时，往往不能确定它的索引值，甚至可能发生变化



`**$ref**`** 的使用：**



+ 获取时用 `this.$refs['名字']` 就能拿到元素
+ ref 在 mounted 里，元素与组件加载完成之后才能拿到
+ 两个元素或组件不能取同一个名字，最终会拿到最后命名的组件，后面的会覆盖前面



```html
<div id="app">
  <h3 v-html="msg" ref="tBox"></h3>
  <p ref="pBox"></p>
</div>

<script>
  // 我们基于ref可以把当前元素放置到this.$refs对象中，从而实现对DOM的直接操作（只有在mounted之后才可以获取到）
  let vm = new Vue({
    el: '#app',
    data: {
      msg: 'hello world',
    },
    mounted() {
      console.log(this.$refs) // {tBox: h3, pBox: p}
    },
  })
</script>
```



`**$ref**`** 实现父子组件通信**



+ ref 如果在普通的 DOM 元素上使用，引用指向就是 DOM 元素；如果用在子组件上，引用就指向组件实例，基于此可以快速获取和操作子组件中的数据
+ `$parent`和`$children`是获取组件和子组件的实例，只不过 `$children` 是一个数组集合，需要记住组件顺序



```html
<div id="app">
  <div>
    <span v-text="num"></span>
    <button @click="show">显示</button>
  </div>
  <total ref="btn"></total>
</div>

<template id="total">
  <div v-show="flag">
    <button @click="handle">增加</button>
  </div>
</template>

<script>
  let total = {
    template: '#total',
    methods: {
      handle() {
        this.$parent.num++
      },
    },
    data() {
      return {
        flag: true,
      }
    },
  }
  let vm = new Vue({
    el: '#app',
    data: {
      num: 0,
    },
    components: {
      total,
    },
    methods: {
      show() {
        // 使用children需要记住组件顺序
        // this.$children[0].flag = !this.$children[0].flag
        this.$refs.btn.flag = !this.$refs.btn.flag
      },
    },
  })
</script>
```



### provide/inject


+ 祖先组件基于 provide 注册需要供后代组件使用的数据



```javascript
// 对象或者返回对象的函数都可以（属性值如果是data中的数据，则必须使用函数的方式进行处理）
provide() {
    return {
        name: this.name,
        obj: this.obj
    }
},
```



+ 后代组件基于 inject 声明需要使用的数据并获取使用  
与 props 数据流一样也是单向，如果想子组件用或改变 inject 里的数据，可以用 computed 转换一下



```javascript
inject: ['name'],
methods: {
    func(){
        let name = this.name;
    }
}
// inject里面接受的属性名必须和provide提供的属性名一致，如果想要更名可以使用计算属性
computed: {
    myObj() {
        return this.obj
    }
}
```



+ 如果是基本数据类型，只传递初始值，再改变（this.num）不会触发视图更新
+ 如果是引用数据类型，改变后，可触发视图更新



`provide` 和 `inject` 绑定并不是可响应的（不能控制组件更新 ）。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的



```html
<div id="app">
  <h3>总人数：<span v-text="nums.supportNum+nums.opposeNum"></span></h3>
  <vote-head></vote-head>
  <vote-foot></vote-foot>
</div>
<template id="contentTemp">
  <div>
    <p>支持人数：<span v-text="nums.supportNum"></span></p>
    <p>反对人数：<span v-text="nums.opposeNum"></span></p>
  </div>
</template>
<template id="buttonTemp">
  <div>
    <button @click="handle('support')">支持</button>
    <button @click="handle('oppose')">反对</button>
  </div>
</template>

<script>
  let head = {
    template: '#contentTemp',
    inject: ['nums'],
  }
  let foot = {
    template: '#buttonTemp',
    inject: ['change'],
    methods: {
      handle(type) {
        this.change(type)
      },
    },
  }
  let vm = new Vue({
    el: '#app',
    // 这些数据存储在this._provided：可以是对象也可以是闭包
    // 闭包好处：它会在实例上的信息都挂载完成后再处理
    provide() {
      return {
        // supportNum: 0,
        // opposeNum: 0,
        // provide:如果传入了一个可监听的对象，那么其对象的property还是可响应的
        nums: this.nums,
        change: this.change,
      }
    },
    data() {
      return {
        nums: {
          supportNum: 0,
          opposeNum: 0,
        },
      }
    },
    methods: {
      change(type) {
        /* type === "support"
                ? this._provided.supportNum++
                : this._provided.opposeNum++;
            // provide值改变，组件不会重新渲染
            this.$forceUpdate(); // 强制更新 */
        type === 'support' ? this.nums.supportNum++ : this.nums.opposeNum++
      },
    },
    components: {
      voteHead: head,
      voteFoot: foot,
    },
  })
</script>
```



## 参考


[provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)

