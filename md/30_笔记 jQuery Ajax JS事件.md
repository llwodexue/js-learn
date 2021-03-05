[toc]

# 30\_笔记

## jQuery

### Ajax

参数：

- url：用来发送请求的URL字符串

选项（可选的）：

- type：（默认 GET），请求方式："GET"或”POST“
- async：（默认：true）默认所有请求均为异步请求，如果需要发送同步请求，将此选项设置为 false
- success：请求成功后的回调函数

```js
let getData = () => {
    $.ajax({
        url: './banner.json',
        type: 'GET',
        async: false,
        success: (res) => {
            data = res;
        }
    })
};
```

### 封装简易版Ajax

- 其实就是解构赋值

```js
function ajax(params) {
    let {
        url,
        type = 'get',
        async = true,
        success = () => {}
    } = params;
    let xhr = new XMLHttpRequest();
    xhr.open(type, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            success(JSON.parse(xhr.response))
        }
    }
    xhr.send()
}
let a = {
    url: './banner.json',
    type: 'get',
    async: false,
    success: (res) => {
        data = res;
    }
}
ajax(a)
```

### 轮播图渐隐渐现

渐隐渐现轮播图： 让五张图片叠加到一起，如果想让哪一张显示，需要让当前的透明度逐渐变成1；显示这一张透明度变成0

#### HTML

```html
<div id="outer">
    <div id="wrapper"></div>
    <ul id="list"></ul>
    <a href="javascript:;" id="left"> < </a>
    <a href="javascript:;" id="right"> > </a>
</div>
```

#### CSS

```CSS
*{
    margin: 0;
    padding: 0;
}
ul{
    list-style: none;
}
a{
    text-decoration: none;
}
#outer{
    width:600px;
    height:300px;
    margin:100px auto;
    position: relative;
}
#outer #wrapper{
    width:600px;
    height:300px;
}
#outer #wrapper img{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    display: none;
}
#outer #wrapper img:nth-child(1){
    display: block;
}
#outer ul{
    width:150px;
    height:30px;
    position: absolute;
    bottom: 10px;
    left:50%;
    margin-left: -75px;
}
#outer ul li{
    width:25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
    background: pink;
    float: left;
}
#outer ul li.select{
    background: red;
}
#outer a{
    display: inline-block;
    width:20px;
    height:40px;
    background: black;
    line-height: 40px;
    text-align: center;
    color:white;
    font-size: 20px;
    position: absolute;
    top:50%;
    margin-top:-20px;
}
#outer #right{
    right:0;
}
```

#### JS

```js
(function () {
    let data = null;
    let timer = null;
    let step = 0;
    // 1.获取数据
    let getData = () => {
        $.ajax({
            url: './banner.json',
            type: 'get',
            async: false,
            success: (res) => {
                data = res;
            }
        })
    };
    getData();
    // 2.数据渲染
    let bindHtml = () => {
        let imgs = '';
        let lis = '';
        $.each(data, function (index, item) {
            imgs += ` <img src="${item.img}" alt="">`;
            lis += `<li></li>`
        });
        $('#wrapper').html(imgs);
        $('#list').html(lis)
    }
    bindHtml();

    // 3.启动定时器，完成轮播
    let autoMove = () => {
        step++;
        if (step == 5) {
            step = 0;
        }
        changeFocus();
        $("img").eq(step).fadeIn().siblings().fadeOut()
    }
    timer = setInterval(autoMove, 1000);

    // 4.实现焦点跟随
    let changeFocus = () => {
        // eq通过索引扎到某一个li
        // eq：获取的事jq版的元素
        // get：获取原生版的元素
        // index：获取当前元素在自己兄弟姐妹中的索引（纯数字）
        $("#list li").eq(step).addClass("select").siblings().removeClass("select");
    }
    changeFocus();

    // 5. 鼠标划上停止动画
    $("#outer").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(autoMove, 1000);
    })

    // 6.划上li，显示对应的图片
    $("#list li").hover(function () {
        let index = $(this).index();
        step = index - 1;
        autoMove();
    })

    // 7.实现左右点击
    $("#right").click(function () {
        autoMove();
    })
    $("#left").click(function () {
        step -= 2;
        if (step == -2) {
            step = data.length - 2;
        }
        autoMove();
    })
})()
```

## JS事件

事件：元素天生自带的默认行为

### 鼠标事件

