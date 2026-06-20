[toc]



# 02_笔记


## data报错


**查看vue的版本**



```bash
npm view vue
```



注意：data中的属性和methods中的属性不要重名，会报如下错误



```javascript
[Vue warn]: Method "fn" has already been defined as a data property.
```



<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/js-img/vue%20initData.jpg)



## vue事件


函数绑定的方法可以带小括号，也可以不带



+ 如果携带小括号，那事件对象就没有了
+ 如果想要事件对象，就需要使用$event占位



```html
<div id="app">
    <div @click="fn($event,100,200)">{{msg}}</div>
</div>
```



### 事件修饰符


**阻止事件冒泡**



+ 原生： `e.stopPropagation` `e.cancelBubble=true`
+ vue：.stop：阻止事件的冒泡传播机制



**阻止事件默认行为**



+ 原生： `e.preventDefault`
+ .prevent：阻止事件的默认行为



```html
<div id="outer" @click.self="fn1">
    outer
    <div id="inner" @click="fn2">
        inner
        <div id="center" @click.stop="fn3">
            center
        </div>
    </div>
</div>
```



**其它方法**



+ .capture：控制方法在捕获阶段
+ .once：只让当前方法触发一次（不会阻止事件冒泡）
+ .self：只有点击自己的时候才能触发方法执行（通过冒泡或捕获都不能触发方法）
+ .passive：就是为了告诉浏览器，没用 preventDefault 阻止默认动作（不用查询）



### 键盘修饰符


只有当前用户点击的是指定的按键才会触发对应的方法



+ .enter
+ .ctrl
+ .c



```html
<!-- 用户按下ctrl+c才会触发 -->
<input type="text" @keydown.ctrl.67="fn4"/>
<input type="text" @keydown.ctrl.c="fn4"/>
```



### 修饰符


**lazy 修饰符**



+  默认情况下，v-model 是在 input 事件中同步输入框的数据的  
一旦有数据发生改变的 data 中的数据就会自动发生改变 
+  lazy 修饰符可以让数据在失去焦点或者回车才会更新 



**number 修饰符**



+ 默认情况下，在输入框中无论我们输入的字母还是数组，都会被当做字符串类型进行处理
+ number 修饰符可以让输入框中输入的内容自动转成数字类型



**trim 修饰符**



+ 如果输入的内容首尾有很多空格，通常我们希望将其去除
+ trim 修饰符可以过滤内容两边的空格



## class和style


class数组中的值如果是字符串，就会往style中找类名。如果不是字符串，就会去data中找属性



```html
<style type="text/css">
	.box {
		width: 100px;
		height: 100px;
		background: #FF00FF;
	}
	.y {
		background: darkgreen;
	}
	.x {
		background: darkcyan;
	}
</style>

<div :class="{box:flag}"></div>
<div :class="['x', 'y']"></div>

<script type="text/javascript">
    data: {
        flag: true,
    },
</script>
```



style和class一样



```html
<div :style={fontSize:num}>hello world</div>
<div :style=[z,r]></div>

<script type="text/javascript">
    data: {
        num: "30px",
        z: {
            width: "100px",
            height: "100px",
            background: "blue"
        },
        r: {
            border: "1px solid red"
        },
    },
</script>
```



**隔行变色**



`:class="index%2===0?'x':'y'"` 可以使用三元表达式



如果有多个条件class时这样会有些繁琐，可以使用数组语法：`:class="['y',{x:index%2}]"`



```html
<ul>
	<!-- <li v-for="(item,index) in arr" :class="['y',{x:index%2}]"> -->
	<li v-for="(item,index) in arr" :class="index%2===0?'x':'y'">
		{{item}}
	</li>
</ul>

<script type="text/javascript">
    data: {
        arr: [100, 200, 300, 400],
    },
</script>
```



## 表单元素


单选框



1. 都会按照v-model进行分组，单选框的数据是一个单一的值
2. 每一个框都有自己的value值，谁被选中，data中的数据就是谁的value值



```html
<input type="radio" value="0" v-model="sex" />男
<input type="radio" value="1" v-model="sex" />女
<button type="button" @click="fn">提交</button>

<script type="text/javascript">
    data: {
        sex: "1",
    },
    methods: {
        fn() {
            console.log(this.sex)
        },
    }
</script>
```



复选框



1. 按照v-model进行分组，复选框的数据是一个数组
2. 每一个框都有一个自己的value值，谁被选中，那谁的数据就会放在checkList数组



## filters 过滤


+ 方法执行时可以不加小括号
+ 方法里的第一个形参就是管道符左侧的值
+ 管道符中写多个方法，它会从左到右依次执行



