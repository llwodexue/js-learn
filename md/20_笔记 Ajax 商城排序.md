[toc]

# 20\_笔记

## Ajax 四部曲

1. 创建 ajax 实例 

   ```js
   var xhr = new XMLHttpRequest();
   ```

2. 初始化一个请求  async（可选）：true（默认）异步 false 同步

   ```js
   xhr.open("get", "data/data.json", false)
   ```

3. 当 `readyState` 值改变的时候，调用回调函数

   ```js
   xhr.onreadystatechange = function () {
       if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           console.log(xhr.responseText);
       }
   };
   // DONE 下载操作已完成
   xhr.onload = function () {
       console.log('DONE', xhr.readyState); // readyState 为 4
   };
   // Done 的状态码为 200
   xhr.onload = function () {
     console.log('DONE', xhr.status); // DONE（完成） 200
   };
   ```

4. 发送 HTTP 请求，如果是异步请求，会在请求发送后立即返回；如果是同步请求，直到响应到达后才会返回

   ```js
   xhr.send();
   ```

## 商城排序案例

### 请求数据

- 创建全局变量  data 存放请求到的数据

```js
var data = null;
var xhr = new XMLHttpRequest();
xhr.open("get", "data/data.json");
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText);
        Init(data);
    }
};
xhr.send();
```

### 渲染 li 标签

- 获取 ul 以便让每一个 li 渲染到页面

```js
var lists = document.querySelector(".lists");
var lis = null;
```

- 把每一个 li 渲染到页面上

  这里为了操作方便，给每一个 li 绑定自定义属性，之后根据属性值获取其中内容 `li.getAttribute(...)` 即可

  如果不这样做，则需要通过 `li.querySelector(...).innerText` 获取

  **注意：**`querySelectorAll` 获取到的是类数组，因为需要进行排序，使用数组的 sort() 方法，所以需要用 `[].slice.call()` 或 `Array.from` 转换成数组

```js
function Init(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        const el = data[i];
        str += `<li time="${el.time}" hot="${el.hot}" price="${el.price}">
        <img src="${el.img}" alt="">
        <p class="title">${el.title}</p>
        <p class="time">${el.time}</p>
        <p class="info">
            <span class="price">${el.price}</span>
            <span class="hot">${el.hot}</span>
        </p>
    </li>`;
    }
    lists.innerHTML = str;
    lis = [].slice.call(lists.querySelectorAll("li"));
}
```

### 点击 a 标签进行排序

- 获取 a 标签

```js
var links = document.querySelectorAll(".top a");
```

- 给 a 标签添加鼠标点击事件

  为实现每次排序都是上一次的倒序，需要给每一个 a 标签添加一个自定义属性作为标志 `links[i].flag = -1` ，flag 值为1代表升序，每次点击事件只需 flag 取反即可 `this.flag *= -1`

  **注意：** sort() 方法中回调函数 this 指向 window，所以需要用一个变量存储 this `var that = this;`

```js
for (let i = 0; i < links.length; i++) {
    links[i].flag = -1;
    links[i].onclick = function () {
        this.flag *= -1;
        let that = this;
        let sortFlag = this.getAttribute("sortFlag");
        if (sortFlag == "time") {
            lis.sort(function (a, b) {
                return (a.getAttribute(sortFlag).replace(/-/g, "") - b.getAttribute(sortFlag).replace(/-/g, "")) * that.flag;
            });
        } else {
            lis.sort(function (a, b) {
                return (a.getAttribute(sortFlag) - b.getAttribute(sortFlag)) * that.flag;
            });
        }
        for (let i = 0; i < lis.length; i++) {
            lists.appendChild(lis[i])
        }
    };
}

```

### 点击 a 标签点亮排序箭头

- 升/降序高亮对应箭头字体图标

```js
let arrows = this.querySelectorAll("b");
let arrCur = document.querySelectorAll(".top b.current");
for (let i = 0; i < arrCur.length; i++) {
    arrCur[i].classList.remove("current");
}
if (this.flag == 1) {
    arrows[0].classList.add("current");
} else {
    arrows[1].classList.add("current");
}
```

### 优化

- for 每进行一次循环都会引起浏览器的回流，非常耗性能

```js
for (let i = 0; i < lis.length; i++) {
    lists.appendChild(lis[i]);
}
```

- 可以使用 `DocumentFragment` 来创建一个新的空白的文档片段，把元素附加到这个文档片段中，之后通过这个文档片段附加到 DOM 树

  因为**文档片段存在内存中**，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面回流。因此，使用文档片段会带来更好的性能

