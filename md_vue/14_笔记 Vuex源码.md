[toc]



# 14_笔记


## mixin


安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 install 方法



该方法需要在调用 `new Vue()` 之前被调用



### 全局混入


+ 如果想给每一个实例的 data 都增加一个属性，可以考虑使用 mixin
+ 混入会把 mixin 里的内容注入到根实例和所有的组件实例中



**注意：**



+  **混入属性/方法：**如果混入的时候 data 中出现了相同的属性/方法名，以自己实例的为准 
+  **混入生命周期函数：**在混入的时候如果组件以及有那个生命周期函数，会先执行混入的，再执行自己的  
混入生命周期函数里的 this 就是当前组件的实例 



```javascript
Vue.mixin({
    data() {
        return {
            num: 800,
        };
    },
    beforeCreate() {
        console.log("mixin", this);
    },
});
```



### 局部混入


+ 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优
+ 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子**之前**调用



```javascript
Vue.component("com", {
    mixins: [obj],
});
```



## Vuex源码


```javascript
let Vuex = (function () {
    class Store {
        // options就是new Store时传递的实参
        constructor(options) {
            // state里的状态应该是响应式的，只要状态发生了改变，那使用到的该状态的组件都会得到高效的更新
            // 利用vue的时候，data中的值会变成响应式的数据的原理，把咱们的state的属性也变成是响应的数据
            let vm = new Vue({
                data: {
                    state: options.state,
                },
            });
            this.state = vm.state;
            this.commit = (type, payload) => {
                options.mutations[type](this.state, payload);
            };
            this.dispatch = (type, payload) => {
                options.actions[type](this, payload);
            };
        }
    }
    function mapState(arr) {
        let obj = {};
        arr.forEach((item) => {
            obj[item] = function () {
                return this.$store.state[item];
            };
        });
        return obj;
    }
    function install(_Vue) {
        // 需要在install方法里去调用Vue.mixin，给每一个组件都混入一个生命周期函数（在生命周期函数里做给当前组件增加$store属性的事情）
        // 全局注册混入，当组件使用的时候才会进行混入执行
        _Vue.mixin({
            // beforeCreate第一次执行的时候，是从根实例没this就是根实例
            // beforeCreate第二次执行的时候，是从com组件上执行的，this是com组件实例
            beforeCreate() {
                if (this.$options.store) {
                    this.$store = this.$options.store;
                } else {
                    this.$store = this.$parent && this.$parent.$store;
                }
            },
        });
    }
    return {
        Store,
        install,
        mapState
    };
})();
```



+ 测试一下



```javascript
// 如果当前插件是一个对象的话，里边必须提供一个install方法，供调用Vue.use的时候在use内部执行该install
Vue.use(Vuex); // 让Vuex中的install执行，并且给install方法传递一个实参Vue类
let store = new Vuex.Store({
    state: {
        count: 100,
        msg: "hello",
    },
    getters: {},
    mutations: {
        addCount(state, payload) {
            state.count += payload;
        },
    },
    actions: {
        addCount({ commit }, payload) {
            commit("addCount", payload);
        },
    },
});


Vue.component("com", {
    template: `<div>com组件</div>`,
    mounted() {
        console.log(this, "com-mounted");
    },
});

let vm = new Vue({
    el: "#app",
    store, // 会给当前实例的$options里增加store属性
    data: {
        // msg: 100,
    },
    methods: {
        fn() {
            // this.$store.commit("addCount", 10);
            this.$store.dispatch("addCount", 20);
        },
    },
    computed: {
        ...Vuex.mapState(["count", "msg"]),
    },
});
```

