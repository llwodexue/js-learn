[toc]

# 43\_笔记

## 练习

编写一个函数，参数是一个字符串，找出当前字符串中每一个字符出现的次数

- 例如 'abcabc',  返回 {a:2,b:2,c:2}

```js
// 方法一：for循环（利用str有length）
function countStr(str) {
    let obj = {};
    for (let i = 0; i < str.length; i++) {
        obj[str[i]] ? obj[str[i]]++ : (obj[str[i]] = 1);
    }
    return obj;
}
// 方法二：利用数组方法，ES6 Array.from+ES5 reduce
function countArr(str) {
    return Array.from(str).reduce((acc, cur) => {
        acc[cur] = acc[cur] + 1 || 1;
        return acc;
    }, {});
}
```

## Axios

- 基于类封装

```js
(function () {
    class Axios {
        constructor(url, options) {
            // this-->当前的Axios的实例
            this.url = url;
            this.options = options;
            return this.send();
        }
        send() {
            let {
                url,
                options: {
                    baseURL,
                    params,
                    method,
                    data,
                    cache,
                    timeout,
                    transformRequest,
                    transformResponse,
                },
            } = this;
            return new Promise((resolve, reject) => {
                // 发送ajax请求，当请求车成功以后把当前的promise的实例改为成功态，请求失败以后把当前promise的实例改为失败态
                let self = this;
                let xhr = new XMLHttpRequest();
                // 0.把baseURL和url拼接到一起
                url = baseURL + url;
                // 1.如果params有值，那就把它转换成字符串
                params = this.tranParams();
                // 2.如果当前是get系列请求并且params不是null，那就把params拼接到url后面
                let reg = /^(GET|HEAD|DELETE|OPTIONS)$/i;
                if (reg.test(method) && params) {
                    url += `${this.addMark(url)}${params}}`;
                }
                // 3.如果当前是post系列请求，就执行transformRequest
                if (!reg.test(method)) {
                    data = transformRequest(data);
                }
                if (!cache && reg.test(method)) {
                    url += `${this.addMark(url)}_=${Date.now()}`;
                }
                if (timeout) {
                    xhr.timeout = timeout;
                }
                xhr.open(method, url);
                xhr.onreadystatechange = () => {
                    let { readyState, response, status, statusText } = xhr;
                    if (readyState === 4) {
                        if (/^(2|3)\d{2}$/.test(status)) {
                            let headers = xhr.getAllResponseHeaders();
                            let obj = {};
                            headers.split(/\n/).forEach((item) => {
                                let [key, value] = item.split(": ");
                                obj[key] = value;
                            });
                            resolve({
                                status,
                                statusText,
                                data: JSON.parse(response),
                                headers: obj,
                                config: self.options,
                            });
                        } else {
                            reject({
                                data: null,
                                status,
                                statusText,
                            });
                        }
                    }
                };
                xhr.send(data);
            }).then(transformResponse);
        }
        tranParams() {
            let {
                options: { params },
            } = this;
            if (!params) return params;
            let str = ``;
            for (let key in params) {
                if (!params.hasOwnProperty(key)) break;
                str += `${key}=${params[key]}&`;
            }
            str = str.slice(0, str.length - 1);
            return str;
        }
        addMark(url) {
            return url.includes("?") ? "&" : "?";
        }
    }

    axios.defaults = {
        baseURL: "",
        cache: true,
        data: null,
        params: null,
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        timeout: null,
        transformRequest: function (data) {
            if (!data) return null;
            let str = ``;
            for (let key in data) {
                if (!data.hasOwnProperty(key)) break;
                str += `${key}=${data[key]}&`;
            }
            str = str.slice(0, str.length - 1);
            return str;
        },
        transformResponse: function (data) {
            return data;
        },
    };
    function mergeOptions(options) {
        let { defaults } = axios;
        let headers = { ...defaults.headers, ...options.headers };
        return { ...defaults, ...options, headers };
    }

    ["get", "delete", "head", "options"].forEach((item) => {
        axios[item] = function (url, options) {
            options.method = item;
            let res = mergeOptions(options);
            return axios(url, res);
        };
    });

    ["post", "put", "patch"].forEach((item) => {
        axios[item] = function (url, data, options) {
            options.data = data;
            options.method = item;
            let res = mergeOptions(options);
            return axios(url, res);
        };
    });
    axios.all = function (promiseAry = []) {
        return Promise.all(promiseAry);
    };
    window.axios = axios;
})();

// ->-----------------
axios.defaults.timeout = 3000;
axios.defaults.baseURL = "./json/";
axios
    .get("1.json", {
        params: {
            name: 1,
            age: 2,
        },
        headers: {
            ss: 100,
        },
        cache: false,
    })
    .then((res) => {
        console.log("then res", res);
        return res;
    })
    .then((res) => {
        console.log("then2 res", res);
    });
```

### Axios 合并headers方法

- 这里我使用的是ES6扩展运算符合并的headers

