console.dir(axios);
// axios就是一款基于promise封装的ajax库
// axios是一个函数，但是在他自己身上存储着好多方法和属性供咱们去使用
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
            // 房钱函数的返回结果就是处理之后的参数
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

        // 在当前大范围里边可以进行构造函数的执行，也可以给当前的类增加共有属性，也可以把当前的类当做对象增加键值对
    }

    // 在axios身上会有一个默认的对象，里边存储着一些默认的配置
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
    // 2.post系列的请求方法
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
