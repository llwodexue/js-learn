[toc]



# 06_笔记


## 轮播图 问题


能让视图刷新的两种方法：



+ 改变data中的属性
+ 从父级改变传递进来的prop的值



### 问题点1：堆内存还没创建完就拿数据


```javascript
// 因为obj还没创建完，obj.a就拿不到数据
let obj = {
	a: 1,
	b: obj.a
}
// 同理
data() {
    return {
        bannerData: [...this.data, this.data[0]],
        activeIndex: this.initialslide,
        sty: {
            width: bannerData.length * 1000 + "px",
            left: -activeIndex * 1000 + "px",
            transition: `left ${this.speed}ms linear`,
        },
    };
}

// 所以：需要这么写
data() {
    let bannerData = [...this.data, this.data[0]],
        activeIndex = this.initialslide;
    return {
        bannerData,
        activeIndex,
        sty: {
            width: bannerData.length * 1000 + "px",
            left: -activeIndex * 1000 + "px",
            transition: `left ${this.speed}ms linear`,
        },
    };
}
```



### 问题点2：浏览器和vue渲染队列


+ 浏览器渲染队列机制：如果从上往下都是写操作，没有读操作，浏览器会等待所有写操作完成之后再渲染
+ Vue渲染队列：Vue认为DOM渲染完成，是指虚拟DOM渲染完成（所有响应式数据都改完了，才会通知视图渲染），才会走`beforeUpdate` `updated`，Vue的事情完成，剩下的需要浏览器去渲染  
是用 `this.$forceUpdate()` 强制更新也不能实现多次渲染（可以将强制更新视为异步，需要跳过这步执行同步代码）



```javascript
autoMove() {
    this.activeIndex++;
    if (this.activeIndex >= this.bannerData.length) {
        this.sty.transition = `left 0ms linear`;
        this.sty.left = "0px";
        this.activeIndex = 1;
        // vue优化机制，都是让响应式数据改变，vue没有重新渲染
        // this.$forceUpdate(); // 强制更新不能实现多次渲染，它也是通知组件更新
        // 阻止浏览器渲染队列机制
        this.$refs.wrapper.offsetLeft;
    }
    this.sty.transition = `left ${this.speed}ms linear`;
    this.sty.left = -this.activeIndex * 1000 + "px";
},
```



+ 解决方法：$nextTick()  
用法：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新



```javascript
autoMove() {
    this.activeIndex++;
    if (this.activeIndex >= this.bannerData.length) {
        this.sty.transition = `left 0ms linear`;
        this.sty.left = "0px";
        this.activeIndex = 1;
        // 回调函数会在本次修改数据后，DOM视图重新渲染完成之后执行
        this.$nextTick(() => {
            // Vue 虚拟DOM渲染完成，vue 事情做完，剩下需要浏览器去渲染，所以走到$nextTick回调函数的时候，浏览器还没有真正将其放入视图
            this.$refs.wrapper.offsetLeft;
            this.sty.transition = `left ${this.speed}ms linear`;
            this.sty.left = -this.activeIndex * 1000 + "px";
        });
        return;
    }
    this.sty.transition = `left ${this.speed}ms linear`;
    this.sty.left = -this.activeIndex * 1000 + "px";
},
```



数据更改【 => dom diff（对比哪些需要更新，哪些不需要更新）=> 把虚拟DOM渲染真实DOM => $nextTick（vue认为此函数执行浏览器就绘制好了，其实不一定） => 告诉浏览器绘制】



### 问题点3：mouseenter和mouseover


+ mouseover 支持事件冒泡，当鼠标移入元素或子元素都会触发事件
+ mouseenter 不支持事件冒泡，当鼠标移入元素本身（不包含元素的子元素）会触发事件



```javascript
// mouseenter只要进来不管它在子元素哪里滑动都不算离开，mouseover不行
template: `<div class="pagination" @mouseenter="stopTimer(true)" @mouseleave="stopTimer()"></div>`,
```



## HTML代码


```html
<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
	<title>轮播图</title>
	<link rel="stylesheet" href="css/reset.min.css">
	<link rel="stylesheet" href="css/banner.css">
</head>

<body>
	<div id="app">
		<banner-plugin v-if="bannerData.length" :data="bannerData" :interval="1000" :transitionend="transitionend"></banner-plugin>
		<p>已经切换到第<span v-text="temp"></span>张</p>
	</div>
</body>

<script src="./js/axios.min.js"></script>
<script src="./js/axios.defaults.js"></script>
<script src="./js/vue.js"></script>
<script src="./js/banner.js"></script>

</html>
```



## JS代码


