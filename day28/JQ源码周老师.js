// 如果A===window：说明是浏览器、webview中运行
// 如果是在Node环境下运行，A可能是Global，也可能是当前模块
var A = typeof window !== "undefined" ? window : this;
var B = function (window, noGlobal) {
    // 浏览器环境下执行这个函数
    //  window -> window    noGlobal -> undefined
    // webpack环境下导入执行
    //  window -> window    noGlobal -> true
    "use strict";
    var version = "3.5.1";
    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };
    return jQuery;
};
(function (global, factory) {
    // 支持 CommonJS 模块规范[node环境]
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            // 有 window。例如：webpack工程化环境
            // 可能通过 import 导入，也可能通过 require 导入
            // import $ from 'jquery'
            // let $ = require('jquery')
            factory(global, true) :
            // 没有 window
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };

    } else {
        // 不支持 CommonJS 规范的[浏览器环境]
        // global->window
        factory(global)
    }

})(A, B);

/* ........................... */

function factory(window, noGlobal) {
    "use strict";
    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };
    // ...
    /* 冲突处理 */
    // 在没有暴露给 window之前，把当前 window的$存一下
    var _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            // 转让使用权给 Zepto
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    }
    if (typeof noGlobal === "undefined") {
        // 暴露给 window
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}



function factory(window, noGlobal) {
    "use strict";
    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };
    // ...

    /* 冲突处理 */
    var _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };

    /* 暴露API */
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }
    if (typeof noGlobal === "undefined") {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}