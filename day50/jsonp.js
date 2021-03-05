(function () {
    const jsonp = function jsonp(config) {
        config == null ? (config = {}) : null;
        typeof config !== "object" ? (config = {}) : null;
        let {
            url,
            params = {},
            jsonpName = "callback",
            success = Function.prototype,
        } = config;

        // 自己创建一个全局函数
        let f_name = `jsonp${+new Date()}`;
        window[f_name] = function (result) {
            typeof success === "function" ? success(result) : null;
            delete window[f_name];
            document.body.removeChild(script)
        };

        // 处理URL
        params = Qs.stringify(params);
        if (params) url += `${url.includes("?") ? "&" : "?"}${params}`;
        url += `${url.includes("?") ? "&" : "?"}${jsonpName}=${f_name}`;

        // 发送请求
        let script = document.createElement("script");
        script.src = url;
        // script.onerror = () => {};
        document.body.appendChild(script);
    };
    if (typeof window !== "undefined") {
        window.jsonp = jsonp;
    }
})();
