[toc]

# 24\_笔记

## 元素计算样式

`ele.style` 只能获取行间样式

- 获取的值都是字符串类型
- 样式的名字必须是驼峰命名法

`getComputedStyle` 获取当前元素计算后的样式（只能获取不能设置）

- window 上的方法
- 用法：`getComputedStyle(ele, "伪类")` 
- 返回值：一个对象，对象就是当前元素所有计算后的样式
- 如果当前元素的样式名不是一个单词，用驼峰命名来获取
- IE6-8 不兼容，可以使用 `ele.currentStyle` 来获取

## 封装获取或设置样式的方法

### getCss

```js
function getCss(ele, attr) {
    var val = null;
    if ("getComputedStyle" in window) {
        val = getComputedStyle(ele)[attr];
    } else {
        val = ele.currentStyle[attr];
    }
    var reg = /^(width|height|padding|margin|fontSize|lineHeight|left|top|right|bottom|opacity|)$/;
    if (reg.test(attr)) {
        val = parseFloat(val);
    }
    return val;
}
```

### setCss

```js
function setCss(ele, attr, val) {
    var reg = /^(width|height|padding|margin|fontSize|lineHeight|left|top|right|bottom|opacity|)$/;
    if (reg.test(attr)) {
        if (Number(val)) {
            val = val + "px";
        }
    }
    ele.style[attr] = val;
}
```

### setGroupCss

for...in 循环可以遍历可枚举的属性

- 当前对象的私有属性和对象原型上添加的属性都是可枚举属性

```js
function setGroupCss(ele, obj) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(ele)) return;
        setCss(ele, key, obj[key]);
    }
}
```

### css

```js
function css() {
    var [ele, attr, val] = arguments;
    if (arguments.length < 3) {
        if (typeof attr == "string") {
            return getCss(ele, attr);
        } else {
            setGroupCss(ele, attr);
        }
    } else {
        setCss(ele, attr, val);
    }
}
```

## 多张图片延迟加载

### getElementsByClassName 与 querySelectorAll问题

 `getElementsByClassName` 返回对象是动态的 HTMLCollection

 - 动态 添加/删除 元素 HTMLCollection 的长度会产生变化
   - 把最后一个 li，从 ul 中删除，lis的长度 -1
   - 删除的属性，lis 中访问不到

 ```html
 <ul id="lists">
     <li class="bg">1</li>
     <li>2</li>
     <li>3</li>
     <li id="end">4</li>
 </ul>
 <script>
     var lis = document.getElementsByTagName("li");
     lis[0].classList.remove("bg");
     lists.removeChild(end);
     console.log(lis.length); // 3
     console.log(lis[0].classList); // DOMTokenList [value: ""]
 </script>
 ```

 `querySelectorAll` 返回对象是静态 NodeList

 - 动态 添加/删除 元素 NodeList 的长度不会产生变化
   - 把最后一个 li，从 ul 中删除，lis的长度并没有 -1
   - 删除的属性，lis 中访问不到

 ```html
 <ul id="lists">
     <li class="bg">1</li>
     <li>2</li>
     <li>3</li>
     <li id="end">4</li>
 </ul>
 <script>
     var lis = document.querySelectorAll("li");
     lis[0].classList.remove("bg");
     lists.removeChild(end);
     console.log(lis.length); // 4
     console.log(lis[0].classList); // DOMTokenList [value: ""]
 </script>
 ```



### flex问题

align-item：`stretch`（默认）如果**项目未设置高度或设为 auto**，将占满整个容器高度

- 这里给 ul 不设置高度，让 ul 靠内容去撑起

```html
<div id="container">
    <ul></ul>
    <ul></ul>
    <ul></ul>
    <ul></ul>
</div>
<style>
    #container {
        width: 1200px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
    }
    ul {
        width: 24%;
        margin: 0 0.5%;
    }
</style>
```

