[toc]



# 17_笔记


## 小程序基础


+ 不是HTML5页面
+ 用完即走（可以跨平台使用，安卓IOS使用，不能做逻辑比较复杂的功能，不能路由跳转过多页面）
+ 一次开发，多端共享
+ 微信用户量很庞大，几乎人人随时可用
+ 缓存最多10M，所以速度会很快
+ 不用下载和安装（编译后的主包不会超过2MB）体积很小，其实不是不需要下载，只是体积很小，打开的时候就缓存到本地了，用户体验很好
+ 小程序只会在安卓、IOS和开发者工具上运行（在浏览器上无法运行）
+ JS三大部分组成：ECMAScript、DOM、BOM
+ 小程序不支持DOM，不能通过 `document.getElementById` 拿DOM
+ 小程序不支持BOM，没有window这个属性对象



微信小程序设计稿都是以iPhone6为基准（在iphone6下 1rpx=0.5px）



## API


服务器域名设置：小程序后台>后台管理



### getSystemInfo


+ 获取系统信息



```javascript
wx.getSystemInfo({
  success (res) {
    console.log(res.model) // 设备型号
    console.log(res.pixelRatio) // 设备像素比
    console.log(res.windowWidth) // 可使用窗口宽度
    console.log(res.windowHeight) // 可使用窗口高度
    console.log(res.language) // 	微信设置的语言
    console.log(res.version) // 微信版本号	
    console.log(res.platform) // 客户端平台	
  }
})
```



### showModal


+ `wx.showLoading` 和 `wx.showToast` 同时只能显示一个
+ `wx.showToast` 应与 `wx.hideToast` 配对使用
+ `wx.showToast` 没有按钮



```javascript
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  editable: true,
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```



### chooseImage


```javascript
wx.chooseImage({
  count: 1, // 最多可以选择的图片张数
  sizeType: ['original', 'compressed'], // 所选的图片的尺寸
  sourceType: ['album', 'camera'], // 选择图片的来源
  success(res) {
    // tempFilePath可以作为img标签的src属性显示图片
    const tempFilePaths = res.tempFilePaths
  }
})
```



### chooseVideo


```javascript
wx.chooseVideo({
  sourceType: ['album','camera'], // 视频选择的来源	
  maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒
  camera: 'back', // 默认拉起的是前置或者后置摄像头
  success(res) {
    console.log(res.tempFilePath) // 选定视频的临时文件路径 (本地路径)
  }
})
```



### 数据缓存


+ 小程序不能操作浏览器缓存（cookie、location）
+ 小程序的缓存只是在应用里开辟出一块内存来存放数据，跟浏览器一点关系都没有



`wx.setStorageSync` 设置



+  `wx.setStorageSync("属性名", 属性值)`  
同步传两个参数，第一个是属性名，第二个是属性值 
+  `wx.setStorage({key: "属性名", data: "属性值"})`  
异步传一个对象，key是属性名，data是属性值 



```javascript
wx.setStorage({
  key: "key",
  data: "value"
})

try {
  wx.setStorageSync('key', 'value')
} catch (e) { }
```



`wx.removeStorageSync` 删除



```javascript
wx.removeStorage({
  key: 'key',
  success (res) {
    console.log(res)
  }
})
try {
  wx.removeStorageSync('key')
} catch (e) {
  // Do something when catch error
}
```



`wx.getStorageSync` 查看



```javascript
wx.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
try {
  var value = wx.getStorageSync('key')
  if (value) {
    // Do something with return value
  }
} catch (e) {
  // Do something when catch error
}
```



`wx.getStorageInfoSync` 查看全部缓存



```javascript
wx.getStorageInfo({
  success (res) {
    console.log(res.keys) // 当前 storage 中所有的 key
    console.log(res.currentSize) // 当前占用的空间大小, 单位 KB
    console.log(res.limitSize) // 限制的空间大小，单位 KB
  }
})
try {
  const res = wx.getStorageInfoSync()
  console.log(res.keys)
  console.log(res.currentSize)
  console.log(res.limitSize)
} catch (e) {
  // Do something when catch error
}
```



### NodesRef


+  createSelectorQuery 创建一个SelectorQuery实例，才能调用select 
+  select方法里参数为选择器，返回的是NodesRef对象  
对象有5个方法boundingClientRect、context、fields、node、scrollOffset 
+  `boundingClientRect` 获取元素相关数据 
+  `context` 多用于媒体元素，如：视频、canvas、LivePlayer、编辑器、map，返回的是这些元素的多媒体实例  
多媒体实例：`this.videoContext=wx.createVideoContext("myVideo")`  ，后面就可以通过 `this.videoContext` 来播放、暂停来控制视频 
+  `node` 返回节点对应的 Node 实例 
+  `scrollOffset` 返回节点的水平/垂直滚动位置 
+  `fields` 是上面四个方法的合集，通过第一个参数控制返回什么数据，第二个参数接收数据 



```javascript
wx.createSelectorQuery().select('.outer').boundingClientRect(function(rect){
  // rect.id      // 节点的ID
  // rect.dataset // 节点的dataset
  // rect.left    // 节点的左边界坐标
  // rect.right   // 节点的右边界坐标
  // rect.top     // 节点的上边界坐标
  // rect.bottom  // 节点的下边界坐标
  // rect.width   // 节点的宽度
  // rect.height  // 节点的高度
  console.log(rect);
}).exec()
```



## 项目


```bash
npm install okam-cli -g # 全局安装okam，mac电脑前面加sudo
okam init my-okam-project # 创建项目
cd my-okam-project # 打开文件
npm install # 安装依赖
npm i @vant/weapp -S --production # 安装vant/weapp
npm run dev:wx # 启动项目
```

