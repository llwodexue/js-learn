[toc]

# 26\_笔记

## 封装Bind

柯理化函数编程：利用闭包机制编程的思想

- 首先回顾一下 call 源码（简化版）

```js
Function.prototype.myCall = function (context, ...arg) {
    // 当 call 执行的时候如果用户不传参，或传 null、undefined
    context = context || window;
    context.$fn = this;
    let res = context.$fn(...arg);
    delete context.$fn;
    return res;
};
```

- bind 执行会返回一个新的函数，以后执行这个新函数时，在新函数内部会让 fn 执行
- bind 函数执行形成不销毁的作用域们可以保存里面的变量不受外界干扰，还可以让变量一直存在

```js
Function.prototype.myBind = function (context, ...arg1) {
    context = context || window;
    let _this = this;
    return function (...arg2) {
        return _this.call(context, ...arg1, ...arg2);
    };
};

Function.prototype.myBind = function (context, ...arg1) {
    context = context || window;
    let _this = this;
    return function (...arg2) {
        context.$fn = _this;
        let res = context.$fn(...arg1, ...arg2);
        delete context.$fn;
        return res;
    };
};
```

## jQuery

[https://jquery.cuishifeng.cn/](https://jquery.cuishifeng.cn/)

### 获取DOM元素

- 根据选择器类型快速获取需要的元素

```js
$([selector],[context])
	$('#box')
	$('#box a')
	$('*')
```

- 筛选指定索引/规则元素

```js
// 获取等于索引n的元素
$('#box a:eq(n)')
// 获取大于索引n的元素
$('#box a:gt(n)')
// 获取小于索引n的元素
$('#box a:lt(n)')
// 同级筛选（筛选出a标签中所有偶数项）
$('a').filter(':odd')
```

- 获取子代/后代元素

```js
let $box = $("#box");
// 获取所有子元素
$box.children("a");
// 获取所有后代元素
$box.find("a");
```

- 获取兄弟/父级元素

```js
// 获取box紧邻的前一个同辈元素中标签名p的元素
$box.prev('p');
$box.prevAll();
// 获取box紧邻的下一个同辈元素中标签名p的元素
$box.next('p');
$box.nextAll();
// 获取box所有的兄弟
$box.siblings(); 
// 获取box索引
$box.index();
// 获取box父元素
$box.parent();
// 获取box所有的祖先元素，一直到document
$box.parents();
```

### DOM增删改

- 获取或设置元素内容

```js
// <==>innerText
$box.text()
$box.text(123)
// <==>innerHTML
$box.html()
$box.html(123)
// 获取表单元素内容
$('#input').val()
$('#input').val(123)
```

### 操作自定义属性

```js
// 获取自定义属性值
$box.attr('data')
$box.attr('data', 100)
// 移除自定义属性
$box.removeAttr('data')
// 表单元素操作内置或者自定义属性一般使用prop和removeProp
$radio.prop('checked')
$radio.prop('checked', true)
```

### 操作CSS样式

- `innerWidth` 包括padding、不包括border
- `outerWidth` 包括padding、border
- `scrollTop` 元素相对滚动条顶部的偏移量

```js
// 原理是getComputedStyle，所有经过计算的样式都可以获取
$box.css('width');
$box.css('width', 200);
$box.width()
$box.width('200px')
// 当前元素距离BODY的左偏移和上偏移
$box.offset();
// 当前元素距离父参照物的左偏移和上偏移
$box.position();
// 等价于clientWidth/Height 和 offsetWidth/Height
$box.innerWidth/.innerHeight/.outerWidth/.outerHeight()
// 可以获取或者设置scrollTop的信息，对应的方法 .scrollLeft
$(document).scrollTop([val]); 
```

### 事件处理

- `$元素.on('事件类型', 函数)`
- `$元素.off('事件类型', 函数)`

```js
// DOM 0级事件
box.onclick = function () {
    $box.toggleClass("hello");
};
function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
$box.on("click", fn1);
$box.click(fn2)
$box.off("click", fn1);
```

- 回调函数

  $(原生元素) -> 会把元素的元素变成 jQuery 的实例

```js
// 第一个形参是索引index，第二个形参是每一项item
$("ul li").each(function (index, item) {
    // item 获取的是原生的元素，不能使用jQuery方法
    console.log(item);
    // $(原生元素) 转换成jQuery的实例
    console.log($(item));
});
```

- 单击按钮，显示隐藏盒子

```js
$("#btn").click(function () {
    // 通过不透明度的变化来开关所有匹配元素的淡入和淡出效果
    $("#box").fadeToggle("slow", function () {
        console.log("完成");
    });
});

$("#btn").click(function () {
    $("#box").animate(
        {
            width: "300px",
            height: "300px",
            opacity: 0,
        },
        1000,
        function () {
            console.log("完成");
        }
    );
});
```

## 选项卡

- 当前函数执行的返回结果还是调用此函数的元素，所以可以链式调用
- 通过当前点击的li元素加上current类名，然后再获取当前点击元素的所有兄弟姐妹元素，给其清空current类名

```html
<div class="main" id="main">
    <ul class="lists">
        <li class="current">音乐</li>
        <li>电视</li>
        <li>综艺</li>
    </ul>
    <div class="current">音乐</div>
    <div>电视</div>
    <div>综艺</div>
</div>
<script src="jquery-1.11.3.js"></script>
<script>
    $(".lists li").click(function () {
        let index = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $("#main div")
            .eq(index)
            .addClass("current")
            .siblings("div")
            .removeClass("current");
    });
    
    // 一行代码，链式调用
    $(".lists li").click(function () {
        $(this)
            .addClass("current")
            .siblings()
            .removeClass("current")
            .parent()
            .siblings()
            .eq($(this).index())
            .addClass("current")
            .siblings("div")
            .removeClass("current");
    });
</script>

```

## jQuery 源码分析

JS 代码执行的环境：

- 浏览器：PC端、移动端【webkit、gecko、trident、blink...】
- Hybrid 混合APP开发，把H5页面嵌入native app（IOS/安卓）的webview中【webkit】
- node，一个基于V8引擎，渲染和解析JS的环境。没有window，全局对象global
- 小程序

### 判断环境（闭包应用）

> 为什么 jQuery 即能在浏览器中运行也能在 webpack 下运行

- 形参 A 检测大概是什么环境执行

  如果 `A===window` 说明：浏览器、webview中运行

  如果 `A!==window`  说明：在Node环境下运行，不过 A 可能是Global，也可能是当前模块

- 形参 B 返回 jQuery

什么时候执行 B 函数呢？检测环境的时候执行函数 B（浏览器/Node环境）

- **Node** 应用由模块组成，采用 CommonJS 模块规范，可以用 `module && module.exports` 来检测

  - 如果支持 CommonJS 规范，需要再检测一下是否有 `window.document` ，比如：webpack 工程化环境

  - webpack 可能通过 import 导入，也可能通过 require 导入

    `import $ from 'jquery'` `let $ = require('jquery')` 

  - `module.exports` 导出的是 `factory(global, true)`（函数 B）

    所以：$->jQuery 

- else 那一块，返回 window

  浏览器导入jQuery：`<script src='jquery.min.js'></script>` ，执行 `factory(global)` （函数 B），因为 `noGlobal === "undefined"` ，执行 `window.jQuery = window.$ = jQuery` ，所以在 window 下可以使用 jQuery 和 $

```js
var A = typeof window !== "undefined" ? window : this;
var B = function (window, noGlobal) {
    // 浏览器环境下执行这个函数
    //  window -> window    noGlobal -> undefined
    // webpack环境下导入执行
    //  window -> window    noGlobal -> true
    "use strict";
    var version = "3.5.1";
    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };
    if (typeof noGlobal === "undefined") {
        // 浏览器直接导入
        window.jQuery = window.$ = jQuery;
    }
    // ...
    return jQuery;
};
(function (global, factory) {
    // 支持 CommonJS 模块规范[node环境]
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            // 有 window
            factory(global, true) :
            // 没有 window
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };

    } else {
        // 不支持 CommonJS 规范的[浏览器环境]
        // global->window
        factory(global)
    }

})(A, B);
```

- **应用：暴露API**（支持浏览器直接导入也支持webpack CommonJS模块导入）

  如果你写了一个很好的库，既想在浏览器中使用，还想在 Node 中支持导入

```js
if (typeof window !== "undefined") {
    window.utils = utils;
}

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = utils;
}
```

### 冲突处理

> 有些 JavaScript 的库会使用 `$` 作为变量名（Zepto/jQuery），如果我们同时引用两个使用 `$` 作为变量名，或者引入两个不同版本的 jQuery 时，就可能会出现 `$` 冲突问题

```html
<script src="node_modules/zepto/dist/zepto.min.js"></script>
<!-- 
    $ -> Zepto
    Zepto -> Zepto
-->
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<!-- 
    $ -> jQuery
    jQuery -> jQuery
-->
```

- 先看一下 Zepto 的冲突处理，先看一下全局 `$` 有没有被占用，如果没有被占用 `window.$ = Zepto`

```js
window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
```

- jQuery 可以使用 `jQuery.noConflict()` 来解决

```js
function factory(window, noGlobal) {
    "use strict";
    var jQuery;
    // ...
    // 在没有暴露给 window之前，把当前 window的$存一下
    var _jQuery = window.jQuery,
        _$ = window.$;

    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            // 转让使用权给 Zepto
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    }

    if (typeof noGlobal === "undefined") {
        // 暴露给 window
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}
```

### 其它

- 创建一个jQuery类，把一部分方法放到该类的原型上，所以jQuery实例能调用这些方法

```js
jQuery.fn = jQuery.prototype = {};
jQuery.extend = jQuery.fn.extend = function() {};
 // 给jQuery原型添加方法
jQuery.extend({});
// 给当前jQuery的原型添加方法
jQuery.fn.extend({});

// 给jQuery的原型进行重定向
jQuery = function( selector, context ) {
    // 重定向的原型没有
    constructor: jQuery;
    return new jQuery.fn.init( selector, context )
};
// 当$执行时new的是当前这个函数
// init函数是干什么的，init里的代码就是获取dom的
var init = jQuery.fn.init = function() {};;
// 把jQuery的原型赋值给init的原型
init.prototype = jQuery.fn;
```