| 鼠标事件   | 行为         |
| ---------- | ------------ |
| click      | 点击         |
| dblclick   | 双击         |
| mousedown  | 鼠标按下     |
| mouseup    | 鼠标抬起     |
| mousemove  | 鼠标移动     |
| mouseover  | 鼠标滑过     |
| mouseout   | 鼠标滑出     |
| mouseenter | 鼠标进入     |
| mouseleave | 鼠标离开     |
| mousewheel | 鼠标滚轮滚动 |

### 键盘事件

| 键盘事件 | 行为                                                |
| -------- | --------------------------------------------------- |
| keydown  | 按下某个键                                          |
| keyup    | 抬起某个键                                          |
| keypress | 除 Shift/Fn/CapsLock 键以外，其它键按住（连续触发） |

### 移动端手指事件

| 移动端手指事件                | 行为       |
| ----------------------------- | ---------- |
| touchstart                    | 手指按下   |
| touchmove                     | 手指移动   |
| touchend                      | 手指松开   |
| touchcancel                   | 操作取消   |
| gesturestart                  | 多手指按下 |
| gesturechange / gestureupdate | 多手指移动 |
| gestureend                    | 多手指松开 |
| gesturecancel                 | 多手指取消 |

### 表单常用事件

- 在键盘上，每一个键盘的键都有一个对应的 keyCode ;根据 keyCode 可以判断当前点击的是哪一个键

| 表单常用事件 | 行为                         |
| ------------ | ---------------------------- |
| focus        | 获取焦点                     |
| blur         | 失去焦点                     |
| change       | 内容改变                     |
| input        | 用户输入时触发               |
| onkeydown    | 键盘按下时，获取到上一次的值 |
| onkeyup      | 键盘抬起时，获取到最新的值   |

### 音视频事件

| 音视频事件     | 行为                                         |
| -------------- | -------------------------------------------- |
| canplay        | 可以播放（资源没有加载完，播放中可能会卡顿） |
| canplaythrough | 可以播放（资源已经加载完，播放中不会卡顿）   |
| play           | 开始播放                                     |
| playing        | 播放中                                       |
| pause          | 暂停播放                                     |

### 其他常用事件

| 其他常用事件     | 行为                 |
| ---------------- | -------------------- |
| load             | 资源加载完           |
| unload           | 资源卸载             |
| beforeunload     | 当前页面关闭之前     |
| error            | 资源加载失败         |
| scroll           | 滚动事件             |
| readystatechange | AJAX请求状态改变事件 |
| contextmenu      | 鼠标右键触发         |

## 事件绑定

### DOM 0 级事件

**特点：只能给当前元素某一个事件绑定一个方法**

卸载对应的方法：赋值为null

```js
// 只能生效一个onclick方法
box.onclick = () => console.log(1);
box.onclick = () => console.log(2);
// 2

// 清空该元素onclick方法
box.onclick = null;
```

### DOM 2 级事件

**特点：可以给当前元素某一个事件绑定多个方法，不过该事件不可以绑定同一个方法**

用法：`元素.addEventListener(事件，函数，布尔值)`

- 把当前 addEventListener 执行时候传递的函数放到对应的事件池中，依次按照顺序执行
- 同一个元素，同一个事件类型，在事件池只能存储一次，不能重复存储

```js
let fn1 = () => console.log(1);
let fn2 = () => console.log(2);
box.addEventListener("click", fn1);
box.addEventListener("click", fn2);
box.addEventListener("click", fn1);
// 1 2
```

load 和 DOMContentLoaded区别：

```js
// 等到当前页面的DOM加载完成之后才会执行
window.addEventListener("load", () => console.log(4));
// 等到页面中所有资源全部加载完成之后才执行
window.addEventListener("DOMContentLoaded", () => console.log(3));
// 3 4
```

### hasAttribute()

- 检查元素是否存在指定属性，有则返回 true，否则返回 false

**实现一个 $attr(name, value)遍历**

- 属性为 name
- 值为 value 的元素集合

```js
function attr(name, value) {
    let res = [];
    let reg = new RegExp(`\\b${value}\\b`);
    let all = Array.from(document.getElementsByTagName("*"));
    all.forEach((item, index) => {
        if (item.hasAttribute(name) && reg.test(item.getAttribute(name))) {
            res.push(item);
        }
    });
    return res;
}
```