- 如果想动态给 ul 添加内容，采用 sort 方法会出现问题

  因为项目没有设置高度，且容器没有设置 align-item，ul 占满整个容器高度，这四个 ul 的高度会保持一致，sort 的效果无法升序（ul 的高度一致）

```js
let uls = [].slice.call(document.getElementsByTagName("ul"));
uls.sort((a, b) => {
    return a.scrollHeight - b.scrollHeight;
});
uls[0].appendChild(li);
```

### 基础代码结构

```html
<div id="container" class="container">
    <ul></ul>
    <ul></ul>
    <ul></ul>
    <ul></ul>
</div>
<style>
    .container {
        width: 1200px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
    }
    ul {
        height: 0;
        width: 24%;
        margin: 0 0.5%;
        list-style: none;
    }
    ul li {
        width: 100%;
        background: #fff;
        margin-top: 10px;
    }
    ul li img {
        display: block;
        width: 100%;
        height: 300px;
        background: url(img/time.gif) center center no-repeat;
        background-size: 60px 60px;
    }
</style>
```

### JS代码

**Ajax 请求**

- `getElementsByClassName` 取到的元素（对象）存在映射关系

  通过类数组转数组的方法，映射关系就断了

  失去映射关系，动态更改 ul 数量，数组中的数量不会进行改变

  但是数组中存的还是之前获取到的那些元素（对象存在堆内存中）的空间地址

  所以 `uls[0].appendChild(li)` 还是往里添加元素

```js
let uls = document.getElementsByTagName("ul");
// 现在的元素已经不是原生获得的了，所以也没有映射功能
uls = [].slice.call(uls);
let data = null;
let page = 1;
function getData(num) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "data.txt?page=" + num, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
    renderHtml(data);
}
getData(page);
```

**动态渲染数据**

```js
function renderHtml(data) {
    for (let i = 0; i < 20; i++) {
        // 随机产0-9之间的整数
        let index = Math.round(Math.random() * 9);
        // 从data中随机获取一组图片
        let curImg = data[index];
        let li = document.createElement("li");
        let img = document.createElement("img");
        let p = document.createElement("p");
        // 把图片真实路径放到img元素行间
        img.setAttribute("true-img", curImg.src);
        img.style.height = Math.round(Math.random() * (250 - 180) + 180) + "px";
        img.className = "bg";
        p.innerText = curImg.title;
        li.appendChild(img);
        li.appendChild(p);
        uls.sort((a, b) => {
            return a.scrollHeight - b.scrollHeight;
        });
        uls[0].appendChild(li);
    }
}
let imgs = document.getElementsByClassName("bg");
```

**显示图片**

```js
function delay() {
    for (let i = 0; i < imgs.length; i++) {
        delayImg(imgs[i]);
    }
}
function delayImg(img) {
    let winH = utils.win("clientHeight");
    let winT = utils.win("scrollTop");
    let imgH = img.offsetHeight;
    let imgT = utils.offset(img).top;
    if (winH + winT >= imgH + imgT) {
        let trueSrc = img.getAttribute("true-img");
        let newImg = new Image();
        newImg.src = trueSrc;
        newImg.onload = function () {
            img.src = trueSrc;
            img.className = "";
        };
    }
}
// 刚进页面时先渲染一次
delay();
```

**瀑布流**

```js
function isLoad() {
    // 当浏览器滚动条卷曲的高度+浏览器可视区的高度>=body真实高度，说明滚动条到底了
    let winH = utils.win("clientHeight");
    let winT = utils.win("scrollTop");
    let bodyH = utils.win("scrollHeight");
    // 当滚动条即将要跑到底部后，马上请求去拿到下一页的数据
    if (winH + winT + 100 >= bodyH) {
        page += 1;
        getData(page);
    }
}
window.onscroll = function () {
    delay();
    isLoad();
};
```



## 参考

[getElementsByClassName 和querySelectorAll的正确对比](https://zhuanlan.zhihu.com/p/156011481)