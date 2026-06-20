[toc]



# 16_笔记


## 小程序配置


### 基础配置


**rpx**



+ 屏幕宽度px=750rpx
+ 1px = 750/375 rpx = 2rpx 是只针对iphone6



**less**



+ 微信小程序不支持less



```javascript
"less.compile": {
    // "outExt": ".css"
    "outExt": ".wxss"
},
```



### app.json


小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置。文件内容为一个 JSON 对象



**entryPagePath**



+ 指定小程序的默认启动路径（首页）



**window**



+ 用于设置小程序的状态栏、导航条、标题、窗口背景色



**pages**



+ 用于指定小程序由哪些页面组成，每一项都对应一个页面的 路径（含文件名） 信息



**tabBar**



+ 如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面



```json
{
  "pages":[
    "pages/index/index",
    "pages/demo1/demo1",
    "pages/demo2/demo2",
  ],
  "tabBar": {
    "color": "#000000",
    "selectedColor": "#4E6EF2",
    "list": [{
      "pagePath": "pages/index/index",
      "text": "我的",
      "iconPath": "./img/my.png",
      "selectedIconPath": "./img/my_active.png"
    }]
  },
}
```



## 组件


### text


+ 类似原生 span



```html
<!-- 
  1.decode 解码
  2.text 组件内只支持text嵌套
  3.user-select 除了文本节点以外的其他节点都无法长按选中
 -->
<text decode user-select>&lt; &gt;</text>
```



### view


+ 类似原生 div



```html
<!-- home.wxml -->
<!-- 
  hover-class 按下去的样式类
  事件：
    语法：bind+（:可加可不加）+"事件类型"="函数名"
    在js文件中添加相应函数，即可触发
  传参：在行内属性增加 data-"变量名"="参数"
  接收：函数接收事件对象e e.target.dataset里面的数据就是我们传的参数
-->
<view class="box1" hover-class="hover_box1">hello</view>
<view class="box2" bindtap="onTap" bindlongpress="onLongPress" data-name="{{name}}">world</view>
```



+ 函数接收事件对象 e



```javascript
// home.js
Page({
  data: {
    name: "cat"
  },
  onTap(e) {
    console.log("点击", e);
    console.log(e.target.dataset);
  },
  onLongPress() {
    console.log("长按");
  }
})
```



### image


+ 类似原生 img



```html
<!-- 
  mode模式：scaleToFill 默认 不保持纵横比，直接拉伸
    aspectFit 保持纵横比 显示长边 默认在框框的中间
    aspectFill 保持纵横比 显示短边 默认在框框的中间
    widthFix 保持纵横比 宽度自定义  高度自适应
    heightFix 保持纵横比 高度自定义  宽度自适应
-->
```



### swiper


```html
<!-- 
  swiper
    autoplay 自动播放
    indicator-dots 指示点
    circular 衔接滑动
    interval 滑动时间间隔 默认5000ms
    indicator-color 指示点颜色
    indicator-active-color 当前选中的指示点颜色
 -->
<swiper autoplay indicator-dots circular interval="3000"> 
  <swiper-item>
    <image src="https://picsum.photos/id/788/200/200"></image>
  </swiper-item>
  <swiper-item>
    <image src="https://picsum.photos/id/789/200/200"></image>
  </swiper-item>
  <swiper-item>
    <image src="https://picsum.photos/id/79/200/200"></image>
  </swiper-item>
</swiper>
```



### scroll-view


```html
<!-- 
  scroll-view
  使用竖向滚动时，需要给scroll-view一个固定高度
 -->
<scroll-view></scroll-view>
```



### navigator


```html
<!-- 
  navigator
    url跳转地址，以/pages开头
    open-type 跳转方式
      navigate 直接跳转页面，但不能跳转tabBar页面，最多可以嵌套10层页面栈
      redirect 关闭当前页面，再跳转
      navigateBack delta表示回退层数
      switchTab 关闭所有页面，跳转tabBar页面
      reLaunch 关闭所有页面，并跳转
    注：tabBar页面就是app.json里tabBar.list里面的页面
 -->
<navigator url="/pages/demo1/demo1">跳转demo1</navigator>
```



+ `wx.switchTab: url 不支持 queryString`



```html
<navigator url="/pages/my/my?id=123" open-type="switchTab">跳转My界面</navigator>
```



## 路由


**button实现跳转**



```html
<button catchtap="tomy">跳界面</button>
```



