[toc]

# 08\_笔记

## Math方法

### Math.abs() 求绝对值

### Math.ceil() 向上取整

- 无论正负，永远取最大的

```js
Math.ceil(1.2)   // 2
Math.ceil(-1.2)  // -1
```

### Math.floor() 向下取整

- 无论正负，永远取最小的

```js
Math.floor(1.5)  // 1
Math.floor(-1.5) // -2
```

### Math.round() 四舍五入

```js
Math.round(1.5)  // 2
Math.round(-1.5) // -1
Math.round(-1.6) // -2
```

### Math.sqrt() 开平方

### Math.pow(n, m) 取幂

### Math.PI

### Math.max() 最大值

### Math.min() 最小值

```js
var arr = [1, 7, 5, 3];
Math.max(arr);   // NaN
Math.max(...arr) // 7
```

### Math.random() 随机数

- 获取 [0-1) 之间的随机数

- 获取 n-m 之间的随机数：`Math.random()*(m-n)+n`

- 取[min, max] 的随机整数

  ```js
  Math.floor(Math.random() * (max - min + 1) + min);
  ```

- 取[min, max) 的随机整数

  ```js
  Math.floor(Math.random() * (max - min) + min);
  ```

- 取(min, max] 的随机整数

  ```js
  Math.floor(Math.random() * (max - min) + min + 1);
  ```

## 验证码案例

- 首先生成一下验证码字符串

```js
var str = "";
for (var i = 0; i < 10; i++) {
    str += String.fromCharCode(48 + i);
}
for (var i = 0; i < 26; i++) {
    str += String.fromCharCode(97 + i);
    str += String.fromCharCode(65 + i);
}
console.log(str); // 0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ
console.log(str.length); // 62
```

- 生成不重复的验证码（使用 while 循环）

```html
<input type="text" />
<button>获取验证码</button>

<script>
    var input = document.getElementsByTagName("input")[0];
    var btn = document.getElementsByTagName("button")[0];
    function getCode() {
        // str.length是62，索引是从0到61
        var str = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
        var res = "";
        // 生成验证码的数量
        while (res.length < 12) {
            var index = Math.round(Math.random() * (str.length - 1));
            // 生成不重复的验证码（不区分大小写）
            if (res.indexOf(str[index]) == -1) {
                res += str[index];
            }
        }
        return res;
    }
    // 点击之后生成新的验证码
    btn.onclick = function () {
        input.value = getCode();
    };
    // 刚进界面就显示验证码
    input.value = getCode();
</script>
```

## 常用 dom 方法

### getElementById

- 通过元素的 id 获取元素
- **id 名是唯一的**
- **它的上下文只能是 document**

### getElementsByTagName

- 在特定的上下文，通过标签名获取元素集合

### getElementsByClassName

- 在特定的上下文，通过类名获取元素集合

### getElementsByName

- 通过 name 名字获取一组元素集合
- **它的上下文只能是 document**

### querySelector("选择器")

- 通过选择器获取指定的元素，即使匹配多个，也只会对第一个起作用，获取到的是一个对象

### querySelectorAll("选择器")

- 通过指定的选择器获取一组节点组合

### document.head

- 获取 head 元素对象

### document.body

- 获取 body 元素对象

### document.documentElement

- 获取 html 元素对象

### 获取一屏幕宽高，兼容所有浏览器

```js
// 获取一屏幕高度
var vH = document.documentElement.clientHeight || document.body.clientHeight;
// 获取一屏幕宽度
var vW = document.documentElement.clientWidth || document.body.clientWidth;
```

## 节点

### 文档节点

- nodeType: 9
- nodeName: "#document"
- nodeValue: null

```js
document.nodeType  // 9
document.nodeName  // "#document"
document.nodeValue // null
```

### 属性节点

- nodeType: 2
- nodeName: 属性名
- nodeValue: 属性值

```html
<a href="http://www.baidu.com" id="a1">百度</a>
<script>
    var a1 = document.getElementById("a1");
    var a2=a1.getAttributeNode("href");  // 获取属性节点
    a1.nodeName  // "href"
    a1.nodeType  // 2
    a1.nodeValue // "http://www.baidu.com"
</script>
```

### 元素节点

- nodeType: 1
- nodeName: 大写的标签名
- nodeValue: null

```html
<a href="http://www.baidu.com" id="a1">百度</a>
<script>
    var a1 = document.getElementById("a1");
    a1.nodeName  // "A"
    a1.nodeType  // 1
    a1.nodeValue // null
</script>
```

### 文本节点

- nodeType: 3
- nodeName: "#text"
- nodeValue: 文本内容

```html
<div id="para">
    <!-- 注释节点 -->
    hello world
</div>
<script>
    var res = para.childNodes; // NodeList(3) [text, comment, text]
    res[2].nodeName  // "#text"
    res[2].nodeType  // 3
    res[2].nodeValue // "	hello world		"
</script>
```

### 注释节点

- nodeType: 8
- nodeName: "#comment"
- nodeValue: 注释的内容

