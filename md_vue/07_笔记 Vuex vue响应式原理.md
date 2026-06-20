[toc]



# 07_笔记


## Object.defineProperty


`Object.defineProperty(obj, prop, descriptor)` ：方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象



```javascript
let obj = {
	num: 100,
}
Object.defineProperty(obj, "num", {
    configurable: false, // 是否允许当前属性被删除，默认是false
    enumerable: false, // 当前的属性是否可以被枚举，默认是false
    value: 300, // 给当前新增/修改属性赋值，默认是undefined
    writable: false, // 当前的值是否允许被修改，默认是false
});
```



+ 设置属性的getter、setter



给当前的属性设置get/set函数去监听当前属性的获取和设置的时候去做什么事（vue@2实现响应式的原理）



vue3.0采用proxy



+ Proxy对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）



```javascript
Object.defineProperty(obj, "num", {
    get() {
        // 只要获取当前的num属性的值，此函数就会执行，该函数的返回值就是你获取的属性值
        return "hello";
    },
    set(value) {
        // 只要设置num值，此函数就会执行
        console.log(value); 
    }
})
```



## v-model实现原理


**让数据在vue中实现响应式**



1. 基本数据类型给一个初始值或$set添加数据
2. vue把数组中的一些方法重写push/pop/unshift/shift/splice/reverse/sort，调取这些方法，会刷新视图



+ vue内置的observer/defineReactive函数，会把所有在data中初始化的属性都getter/setter（递归处理）
+ $set 不仅仅用来修改数据，而且可以把修改的属性基于defineProperty进行getter/setter



v-model就是：value和@input的语法糖



注意：不能在setter里直接写 `data.msg = value` ，这样会出现死递归 `Uncaught RangeError: Maximum call stack size exceeded`



```html
<input type="text" v-model="msg" id="inpBox" />
<span id="spanText"></span>

<script>
    let data = {
        msg: "hello world",
    };
    let tempData = {
        msg: data.msg,
    };
    Object.defineProperty(data, "msg", {
        set(value) {
            tempData.msg = value;
            render();
        },
    });

    // 渲染视图
    function render() {
        inpBox.value = tempData.msg;
        spanText.innerHTML = tempData.msg;
    }
    render();
    // 视图数据更改的监听 PC端：input、keydown、keyup 移动端：input
    inpBox.addEventListener("input", function () {
        data.msg = this.value;
    });
```



## 实现组件之间信息通信的方法


+ props 父 -> 子
+ $on $emit 子 <-> 父 拥有共同父亲的兄弟，隔代处理
+ $parent、$children、$refs
+ provide inject 隔代处理
+ $listeners $attrs
+ vuex



## Vuex


> vuex 能处理任何情况下的组件信息通信（前提：SPA单页面）实现的是同一个页面中，各组件的信息通信
>
>  
>
> vuex 是vue中实现公共状态管理的插件
>



<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/js-img/vuex%E6%A8%A1%E5%BC%8F.png)



vuex 就是把组件中的公共的状态（数据）抽离出来，存放到一个全局的单例模式中，以后不管哪个组件想使用公共的状态，就直接去单例模式中获取



+ 单例模式中的状态是响应式的，只要状态被改变了，那所有使用到该状态的组件全都更新（凡是依赖该状态的组件会全部更新）



### 了解插件


通过全局方法 `Vue.use()` 使用插件



```javascript
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)
```



+ 开发插件



```javascript
MyPlugin.install = function(Vue, options) {
    // 1. 添加全局方法或 property
    Vue.myGlobalMethod = function() {
        // 逻辑...
    };

    // 2. 添加全局资源
    Vue.directive("my-directive", {
        bind(el, binding, vnode, oldVnode) {
            // 逻辑...
        },
    });

    // 3. 注入组件选项
    Vue.mixin({
        created: function() {
            // 逻辑...
        },
    });

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function(methodOptions) {
        // 逻辑...
    };
};
```