```javascript
// 左右切换按钮
const BannerButton = {
    template: `<div>
        <a href="javascript:;" class="button-prev" @click="change('left')"></a>
        <a href="javascript:;" class="button-next" @click="change('right')"></a>
    </div>`,
    methods: {
        change(dir) {
            this.$emit("handle", dir);
        },
    },
};
// 分页器
const BannerPagination = {
    // 只要进来不管它在子元素哪里滑动都不算离开
    template: `<div class="pagination">
        <span :class="{active:activeHandle(i)}" v-for="(item,i) in arr" @click="change(i)"></span>
    </div>`,
    props: ["total", "index"],
    data() {
        return {
            // vue是可以循环数字的，可以直接写 v-for=""item in total
            arr: new Array(this.total).fill(null),
        };
    },
    methods: {
        activeHandle(i) {
            // i：当前循环这一项的索引
            let temp = this.index === this.total ? 0 : this.index;
            return i === temp;
        },
        change(i) {
            this.$emit("pagination", i);
        },
    },
};
// 轮播图组件
const BannerPlugin = {
    template: `<section class="container" @mouseenter="stopTimer(true)" @mouseleave="stopTimer()">
        <div class="wrapper" :style="sty" ref="wrapper">
            <div class="slide" v-for="item in bannerData">
                <img :src="item.pic" alt="">
            </div>
        </div>
        <banner-pagination v-if="pagination" :total="bannerData.length-1" @pagination="handlePagination" :index="activeIndex">
        </banner-pagination>
        <banner-button v-if="button" @handle="handleButton">
        </banner-button>
    </section>`,
    data() {
        // 把传递进来的数据第一张克隆一份放到末尾
        let bannerData = [...this.data, this.data[0]],
            // 当前选中的slide索引
            activeIndex = this.initialslide;
        return {
            bannerData,
            activeIndex,
            // wrapper的样式
            sty: {
                width: bannerData.length * 1000 + "px",
                left: -activeIndex * 1000 + "px",
                transition: `left ${this.speed}ms linear`,
            },
        };
    },
    components: {
        BannerPagination,
        BannerButton,
    },
    // 传递属性的校验（当前轮播图组件支持的参数配置）
    props: {
        // 轮播图的数据[{id:1,pic:"xxx.png",content:""},...]
        data: {
            type: Array,
            required: true,
        },
        // 初始展示索引
        initialslide: {
            type: Number,
            default: 0,
        },
        // 运动间隔（如果值为0则为不开启自动轮播）
        interval: {
            type: Number,
            default: 3000,
        },
        // 每一次运动动画的时间
        speed: {
            type: Number,
            default: 200,
        },
        // 是否设置分页器（默认一旦设置分页器，点击分页器也能实现切换）
        pagination: {
            type: Boolean,
            default: true,
        },
        // 是否设置左右导航
        button: {
            type: Boolean,
            default: true,
        },
        // 初始化成功的钩子函数
        init: {
            type: Function,
            default: Function.prototype, // 空函数
        },
        // 切换完成后的钩子函数
        transitionend: {
            type: Function,
            default: Function.prototype,
        },
    },
    methods: {
        autoMove() {
            this.activeIndex++;
            if (this.activeIndex >= this.bannerData.length) {
                this.sty.transition = `left 0ms linear`;
                this.sty.left = "0px";
                this.activeIndex = 1;
                // vue优化机制，都是让响应式数据改变，vue没有重新渲染
                // this.$forceUpdate(); // 强制更新不能实现多次渲染，它也是通知组件更新（可以将强制更新视为异步，需要跳过这步执行同步代码）
                // 浏览器有一个优化机制，如果从上往下都是写操作，没有读操作，浏览器会等待所有写操作完成之后再渲染
                // 回调函数会在本次修改数据后，DOM视图重新渲染完成之后执行
                this.$nextTick(() => {
                    // Vue 虚拟DOM渲染完成，vue 事情做完，剩下需要浏览器去渲染，所以走到$nextTick回调函数的时候，浏览器还没有真正将其放入视图
                    this.$refs.wrapper.offsetLeft;
                    this.sty.transition = `left ${this.speed}ms linear`;
                    this.sty.left = -this.activeIndex * 1000 + "px";
                });
                return;
            }
            this.sty.transition = `left ${this.speed}ms linear`;
            this.sty.left = -this.activeIndex * 1000 + "px";
        },
        stopTimer(lx) {
            if (lx) {
                clearInterval(this.autoTimer);
                this.autoTimer = null;
                return;
            }
            this.autoTimer = setInterval(this.autoMove, this.interval);
        },
        handleButton(dir) {
            if (dir === "right") {
                this.autoMove();
                return;
            }
            this.activeIndex--;
            if (this.activeIndex < 0) {
                this.sty.transition = `left 0ms linear`;
                this.sty.left = -(this.bannerData.length - 1) * 1000 + "px";
                this.activeIndex = this.bannerData.length - 2;
                this.$nextTick(() => {
                    this.$refs.wrapper.offsetLeft;
                    this.sty.transition = `left ${this.speed}ms linear`;
                    this.sty.left = -this.activeIndex * 1000 + "px";
                });
                return;
            }
            this.sty.transition = `left ${this.speed}ms linear`;
            this.sty.left = -this.activeIndex * 1000 + "px";
        },
        handlePagination(i) {
            this.activeIndex = i;
            this.sty.transition = `left ${this.speed}ms linear`;
            this.sty.left = -this.activeIndex * 1000 + "px";
        },
    },
    // 第一次组件渲染完成，开始自动轮播
    mounted() {
        this.autoTimer = setInterval(this.autoMove, this.interval);
        // 一般认为数据绑定成功就算是初始化完成
        // 触发init钩子函数执行
        this.init();
    },
    updated() {
        // 触发切换完的钩子函数执行
        this.transitionend(this);
    },
};

let vm = new Vue({
    el: "#app",
    data: {
        bannerData: [],
        temp: 1,
    },
    created() {
        axios.get("/banner").then((result) => {
            let { code, data } = result;
            if (code == 0) {
                this.bannerData = data;
            }
        });
    },
    components: {
        BannerPlugin,
    },
    methods: {
        transitionend(example) {
            if (example.activeIndex + 1 == example.bannerData.length) {
                this.temp = 1;
                return;
            }
            this.temp = example.activeIndex + 1;
        },
    },
});
```