```js
let frg = document.createDocumentFragment();
for (let i = 0; i < lis.length; i++) {
    frg.appendChild(lis[i]);
}
lists.appendChild(frg)
```

- 如果希望点击完当前a标签，再点击其他a标签时都是升序排列的话，需要每次都将其他标签的flag设置为-1

```js
for (let i = 0; i < links.length; i++) {
    if (links[i] != this) {
        links[i].flag = -1;
    }
}
```

## 完整代码

### HTML

```html
<div class="main">
    <div class="top">
        <span>排序</span>
        <a href="javascript:;" sortFlag="time">
            <span>上架时间</span>
            <div class="arrows">
                <b class="iconfont icon-shang arrowUp"></b>
                <b class="iconfont icon-xiajiantou arrowDown"></b>
            </div>
        </a>
        <a href="javascript:;" sortFlag="hot">
            <span>热度</span>
            <div class="arrows">
                <b class="iconfont icon-shang arrowUp"></b>
                <b class="iconfont icon-xiajiantou arrowDown"></b>
            </div>
        </a>
        <a href="javascript:;" sortFlag="price">
            <span>价格</span>
            <div class="arrows">
                <b class="iconfont icon-shang arrowUp"></b>
                <b class="iconfont icon-xiajiantou arrowDown"></b>
            </div>
        </a>
    </div>
    <ul class="lists"></ul>
</div>
```

### CSS

```css
body {
    background: lavender;
}
.main {
    width: 1200px;
    margin: 0 auto;
}
.main .top {
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    width: 1185px;
}
.main .sortBtn {
    display: flex;
    align-items: center;
    margin: 0 10px;
    color: blue;
}
.main .sortBtn .arrows {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    color: #333333;
}
.sortBtn:hover > span {
    color: red;
}
.lists {
    display: flex;
    flex-wrap: wrap;
}
.lists li {
    width: 225px;
    background: #fff;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
    margin-right: 15px;
    line-height: 30px
}
.lists li img {
    width: 140px;
    display: block;
    margin: 0 auto;
}
.numInfo {
    display: flex;
    justify-content: space-between;
}
.arrowUp.current,
.arrowDown.current{
    color: red;
}
```

```css
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1607059145201'); /* IE9 */
  src: url('iconfont.eot?t=1607059145201#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAJ8AAsAAAAABlQAAAIwAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgo4VAE2AiQDDAsIAAQgBYRtBzwboAUR1YtLsh+HsWM689MtFlfbYpoModPEf44gWrOqdyZ7CO5eASokUICgXIT7d0BCkUTSCYDNuR7YqAg1kju/+SdfSGmQXZo9+DyX05tABzK/nZ3jXXPSWOP5US/AOKCA9sYosiIKgBvGLnAJjwk06me4mDVn0Sr1MmtVIA7t37tdfS4ty6xWL5Q1B7N4qKK+uFW84kH4/fg6IuopVBJr47I9s3eZ9qHnQzVdrF3c5BMyBHi8goThyMSW2vI6STAuaXTk9tZSFoq5crVaqOmucqd/vIIoWd3NYDCsFHzocRWCD9UjCpBAma+WaEVs93UhUjrTunvt3t2j/0x4tDm7/uSkFbIN/kzaWkyAdLqYLhBMvTPLbm2b9L++KYM3Pz8+D31Zvyj1O4gEP0Tv2Zd1sxVMWdVczXQl1kqBRj2mZsU7vR9vOrXmx+v1jIjW6UuR1OtPZnY4KpqMQqneVDQaZu7xJl0OSyI3YKhrAKFdFYVWj5G0e01m9h0qen1HqT0SGq2JrgubDAw53mYyKkEL+g/R0OycsNyi3jv6dVScNYf8GznHHNRFVaz1OCPPsSV/fCPiwDFN0IHncBwJFqaERoogsrRl6ereVBiaNjczGZWgBf2HaGh2/nC5lT5/R7+OilsMNfUbOcfxoS6qHmTvmHsZ7uWV/PGNiAPHNEEH5uE4Eiz18xIaKcKI4tKW9iDX11Gs75q+7wg0sianKCJF1ngyquTMnIXW45GgZr/ZAAAA') format('woff2'),
  url('iconfont.woff?t=1607059145201') format('woff'),
  url('iconfont.ttf?t=1607059145201') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1607059145201#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-xiajiantou:before {
  content: "\e615";
}

.icon-shang:before {
  content: "\e6af";
}
```

