// $("#box"); // 返回值是一个jq的实例【是一个元素集合】
// $("#box").each(); // jQuery原型上
// $.each(); // jQuery对象上
let ary = [1, 2, 3, 4];
$.each(ary, function (index, item) {
    console.log(item);
});

(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document
            ? factory(global, true)
            : console.log("jQuery requires a window with a document");
    } else {
        factory(global); //window
    }

    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    var deletedIds = [];
    var slice = deletedIds.slice;
    var concat = deletedIds.concat;
    var push = deletedIds.push;
    var indexOf = deletedIds.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var version = "1.11.3";
    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };
    // 给jQuery的原型进行重定向
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        // 重定向的原型没有constructor
        constructor: jQuery,
        toArray: function () {
            return slice.call(this);
        },
        get: function (num) {
            return num != null
                ? num < 0
                    ? this[num + this.length]
                    : this[num]
                : slice.call(this);
        },
    };
    // 当前$执行时new的是当前这个函数
    var init = (jQuery.fn.init = function (selector, context) {
        // 把jQuery的原型赋值给init的原型
        // init函数就是获取DOM的
        if (!selector) {
            // 构造函数中的this指向当前实例，不传值返回$()
            return this;
        }
    });
    init.prototype = jQuery.fn;
    var _jQuery = window.jQuery,
    var  _$ = window.$;
    // 运行这个函数将变量$的控制权让渡给第一个实现它的那个库
    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };
    if (typeof noGlobal === "undefined") {
        // 给window添加键值对
        window.jQuery = window.$ = jQuery;
    }
});

jQuery.noConflict();