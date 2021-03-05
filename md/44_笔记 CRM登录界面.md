[toc]

# 44\_笔记

## CRM

系统类项目

- CRM(Customer Relationship Management) 客户关系管理系统
- OA(Office Automation) 企业办公管理系统（包括CRM）：企业微信、钉钉、飞书、如流
- ERP(electronic public relationsystem)企业战略计划管理系统（一般比OA系统还打）
- CMS(Content Management System)即使通讯系统

### iframe

a标签的target值与iframe的name值一致，表示将a标签链接的文件载入此iframe。这可以用于模拟单页应用

```html
<li><a href="https://www.baidu.com/" target="A">百度</a></li>
<li><a href="https://www.taobao.com/" target="A">淘宝</a></li>

<iframe src="https://www.baidu.com/" frameborder="0" name="A"></iframe>
```

### async

ES7中新增async await语法

```js
function fn() {
    return new Promise((resolve, reject) => {
        resolve(100);
    })
}
fn().then(res => {
    console.log(res);
})

//<===============>
// return不是promise实例，则会自动转换为成功的promise实例，return值为实参
async function fn() {
    return 100;
}
fn().then(res => {
    console.log(res);
})
```

- 结合await使用async

```js
function fn() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(100);
        }, 1000)
    })
}

async function init() {
    let res = await fn();
    // await下边的代码会等到上边promise的状态发生改变以后才会执行
    console.log(res);
}
init();
```



### 登录界面

```js
// 原生闭包
(function () {})();
// jQuery闭包
$(function () {});
```

```js
(function () {
    let $account = $(".userName");
    let $password = $(".userPass");
    let $submit = $(".submit");
    // 给当前登录按钮绑定点击事件
    // $submit.on("click", function () {});
    $submit.click(async function () {
        // 1，获取用户名和密码的内容
        let account = $account.val().trim();
        let password = $password.val().trim();
        // 2.对用户名和密码进行格式校验（这里只对非空做校验）
        if (!account || !password) {
            alert("当前的用户名或密码不能为空", {
                // 当前回调函数会在alert框消失之后或用户点击X号的时候执行
                handled: function () {
                    console.log("please modify username or password");
                },
            });
            return;
        }
        // 3.对密码进行MD5加密
        password = md5(password);
        console.log(password);
        // 4.发送登录的请求
        let res = await axios.post("/user/login", {
            account,
            password,
        });
        let { code, codeText, power } = res;
        if (code === 0) {
            alert("登录成功", {
                handled: function () {
                    // 当登录成功以后，先把power存储到localStorage中
                    localStorage.setItem("power", encodeURIComponent(power));
                    // 然后再跳转到index.html主页面
                    location.href = "index.html";
                },
            });
        } else {
            alert("登录失败");
            $account.val("");
            $password.val("");
        }
    });
})();
```

