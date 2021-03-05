[toc]

# 40\_笔记

## Ajax

**get post区别**

- get 请求时以问号传参的形式 post 请求时以请求体形式传参
- get 请求传递的参数比 post 少
- get 请求有可能产生缓存（不想走缓存就在url后面拼接一个不重复的参数） post 没有缓存
- get 相对 post 来说不安全



```js
// jq版的ajax是在jquery自己身上存放的，当使用的时候让其执行，并且给其传递一个对象，对象里存储的键值对就是当前请求所需的参数或者配置
$.ajax({
    url: "./data.json", // API请求地址
    type: "GET", // get delete options head post put（大小写均可），默认是get
    data: {}, // 请求携带的参数，格式可以是对象（{key:value}）和字符串（key=value），默认是null，如果传递的是字符串并且是get请求，那就直接拼接到url后面即可；如果是post请求，那就把字符串放send中
    async: true, // 是否同异步，默认是true是异步，false是同步
    dataType: "JSON", // 服务端返回数据格式，默认返回的是JSON格式的对象
    cache: true, // 是否走缓存，只在get系列请求下有效（默认是true，走缓存）可以设置为false不走缓存（在url末尾拼接一个随机数或时间戳）
    success: null, // 当前请求成功异步执行的回调函数，此函数的形参就是当前服务器返回的结果
    error: null, // 如果当前请求请求失败，那error对应的回调函数就会执行
    complete: null, // 不管当前是请求失败还是请求成功，只要请求完成，它都执行
    timeout: null, // 设置当前请求超时的时间
    headers: null, // 设置当前的请求头信息，传递的参数是对象类型，请求头中的属性不能是汉字，如果想传递汉字，那就给汉字进行转码
    contentType: null, // 设置传递给服务器内容的格式类型，默认是 "application/x-www-form-urlencode"
    // 客户端传递给服务器的格式（类型一般都是字符串）"{"name":"xxx","age":1}"
    // x-www-form-urlencode: name=xxx&age=1
});
```

### 合并对象的方法

```js
let a = {
    name: "lion",
    age: 13,
};
let b = {
    name: "bird",
    time: "3",
};
// 从第二个参数开始，把对象里的所有键值对放到第一个参数里
let res1 = Object.assign({}, a, b);
console.log(res1); // { name: 'bird', age: 13, time: '3' }

let res2 = { ...a, ...b };
console.log(res2); // { name: 'bird', age: 13, time: '3' }

```

### 封装jQuery Ajax 老师版本

```js
(function () {
    function ajax(options) {
        console.log(new init(options));
        return new init(options);
    }
    // 默认的参数配置
    let defaults = {
        url: "null",
        method: "GET",
        data: null,
        dataType: "JSON",
        async: true,
        cache: true,
        timeout: null,
        headers: null,
        success: null,
        error: null,
    };
    ajax.prototype = {
        constructor: ajax,
        send: function () {
            // this->当前实例
            let {
                method,
                url,
                async,
                data,
                dataType,
                cache,
                timeout,
                headers,
                error,
                success
            } = this.options;
            // 专门用来发送请求
            // 把当前xhr放到init(ajax)的实例上，方便以后查看
            let xhr = this.xhr = new XMLHttpRequest();
            // 1.首先看当前的data是对象还是字符串，如果是字符串那就不用处理，如果是对象，那就把它转换成字符串
            data = this.handleData();
            // 2.查看一下是否是get系列请求，如果是的话那就看看data有没有值，如果data有值，那就直接拼接到url后面
            let reg = /^(GET|DELETE|HEAD|OPTIONS)$/i;
            if (data && reg.test(method)) {
                // http://www.baidu.com
                // http://www.baidu.com?ss=100
                url += `${this.hasQuestion(url)}${data}`;
                // 如果是get请求，在把data使用完成之后就把它赋值为null
                data = null;
            }
            // 3.如果当前是get系列请求，并且cache的值是false，说明不走缓存（在url后面拼接一个时间戳或随机数）
            if (reg.test(method) && !cache) {
                let num = Math.random();
                url += `${this.hasQuestion(url)}_=${num}`;
            }
            // 4.处理请求超时的时间设置
            if (timeout) {
                xhr.timeout = timeout;
            }
            xhr.open(method, url, async);
            // 5.设置请求头，headers是一个对象
            if (headers) {
                for (const key in headers) {
                    if (!headers.hasOwnProperty(key)) break
                    xhr.setRequestHeader(key, encodeURI(headers[key]))
                }
            }
            xhr.onreadystatechange = function () {
                let {
                    readyState,
                    status,
                    statusText,
                    response,
                    responseText,
                    responseXML
                } = xhr;
                if (readyState === 4) {
                    let res = "";
                    if (/^(2|3)\d{2}$/.test(status)) {
                        // 成功的处理
                        // 按照dataType的返回值进行处理
                        switch (dataType.toUpperCase()) {
                            case "JSON":
                                res = JSON.parse(response);
                                break;
                            case "TEXT":
                                res = responseText;
                                break;
                            case "XML":
                                res = responseXML;
                                break;
                        }
                        success && success(res, statusText, xhr);
                    } else {
                        // 进行错误的处理
                        error && error(null, statusText, xhr);
                    }
                }
            };
            xhr.send();
        },
        // 封装一个方法，专门用来处理对象转字符串
        handleData: function () {
            // 对data参数进行处理，规定当前函数的返回值就是处理完成之后的字符串
            let {
                data
            } = this.options;
            // 如果当前的data是null或是字符串，那就直接返回
            if (data === null || typeof data === "string") return data;
            let str = "";
            // 只要上边if不成立，那data就是对象
            for (const key in data) {
                if (!data.hasOwnProperty(key)) break;
                // 为了防止把原型上的可枚举数组遍历处理，用hasOwnProperty给他处理一下
                str += `${key}=${data[key]}&`;
            }
            // 把最后的&截取下去
            return str.slice(0, str.length - 1);
        },
        hasQuestion: function (url) {
            if (!url) {
                url = this.options.url;
            }
            // 此函数会直接返回?或&
            return url.includes("?") ? "&" : "?";
        },
    };

    // 咱们要把用户传递options和默认的defaults进行合并，以用户传递的参数为主，如果用户没有传递这个参数，那就使用默认的
    function init(options) {
        // 这里的options就是用户传递的实参
        // 把两个对象合并，如果出现相同的属性名，后面会覆盖前面
        this.options = {
            ...defaults,
            ...options
        };
        if (!this.options.url) {
            throw new Error("url is must be supported")
        }
        this.send();
    }
    init.prototype = ajax.prototype; // 把ajax的原型赋值给init的原型
    window.ajax = ajax; // 把ajax方法暴露在window上
})();
ajax({
    url: "data.json",
    // data: {
    //     name: 1,
    //     age: 2
    // },
    // cache: false,
    // headers: {
    //     ss: 100,
    //     aa: "你好"
    // },
    success: (data, statusText, xhr) => {
        console.log(data, statusText, xhr);
    },
    error: (data, statusText, xhr) => {
        console.log(data, statusText, xhr);
    },
});
```