```html
<div id="para">
    <!-- 注释节点 -->
    hello world
</div>
<script>
    var res = para.childNodes; // NodeList(3) [text, comment, text]
    res[1].nodeName  // "#comment"
    res[1].nodeType  // 8
    res[1].nodeValue // " 注释节点 "
</script>
```

## dom 操作

```html
<div id="main">
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
</div>
<script>
    var main = document.getElementById("main");
    var p = document.querySelectorAll("#main>p");
</script>
```

### parentNode

- 获取当前节点的父节点

### childNodes

- 获取当前节点的所有子节点

```js
main.childNodes  // NodeList(7) [text, p, text, p, text, p, text]
```

### children

- 获取当前元素所有的子元素（ie6-8不兼容）

```js
main.children  // HTMLCollection(3) [p, p, p]
```

### previousSibling

- 获取上一个哥哥节点

```js
p[1].previousSibling   // #text
```

### previousElementSibling

- 获取上一个哥哥元素节点（ie6-8不兼容）

```js
p[1].previousElementSibling   // <p>p1</p>
```

### nextSibling

- 获取下一个兄弟节点

```js
p[1].nextSibling   // #text
```

### nextElementSibling

- 获取下一个兄弟元素节点（ie6-8不兼容）

```js
p[1].nextElementSibling   // <p>p3</p>
```

### firstChild

- 获取第一个子节点

```js
main.firstChild   // #text
```

### firstElementChild

- 获取第一个子元素（ie6-8不兼容）

```js
main.firstElementChild    // <p>p1</p>
```

### lastChild

- 获取最后一个子节点

```js
main.lastChild    // #text
```

### lastElementChild

- 获取最后一个子元素（ie6-8不兼容）

```js
main.lastElementChild    // <p>p3</p>
```

## 封装 children 和 previousElementSibling

- 考虑兼容性问题

```html
<div id="main">
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
</div>
<script>
    var main = document.getElementById("main");
    var p = document.querySelectorAll("#main>p");
    var p0 = p[0];
    var p2 = p[2];
</script>
```

### 封装 children

```js
function children(el) {
    var res = el.childNodes;
    var arr = [];
    for (var i = 0; i < el.childNodes.length; i++) {
        if (res[i].nodeType == 1) {
            arr.push(res[i]);
        }
    }
    return arr;
}
console.log(children(main));  // [p, p, p]
```

### 封装 previousElementSibling

- 我最开始写的，但冗余度很高

```js
function PreviousElement(el) {
    if (!el) {
        return null;
    }
    while (true) {
        el = el.previousSibling;
        if (el.nodeType == 1) {
            return el;
        }
        if (el == null) {
            break;
        }
    }
}
console.log(PreviousElement(p2)); // <p>p2</p>
```

- 简化版

```js
function PreviousElement(el) {
    var elp = el.previousSibling
    while (elp && elp.nodeType != 1) {
        elp = elp.previousSibling
    }
    return elp;
}
console.log(PreviousElement(p2)); // <p>p2</p>
```

- 递归版

```js
function PreviousElement(el) {
    if (el.previousSibling.nodeType == 1) {
        return el.previousSibling;
    } else {
        return PreviousElement(el.previousSibling);
    }
}
console.log(PreviousElement(p2)); // <p>p2</p>
```

## dom 增删改

### createElement

- 创建一个元素

```js
var h5 = document.createElement("h5")
```

### createTextNode

- 创建一个文本节点

```js
var txt = document.createTextNode("hello world")
```

### [context].appendChild

- 把元素追加到一个容器末尾

```js
h5.appendChild(txt)
h5    // <h5>hello world</h5>
```

### [context].insertBefore

- 把一个元素插入另一个元素的前面
- insertBefore(newel, oldel)；把 newel 插入到 oldel 前面

```js
main.insertBefore(h5, main.firstElementChild)
```

### [context].removeChild

- 移除某个节点

```js
main.removeChild(main.firstChild)
```

### [context].cloneNode

- 把某一个节点进行克隆
- `[el].cloneNode` 浅克隆，就是只克隆当前这个元素
- `[el].cloneNode(true)` 深克隆，就会把这个元素并且里面的所有后代元素都克隆一份

```js
main.firstElementChild.cloneNode(true)
```

### setAttribute/getAttribute/removeAttribute

- 设置/获取/删除 当前元素的某一个自定义属性
- 这些方法是添加到 html 结构中

```js
main.setAttribute("index", "1")
main.getAttribute("index")   // "1"

main.removeAttribute("index")
main.getAttribute("index")  // null
```

- 下面几种方法是基于键值对方式操作的，存放在堆内存中，可以通过 `console.dir()` 查看它的属性

```js
// 设置
main["index"] = 1
// 获取
main["index"]
// 删除
delete main["index"]
```

## 参考

[ES6 ... 扩展运算符(对象展开符)](https://www.jianshu.com/p/b3630e16b98a)

[js获取[n,m]的随机整数值](https://blog.csdn.net/q3254421/article/details/83691787)