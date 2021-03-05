[toc]

# 33\_笔记

## var() calc()

**`var()`**函数可以代替元素中任何属性中的值的任何部分

**`calc()`** 允许在声明 CSS 属性值时执行一些计算

- **`+` 和 `-` 运算符的两边必须要有空白字符。**
- `*` 和 `/` 这两个运算符前后不需要空白字符，但如果考虑到统一性，仍然推荐加上空白符

```css
:root {
    --fontSize: 14px;
}
a {
    font-size: calc(var(--fontSize) + 4px);
}
```

## Swiper

效果图：

![轮播缩略图](https://img-blog.csdnimg.cn/20201225111438655.gif)

### pagination（分页器）

- `el`：分页器容器的css选择器或HTML标签
- `clickable`：设置为true时，点击分页器的指示点分页器会控制Swiper切换
- `renderBullet(index, className)`：渲染分页器小点

```js
pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: (i, c) => `<span class="${c}"><img src="${imgs[i].src}"></span>`
}
```

- 轮播缩略图HTML代码，需要把分页器放到 `swiper-container` 的兄弟元素处

```html
<!-- 轮播缩略图 -->
<div class="swiper-container" id="swiper">
    <!-- 文字内容 -->
    <div class="imgInfo">...</div>
    <!-- 轮播图 -->
    <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
    </div>
    <!-- 导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
<!-- 分页器（小轮播图） -->
<div class="swiper-pagination"></div>
```

- 如果想在轮播图上加文字，可以结合绝对定位使用

  主要注意：要使用`z-index`，把层级提上去

```css
.swiper-container .imgInfo {
    position: absolute;
    height: 150px;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    left: 0;
    bottom: 0;
}
```

### navigation（前进后退按钮）

- swiper5新增（使用字体图标），单独设置按钮 `--swiper-navigation-color`来改变按钮颜色

```css
.swiper-container {
    /* 设置按钮颜色 */
    --swiper-navigation-color: #fff;
    /* 设置按钮大小 */
    --swiper-navigation-size: 18px;
}
```

- 前进后退按钮默认并不是贴边的，如果想要贴边需要更改 left 或 right

```css
.swiper-container .swiper-button-prev {
    left: 0;
}
.swiper-container .swiper-button-next {
    right: 0;
}
```

- 如果想要更改前进后退按钮的大小、背景颜色或字体粗细可以这么改

  需要注意：因为前后按钮垂直居中是用 `top: 50% + margin-top`，更改前后按钮大小需要更改 `margin-top`

```css
.swiper-container .swiper-button-prev,
.swiper-container .swiper-button-next,{
    background-color: rgba(0, 0, 0, 0.6);
    width: 40px;
    height: 58px;
    margin-top: -29px;
    font-weight: bold;
}
```

- JS 控制

```js
navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},
```



## 参考

[calc()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc())

[var()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var())