+ `wx.navigateTo`



```javascript
tomy() {
  wx.navigateTo({
    url: '/pages/my/my?id=123',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function (data) {
        console.log(data)
      },
      someEvent: function (data) {
          console.log(data)
        }
    },
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', {
        data: 'test'
      })
    }
  })
```



+ `navigateTo` ：保留当前页面，然后打开一个新页面，但是不能调到tabbar页面
+ `switchTab`：跳转tabbar页面，并关闭其他所有非tabbar页面
+ `redirectTo` ：页面重定向，关闭当前页面，打开一个新页面
+ `reLaunch` ：关闭所有页面，打开一个新页面
+ 利用组件跳转 navigator，添加open-type属性和url属性
+ 路由传参



## WXML


+ WeiXin Markup Language



```html
<!--wxml-->
<view> {{message}} </view>
```



```javascript
// page.js
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```



### wx:for


```html
<!-- 
  wx:for循环，可以循环数组、字符串、数字;变量要用双括号括起来
    wx:for-item="key" 将 item 命名为 key，
    wx:for-index="i" 将 index 命名为 i
-->
<view wx:for="{{list}}" wx:for-item="key" wx:for-index="i" wx:key="i">{{key}}----{{i}}</view>

<script>
    data: {
        list: [1, 2, 3, 4],
    }
</script>
```



### wx:if


```html
<!-- 
  wx:if wx:elif wx:else
  if判断，类似vue的v-if
 -->
<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view wx:elif="{{view == 'APP'}}"> APP </view>
<view wx:else> MINA </view>
```



+ block 类似 vue 中的 template



```html
<block wx:for="{{[1, 2, 3]}}">
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>
```



## 自定义组件


### Component


+ 父组件配置



```json
// demo2.json
{
  "usingComponents": {
    "com": "../../components/btn/button"
  }
}
```



+ 自定义组件接收参数值



```javascript
/* 
1.组件的创建
  根目录创建compoents文件夹
  compoents文件夹新建文件btn
  右键->新建component
2.组件的注册
  在父组件的json中增加
  "usingComponents": {
    "com": "../../components/btn/button"
  }
3.组件的使用
  父组件直接使用com作为标签
 */

Component({
  /**
   * 组件的属性列表 类似vue中的props
   */
  properties: {
    data: {
      type: String,
      value: ""
    }
  },
})
```



+ 父组件使用



```html
<com data="{{name}}"></com>
```



**子改父**



+ `this.triggerEvent("函数名", "参数")`



```html
<!-- demo2.wxml -->
<com data="hello world" bind:changeTap="onParent"></com>
<!-- demo2.js -->
<script>
  data: {
    name: "我是demo2"
  },
  onParent(params) {
    console.log(params.detail);
    this.setData({
      name: "demo2被com修改了"
    });
  }
</script>

<!-- com.wxml -->
<text>{{data}}</text>
<button bindtap="onTap">子按钮</button>
<script>
  methods: {
    onTap() {
      var myEventDetail = {
        name: 12
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent("changeTap", myEventDetail)
    }
  }
</script>
```



## 事件


### bindtap


+ bindtap 相当于 vue 里的`@`，存在事件冒泡（从里往外冒泡）



```html
<!-- fn1和fn都执行，先执行fn，再执行fn1 -->
<view bindtap="fn1">
  <button type="default" bindtap="fn">{{name}}</button>
</view>
```



+ catchtap 不存在事件冒泡



```html
<!-- data存在currentTarget.dataset mark存在mark里 -->
<button type="default" bindtap="fn" data-mydata="{{name}}" mark:my-data="{{name}}">{{name}}</button>
<button type="primary" catchtap="fn">{{name}}</button>
```



+  当事件触发时，事件冒泡路径上所有的 `mark` 会被合并，并返回给事件回调函数（即使事件不是冒泡事件也会存在mark） 
+  mark 和 dataset 很相似  
`data-变量名={{变量}}`  
`mark:变量名={{变量}}`  
主要区别：mark包含从触发事件的节点到根节点上所有的`mark:属性`，而dataset仅包含一个节点的data-属性值 



### 全局事件


+ `wx.showModal`



```javascript
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  showCancel: false,
  success(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```



+ `wx.showToast`



```javascript
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
```



+ `showLoading`



```javascript
wx.showLoading({
    title: '加载中',
})

setTimeout(function () {
    wx.hideLoading()
}, 2000)
```



