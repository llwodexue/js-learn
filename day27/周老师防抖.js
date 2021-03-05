// 兼容写法
function debounce(func, wait, immediate) {
    var timer = null,
        result;
    return function proxy() {
        var self = this,
            params = [].slice.call(arguments),
            callNow = !timer && immediate;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            // 清除最后一次定时器
            clearTimeout(timer);
            timer = null;
            // 符合执行的是最后一次「触发在结束边界」
            if (!immediate) result = func.apply(self, params);
        }, wait);
        // 符合第一次立即执行「触发在开始的边界」
        if (callNow) result = func.apply(self, params);
        return result;
    }
}
// ES6
// function debounce(func, wait) {
//     let timer = null,
//         result;
//     return function proxy(...params) {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             result = func.call(self, ...params);
//         }, wait);
//         return result;
//     }
// }

// window.onscroll = fn;
window.onscroll = debounce(fn, 500, true);