+  混入 [https://cn.vuejs.org/v2/guide/mixins.html](https://cn.vuejs.org/v2/guide/mixins.html)  
methods、computed、data如果有冲突，以自身组件为主  
生命周期（钩子）函数，两个同时并存，混入对象的钩子将在组件自身钩子**之前**调用 



### 基础语法


**State**



+ 存储在 Vuex 中的数据和 Vue 实例中的 `data` 遵循相同的规则，例如状态对象必须是纯粹 (plain) [https://cn.vuejs.org/v2/api/#data](https://cn.vuejs.org/v2/api/#data)



**Mutation**



Vuex 的 store 状态的更新唯一的方式：**提交Mutation**



**Mutation 主要包括两部分：**



1. 字符串类型的事件类型（type）
2. 一个回调函数（handler），该回调函数的第一个参数就是state



**Mutation 提交风格：**



```javascript
// 如果参数不止一个，通常以对象的形式传递，也就是payload是一个对象
this.$store.commit("changeCount", {count: 0});
changeCount(state, payload) {
    state.count = payload.count;
}

// Vue还提一种风格，它是包含type属性的对象
this.$store.commit({
    type: "changeCount",
    count: 100
})
changeCount(state, payload) {
    state.count = payload.count;
}
```



**Mutation注意事项：**



Vuex 的 store 中的 state 是响应式的，当 state 中的数据发生改变时，Vue 组件会自动更新



+ Mutation 需遵守 Vue 的响应规则



1. 最好提前在你的 store 中初始化好所有所需属性
2. 使用 `Vue.set(obj, 'newProp', 123)`
3. 以新对象替换老对象。例如，利用扩展运算符 `state.obj = { ...state.obj, newProp: 123 }`



+ 使用常量替代 Mutation 事件类型



```javascript
export const INCREMENT = "increment";
```



```javascript
import { INCREMENT } from "./store/mutations-types";

export default {
  methods: {
    addition() {
      this.$store.commit(INCREMENT);
    },
  },
};

export default {
  [INCREMENT](state) {
    state.counter++;
  },
};
```



+ mutation 必须是同步函数



主要原因是当我们使用 devtools 时，devtools 可以帮助我们捕捉 mutation 的快照。但是如果是异步操作，那么 devtools 将不能很好的追踪这个操作什么时候会被完成



**Action**



+ Action 提交的是 mutation，而不是直接变更状态
+ Action 可以包含任意异步操作



Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用 `context.commit` 提交一个 mutation



**Getters**



+ 像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算



```javascript
import Vue from "vue";
import Vuex from "vuex";

// Vuex是vue中的一个插件
Vue.use(Vuex); // 基于mixin混入方式给vue提供一个store

// 创建store容器并且导出
export default new Vuex.Store({
    // 存储公共状态（DATA）
    state: {},
    // mutations存储sync function，这些方法改变state中的状态信息
    mutations: {
        example(state, payload) {
            // state容器中存储状态信息，payload是commit执行传递进来的参数信息
            // this.$store.commit("example", 100);
        },
    },
    // actions存储async function，这些方法首先异步获取需要的数据，然后再基于commit触发mutations中的方法，从而改变state
    actions: {
        exampleAction(context, payload) {
            // context.state 当前模块私有状态
            // context.rootState 整个store中的全部状态
            setTimeout(() => {
                context.commit("example", 1000);
            }, 1000);
        },
    },
    // getters存储的方法等价于computed计算属性，监听当前容器中的state计算属性
    getters: {},
});
```



### mapXxx


**mapState基本原理**



```javascript
function mapState(arr) {
    let obj = {};
    arr.forEach((item) => {
        obj[item] = this.$store.state[item];
    });
    return obj;
}
```



**mapMutations基本原理**



```javascript
function mapMutations(arr) {
    let obj = {};
    arr.forEach((item) => {
        obj[item] = function(...args) {
            this.$store.commit(item, ...args);
        };
    });
    return obj;
}
```



+ mapState
+ mapGetters
+ mapMutations
+ mapActions



```javascript
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
    computed: {
        // 数组方式
        ...mapState(["n", "m"]), // this.n
        // 对象方式
        ...mapState({
            a: "n", // this.a === this.$store.state.n
        }),
        // 函数方式
        ...mapState({
            a: (state) => state.xxx.xxx,
        }),
        // 其余的map操作方式和mapState类似
    },
};
```



### Modules


默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的。如果想让模块具有更高的封装度和复用性，可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块



**模块A**



```javascript
export default {
    namespaced: true,
    state: {
        n: 10
    },
    // ...
};
```



**模块B**



```javascript
export default {
    namespaced: true,
    state: {
        n: 20
    },
    // ...
};
```



**store.js**



1. state会按照各板块进行区分
2. 但是getters/mutations/actions默认不会进行模块区分，默认是全部合并在一起，这样会导致冲突 解决方案：每个模块设置namespaced:true，这样最好虽然也是把每个模块中的方法合并在一起，但是会以模块的名字作为前缀，来进行标识和区分



```javascript
import Vue from "vue";
import Vuex from "vuex";
import A from "./A";
import B from "./B";
Vue.use(Vuex);

export default new Vuex.Store({
    // 每个模块独有的
    modules: {
        Person,
        Product,
    },
    // 各个板块公共的状态和方法
    state: {

    },
});
```



获取状态或触发mutation/actions中的方法执行：



+ this.$store.state.A.xxx
+ this.$store.dispatch("A/xxx")
+ ...mapActions("A", ["xxx"])
+ 基于 createNamespacedHelpers 处理



可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：



```javascript
import { createNamespacedHelpers } from "vuex";
let { mapGetters, mapMutations } = createNamespacedHelpers("Person");
export default {
    methods: {
        ...mapMutations(["changeName"]),
    },
    mounted() {
        // 调取mutations中的方法的时候，第二个参数是payload，是需要传递给方法的参数信息（只能一个，如果需要传递多个，需要传递一个对象）
        // this.$store.commit("Person/changeName", "狗");
        // this.$store.dispatch("Person/actionDemo", "狗");
        setTimeout(() => {
            this.changeName("狗");
        }, 1000);
    },
};
```



### 模块管控


+ Person.vue



```javascript
import { createNamespacedHelpers } from "vuex";
import * as types from "./store/store-type";
let { mapState, mapMutations } = createNamespacedHelpers("Product");
export default {
    computed: {
        ...mapState(["name"]),
    },
    methods: {
        ...mapMutations([types.Product_Mutation_ChangeName]),
    },
    mounted() {
        setTimeout(() => {
            this[types.Product_Mutation_ChangeName]("hello world");
        }, 1000);
    },
};
```



+ Product.js



```javascript
import * as types from "./store-type";
export default {
    namespaced: true,
    state: {
        name: "cat",
        baseInfo: {
            time: "5 month",
        },
    },
    getters: {
        [types.Product_Getter_QueryBase](state) {
            return `${state.name}的周期是：${state.baseInfo.time}`;
        },
    },
    mutations: {
        [types.Product_Mutation_ChangeName](state, payload) {
            state.name = payload;
        },
    },
};
```



+ store-type.js



```javascript
export const Product_Mutation_ChangeName = "Product_Mutation_ChangeName";
export const Product_Getter_QueryBase = "Product_Getter_QueryBase";
```



## Vuex 源码分析


vuex 实现响应式原理



```javascript
store._vm = new Vue({
  data: {
    $$state: state
  },
  computed: computed
});
```



vue-router 实现响应式原理



```javascript
Vue.util.defineReactive(this, '_route', this._router.history.current);
```



手写 vuex 源码



```javascript
(function() {
    let _Vue;
    class Store {
        constructor(options) {
            let state = options.state;
            let actions = options.actions;
            let mutations = options.mutations;
            let getters = options.getters;
            this.state = {};
            this.actions = {};
            this.mutations = {};
            this.getters = {};

            // 1.将 state 实现响应式
            let vm = new _Vue({
                data: {
                    state: state,
                },
            });
            this.state = vm.state;

            // 2.实现actions
            Object.keys(actions).forEach((fnName) => {
                this.actions[fnName] = (params) => {
                    actions[fnName](this, params);
                };
            });

            // 3.mutations
            Object.keys(mutations).forEach((fnName) => {
                this.mutations[fnName] = (params) => {
                    mutations[fnName](this.state, params);
                };
            });

            // 4.getters
            Object.keys(getters).forEach((fnName) => {
                Object.defineProperty(this.getters, fnName, {
                    get: () => {
                        return getters[fnName](this.state);
                    },
                });
            });
        }

        // dispatch
        dispatch = (actionName, params) => {
            this.actions[actionName](params);
        };

        // commit
        commit = (mutationName, params) => {
            this.mutations[mutationName](params);
        };
    }
    const install = (Vue, options) => {
        _Vue = Vue;
        init(options);
    };
    /* Vue.use(Vuex)
    Vue.use = function(C, options) {
        C.install && C.install(this, options);
    }; */
    function init(options) {
        _Vue.mixin({
            beforeCreate() {
                let vm = this;
                if (vm.$options.store) {
                    vm.$store = vm.$options.store;
                } else {
                    vm.$store = vm.$parent && vm.$parent.$store;
                }
            },
        });
    }
    window.Vuex = {
        Store,
        install,
    };
    if (typeof Vue !== "undefined") {
        Vue.use(Vuex);
    }
})();
```



## 投票组件练习


+ 只要 store 中的 state 发生改变（不管通过commit方法，还是通过dispatch+commit方法改变），当前组件一定会重新渲染
+ 父组件重新渲染，子组件一定会重新渲染，但子组件重新渲染只会走 `beforeUpdate` 和 `updated` 生命周期函数，data 状态不会重新执行



### index.js


```javascript
import Vue from "vue";
import Vuex from "vuex";
import logger from "vuex/dist/logger";

// Vuex是vue中的一个插件
Vue.use(Vuex); // 基于mixin混入方式给vue提供一个store

export default new Vuex.Store({
    state: {
        voteList: {
            id: 1,
            title: "dog",
            supNum: 0,
            oppNum: 0,
        },
    },
    getters: {
        ratio(state) {
            let total = state.voteList.supNum + state.voteList.oppNum;
            return total === 0
                ? "0%"
                : ((state.voteList.supNum / total) * 100).toFixed(2) + "%";
        },
    },
    mutations: {
        supHandle(state, count = 1) {
            state.voteList.supNum += count;
        },
        oppHandle(state, count = 1) {
            state.voteList.oppNum += count;
        },
    },
    actions: {
        opposeAction({ commit }, count) {
            setTimeout(() => {
                commit("oppHandle", count);
            }, 2000);
        },
    },
    // 使用logger中间件插件：能够详细输出每次操作之前、当中、之后的状态信息
    plugins: [logger()],
});
```



### App.vue


```vue
<template>
    <div id="app">
        <!-- 在进行v-for循环的时候，需要给每一个循环的元素设置key值（保持当前循环的唯一性，但是尽可能不要使用index作为值） -->
        <!-- <vote v-for="item in $store.state.voteList" :key="item.id"></vote> -->
        <vote></vote>
    </div>
</template>

<script>
import Vote from "./components/Vote";
export default {
    name: "app",
    data() {
        console.log(this.$store.state);
        return {};
    },
    components: {
        Vote,
    },
};
</script>
```



### Vote.vue


```vue
<template>
    <div class="container">
      <vote-head></vote-head>
      <VoteContent></VoteContent>
      <vote-footer></vote-footer>
    </div>
</template>

<script>
import VoteHead from "./VoteHead";
import VoteContent from "./VoteContent";
import VoteFooter from "./VoteFooter";
export default {
    components: {
        VoteHead,
        VoteContent,
        VoteFooter,
    },
};
</script>

<style lang="less" scoped>
.container{
  width: 400px;
  padding: 10px;
  border: 1px solid #aaa;
}
</style>
```



### VoteHead.vue


```vue
<template>
    <div class="voteHead">
        <h2>{{ title }}</h2>
        <span>总人数：{{ total }}</span>
    </div>
</template>

<script>
export default {
    computed: {
        total() {
            return (
                this.$store.state.voteList.supNum +
                this.$store.state.voteList.oppNum
            );
        },
    },
    data() {
        return {
            // 把公共状态信息获取到，赋值给当前组件自己的私有状态
            title: this.$store.state.voteList.title,
        };
    },
};
</script>

<style lang="less" scoped>
h2 {
    display: inline-block;
    margin-right: 20px;
}
</style>
```



### VoteContent.vue


```vue
<template>
    <div class="voteContent">
        <p>支持人数：<span>{{ supNum }}</span></p>
        <p>反对人数：<span>{{ oppNum }}</span></p>
        <p>支持率：<span>{{ ratio }}</span></p>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    computed: {
        // supNum() {
        //     return this.$store.state.voteList.supNum;
        // },
        // oppNum() {
        //     return this.$store.state.voteList.oppNum;
        // },
        // ratio() {
        //     return this.$store.getters.ratio;
        // },
        ...mapState({
            supNum: (state) => state.voteList.supNum,
            oppNum: (state) => state.voteList.oppNum,
        }),
        ...mapGetters(["ratio"])
    },
};
</script>
```



### VoteFooter.vue


```vue
<template>
    <div class="voteFooter">
        <button type="button" class="btn btn-success" @click="supHandle(10)">支持</button>
        <button type="button" class="btn btn-danger" @click="oppHandle()">反对</button>
    </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
    methods: {
        // supHandle(count) {
        //     this.$store.commit("supHandle", count);
        // },
        // oppHandle() {
        //     this.$store.dispatch("opposeAction");
        // },
        ...mapMutations(["supHandle"]),
        ...mapActions({
            oppHandle: "opposeAction",
        }),
    },
};
</script>
```



## 子组件不重新渲染最新数据


1. 使用v-if销毁组件并重新渲染



**Temp1.vue**



```vue
<template>
    <div>
        <temp2 :n="n" :m="m" v-if="flag"></temp2>
    </div>
</template>

<script>
import Temp2 from "./Temp2";
export default {
    data() {
        return {
            n: 0,
            m: 0,
            flag: true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.flag = false;
            // 父beforeUpdate->子beforeUpdate->子updated->父updated
            this.n = 100;
            this.m = 200;
            this.$nextTick(() => {
                this.flag = true;
            });
        }, 1000);
    },
    components: {
        Temp2,
    },
};
</script>
```



**Temp2.vue**



```vue
<template>
    <div>{{ AA }}====={{ BB }}</div>
</template>

<script>
export default {
    data() {
        // 子组件重新渲染的时候data函数不会再执行（只有第一次渲染子组件，在beforeCreate和created中间的时候执行一次）
        return {
            AA: this.n,
            BB: this.m,
        };
    },
    props: ["n", "m"],
};
</script>
```



2. 子组件使用 computed 或 methods 或直接写在 `{{}}` 里面 或  watch



**Temp1.vue**



```vue
<template>
    <div>
        <temp2 :n="n" :m="m"></temp2>
    </div>
</template>

<script>
import Temp2 from "./Temp2";
export default {
    data() {
        return {
            n: 0,
            m: 0,
        };
    },
    mounted() {
        setTimeout(() => {
            this.n = 100;
            this.m = 200;
        }, 1000);
    },
    components: {
        Temp2,
    },
};
</script>
```



**Temp2.vue**



```vue
<template>
    <div>{{ AA() }}====={{ BB }}</div>
</template>

<script>
export default {
    // 只要父组件重新渲染子组件
    methods: {
        AA() {
            return this.n;
        },
    },
    computed: {
        BB() {
            return this.m;
        },
    },
    props: ["n", "m"],
};
</script>
```

