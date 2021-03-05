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