### 封装jQuery Ajax 自己版本

```js
(function () {
    let defaults = {
        url: "null",
        method: "GET",
        data: null,
        dataType: "JSON",
        async: true,
        cache: true,
        timeout: null,
        headers: null,
        success: null,
        error: null,
    };
    function ajax(options) {
        return new init(options);
    }
    ajax.prototype = {
        constructor: ajax,
        send: function (options) {
            let self = this;
            for (const key in defaults) {
                this[key] = options[key];
            }
            let xhr = new XMLHttpRequest();
            this.handleData();
            if (this.data) this.handleUM();
            if (this.timeout) xhr.timeout = this.timeout;
            xhr.open(this.method, this.url, this.async);
            if (this.headers) {
                for (const key in this.headers) {
                    if (Object.hasOwnProperty.call(this.headers, key)) {
                        xhr.setRequestHeader(key, encodeURI(this.headers[key]));
                    }
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (/^(2|3)\d{2}$/.test(status)) {
                        let res = "";
                        switch (self.dataType.toUpperCase()) {
                            case "JSON":
                                res = JSON.parse(xhr.response);
                                break;
                            case "TEXT":
                                res = xhr.responseText;
                                break;
                            case "XML":
                                res = xhr.responseXML;
                                break;
                        }
                        self.success && self.success(res, xhr.statusText, xhr);
                    } else {
                        self.error && self.error(null, xhr.statusText, xhr);
                    }
                }
            };
            xhr.send(this.data);
        },
        handleData: function () {
            if (this.data === null && typeof this.data === "string") return;
            let str = "";
            for (const key in this.data) {
                if (Object.hasOwnProperty.call(this.data, key)) {
                    str += `${key}=${this.data[key]}&`;
                }
            }
            this.data = str.slice(0, str.length - 1);
        },
        handleUM: function () {
            let reg = /^(get|delete|head|options)$/i;
            if (reg.test(this.method)) {
                this.url += `${this.handleQ()}${this.data}`;
                this.data = null;
                if (!this.cache) this.url = `${this.url}_num=${Date.now()}`;
            }
        },
        handleQ: function () {
            return this.url.includes("?") ? "&" : "?";
        },
    };
    function init(options) {
        options = { ...defaults, ...options };
        this.send(options);
    }
    init.prototype = ajax.prototype;
    window.ajax = ajax;
})();
ajax({
    url: "./data.json",
    cache: false,
    timeout: 20,
    data: { name: 1, age: 2 },
    headers: { user: "hello", agent: "world" },
    success: (data, statusText, xhr) => {
        console.log(data, statusText, xhr);
    },
    error: (data, statusText, xhr) => {
        console.log(data, statusText, xhr);
    },
});

```

