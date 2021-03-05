(function () {
    class PromiseSend {
        constructor(url, options) {
            // 当new PromiseSend的时候，constructor就会执行，此函数的this就是当前的实例

            // 此函数返回的就是promise实例
            return new Promise((resolve, reject) => {
                // 在这里发送ajax请求，请求成功以后调用resolve
                // 请求失败以后调用reject
            });
        }
        ss() {} // 给当前的原型添加方法
    }

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

    // axios.get = function (url, options) {
    //     let res = mergeOptions(options); // res就是合并后的对象
    //     // 发送ajax
    //     res.method = "get";
    //     return axios(url, res);
    //     // return new PromiseSend(url, res); // 执行结果就是get返回的
    // }

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

    // axios.post = function (url, data, options) {
    //     options.data = data;
    //     options.method = "post"
    //     let res = mergeOptions(options);
    //     return axios(url, res);
    // }

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
