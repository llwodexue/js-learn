[toc]



# 03_笔记


## watch 侦听器


+  里面存放的是方法，此方法是实现对响应式的数据监听 
+  只能监听vue实例上的属性，只要监听的属性值发生了变化，当前函数就会执行 
+  里面的方法的名字必须要和你监听的vue属性名一致 
+  watch里的方法支持异步的写法（这里不需要return，只是处理逻辑）  
computed里的属性的get方法都会return，如果异步代码跟return有关，最终结果就不准确了 



```javascript
watch: {
    num1(value) {
        setTimeout(() => {
            this.num2 = this.num2 * value
        }, 2000)
    }
}
```



## 生命周期


<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/js-img/vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)



```javascript
let vm = new Vue({
    // el: "#app", // 真正的dom元素
    template: `<div><span id="span">{{num}}</span></div>`, // 虚拟的dom元素
    data: {
        num: 100
    },
    methods: {
        fn() {}
    },
})
vm.$mount("#app"); // 跟el效果一致
// vm.$destroy(); // 把当前vue实例销毁
// 一旦把vue实例销毁之后，vue实例就不能用了，数据就不是响应式了
```



### `beforeCreate` 和 `created`


+  `beforeCreate` ：此函数执行，就说明要开始初始化实例  
这时data中的数据和methods中的方法都没有挂载到实例上 
+  `created` ：此函数执行，说明实例已经初始化完成  
此时data中的数据和methods中的方法已经挂载到实例上  
**注意：**在这里拿不到渲染完成之后的元素 



```javascript
beforeCreate() {
    // 在这里还没有拿到响应式数据，什么都做不了
    console.log(this.data, "beforeCreate"); // undefined "beforeCreate"
},
created() {
    // 在这里更改data中的响应式数据，不会引发视图的再次更新，因此此时dom模板还没有替换到页面上
    // 工作时候都在这里发生数据请求
    console.log(this.data, "created"); // undefined "created"
    // this.num = 200; // 此时不会触发 beforeUpdate updated
    console.log(document.getElementById("span")); // null
},
```



### `beforeMount` 和 `mounted`


`beforeCreate`、`created`、`beforeMount`、`mounted` 只会在第一次初始化的时候执行，`beforeUpdate` 和`updated` 在初次渲染页面的时候不会执行



+ `beforeMount` ：此函数执行，生成dom模板挂载到真实dom上之前
+ `mounted`：dom模板已经挂载到真实的dom元素上，页面正常显示



```javascript
beforeMount() {
    // 这里可以对data中的数据进行更改而不会引发视图的重新渲染（因为在挂载页面之前可以随便更改）
    console.log("beforeMount");
    console.log(document.getElementById("span")); // null
},
mounted() {
    console.log("mounted");
    // 在这里更改data中的响应式数据会引发视图的再次更新，此时页面已经正常加载完毕
    // this.num = 300; // 此时会触发 beforeUpdate updated
    // 在这里按照渲染完成之后的dom进行
    console.log(document.getElementById("span")); // <span id="span">200</span>
},
```



### `beforeUpdate` 和 `updated`


```javascript
beforeUpdate() {
    // 在后期更改数据之前时执行
    console.log("beforeUpdate");
},
updated() {
    // 在数据更改完成之后，视图渲染完成之后执行
    console.log("updated");
},
```



### `beforeDestroy` 和 `destroyed`


```javascript
beforeDestroy() {
    console.log("beforeDestroy");
},
destroyed() {
    console.log("destroy");
}
```



## template


+ 模板里只能有一个根元素节点
+ 模板里的元素可以正常使用{{}}，也可以正常使用methods里的方法
+ 模板可以复用



**template使用方式**



template的值可以是字符串（包裹需要结构），也可以把结构单独分离出来，放置`<template></template>` 标记中，然后和当前组件关联



1. 模板字符串方式
2. template标记方式
3. slot插槽处理



```html
<div id="app">
</div>
<!-- 创建tmplate标签来构建组件渲染的视图 -->
<template id="first">
    <div>{{msg}}</div>
</template>

<script>
    // 如果vue在初始化的时候有template选项，就会把template的属性值进行编译，编译完成之后把app元素进行替换
    let vm = new Vue({
        el: "#app",
        data: {
            msg: 100
        },
        template: "#first",
        methods: {}
    })
</script>
```



## 购物车案例


```html
<div id="app">
    <div class="container">
        <div class="row">
            <table class="table table-bordered">
                <caption class="text-center text-danger h2">购物车</caption>
                <tr>
                    <td>全选<input type="checkbox" v-model="all" @change="changeAll"></td>
                    <td>商品</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>小计</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(item,index) in products">
                    <td><input type="checkbox" v-model="item.isSelected" @change="changeOne"></td>
                    <td><img :src="item.productCover" alt=""></td>
                    <td>{{item.productPrice}}</td>
                    <td><input type="number" v-model="item.productCount" min=0 max=10></td>
                    <td>{{item.productPrice * item.productCount|toFixed(2)}}</td>
                    <td><button class="btn btn-danger" @click="del(index)">删除</button></td>
                </tr>
                <tr>
                    <td colspan="6">总计：{{total()}}</td>
                </tr>
            </table>
        </div>
    </div>
</div>
```



```javascript
let vm = new Vue({
    el: '#app',
    data: {
        products: [],
        length: 0
    },
    methods: {
        getData() {
            axios.get('./carts.json').then((res) => {
                this.products = res.data;
                this.length = res.data.length;
            })
        },
        changeAll() {
            this.products.forEach(item => {
                item.isSelected = this.all;
            })
        },
        changeOne() {
            this.all = this.products.every(item => {
                return item.isSelected
            })
        },
        del(i) {
            this.products.splice(i, 1)
        },
        total() {
            return this.products.filter(item => {
                return item.isSelected;
            }).reduce((acc, cur) => {
                return acc + cur.productPrice * cur.productCount
            }, 0)
        }
    },
    created() {
        this.getData();
    },
    filters: {
        toFixed(val, num) {
            return val.toFixed(num)
        }
    }
});
```