```html
<div id="app">
    <!-- | 管道符，左侧可以传递多个值，用逗号隔开即可 -->
	{{num, num2 | toFixed(2) | addZero}}
</div>

<script type="text/javascript">
    data: {
		num: 3.1415927,
         num2: 100
	},
    filters:{
        toFixed(val, val2){
            console.log(val2)
            return val.toFixed(val2)
        },
		addZero(value) {
			value = Number(value)
			return value < 10 ? "0" + value : null
		}
	}
</script>
```



## computed计算属性


computed计算属性：它不是一个方法，是一个属性，在视图中不能执行，会报错



```javascript
[Vue warn]: Error in render: "TypeError: ... is not a function"
```



+ 计算属性一般都有依赖的值
+ 如果没有依赖的值，则它的值永远不会改变



```html
<div id="app">
	<input type="text" v-model="text" />
	<div>正常次序的数据{{text}}</div>
	<div>反转之后的数据{{reverse}}</div>
</div>

<script type="text/javascript">
    data: {
        text: "12345678"
    }, // 属性
    methods: {}, // 方法
    filters: {}, // 方法
    computed: {
        reverse(){
            // 计算属性：reverse return的结果
            return this.text.split("").reverse().join("")
        } // 不是一个函数
    }, // 计算属性
</script>
```



计算属性有自己的缓存机制，当第一次执行的时候，会缓存一个值，当视图重新刷新时，会看看依赖的属性有没有变化



+ 如果没有发生变化，reverse不会重新执行，而是拿上次的缓存直接赋值到视图中
+ 如果发生变化，reverse会重新执行，然后给视图一个新的值



**每个计算属性都包含一个getter和一个setter**



+ 只要获取当前ss属性，get方法就会执行，get返回什么，页面就显示什么



```javascript
computed: {
	// ss() {
	// 	return this.text * 100
	// },
    
    // <===> 两个方法是一样的
    
	ss: {
		get() {
			console.log("get");
			return this.text * 100
		},
	}
},
```



+ 只要直接修改ss的值，ss就会执行，而且形参value就是修改的最新的值



```javascript
computed: {
	ss: {
		set(value) {
			console.log(value, "set");
		}
	}
},
```



## 复选框普通版本


注意：



+ `<input type="checkbox" v-model="all" @click="handleAll" />全选` click事件的执行要早于数组更新的时间，所以获取到的this.all是上一次的值
+ `<input type="checkbox" v-model="all" @change="handleAll" />全选` change事件的执行事件要晚于数组更新的时间，所以获取到的this.all获取到的就是最新的值



```html
<input type="checkbox" v-model="all" @change="handleAll" />全选

<!-- 用一个div包裹起来，只要有一个复选框发生改变，div上的change事件就会被触发 -->
<div @change="brand">
	<input type="checkbox" value="city1" v-model="checkList" />北京
	<input type="checkbox" value="city2" v-model="checkList" />上海
	<input type="checkbox" value="city3" v-model="checkList" />广州
	<input type="checkbox" value="city4" v-model="checkList" />深圳
</div>
<script type="text/javascript">
    data: {
        checkList: [],
        all: false
    },
    methods: {
        brand() {
            let length = this.checkList.length
            if (length >= 4) {
                this.all = true
            } else {
                this.all = false
            }
        },
        handleAll() {
            // 如果this.all是true，那就全勾选，如果this.all是false，那就都不勾选
            if (this.all) {
                this.checkList = ["city1", "city2", "city3", "city4"]
            } else {
                this.checkList = []
            }
        }
    }
</script>
```



## 复选框computed版本


```html
<div id="app">
    <input type="checkbox" v-model="all">全选
    <div>
        <input type="checkbox" value="1" v-model="checkList">一
        <input type="checkbox" value="2" v-model="checkList">二
        <input type="checkbox" value="3" v-model="checkList">三
        <input type="checkbox" value="4" v-model="checkList">四
    </div>
</div>

<script>
    let vm = new Vue({
        el: "#app",
        data: {
            checkList: [],
        },
        computed: {
            all: {
                get() {
                    // 每一次勾选的动作都能把数据checkList改变，所以all依赖的数据改变会重新计算
                    return this.checkList.length == 4;
                },
                set(value) {
                    // set函数会在操作全选框的时候执行，value的值就是当前全选框的最新状态
                    if (value) {
                        this.checkList = ["1", "2", "3", "4"]
                    } else {
                        this.checkList = []
                    }
                }
            }
        },
    })
</script>
```



总结：**计算属性的改变只能根据依赖的值的变化而变化，不能直接修改**

