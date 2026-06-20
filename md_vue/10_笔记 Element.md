[toc]



# 10_笔记


## Element


**安装**



```bash
npm i element-ui

yarn add element-ui
```



**按需引入**



```bash
npm install babel-plugin-component -D
```



将 `babel.config.js` 修改为：



```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```



注意：使用模态框的时候需要给原型添加方法



```javascript
import Vue from "vue";
import App from "./App.vue";
import {
    MessageBox,
    Loading,
    Message,
} from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

Vue.use(MessageBox);
Vue.use(Divider);
Vue.use(Loading);
Vue.use(Message);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;
new Vue({
    render: (h) => h(App),
}).$mount("#app");
```



## 参考


[Element组件](https://element.eleme.cn/2.15/#/zh-CN/component/installation)



`[.sync](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)`[ 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

