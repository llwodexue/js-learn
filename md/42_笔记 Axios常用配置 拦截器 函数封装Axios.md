[toc]

# 42\_笔记

## Axios

创建一个新的 axios 实例（可以发送请求。可以给某一组有特殊配置的请求进行参数配置）

```js
const instance1 = axios.create({
    timeout: 1000,
    baseURL: "./json/"
})
const instance2 = axios.create({
    timeout: 2000,
    baseURL: "./txt/"
})

instance1.post("1.json", {
    name: 1,
    age: 2
})
instance2.post("1.txt", {
    name: 3,
    age: 4
})
```

### Axios中常用配置

- baseURL：默认路径（当发送请求的时候默认路径会和当前url拼接起来）
- timeout：请求超时的时间
- transformRequest：请求发送出去之前可以在data参数进行设置（需要写return）
- transformResponse：在请求响应成功之后，axios 调用 resolve 之前执行
- headers：配置当前的请求头
- params：get系列请求发送的参数
- data：post系列请求发送的参数
- withCredentials：跨域请求时是否需要使用凭证（默认是fasle）
- responseType：服务器响应的数据类型（默认是json）
- validateStatus：对于给定的HTTP响应状态码。`status >= 200 && status < 300;`（默认）



### 拦截器

在请求或响应被 `then` 或 `catch` 处理前拦截它们

- use可以传递两个回调函数

  第一个是请求成功的执行函数

  第二个是请求失败的执行函数

- 两个函数的返回值会影响下边then中回调函数的执行

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在这里处理对当前请求的所有配置
    console.log(config);
    return config;
})
// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    // 在这里处理响应数据
    console.log(res);
    return res.data;
}, function (rej) {
    return Promise.reject("请求失败");
})
```



### Axios的默认配置

```js
// 对 axios进行二次配置
axios.defaults.baseURL = "json";
axios.defaults.timeout = 3000;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.transformRequest = function (data, header) {
    let str = "";
    for (let key in data) {
        str += `${key}${data[key]}&`;
    }
    str = str.slice(0, str.length - 1);
    return str;
}
axios.defaults.transformResponse = function (data) {
    let res = JSON.parse(data);
    if (res.code === 0) {
        return res.data;
    } else {
        return [];
    }
}
axios.interceptors.request.use(function (config) {
    return config;
})
axios.interceptors.response.use(function (res) {
    return res.data;
}, function (rej) {
    return Promise.reject("请求失败");
})
```

### Axios 方法补充

- 执行多个并发请求

```js
let p1 = axios.get("1.json");
let p2 = axios.get("2.json");
axios.all([p1, p2]).then(([res1, res2]) => {
    console.log("p1和p2全部成功");
    console.log(res1, res2);
})
```

### Axios 方法剖析

axios是一个函数，在自己身上存储了一些常用方法

![console.dir(axios)](https://gitee.com/lilyn/pic/raw/master/js-img/console.dir(axios).jpg)

- get delete head options
- patch post put
- defaults
- all

### 函数封装Axios

```js
(function () {
    function axios(url, options) {
        let {
            method,
            baseURL,
            data,
            cache,
            params,
            headers,
            timeout,
            transformRequest,
            transformResponse,
        } = options;
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            // 把baseURL和url拼接到一起
            url = baseURL + url;
            // 如果当前params有值，并且是get系列请求，那就把params拼接到url后面
            let reg = /^(GET|DELETE|HEAD|OPTIONS)$/i;
            if (reg.test(method) && params) {
                let str = "";
                for (let key in params) {
                    if (!params.hasOwnProperty(key)) break;
                    str += `${key}=${params[key]}&`;
                }
                str = str.slice(0, str.length - 1);
                params = str;
                let mark = url.includes("?") ? "&" : "?";
                url += `${mark}${params}`;
                data = null;
            }
            // 如果当前timeout有值再进行处理
            if (timeout) {
                xhr.timeout = timeout;
            }
            // 如果当前请求是post系列请求，这时候参数的格式交给transformRequest
            if (!reg.test(method)) {
                data = transformRequest(data);
            }
            // 如果当前是get系列请求，并且cache是false，就在url后拼接时间戳或随机数
            if (reg.test(method) && !cache) {
                let mark = url.includes("?") ? "&" : "?";
                url += `${mark}_=${Math.random()}`;
            }
            xhr.open(method, url);
            // 如果当前headers有值再进行处理
            // Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED.
            if (headers) {
                for (let key in headers) {
                    if (!headers.hasOwnProperty(key)) break;
                    xhr.setRequestHeader(key, encodeURI(headers[key]));
                }
            }
            xhr.onreadystatechange = function () {
                let {
                    response,
                    status,
                    statusText,
                    readyState,
                    getAllResponseHeaders,
                } = xhr;
                if (readyState === 4) {
                    if (/^(2|3)\d{2}$/.test(status)) {
                        resolve({
                            data: JSON.parse(response),
                            status,
                            statusText,
                            request: xhr,
                            config: options,
                            headers: getAllResponseHeaders.call(xhr),
                            // Illegal invocation at XMLHttpRequest.xhr.onreadystatechange
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
        // 这是promise的第一个then，拦截器放在这里
        //当用户写then的时候其实已经是第二个then了（第二个then受这个then的管控）
    }

    function mergeOptions(options) {
        // 合并参数，返回结果：合并后的对象
        // 如果直接合并，那defaults里的headers里的参数就会被覆盖
        let headers = {
            ...axios.defaults.headers,
            ...options.headers,
        };
        return {
            ...axios.defaults,
            ...options,
        };
    }

    axios.defaults = {
        baseURL: "",
        params: null, // get系列请求的参数
        data: null, // post系列请求的参数
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        transformRequest: function (data) {
            if (!data) return data;
            let str = "";
            for (let key in data) {
                if (!data.hasOwnProperty(key)) break;
                str += `${key}=${data[key]}&`;
            }
            str = str.slice(0, str.length - 1);
            return str;
        },
        transformResponse: function (data) {
            console.log("transformResponse", data);
            // return JSON.parse(data);
            return data.data;
        },
        timeout: null,
        cache: true,
    };

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

    axios.all = function (promises = []) {
        return Promise.all(promises);
    };
    // 暴露axios函数到全局
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
    });
/* axios.post(
    "2.json",
    {
        name: 1,
        age: 2,
    },
    {
        headers: {
            dd: 100,
        },
    }
); */
// console.dir(axios);
// axios.all([p1, p2]); // 是一个promise实例
```