### JS

```js
var lists = document.querySelector(".lists");
var links = document.querySelectorAll(".top a");
var data, lis;
var xhr = new XMLHttpRequest();
xhr.open("get", "data/data.json");
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText);
        Init(data);
    }
};
xhr.send();
function Init(data) {
    var str = "";
    for (let i = 0; i < data.length; i++) {
        const el = data[i];
        str += `<li time="${el.time}" hot="${el.hot}" price="${el.price}">
        <img src="${el.img}" alt="">
        <p class="title">${el.title}</p>
        <p class="time">${el.time}</p>
        <p class="info">
            <span class="price">${el.price}</span>
            <span class="hot">${el.hot}</span>
        </p>
    </li>`;
    }
    lists.innerHTML = str;
    lis = [].slice.call(lists.querySelectorAll("li"));
}
for (let i = 0; i < links.length; i++) {
    links[i].flag = -1;
    links[i].onclick = function () {
        for (let i = 0; i < links.length; i++) {
            if (links[i] != this) {
                links[i].flag = -1;
            }
        }
        this.flag *= -1;
        var that = this;
        var sortFlag = this.getAttribute("sortFlag");
        var arrows = this.querySelectorAll("b");
        var arrCur = document.querySelectorAll(".top b.current");
        for (let i = 0; i < arrCur.length; i++) {
            arrCur[i].classList.remove("current");
        }
        if (this.flag == 1) {
            arrows[0].classList.add("current");
        } else {
            arrows[1].classList.add("current");
        }
        var frg = document.createDocumentFragment();
        if (sortFlag == "time") {
            lis.sort(function (a, b) {
                return (
                    (a.getAttribute(sortFlag).replace(/-/g, "") -
                        b.getAttribute(sortFlag).replace(/-/g, "")) *
                    that.flag
                );
            });
        } else {
            lis.sort(function (a, b) {
                return (
                    (a.getAttribute(sortFlag) - b.getAttribute(sortFlag)) *
                    that.flag
                );
            });
        }
        for (let i = 0; i < lis.length; i++) {
            frg.appendChild(lis[i]);
        }
        lists.appendChild(frg);
    };
}
```

### data.json

```json
[
    {
        "id": 1,
        "title": "HUAWEI全网通版（亮黑色）",
        "price": 499,
        "time": "2017-03-15",
        "hot": 198,
        "img": "img/1.jpg"
    },
    {
        "id": 2,
        "title": "HUAWEI（曜石黑）",
        "price": 129,
        "time": "2017-02-08",
        "hot": 25,
        "img": "img/2.jpg"
    },
    {
        "id": 3,
        "title": "华为畅享7（香槟金）",
        "price": 895,
        "time": "2017-01-25",
        "hot": 568,
        "img": "img/3.jpg"
    },
    {
        "id": 4,
        "title": "HUAWEI全网通版（曜石黑）",
        "price": 1895,
        "time": "2016-12-30",
        "hot": 20000,
        "img": "img/4.jpg"
    },
    {
        "id": 5,
        "title": "HUAWEI全网通版（玫瑰金）",
        "price": 3587,
        "time": "2016-01-30",
        "hot": 1032654,
        "img": "img/5.jpg"
    },
    {
        "id": 6,
        "title": "华为畅享7（香槟金）",
        "price": 992,
        "time": "2018-01-01",
        "hot": 1,
        "img": "img/6.jpg"
    },
    {
        "id": 7,
        "title": "HUAWEI全网通版（樱语粉）",
        "price": 564,
        "time": "2017-02-19",
        "hot": 400,
        "img": "img/7.jpg"
    },
    {
        "id": 8,
        "title": "HUAWEI全网通版（曜石黑）",
        "price": 420,
        "time": "2017-01-25",
        "hot": 240,
        "img": "img/8.jpg"
    },
    {
        "id": 9,
        "title": "HUAWEI P10（钻雕金）",
        "price": 12,
        "time": "2014-01-01",
        "hot": 12345678,
        "img": "img/9.jpg"
    },
    {
        "id": 10,
        "title": "HUAWEI全网通版（曜石黑）",
        "price": 420,
        "time": "2017-01-25",
        "hot": 240,
        "img": "img/8.jpg"
    }
]
```

## 参考

[XMLHttpRequest.onreadystatechange](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange)

[XMLHttpRequest.readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)

[XMLHttpRequest.status](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/status)

[XMLHttpRequest.send](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)

[Document.createDocumentFragment()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)