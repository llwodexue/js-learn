[toc]



# 09_笔记




## 脚手架配置


帮助我们把 webpack 等相关配置都处理好，我们只需要基于脚手架快速构建一个项目即可



1.  安装脚手架（一般安装在全局） 

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
# 查看版本号
vue --version
```

 

2.  创建工程化项目 

```bash
# 遵循npm包名称规范：数组或小写字母
vue create 项目名称
```

  
之后会出现提示信息   
我们手动配置一下（↑↓ 切换，space 选中/取消，enter 下一步），配置如下：   
后续配置不做阐述，整体配置如下：  



## 项目目录


```bash
|- src # 存储我们项目开发的源文件
	|- main.js # 打包编译的入口文件
	|- APP.vue # 项目页面的入口文件
	|- views(pagrs) # 页面级的大组件
	|- components # 存放当前项目的公共组件
		|- xxx.vue
	|- assets # 一般存放项目中需要引入的静态资源文件
		|- xxx.png
		|- xxx.css
	|- ...
|- public
	|- index.html # 当前项目的主页面（把所有在src中写的内容，通过webpack/vue编译渲染后，最后都会呈现在index.html的#app容器中）
	|- xxx.xxx # 虽然建议大家开发的时候，把代码或资源都放置在src中，但有时候，我们某些资源也可能需要单独在index.html中引用
```



开发模式下，基于这个命令启动一个本地服务，基于 webpack 编译后的内容预览 `npm run serve` `yarn serve`



生产模式下，把写好的内容进行编译打包，最后部署到服务器上 `npm run build` `yarn build`



```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "lint": "vue-cli-service lint"
},
```



在 `index.html` 直接在这里引入的时候，导入资源最好都设置为 `<%= BASE_URL %>` 这种方式，这样写 webpack 会帮我们进行编译处理



## vue-cli


```bash
# 查看当前项目默认的webpack配置信息
vue inspect
vue inspect > info.txt

# 在当前项目中安装插件
vue add [plugin]
```



默认的配置项已经把 less/sass 等规则写好了，如果我们的项目中需要使用 less，无需配置规则，只需安装对应的模块和加载器即可



### 修改默认的 webpack 配置


需要在根目录中设置 `vue.config.js`



```javascript
module.exports = {
  // process.env.NODE_ENV: 环境变量中存储的是开发环境还是生产环境
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-project' : '/',
  // 自定义目录名称，把生产的JS/CSS/图片等静态资源放置这个目录中
  assetsDir: 'static',
  // 关闭生产环境下的资源映射（生产环境下不再创建xxx.js.map文件）
  productionSourceMap: false,
  // 设置一些webpack配置项，用这些配置项和默认的配置项合并
  // https://github.com/survivejs/webpack-merge
  configureWebpack: {
    plugins: [],
  },
  // 直接去修改内置的webpack配置项
  chainWebpack: (config) => {
    // config：原始配置信息对象
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.limit = 200 * 1024
        return options
      })
  },
  // 修改webpack-dev-server配置（跨域代理）
  devServer: {
    proxy: {
      // 请求地址：/user/add
      // 代理地址：https://api.baidu.com/user/add
      '/': {
        changeOrigin: true,
        target: 'https://api.baidu.com/',
      },
    },
  },
  // 多余1核cpu时，启动并压缩
  parallel: require('os').cpus().length > 1,
}
```



## `$attrs`和`$listeners`


+ `$attrs`：获取的是父组件传递进来的属性信息（排除掉 props 中注册过的，排除 class、style 等）都是基于 v-bind 绑定的属性或者直接静态属性
+ `$listeners`：获取的是父组件传递进来的事件信息，基于@xxx="xxx"处理的



**Tab.vue**



+ 点击子组件修改父组件内容



```vue
<template>
  <div>
    <h2 v-text="msg" @click="this.$attrs.handle"></h2>
    <!-- <h2 v-text="msg" @click="this.$listeners.click"></h2> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello world',
    }
  },
  props: ['n'],
  created() {
    console.log(this.$attrs, this.$listeners)
  },
  methods: {},
}
</script>
```



**APP.vue**



```vue
<template>
  <div id="app">
    <!-- 通过 this.$attrs 可以获取到 handle 事件 -->
    <tab :n="n" :m="m" :handle="handle"></tab>

    <!-- 通过 this.$listeners 可以获取到 click 事件 -->
    <!-- <tab :n="10" :m="20" @click="handle"></tab> -->
    <p v-text="text"></p>
  </div>
</template>

<script>
import Tab from './components/Tab'
export default {
  data() {
    return {
      text: 'cat',
      n: 10,
      m: 20,
    }
  },
  components: {
    Tab,
  },
  methods: {
    handle() {
      this.text = 'dog'
    },
  },
}
</script>
```



## 报错


[禁止使用 空格 和 tab 混合缩进 (no-mixed-spaces-and-tabs)](https://cn.eslint.org/docs/rules/no-mixed-spaces-and-tabs)



+ 配置文件中的 `"extends": "eslint:recommended"` 属性启用了此规则
+ 大多数代码约定要求使用空格或 tab 进行缩进。因此，一行代码同时混有 tab 缩进和空格缩进，通常是错误的