+ `wx.getStorageSync`
+ `wx.setStorageSync`
+ `wx.clearStorageSync`



## 生命周期


### 应用生命周期


app.js 中定义了一些应用的生命周期函数



1. onLaunch：初始化小程序时触发，**全局只触发一次**
2. onShow：小程序初始化完成，或用户从后台切换到前台显示时触发页面再次显示时，对应用的数据或效果进行刷新
3. onHide：用户从前台切换到后台隐藏时触发页面隐藏时，清除定时器
4. onError：小程序发送脚本错误，后者 api 调用失败时，会触发 onError 并带上错误信息
5. onPageNotFound：应用第一次启动的时候，如果找不到第一个入口页面触发



```javascript
/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    // 一般在这里发生数据请求
    // 页面传参在此接收
    console.log("page-load", options);
},
// 跳转页面时在地址后面直接问号传参
```



### 页面生命周期


+ onInit：百度小程序独有，在onLaunch与onLoad之间的生命周期，数据请求放在这里可以优化性能



1. onLoad：监听页面加载，可以在onLoad的参数中获取打开当前页面路径的参数
2. onShow：监听页面显示；加载完成后，后台切换到前台，或重新进入页面时触发
3. onReady：页面首次渲染完成时触发
4. onHide：监听页面隐藏，从前台切到后台，或进入其他页面触发
5. onUnload：监听页面卸载，页面卸载时触发



## 接口请求


```javascript
let baseUrl = "http://";

function http(options) {
  let {
    url,
    method = "GET",
    data
  } = options;
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data,
      success(data) {
        resolve(data.data);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}

export default http;
```



## svg


绘制流程包括以下几步：



1. 从 svg 根元素开始： 
    - 应舍弃来自(X)HTML的doctype声明，因为基于SVG的DTD验证导致的问题比它能解决的问题更多
    - 属性version和属性baseProfile属性是必不可少的，供其它类型的验证方式确定SVG版本
    - 作为XML的一种方言，SVG必须正确的绑定命名空间（在xmlns属性中绑定）
2. 绘制一个完全覆盖图形区域的矩形 `<rect />` ，把背景颜色设为红色
3. 一个半径80px的绿色圆圈 `<circle />` 绘制在红色矩形的正中央（向左偏移150px，向下偏移100px）
4. 绘制文字"SVG"。文字被填充为白色，通过设置居中的锚点把文字定位到期望的位置：在这种情况下，中心点应该对应于绿色圆圈的中心



```html
<svg
  version="1.1"
  baseProfile="full"
  viewBox="0 0 100 100"
  width="300"
  height="300"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect width="100%" height="100%" fill="red"></rect>
  <circle cx="150" cy="100" r="80" fill="green"></circle>
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">Hello</text>
</svg>
```



viewBox属性允许指定一个给定的一组图形伸展以适应特定的容器元素。



+ viewBox属性的值是一个包含4个参数的列表 `min-x`, `min-y`, `width` and `height`， 以空格或者逗号分隔开



path元素的形状是通过属性`d`定义的，属性`d`的值是一个“命令+参数”的序列



+ 每一个命令都用一个关键字母来表示，比如，字母“M”表示的是“Move to”命令，当解析器读到这个命令时，它就知道你是打算移动到某个点
+ 跟在命令字母后面的，是你需要移动到的那个点的x和y轴坐标。比如移动到(10,10)这个点的命令，应该写成“M 10 10”



```bash
# Move to
M x y (or m dx dy)
# Line to
L x y (or l dx dy)
# 闭合路径命令
Z (or z)
```



## transition-group


+ 在实现列表过渡的时候，如果需要过渡的元素，是通过 v-for 循环渲染出来的，不能使用 transition 包裹，需要使用 transition-group
+ 如果要为 v-for 循环创建的元素设置动画，必须为每一个元素设置 :key



```css
v-enter,
v-leave-to {
    opacity: 0
    transform: translateX(90px)
}
/* v-move和v-leave-active 配合使用，能够实现列表后续的元素，渐渐地飘上来的效果 */
v-move {
	transition: all 0.6s ease;
}
v-leave-active {
    position: absolute
}
```



+ 给 transition-group 添加 appear 属性，实现页面刚展示出来的时候，入场的效果
+ 设置 tag 属性，指定其渲染为指定的元素，默认渲染为 span 标签



```html
<transition-group appear tag="ul"></transition-group>
```