```js
function mergeOptions(options) {
    let { defaults } = axios;
    let headers = { ...defaults.headers, ...options.headers };
    return { ...defaults, ...options, headers };
}
```

- axios合并headers的方法，这里调用了utils里的merge方法

![axios合并headers](https://gitee.com/lilyn/pic/raw/master/js-img/axios%E5%90%88%E5%B9%B6headers.png)

- 这里用了递归进行合并对象（且用了isPlainObject）这个方法

![axios合并对象](https://gitee.com/lilyn/pic/raw/master/js-img/axios%E5%90%88%E5%B9%B6%E5%AF%B9%E8%B1%A1.png)

- isPlainObject这个方法检测纯粹对象

![axios检测纯粹对象](https://gitee.com/lilyn/pic/raw/master/js-img/axios%E6%A3%80%E6%B5%8B%E7%BA%AF%E7%B2%B9%E5%AF%B9%E8%B1%A1.png)

## 本地存储

- cookie
- localStorage
- sessionStorage

1. 本地存储是受浏览器限制的，假如在谷歌浏览器下存储的数据，IE就拿不到
2. 受域的限制，不同域之间的存储是不互通的
3. 本地存储的信息在控制台中可以直接看到各种本地存储（明文存储），如果要存储比较敏感的数据，需要做安全处理（加密）

### localStorage

> 本地永久化存储

- 在存储的时候，如果value是一个引用值，最好先拿JSON.stringify转成字符串再存储，获取时用JSON.parse转换即可

```js
localStorage.setItem("arr", [1, 2, 3]); // 设置数据（设置value会默认转换为字符串）
localStorage.setItem("obj", JSON.stringify({ name: 1 }));

localStorage.getItem("obj"); // 获取数据
localStorage.removeItem("obj"); // 删除数据
localStorage.clear(); // 清楚全部
```

### sessionStorage

> 本地临时存储，页面关闭清除数据

用法跟localStorage一样，只是存储时间不同

### cookie

```js
// jQuery 15分钟后消失
$.cookie("key", "value", {
    expires: new Date().getTime() + 60 * 1000 * 15,
});

// 原生JS 15分钟后消失
document.cookie = `key=value;expires=${new Date().getTime() + 60 * 1000 * 15}`
```

1. 大小限制：一般浏览器允许在同一个域下最多8KB。而localStorage会存储5MB左右
2. 兼容性：cookie几乎可以兼容所有浏览器，但是**localStorage是H5新增的**，低版本浏览器不支持
3. 稳定性：cookie可以设置过期时间，但是一般情况下没有达到时间之前cookie就被清除了（无痕不会设置cookie）
4. **cookie会自动通过请求头发送给服务端**
5. cookie不仅前端可以设置，后端也可以设置

### 客户端服务端校验

1. 获取用户名输入的用户名和密码（表单验证）

2. 基于ajax发送请求，把加密后的用户名和密码发给服务器

3. 服务器接收到请求后->在数据库查找是否有和当前用户名和密码匹配的信息

   找不到：告诉客户端，当前用户名和密码不匹配，登录失败

   找到了：“在服务器上记录当前用户的登录状态”

   1. 在服务器上设置一个session（connect_sid），来记录当前用户的登录状态（服务端存储）
   2. 获取当前用户的操作权限，连同登录成功的信息一并返回

### 登录模型

1. 当我们登录成功以后，在服务器端会生成一个session，里存储了一个当前客户端和服务器连接唯一标识connect_sid
2. 在服务端返回给客户端数据的时候，会通过响应头设置一个set-cookie的字段，存储的值是当前的connect_sid
3. 客户端接收到请求之后，浏览器会自动检测当前的响应头中有没有set-cookie这个字段，如果有，就会自动把这个字段的信息设置到浏览器的cookie中，而且这个字段不能修改
4. 以后你的客户端在给服务器发送请求的时候，浏览器会自动在请求头中把当前cookie中的connect_sid给你发送过去，和服务器之前存储的session中的connect_sid进行比对
5. 注意session和cookie都有过期时候

### 数据加密

1. 可逆加密(按照一定的规则可以解码)
2. 不可逆加密(一旦加密之后就不能在解密了)  MD5 ==>密码

> MD5生成的是一个32位的字符串

当用户注册的时候，把用户的密码进行MD5加密，把加密的结果存储到数据库中，以后用户登录的时候，把当前用户输入的加密的密码和之前服务器上存户的密码进行匹配，如果匹配一致，那说明注册和登录的时候输入的密码是一致的

- cookie等敏感信息会被隐藏显示为”Provisional headers are shown”。解决方法：访问[chrome://flags/#site-isolation-trial-opt-out](chrome://flags/#site-isolation-trial-opt-out)，改为Diable



## 参考

[详说 Cookie, LocalStorage 与 SessionStorage](https://jerryzou.com/posts/cookie-and-web-storage/)

[原生JS操作Cookie-基础](https://www.cnblogs.com/vv-dennis/articles/5288445.html)